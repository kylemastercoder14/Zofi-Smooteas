"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type AttendanceReportColumn = {
  id: string;
  name: string;
  timeIn: string;
  timeOut: string;
  status: string;
  shift: string;
};

export const columns: ColumnDef<AttendanceReportColumn>[] = [
  {
    accessorKey: "name",
    header: "Staff",
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
    accessorKey: "shift",
    header: "Shift",
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
      } else if (status === "On Time") {
        variant = "success";
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];
