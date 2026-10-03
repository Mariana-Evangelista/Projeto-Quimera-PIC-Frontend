import { ExperimentContentTypes } from '@/features/experiment/shared/types/experiment-content-types';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ContentMarkdown({ content }: { content: ExperimentContentTypes }) {
  return (
    <>
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
    </>
  );
}
