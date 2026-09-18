import fs from 'fs';

export const MakdownReadContent = (path: string): string => {
  const markdown = fs.readFileSync(path, 'utf8');
  return markdown;
};
