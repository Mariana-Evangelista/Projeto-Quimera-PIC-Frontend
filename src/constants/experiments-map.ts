export const EXPERIMENTS_MAP = ['body-water-loss', 'glycemic-control'] as const;

export type ExperimentsMap = (typeof EXPERIMENTS_MAP)[number];
