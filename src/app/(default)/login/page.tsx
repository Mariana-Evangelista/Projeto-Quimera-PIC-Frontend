import { TeacherLoginCard } from '@/features/teacher-login/components/teacher-login-card';

export const metadata = {
  title: 'Login  | Quimera',
};

export default function LoginPage() {
  return (
    <div className="mt-8 flex items-center justify-center sm:mt-12">
      <TeacherLoginCard />
    </div>
  );
}
