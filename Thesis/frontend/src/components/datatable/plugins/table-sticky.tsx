import { ColumnDef, VisibilityState } from '@tanstack/react-table';

const calculateHeaderStyles = (left: string[], right: string[]) => {
  const styles: { [name: string]: React.CSSProperties } = {};

  left.forEach((l, index) => {
    styles[l] = {
      position: 'sticky',
      left: index * 50,
      minWidth: 50,
      backgroundColor: 'hsl(var(--background))',
      top: 0,
      zIndex: 10,
    };
    if (isLast(index, left.length)) {
      styles[l].borderRight = '1px solid #E2E8F0';
    }
  });

  right.forEach((r, index) => {
    styles[r] = {
      position: 'sticky',
      right: index * 50,
      minWidth: 50,
      backgroundColor: 'hsl(var(--background))',
      top: 0,
      zIndex: 10,
    };

    if (isLast(index, right.length)) {
      styles[r].borderLeft = '1px solid #E2E8F0';
    }
  });

  return styles;
};

const calculateCellStyles = (left: string[], right: string[]) => {
  const styles: { [name: string]: React.CSSProperties } = {};

  left.forEach((l, index) => {
    styles[l] = {
      position: 'sticky',
      left: index * 50,
      minWidth: 50,
      backgroundColor: 'hsl(var(--background))',
    };

    if (isLast(index, left.length)) {
      styles[l].borderRight = '1px solid #E2E8F0';
    }
  });

  right.forEach((r, index) => {
    styles[r] = {
      position: 'sticky',
      right: index * 50,
      minWidth: 50,
      backgroundColor: 'hsl(var(--background))',
    };
    if (isLast(index, right.length)) {
      styles[r].borderLeft = '1px solid #E2E8F0';
      styles[r].boxShadow = '0px 4px 10px 0px rgba(0,0,0,0.25)';
    }
  });

  return styles;
};

const isLast = (index: number, length: number) => {
  return index === length - 1;
};

export function useSticky<TData, TValue>({
  left,
  right,
  columns,
  columnVisibility,
}: {
  left: number;
  right: number;
  columns: ColumnDef<TData, TValue>[];
  columnVisibility: VisibilityState;
}) {
  const filteredColumns = columns.filter(
    (c) => columnVisibility[c.id as string] !== false
  );

  // Helper function to get the index of a column ID in the columns array
  const getColumnIndex = (columnId: string) =>
    filteredColumns.findIndex((col) => col.id === columnId);

  // Extract the column IDs based on the left and right values
  const leftIds =
    left > 0
      ? filteredColumns.slice(0, left).map((col) => col.id as string)
      : [];
  const rightIds =
    right > 0
      ? filteredColumns.slice(-right).map((col) => col.id as string)
      : [];

  // Sort left array based on the column order
  const sortedLeft = [...leftIds].sort(
    (a, b) => getColumnIndex(a) - getColumnIndex(b)
  );

  // Sort right array based on the column order
  const sortedRight = [...rightIds].sort(
    (a, b) => getColumnIndex(b) - getColumnIndex(a)
  );

  const headerStyles = calculateHeaderStyles(sortedLeft, sortedRight);
  const cellStyles = calculateCellStyles(sortedLeft, sortedRight);

  return {
    headerStyles,
    cellStyles,
  };
}
