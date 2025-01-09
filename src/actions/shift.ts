"use server";

import db from "@/lib/db";
import { formattedDate, formattedTime } from "@/lib/utils";

export const createShift = async (data: {
  name: string;
  day: string;
  startTime: string;
  endTime: string;
  isOff: boolean;
}) => {
  if (!data.name || !data.day) {
    return { error: "Please complete all the required fields." };
  }

  try {
    const existingShift = await db.shift.findFirst({
      where: {
        name: data.name,
        day: data.day,
      },
    });

    if (existingShift) {
      return { error: "This shift already exists." };
    }

    await db.shift.create({
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        isOff: data.isOff,
      },
    });

    const action = `Admin added a new shift at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Shift created successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const updateShift = async (
  id: string,
  data: {
    name: string;
    day: string;
    startTime: string;
    endTime: string;
    isOff: boolean;
  }
) => {
  if (!data.name || !data.day) {
    return { error: "Please complete all the required fields." };
  }

  try {
    const existingShift = await db.shift.findFirst({
      where: {
        name: data.name,
        day: data.day,
      },
    });

    if (existingShift && existingShift.id !== id) {
      return { error: "This shift already exists." };
    }

    await db.shift.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        isOff: data.isOff,
      },
    });

    const action = `Admin updated a shift at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Shift updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const deleteShift = async (id: string) => {
  if (!id) {
    return { error: "Please provide a valid shift ID." };
  }

  try {
    await db.shift.delete({
      where: {
        id,
      },
    });

    const action = `Admin deleted a shift at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Shift deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};
