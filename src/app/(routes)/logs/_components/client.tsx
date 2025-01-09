"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { LogsColumn, columns } from "./column";

interface LogsClientProps {
  data: LogsColumn[];
}

const LogsClient: React.FC<LogsClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="action" columns={columns} data={data} />
    </>
  );
};

export default LogsClient;
