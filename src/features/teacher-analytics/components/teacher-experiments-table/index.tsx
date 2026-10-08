import { connection } from 'next/server';
import { GetTeacherExperimentsService } from '../../services/get-teacher-experiments-service';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function TeacherExperimentsTable() {
  await connection();
  const data = await GetTeacherExperimentsService();

  return (
    <div className="mb-16 py-4 sm:py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
