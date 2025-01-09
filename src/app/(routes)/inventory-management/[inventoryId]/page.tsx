import React from "react";
import db from "@/lib/db";
import InventoryForm from "./inventory-form";

const InventoryId = async ({ params }: { params: { inventoryId: string } }) => {
  const inventory = await db.inventory.findUnique({
    where: {
      id: params.inventoryId,
    },
  });
  return (
    <div>
      <InventoryForm initialData={inventory} />
    </div>
  );
};

export default InventoryId;
