import { TeacherLoginCard } from '@/features/teacher-access';

export const metadata = {
  title: 'Login  | Quimera',
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col justify-center sm:my-8">
      <TeacherLoginCard />
    </div>
  );
}
