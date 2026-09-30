'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from './data-table-features';
import { ExperimentDataTypes } from '@/types/experiment-data-types';
import { GetExperiment } from '@/utils/get-experiment-by-slug';

import { ExperimentActionsCell } from './columns-actions-cell';

const columnHelper = createColumnHelper<DataTableFeatures, ExperimentDataTypes>();

export const columns = columnHelper.columns([
  columnHelper.accessor('type', {
    header: 'Tipo',
    cell: ({ row }) => GetExperiment(row.original.type)?.title ?? row.original.type,
  }),
  columnHelper.accessor('pin', {
    header: 'PIN',
  }),
  columnHelper.accessor('university', {
    header: 'Universidade',
  }),
  columnHelper.accessor('class', {
    header: 'Turma',
  }),
  columnHelper.accessor('responsesNumber', {
    header: 'Respostas',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Data de Criação',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <ExperimentActionsCell experiment={row.original} />,
  }),
]);
