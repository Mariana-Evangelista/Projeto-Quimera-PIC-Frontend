import { TeacherSignupCard } from '@/features/teacher-signup/components/teacher-signup-card';

export const metadata = {
  title: 'SignUp | Quimera',
};

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center sm:my-12">
      <TeacherSignupCard />
    </div>
  );
}
