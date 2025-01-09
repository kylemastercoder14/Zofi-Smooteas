"use server";

import db from "@/lib/db";
import { formattedDate, formattedTime } from "@/lib/utils";

export const createStaff = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  shift?: string;
}) => {
  if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    return { error: "Please complete all the required fields." };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        shiftId: data.shift,
      },
    });

    const action = `Admin added a new staff named ${data.name} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Staff created successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const updateStaff = async (
  id: string,
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    shift?: string;
  }
) => {
  if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    return { error: "Please complete all the required fields." };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        shiftId: data.shift,
      },
    });

    const action = `Admin updated a staff named ${data.name} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Staff updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const deleteStaff = async (id: string) => {
  if (!id) {
    return { error: "Please provide a valid staff ID." };
  }

  try {
    const user = await db.user.delete({
      where: {
        id,
      },
    });

    const action = `Admin deleted a staff named ${user.name} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Staff deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};
