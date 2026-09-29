'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Control, Controller } from 'react-hook-form';

import { ExperimentManageFormData } from '../schema/experiment-manage-schema';
import { ExperimentManageFormState } from '../types/experiment-manage-form-state';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EXPERIMENTS_LIST_DATA } from '@/constants/experiments-list-data';

interface ExperimentManageFormProps {
  formState: ExperimentManageFormState['inputs'];
  type: 'created' | 'update';
  control: Control<ExperimentManageFormData>;
}

export function ExperimentManageForm({ formState, control, type }: ExperimentManageFormProps) {
  return (
    <>
      <FieldGroup>
        <Controller
          name="type"
          control={control}
          disabled={type === 'update'}
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend>Tipo de Experimento</FieldLegend>

              <RadioGroup
                name={field.name}
                value={field.value}
                defaultValue={formState?.type || ''}
                onValueChange={(value) => field.onChange(value)}
              >
                {EXPERIMENTS_LIST_DATA.map((data) => (
                  <FieldLabel key={data.slug} htmlFor={`experiment-type-${data.slug}`}>
                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldTitle>{data.title}</FieldTitle>
                        <FieldDescription>{data.description}</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem
                        value={data.slug}
                        id={`experiment-type-${data.slug}`}
                        aria-invalid={fieldState.invalid}
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>

              <FieldError errors={[fieldState.error]} />
            </FieldSet>
          )}
        />
        <Controller
          name="university"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Universdade</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite o nome da Universidade"
                type="text"
                defaultValue={formState?.university || ''}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="class"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Turma</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Digite a turma"
                type="text"
                defaultValue={formState?.class || ''}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
}
