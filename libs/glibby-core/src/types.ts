export type GridOptions = {
  width: number;
  height?: number;
  id?: string | number;
};

export type GridLayout = {
  x: number;
  y: number;
  width: number;
  height: number;

  className?: string;
};

export type GridPosition = {
  x: number;
  y: number;
};

export type GridItem = {
  layout: GridLayout;
  id: string | number;
};

export type GridData = {
  width: number;
  height?: number;
  id: string | number;

  items: Array<GridItem>;
};

export type Grid = {
  data: GridData;

  set: (layout: GridLayout, item: GridItem) => Grid;
  remove: (id: GridItem['id']) => Grid;
  boundingBox: () => GridLayout;
  isOccupied: (layout: GridLayout) => boolean;
};
