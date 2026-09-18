export type ExperimentAccessFormState = {
  success: boolean;
  message?: string;
  field_errors?: {
    student?: string[];
    pin?: string[];
  };
  inputs?: {
    student?: string;
    pin?: string;
  };
};
