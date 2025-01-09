"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { AttendanceHistoryColumn, columns } from "./column";

interface AttendanceHistoryClientProps {
  data: AttendanceHistoryColumn[];
}

const AttendanceHistoryClient: React.FC<AttendanceHistoryClientProps> = ({
  data,
}) => {
  return (
    <>
      <DataTable searchKey="date" columns={columns} data={data} />
    </>
  );
};

export default AttendanceHistoryClient;
