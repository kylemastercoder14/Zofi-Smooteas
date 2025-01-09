"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { AttendanceReportColumn, columns } from "./column";

interface AttendanceClientProps {
  data: AttendanceReportColumn[];
}

const AttendanceClient: React.FC<AttendanceClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default AttendanceClient;
