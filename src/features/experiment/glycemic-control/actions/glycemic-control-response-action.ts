'use server';

import z from 'zod';

import { ApiError } from '@/lib/api/errors';
import {
  GlycemicControlResponseFormData,
  GlycemicControlResponseSchema,
} from '../schemas/create-glycemic-control-response-schema';
import { GlycemicControlResponseFormState } from '../types/glycemic-control-response-state';
import { getSignedCookieAccess } from '@/utils/get-signed-cookies';
import {
  EXPERIMENT_ACCESS_COOKIE,
  ExperimentAccessClaims,
} from '@/features/experiment-access/services/set-data-cookies';
import { GlycemicControlResponseTypes } from '../types/glycemic-control-response-types';
import { OptionValue } from '../types/glycemic-control-question-types';
import { CreateGlycemicControlResponseService } from '../services/create-glycemic-control-response-service';
import { GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS } from '../constants/glycemic-control-experiment-questions';

export async function GlycemicControlResponseAction(
  _prevState: GlycemicControlResponseFormState,
  data: GlycemicControlResponseFormData
): Promise<GlycemicControlResponseFormState> {
  const validatedData = GlycemicControlResponseSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      field_errors: z.flattenError(validatedData.error).fieldErrors,
      message: 'Erro de validação',
      inputs: {
        question_1: data.question_1,
        question_2: data.question_2,
        question_3: data.question_3,
        question_4: data.question_4,
        question_5: data.question_5,
      },
    };
  }

  const { question_1, question_2, question_3, question_4, question_5 } = validatedData.data;

  try {
    const experimentData = await getSignedCookieAccess<ExperimentAccessClaims>(
      EXPERIMENT_ACCESS_COOKIE,
      'EXPERIMENT_ACCESS_SECRET'
    );

    if (!experimentData) {
      return {
        success: false,
        field_errors: undefined,
        message: 'Sessão do experimento expirada ou inválida. Entre com o PIN novamente.',
        inputs: { question_1, question_2, question_3, question_4, question_5 },
      };
    }

    const answers: GlycemicControlResponseTypes['answers'] = [];

    const questionAnswers = [question_1, question_2, question_3, question_4, question_5];

    questionAnswers.forEach((selectedAnswer, index) => {
      const questionNumber = index + 1;
      const questionData = GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS.find(
        (q) => q.question === questionNumber
      );

      if (questionData) {
        const isCorrect = selectedAnswer === questionData.answer;
        answers.push({
          question: questionNumber,
          answer: selectedAnswer as OptionValue,
          weight: isCorrect ? 20 : 0,
        });
      }
    });

    const responseBody: GlycemicControlResponseTypes = {
      studentName: experimentData.studentName,
      pin: experimentData.pin,
      answers,
    };

    const response = await CreateGlycemicControlResponseService(responseBody);

    return {
      success: true,
      field_errors: undefined,
      message: JSON.stringify(response),
      inputs: { question_1, question_2, question_3, question_4, question_5 },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        field_errors: undefined,
        message: error.error.message,
        inputs: { question_1, question_2, question_3, question_4, question_5 },
      };
    }
    return {
      success: false,
      field_errors: undefined,
      message:
        'Não foi possível validar o experimento. Tente novamente ou entre em contato com o suporte.',
      inputs: { question_1, question_2, question_3, question_4, question_5 },
    };
  }
}