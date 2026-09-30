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

  return (
    <section className="mb-8 flex gap-8">
      <div className="space-y-2">
        <Label className="text-sm">Tipo</Label>

        <Select
          value={(typeColumn?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) => typeColumn?.setFilterValue(value === 'all' ? undefined : value)}
        >
          <div className="flex items-center gap-4">
            <SelectTrigger className="border-border cursor-pointer border">
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
        <Label className="text-sm">Ordenar por</Label>
        <Select
          defaultValue="asc"
          onValueChange={(value) => createdAtColumn?.toggleSorting(value === 'asc')}
        >
          <SelectTrigger className="border-border cursor-pointer border">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc" className="text-foreground font-normal">
                <SortAsc />
                Mais Recente
              </SelectItem>
              <SelectItem value="desc" className="text-foreground font-normal">
                <SortDesc />
                Mais Antigo
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
