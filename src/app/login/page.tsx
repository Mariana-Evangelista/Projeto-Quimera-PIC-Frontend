import { TeacherLoginCard } from '@/features/teacher-login/components/teacher-login-card';

export const metadata = {
  title: 'Login  | Quimera',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <TeacherLoginCard />
    </div>
  );
}
