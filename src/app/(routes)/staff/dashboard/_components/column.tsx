"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type AttendanceHistoryColumn = {
  id: string;
  position: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: string;
};

export const columns: ColumnDef<AttendanceHistoryColumn>[] = [
  {
    accessorKey: "position",
    header: "#",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "timeIn",
    header: "Time In",
  },
  {
    accessorKey: "timeOut",
    header: "Time Out",
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

      if (status === "Absent") {
        variant = "destructive";
      } else if (status === "Late") {
        variant = "warning";
      } else if (status === "On time") {
        variant = "success";
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];
