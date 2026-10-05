import { TeacherSignupCard } from '@/features/teacher-access';

export const metadata = {
  title: 'SignUp | Quimera',
};

export default function SignupPage() {
  return (
    <div className="flex flex-1 flex-col justify-center sm:my-8">
      <TeacherSignupCard />
    </div>
  );
}
