import React from 'react';
import { TabButton } from '@storybook/components';

export interface PagingProps {
  activePage: number;
  onPageChange: (pageNumber: number) => void;
  pagesCount: number;
}

export type ItemType = number | '.';

export function Paging(props: PagingProps): JSX.Element {
  const renderItem = (item: ItemType, index: number): JSX.Element => {
    switch (item) {
      case '.': {
        return (
          <TabButton
            disabled
            key={`dots${index < 5 ? 'Left' : 'Right'}`}
            autoFocus={false}
            content={''}
            nonce={''}
            rel={''}
            rev={''}
          >
            {'...'}
          </TabButton>
        );
      }

      default: {
        return (
          <TabButton
            rel={item}
            rev={item}
            autoFocus={false}
            nonce={item}
            content={item}
            key={item}
            onClick={() => {
              goToPage(item);
            }}
            active={props.activePage === item}
          >
            {item}
          </TabButton>
        );
      }
    }
  };

  const goToPage = (pageNumber: number): void => {
    if (1 <= pageNumber && pageNumber !== props.activePage && pageNumber <= props.pagesCount) {
      props.onPageChange(pageNumber);
    }
  };

  return <div>{getItems(props.activePage, props.pagesCount).map(renderItem)}</div>;
}

function getItems(active: number, total: number): ItemType[] {
  const result: ItemType[] = [];

  const left = Math.max(Math.min(active - 2, total - 4), 1);
  const right = Math.min(Math.max(5, active + 2), total);

  const hasLeftDots = left > 3;
  const from = hasLeftDots ? left : 1;

  const hasRightDots = right < total - 2;
  const to = hasRightDots ? right : total;

  if (hasLeftDots) {
    result.push(1, '.');
  }

  for (let i = from; i <= to; ++i) {
    result.push(i);
  }

  if (hasRightDots) {
    result.push('.');
  }

  if (hasRightDots && isFinite(total)) {
    result.push(total);
  }

  return result;
}
