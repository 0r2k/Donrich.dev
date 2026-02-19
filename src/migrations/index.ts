import * as migration_20260215_192639 from './20260215_192639';

export const migrations = [
  {
    up: migration_20260215_192639.up,
    down: migration_20260215_192639.down,
    name: '20260215_192639'
  },
];
