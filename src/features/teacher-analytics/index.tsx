import { Separator } from '@/components/ui/separator';
import { TeacherAnalyticsHeader } from './components/teacher-analytics-header';
import TeacherExperimentsTable from './components/teacher-experiments-table';

export function TeacherAnalytics() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 xl:px-0">
      <TeacherAnalyticsHeader />
      <Separator />
      <TeacherExperimentsTable />
    </div>
  );
}
