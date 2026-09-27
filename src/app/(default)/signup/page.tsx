import { TeacherSignupCard } from '@/features/teacher-access';

export const metadata = {
  title: 'SignUp | Quimera',
};

export default function SignupPage() {
  return (
    <div className="sm:my-8">
      <TeacherSignupCard />
    </div>
  );
}
