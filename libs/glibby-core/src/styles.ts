import { Grid } from './types';
import update from 'immutability-helper';
import hash from 'object-hash';

export const upsertStyle = (grid: Grid) => {
  const styleTagId = `glibby-grid-styles`;

  let element: HTMLStyleElement | null = document.querySelector(
    `#${styleTagId}`
  );
  if (!element) {
    element = document.createElement('style');
    element.setAttribute('id', styleTagId);
    element.setAttribute('type', 'text/css');
    document.head.appendChild(element);
  }

  let cssText = element.innerHTML ?? '';
  const updatedGrid = update(grid, {
    data: {
      items: (items) =>
        items.map((item) => {
          const rule = `grid-area: ${item.layout.y} / ${item.layout.x} / span ${item.layout.height} / span ${item.layout.width};`;
          const className = `grid-item-layout-${hash(rule)}`;

          if (cssText.indexOf(className) === -1) {
            cssText = `${cssText} .${className} {${rule}}`;
          }

          item.layout.className = className;

          return item;
        }),
    },
  });
  /*grid.data.items.forEach((item) => {
    const rule = `grid-area: ${item.layout.y} / ${item.layout.x} / span ${item.layout.height} / span ${item.layout.width};`;
    const className = `grid-item-layout-${hash(rule)}`;

    if (cssText.indexOf(className) === -1) {
      cssText = `${cssText} .${className} {${rule}}`;
    }

    item.layout.className = className;
  });*/

  element.innerHTML = '';
  element.appendChild(document.createTextNode(cssText));

  return updatedGrid;
};
