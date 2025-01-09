"use server";

import db from "@/lib/db";
import { formattedDate, formattedTime } from "@/lib/utils";

export const createInventory = async (data: {
  name: string;
  category: string;
  quantity: number;
}) => {
  if (!data.name || !data.category) {
    return { error: "Please complete all the required fields." };
  }

  try {
    const existingInventory = await db.inventory.findFirst({
      where: {
        name: data.name,
        category: data.category,
      },
    });

    if (existingInventory) {
      return { error: "This inventory already exists." };
    }

    await db.inventory.create({
      data: {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
      },
    });

    const action = `Admin added a new inventory named ${data.name} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Inventory created successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const updateInventory = async (
  id: string,
  data: {
    name: string;
    category: string;
    quantity: number;
  }
) => {
  if (!data.name || !data.category) {
    return { error: "Please complete all the required fields." };
  }

  try {
    const existingInventory = await db.inventory.findFirst({
      where: {
        name: data.name,
        category: data.category,
      },
    });

    if (existingInventory && existingInventory.id !== id) {
      return { error: "This inventory already exists." };
    }

    await db.inventory.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
      },
    });

    const action = `Admin updated an inventory named ${data.name} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Inventory updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const deleteInventory = async (id: string) => {
  if (!id) {
    return { error: "Please provide a valid inventory ID." };
  }

  try {
    const inventory = await db.inventory.delete({
      where: {
        id,
      },
    });

    const action = `Admin deleted an inventory named ${inventory.name} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Inventory deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};
