import { GridItem } from '@glibby/core';

export type GetContent = (
  item?: GridItem,
  className?: string
) => React.ReactNode | JSX.Element | null;
