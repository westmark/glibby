import update from 'immutability-helper';

import { displace, packGrid, removeGridItem } from './utils';

import type { Grid, GridData, GridItem, GridOptions } from './types';
export const makeGrid = (
  options: GridOptions,
  initialItems: Array<GridItem> = []
): Grid => {
  const data: GridData = {
    id: Math.random().toString(32).substr(2),
    ...options,
    items: initialItems,
  };

  const grid: Grid = {
    data,
    set(layout, item) {
      let updatedItems = this.data.items;
      if (updatedItems.find((i) => i.id === item.id)) {
        // Item already exists, first remove it from the layout
      }

      updatedItems = displace(updatedItems, layout);

      updatedItems = update(updatedItems, {
        $push: [update(item, { layout: { $set: layout } })],
      }).sort((a, b) => a.layout.y - b.layout.y);

      updatedItems = packGrid(updatedItems, layout);

      return makeGrid(options, updatedItems);
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
