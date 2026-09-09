import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ExperimentContentTypes } from '../../types/experiment-content-types';
import { EXPERIMENT_CONTENT_ICONS } from '../../constants/experiment-content-icons';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ExperimentContentProps {
  content: ExperimentContentTypes;
}

export function ExperimentContentCard({ content }: ExperimentContentProps) {
  const Icon = EXPERIMENT_CONTENT_ICONS[content.id];

  return (
    <Card className="p-3 text-sm sm:p-5 sm:text-base">
      <CardHeader className="border-border border-b pl-0">
        <CardTitle className="mt-2 ml-0 flex items-center gap-3 text-sm sm:text-base">
          <Icon className="h-5 w-5" />
          {content.title}
        </CardTitle>
      </CardHeader>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ ...props }) => <table className="min-w-full" {...props} />,
          th: ({ ...props }) => (
            <th className="border-border bg-muted border px-3 py-2 text-left" {...props} />
          ),
          td: ({ ...props }) => <td className="border-border border px-3 py-2" {...props} />,
        }}
      >
        {content.markdown}
      </ReactMarkdown>
      <div className="flex justify-center sm:my-4 md:mx-5 lg:my-8">
        <Image
          src={content.imgSrc}
          alt={content.imgAlt}
          priority={true}
          className="w-full max-w-3xl rounded-2xl drop-shadow-lg"
        />
      </div>
    </Card>
  );
}
