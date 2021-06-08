import { CollisionDetection, LayoutRect, ViewRect } from '@dnd-kit/core';

function isViewRect(entry: LayoutRect | ViewRect): entry is ViewRect {
  return 'top' in entry;
}

function cornersOfRectangle(
  rect: LayoutRect,
  left = rect.offsetLeft,
  top = rect.offsetTop,
  padding = 0
) {
  const xPadding = padding * rect.width;
  const yPadding = padding * rect.height;
  return [
    {
      x: left + xPadding,
      y: top + yPadding,
    },
    {
      x: left + rect.width - xPadding,
      y: top + yPadding,
    },
    {
      x: left + xPadding,
      y: top + rect.height - yPadding,
    },
    {
      x: left + rect.width - xPadding,
      y: top + rect.height - yPadding,
    },
  ];
}

const isBetween = (a: number, top: number, bottom: number) =>
  a >= top && a <= bottom;

export const gridCollisionStrategy: CollisionDetection = (entries, target) => {
  const corners = cornersOfRectangle(target, target.left, target.top);

  const prospects = entries.filter(([_, entry]) => {
    const entryCorners = cornersOfRectangle(
      entry,
      isViewRect(entry) ? entry.left : undefined,
      isViewRect(entry) ? entry.top : undefined,
      0.3
    );

    if (
      entryCorners[1].x > corners[0].x &&
      entryCorners[0].x < corners[1].x &&
      (isBetween(corners[2].y, entryCorners[0].y, entryCorners[2].y) ||
        isBetween(corners[0].y, entryCorners[0].y, entryCorners[2].y) ||
        (corners[0].y <= entryCorners[0].y &&
          corners[2].y >= entryCorners[2].y))
    ) {
      return true;
    }
    return false;
  });

  let min = prospects[0];
  prospects.forEach((prospect) => {
    const [, entry] = prospect;
    const entryCorners = cornersOfRectangle(
      entry,
      isViewRect(entry) ? entry.left : undefined,
      isViewRect(entry) ? entry.top : undefined
    );
    const minCorners = cornersOfRectangle(
      min[1],
      isViewRect(min[1]) ? min[1].left : undefined,
      isViewRect(min[1]) ? min[1].top : undefined
    );
    if (entryCorners[0].x < minCorners[0].x) {
      min = prospect;
    }
  });
  return min?.[0] ?? null;
};
