import update from 'immutability-helper';
import type { Grid, GridData, GridItem, GridOptions } from './types';
import { removeGridItem } from './utils';

export const makeGrid = (
  options: GridOptions,
  initialItems: Array<GridItem> = []
): Grid => {
  const data: GridData = {
    ...options,
    items: initialItems,
  };

  const grid: Grid = {
    data,

    set(layoutOrPosition, item) {
      let updatedItems = this.data.items;

      if (updatedItems.find((i) => i.id === item.id)) {
        // Item already exists, first remove it from the layout
      }

      return this;
    },

    remove(id) {
      let updatedItems = this.data.items;
      const removeItem = updatedItems.find((i) => i.id === id);
      if (removeItem) {
        updatedItems = removeGridItem(removeItem, updatedItems);
      }

      return makeGrid(options, updatedItems);
    },
  };

  return grid;
};
