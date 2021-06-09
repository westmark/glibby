import update from 'immutability-helper';

import { GridItem, GridLayout, GridPosition } from './types';

export const coords = (pos: GridPosition) => `${pos.x},${pos.y}`;
export const getLayoutCoords = (layout: GridLayout): Array<string> => {
  const allCoords: Array<string> = [];
  for (let x = layout.x; x < layout.x + layout.width; x += 1) {
    for (let y = layout.y; y < layout.y + layout.height; y += 1) {
      allCoords.push(coords({ x, y }));
    }
  }

  return allCoords;
};

export const removeGridItem = (
  item: GridItem,
  items: Array<GridItem>,
  pack = true
): Array<GridItem> => {
  let updated = items;
  const index = items.findIndex((i) => i.id === item.id);

  if (index >= 0) {
    updated = update(items, { $splice: [[index, 1]] });
  }

  return updated;
};

export const insertGridItem = (
  item: GridItem,
  items: Array<GridItem>
): Array<GridItem> => {
  let updated = items;
  const index = items.findIndex((i) => i.id === item.id);

  if (index >= 0) {
    updated = update(items, { $splice: [[index, 1]] });
  }

  return updated;
};

export const packGrid = (
  items: Array<GridItem>,
  origin: GridPosition = { x: 1, y: 1 }
): Array<GridItem> => {
  let updated = items;

  // All boxes above the origin are considered fixed
  let packItems: Array<GridItem> = [];
  const fixed: Set<string> = new Set();

  updated.forEach((item) => {
    if (item.layout.y < origin.y || item.layout.y === 1) {
      getLayoutCoords(item.layout).forEach((c) => fixed.add(c));
    } else {
      packItems.push(item);
    }
  });

  packItems = packItems.sort((a, b) => a.layout.y - b.layout.y);
  let watchdogCount = 0;

  while (packItems.length) {
    watchdogCount++;

    if (watchdogCount > 5) {
      console.warn('Watchdog count exceeded maximum depth');
      break;
    }

    const nextPackSet: Array<GridItem> = [];
    for (const item of packItems) {
      const rowAboveCoords = getLayoutCoords({
        ...item.layout,
        height: 1,
        y: item.layout.y - 1,
      });

      if (
        item.layout.y === 1 ||
        rowAboveCoords.some((coord) => fixed.has(coord))
      ) {
        // This item is blocked by at least one fixed item. Add it to fixed items and dont add it to the next packset
        getLayoutCoords(item.layout).forEach((c) => fixed.add(c));
      } else {
        // This item has a free row above it. Move it up one step
        const index = updated.findIndex((i) => i.id === item.id);
        updated = update(updated, {
          [index]: {
            layout: {
              y: {
                $set: item.layout.y - 1,
              },
            },
          },
        });

        nextPackSet.push(updated[index]);
      }
    }

    packItems = nextPackSet;
  }

  // console.log('Finished after', watchdogCount, 'iterations');

  return updated;
};

/**
 * Displaces all affected items below of the indicated area
 * @param items All items in grid
 * @param displayedLayout area to displace
 * @returns displaced items
 */
export const displace = (
  items: Array<GridItem>,
  displayedLayout: GridLayout
): Array<GridItem> => {
  const updated = items.map((item) => {
    const targetY =
      item.layout.y + item.layout.height > displayedLayout.y
        ? item.layout.y + displayedLayout.height
        : item.layout.y;

    return update(item, {
      layout: {
        y: {
          $set: targetY,
        },
      },
    });
  });

  return updated;
};

export const canContainLayout = (
  layoutToFit: GridLayout,
  staticLayout: GridLayout
) => {
  return (
    layoutToFit.x >= staticLayout.x &&
    layoutToFit.y >= staticLayout.y &&
    layoutToFit.x + layoutToFit.width <= staticLayout.x + staticLayout.width &&
    layoutToFit.y + layoutToFit.height <= staticLayout.y + staticLayout.height
  );
};

export const isOccupied = (items: Array<GridItem>, layout: GridLayout) => {
  const c = getLayoutCoords(layout);
  return items.some((item) => {
    const cs = getLayoutCoords(item.layout);
    return c.some((ci) => cs.includes(ci));
  });
};
