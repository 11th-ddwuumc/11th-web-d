import { useLayoutEffect, useState, type RefObject } from "react";

// 카드 크기는 고정하고, 컨테이너 너비에 따라 열 수만 바뀌어요.
const CARD_WIDTH = 150;
const GRID_GAP = 16;
const MAX_COLUMNS = 5;

function calculateColumns(containerWidth: number) {
  const columns = Math.floor((containerWidth + GRID_GAP) / (CARD_WIDTH + GRID_GAP));
  return Math.min(Math.max(columns, 1), MAX_COLUMNS);
}

// 아직 너비를 재지 못했으면 null을 돌려줘요.
export function useGridColumns(containerRef: RefObject<HTMLElement | null>) {
  const [columns, setColumns] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => setColumns(calculateColumns(container.clientWidth));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

  return columns;
}
