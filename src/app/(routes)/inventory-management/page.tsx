import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InventoryManagementColumn } from "./_components/column";
import { format } from "date-fns";
import InventoryClient from "./_components/client";

const InventoryManagement = async () => {
  const inventory = await db.inventory.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedData: InventoryManagementColumn[] = inventory.map((item) => {
    const position = inventory.indexOf(item) + 1;
    const status = item.quantity === 0 ? "Out of Stock" : item.quantity <= 10 ? "Low Stock" : "Available";
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity.toString(),
      position: position.toString(),
      status: status,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Inventory Management"
          description="View the inventory report of your products and supplies, including their stocks and availability. Ensure your inventory is always on time."
        />
        <Link href="/inventory-management/new">
          <Button size="sm">+ Add Product</Button>
        </Link>
      </div>
      <InventoryClient data={formattedData} />
    </div>
  );
};

export default InventoryManagement;
