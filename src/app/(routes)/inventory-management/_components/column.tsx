"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CellAction } from './cell-action';

export type InventoryManagementColumn = {
  id: string;
  position: string;
  name: string;
  category: string;
  quantity: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<InventoryManagementColumn>[] = [
  {
    accessorKey: "position",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant:
        | "default"
        | "secondary"
        | "outline"
        | "destructive"
        | "success"
        | "warning"
        | null
        | undefined = "default";

      if (status === "Out of Stock") {
        variant = "destructive";
      } else if (status === "Low Stock") {
        variant = "warning";
      } else if (status === "Available") {
        variant = "success";
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
