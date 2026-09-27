import { GetTeacherExperimentsService } from '../../services/get-teacher-experiments';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function TeacherExperimentsTable() {
  const data = await GetTeacherExperimentsService();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
