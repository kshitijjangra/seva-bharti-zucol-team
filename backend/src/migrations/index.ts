import * as migration_20261015_115858_initial from './20261015_115858_initial';
import * as migration_20261017_071359_featured_story from './20261017_071359_featured_story';

export const migrations = [
  {
    up: migration_20261015_115858_initial.up,
    down: migration_20261015_115858_initial.down,
    name: '20261015_115858_initial',
  },
  {
    up: migration_20261017_071359_featured_story.up,
    down: migration_20261017_071359_featured_story.down,
    name: '20261017_071359_featured_story'
  },
];
