/* eslint-disable no-nested-ternary */
import { Column, Table } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// import { Checkbox } from '../ui/checkbox';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              //   <CaretSortIcon className='ml-2 h-4 w-4' />
              <></>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            {/* <EyeNoneIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' /> */}
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface DataTableColumnCheckboxProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnCheckbox<TData>({
  table,
}: DataTableColumnCheckboxProps<TData>) {
  //   const handleCheckAll = async () => {
  //     const filters = table.options.meta?.filters ?? {};
  //     const ids = await (table.options.meta as TableMeta<TData>).getAllPagesRows(
  //       filters
  //     );

  //     const numbersObject = ids.reduce(
  //       (acc: { [name: number]: boolean }, number) => {
  //         acc[number] = true;
  //         return acc;
  //       },
  //       {}
  //     );

  //     table.setRowSelection(numbersObject);
  //   };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {/* <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          aria-label='Select all'
          className='translate-y-[2px]'
          data-state={
            table.getIsAllPageRowsSelected() ? 'checked' : 'unchecked'
          }
        /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-[160px]'>
        <DropdownMenuItem onSelect={() => {}}>Check all</DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => table.toggleAllPageRowsSelected(true)}
        >
          Check page
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => table.resetRowSelection()}>
          Uncheck all
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => table.toggleAllPageRowsSelected(false)}
        >
          Uncheck page
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
