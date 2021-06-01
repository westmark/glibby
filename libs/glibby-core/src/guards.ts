import { GridLayout } from './types';

export const isGridLayout = (o: unknown): o is GridLayout => {
  if (
    typeof o === 'object' &&
    o &&
    Reflect.has(o, 'width') &&
    Reflect.has(o, 'height')
  ) {
    return true;
  }
  return false;
};
