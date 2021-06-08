import update from 'immutability-helper';

import { displace, packGrid, removeGridItem } from './utils';

import type {
  Grid,
  GridData,
  GridItem,
  GridLayout,
  GridOptions,
} from './types';

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
        updatedItems = update(updatedItems, {
          $splice: [[updatedItems.findIndex((i) => i.id === item.id), 1]],
        });
        updatedItems = packGrid(updatedItems, layout);
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

    boundingBox() {
      const layout: GridLayout = {
        x: Number.MAX_VALUE,
        y: Number.MAX_VALUE,
        width: this.data.width ?? 0,
        height: this.data.height ?? 0,
      };

      this.data.items.forEach((item) => {
        layout.x = Math.min(layout.x, item.layout?.x);
        layout.y = Math.min(layout.x, item.layout?.y);
        layout.width = Math.max(
          layout.width,
          item.layout?.x + item.layout?.width
        );
        layout.height = Math.max(
          layout.height,
          item.layout?.y + item.layout?.height
        );
      });

      return layout;
    },
  };

  return grid;
};
