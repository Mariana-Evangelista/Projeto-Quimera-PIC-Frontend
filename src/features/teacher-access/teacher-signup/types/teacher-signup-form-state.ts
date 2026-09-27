export type TeacherSignupFormState = {
  success: boolean;
  message?: string;
  field_errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  inputs?: {
    name?: string;
    email?: string;
  };
};
