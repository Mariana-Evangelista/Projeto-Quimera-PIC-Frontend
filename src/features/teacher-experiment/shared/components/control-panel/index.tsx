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
    <Card className="w-full max-w-sm">
      <CardHeader className="border-border border-b">
        <CardTitle>Painel de Controle</CardTitle>
      </CardHeader>
      <CardContent>
        <ExperimentSettingsForm experimentId={experimentId} status={status} />
        <div className="mt-24 flex w-full flex-col gap-2">{children}</div>
      </CardContent>
    </Card>
  );
}
