import { TeacherSignupCard } from '@/features/teacher-signup/components/teacher-signup-card';

export const metadata = {
  title: 'Signup | Quimera',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <TeacherSignupCard />
    </div>
  );
}
