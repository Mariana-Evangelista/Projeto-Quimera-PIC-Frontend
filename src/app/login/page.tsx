import { TeacherLoginCard } from '@/features/teacher-login/components/teacher-login-card';

export const metadata = {
  title: 'Login do Professor | Quimera',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <TeacherLoginCard />
    </main>
  );
}
