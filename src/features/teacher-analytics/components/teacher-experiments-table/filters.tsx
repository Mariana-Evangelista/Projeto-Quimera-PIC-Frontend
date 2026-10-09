import { ReactTable, RowData } from '@tanstack/react-table';
import { DataTableFeatures } from './data-table-features';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SortAsc, SortDesc } from 'lucide-react';

interface FilterProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
}

export function Filters<TData extends RowData>({ table }: FilterProps<TData>) {
  const createdAtColumn = table.getColumn('createdAt');
  const typeColumn = table.getColumn('type');
  const statusColumn = table.getColumn('status');

  const typeValue = (typeColumn?.getFilterValue() as string | undefined) || 'all';
  const statusValue = (statusColumn?.getFilterValue() as string | undefined) || 'all';
  const sortValue = createdAtColumn?.getIsSorted() === 'asc' ? 'oldest' : 'newest';

  return (
    <section className="mb-8 flex flex-wrap gap-8 sm:flex-nowrap">
      <div className="space-y-2">
        <Label className="text-sm">Tipo</Label>

        <Select
          value={typeValue}
          onValueChange={(value) => {
            if (!value) return;
            typeColumn?.setFilterValue(value === 'all' ? undefined : value);
          }}
        >
          <div className="flex items-center gap-4">
            <SelectTrigger
              className="border-border cursor-pointer border"
              data-testid="filter-type-trigger"
            >
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
          </div>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all" className="text-foreground font-normal">
                Ver Todos
              </SelectItem>
              <SelectItem value="body-water-loss" className="text-foreground font-normal">
                Queda de Água Corporal
              </SelectItem>
              <SelectItem value="glycemic-control" className="text-foreground font-normal">
                Controle Glicêmico
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Status</Label>

        <Select
          value={statusValue}
          onValueChange={(value) => {
            if (!value) return;
            statusColumn?.setFilterValue(value === 'all' ? undefined : value);
          }}
        >
          <div className="flex items-center gap-4">
            <SelectTrigger
              className="border-border cursor-pointer border"
              data-testid="filter-status-trigger"
            >
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
          </div>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all" className="text-foreground font-normal">
                Ver Todos
              </SelectItem>
              <SelectItem value="Não iniciado" className="text-foreground font-normal">
                Não iniciado
              </SelectItem>
              <SelectItem value="Em Progresso" className="text-foreground font-normal">
                Em Progresso
              </SelectItem>
              <SelectItem value="Finalizado" className="text-foreground font-normal">
                Finalizado
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Ordenar por</Label>

        <Select
          value={sortValue}
          onValueChange={(value) => {
            if (!value) return;

            createdAtColumn?.toggleSorting(value === 'newest');
          }}
        >
          <SelectTrigger
            className="border-border cursor-pointer border"
            data-testid="filter-sort-trigger"
          >
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest" className="text-foreground font-normal">
                <SortDesc />
                Mais Recente
              </SelectItem>
              <SelectItem value="oldest" className="text-foreground font-normal">
                <SortAsc />
                Mais Antigo
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
