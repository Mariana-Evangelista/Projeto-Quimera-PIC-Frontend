import { Separator } from '@/components/ui/separator';
import { TeacherAnalyticsHeader } from './components/teacher-analytics-header';
import TeacherExperimentsTable from './components/teacher-experiments-table';

export function TeacherAnalytics() {
  return (
    <>
      <TeacherAnalyticsHeader />
      <Separator />
      <TeacherExperimentsTable />
    </>
  );
}
