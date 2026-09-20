import { useState, useTransition } from 'react';
import { BodyWaterLossResponseFormState } from '../types/body-water-loss-response-state';
import { BodyWaterLossResponseAction } from '../actions/body-water-loss-response-action';
import { BodyWaterLoosResponseFormData } from '../schemas/create-body-water-loss-response-schema';
import { usePathnameNavigation } from '../../shared/hooks/use-pathname-navigation';

const BodyWaterLossResponseInitialFormState: BodyWaterLossResponseFormState = {
  success: false,
};

export function UseCreateBodyWaterLossResponse() {
  const [state, setState] = useState<BodyWaterLossResponseFormState>(
    BodyWaterLossResponseInitialFormState
  );
  const [isLoading, startTransition] = useTransition();

  const { startPathnameNavigation } = usePathnameNavigation({
    name: 'is_send_response',
    value: 'true',
  });

  const onSubmit = (data: BodyWaterLoosResponseFormData) => {
    startTransition(async () => {
      const result = await BodyWaterLossResponseAction(state, data);
      setState(result);

      if (result.success && result.message) {
        localStorage.setItem('student-response', result.message);
        startPathnameNavigation();
      }
    });
  };

  return { isLoading, state, onSubmit };
}
