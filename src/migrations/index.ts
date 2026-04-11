import * as migration_20260411_123240 from './20260411_123240';

export const migrations = [
  {
    up: migration_20260411_123240.up,
    down: migration_20260411_123240.down,
    name: '20260411_123240'
  },
];
