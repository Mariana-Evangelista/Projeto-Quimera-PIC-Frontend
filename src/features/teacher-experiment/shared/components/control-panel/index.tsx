import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ExperimentSettingsForm } from './experiment-settings-form';
import { ExperimentStatus } from '@/types/experiment-data-types';

interface ControlPanelProps {
  experimentId: string;
  status: ExperimentStatus;
  children?: React.ReactNode;
}

export function ControlPanel({ experimentId, status, children }: ControlPanelProps) {
  return (
    <Card className="w-full lg:max-w-sm" data-testid="control-panel">
      <CardHeader className="border-border border-b">
        <CardTitle>Painel de Controle</CardTitle>
      </CardHeader>
      <CardContent>
        <ExperimentSettingsForm experimentId={experimentId} status={status} />
        <div className="mt-8 flex w-full flex-col gap-2 sm:flex-row sm:justify-end lg:mt-24 lg:flex-col">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
