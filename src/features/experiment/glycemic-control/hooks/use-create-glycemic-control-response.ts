import { useState, useTransition } from 'react';
import { GlycemicControlResponseFormState } from '../types/glycemic-control-response-state';
import { GlycemicControlResponseAction } from '../actions/glycemic-control-response-action';
import { GlycemicControlResponseFormData } from '../schemas/create-glycemic-control-response-schema';
import { usePathnameNavigation } from '../../shared/hooks/use-pathname-navigation';

const GlycemicControlResponseInitialFormState: GlycemicControlResponseFormState = {
  success: false,
};

export function UseCreateGlycemicControlResponse() {
  const [state, setState] = useState<GlycemicControlResponseFormState>(
    GlycemicControlResponseInitialFormState
  );
  const [isLoading, startTransition] = useTransition();

  const { startPathnameNavigation } = usePathnameNavigation({
    name: 'is_send_response',
    value: 'true',
  });

  const onSubmit = (data: GlycemicControlResponseFormData) => {
    startTransition(async () => {
      const result = await GlycemicControlResponseAction(state, data);
      setState(result);

      if (result.success && result.message) {
        sessionStorage.setItem('student-response', result.message);
        startPathnameNavigation();
      }
    });
  };

  return { isLoading, state, onSubmit };
}
