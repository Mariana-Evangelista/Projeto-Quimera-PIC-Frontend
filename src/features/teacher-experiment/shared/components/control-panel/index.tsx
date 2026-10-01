import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ExperimentSettingsForm } from './experiment-settings-form';

export function ControlPanel({ experimentId }: { experimentId: string }) {
  return (
    <Card>
      <CardHeader className="border-border border-b">
        <CardTitle>Painel de Controle</CardTitle>
      </CardHeader>
      <CardContent>
        <ExperimentSettingsForm
          experimentId={experimentId}
          initialAllowSubmissions={false}
          initialShareResults={false}
        />
      </CardContent>
    </Card>
  );
}
