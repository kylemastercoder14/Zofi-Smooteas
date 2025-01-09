"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { InventoryManagementColumn, columns } from "./column";

interface InventoryClientProps {
  data: InventoryManagementColumn[];
}

const InventoryClient: React.FC<InventoryClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default InventoryClient;
