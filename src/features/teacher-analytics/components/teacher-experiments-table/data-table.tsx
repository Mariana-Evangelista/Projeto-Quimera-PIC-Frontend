'use client';

import {
  ColumnFiltersState,
  SortingState,
  useTable,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { features, type DataTableFeatures } from './data-table-features';
import { useState } from 'react';
import { Filters } from './filters';

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
}

export function DataTable<TData extends RowData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const stickyBase = 'sticky right-0 z-10 shadow-[-8px_0_8px_-8px_rgba(0,0,0,0.15)]';

  return (
    <>
      <div className="my-8 sm:mt-0">
        <h2 className="text-lg font-semibold">Histórico de Experimentos</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Você pode filtrar seus experimentos abaixo ou gerenciar cada um no menu pontilhado.
        </p>
      </div>

      <Filters table={table} />

      <div className="border-border overflow-hidden rounded-md border">
        <Table data-testid="teacher-experiments-table">
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border">
                {headerGroup.headers.map((header, index) => {
                  const isLast = index === headerGroup.headers.length - 1;
                  return (
                    <TableHead
                      key={header.id}
                      className={isLast ? `${stickyBase} bg-accent` : undefined}
                    >
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-testid={`experiment-row-${(row.original as unknown as { _id: string })._id}`}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b-border"
                >
                  {row.getVisibleCells().map((cell, index, cells) => {
                    const isLast = index === cells.length - 1;
                    return (
                      <TableCell
                        key={cell.id}
                        className={
                          isLast ? `${stickyBase} bg-background group-hover:bg-muted` : undefined
                        }
                      >
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
