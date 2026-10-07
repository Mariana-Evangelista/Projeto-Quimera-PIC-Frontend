'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Control, Controller } from 'react-hook-form';

import { ExperimentManageFormData } from '../schema/experiment-manage-schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EXPERIMENTS_LIST_DATA } from '@/constants/experiments-list-data';

interface ExperimentManageFormProps {
  type: 'created' | 'update';
  control: Control<ExperimentManageFormData>;
}

export function ExperimentManageForm({ control, type }: ExperimentManageFormProps) {
  return (
    <>
      <FieldGroup>
        {type === 'created' && (
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <FieldSet>
                <RadioGroup
                  name={field.name}
                  value={field.value ?? ''}
                  onValueChange={(value) => field.onChange(value)}
                  className="flex flex-col md:flex-row"
                >
                  {EXPERIMENTS_LIST_DATA.map((data) => (
                    <FieldLabel
                      key={data.slug}
                      htmlFor={`experiment-type-${data.slug}`}
                      className="border-border has-data-[state=checked]:border-primary hover:border-primary has-data-[state=checked]:shadow-primary cursor-pointer has-data-[state=checked]:shadow-sm"
                    >
                      <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldTitle>{data.title}</FieldTitle>
                          <FieldDescription>{data.description}</FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value={data.slug}
                          id={`experiment-type-${data.slug}`}
                          data-testid={`experiment-type-${data.slug}`}
                          aria-invalid={fieldState.invalid}
                          className="after:bg-background relative after:absolute after:top-1/2 after:left-1/2 after:size-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full data-[state=checked]:after:hidden"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>

                <FieldError errors={[fieldState.error]} />
              </FieldSet>
            )}
          />
        )}
        <Controller
          name="university"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Universidade</FieldLabel>
              <Input
                {...field}
                id={field.name}
                value={field.value ?? ''}
                aria-invalid={fieldState.invalid}
                placeholder="Digite o nome da Universidade"
                type="text"
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
                value={field.value ?? ''}
                aria-invalid={fieldState.invalid}
                placeholder="Digite a turma"
                type="text"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
}
