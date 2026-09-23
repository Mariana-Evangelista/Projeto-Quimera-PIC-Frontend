import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS } from '../../constants/glycemic-control-experiment-questions';
import { GlycemicControlAnswerTypes } from '../../types/glycemic-control-response-types';

interface QuestionComparisonProps {
  answers: GlycemicControlAnswerTypes[];
}

export function QuestionComparison({ answers }: QuestionComparisonProps) {
  const comparison = GLYCEMIC_CONTROL_EXPERIMENT_QUESTIONS.map((question) => {
    const studentAnswer = answers.find((answer) => answer.question === question.question);

    const correctAnswer = question.answer;
    const selectedAnswer = studentAnswer?.answer;

    return {
      question: question.question,
      selectedAnswer,
      correctAnswer,
      isCorrect: selectedAnswer === correctAnswer,
    };
  });

  return (
    <Table className="border-border border">
      <TableHeader>
        <TableRow className="border-border bg-muted">
          <TableHead className="text-center">Questões</TableHead>
          <TableHead className="text-center">Alternativa Correta</TableHead>
          <TableHead className="text-center">Resposta do Aluno</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comparison.map((data) => (
          <TableRow key={data.question} className="border-border text-center">
            <TableCell>0{data.question}</TableCell>
            <TableCell>{data.correctAnswer?.toUpperCase()}</TableCell>
            <TableCell className={data.isCorrect ? 'text-green-500' : 'text-red-500'}>
              {data.selectedAnswer?.toUpperCase()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
