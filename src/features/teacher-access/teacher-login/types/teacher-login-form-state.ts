export type TeacherLoginFormState = {
  success: boolean;
  message?: string;
  field_errors?: {
    email?: string[];
    password?: string[];
  };
  inputs?: {
    email?: string;
  };
};