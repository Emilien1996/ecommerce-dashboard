'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type BilboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BilboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
