"use client";

import { ColumnDef } from "@tanstack/react-table";

export type LogsColumn = {
  id: string;
  action: string;
  position: string;
  createdAt: string;
};

export const columns: ColumnDef<LogsColumn>[] = [
  {
    accessorKey: "position",
    header: "#",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];
