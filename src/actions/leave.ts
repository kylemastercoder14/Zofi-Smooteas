/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import db from "@/lib/db";
import { formattedDate, formattedTime } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";

export const createLeave = async (data: {
  type: string;
  from: string;
  to: string;
  reason: string;
}) => {
  const { user } = await useUser();

  if (!user) {
    return { error: "You must be logged in to perform this action." };
  }

  if (!data.type || !data.from || !data.to || !data.reason) {
    return { error: "Please complete all the required fields." };
  }

  try {
    await db.leave.create({
      data: {
        type: data.type,
        startDate: data.from,
        endDate: data.to,
        reason: data.reason,
        userId: user.id,
      },
    });

    const action = `${user.name} requested a ${data.type} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Leave requested successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const updateLeave = async (
  id: string,
  data: {
    type: string;
    from: string;
    to: string;
    reason: string;
  }
) => {
  const { user } = await useUser();

  if (!user) {
    return { error: "You must be logged in to perform this action." };
  }

  if (!data.type || !data.from || !data.to || !data.reason) {
    return { error: "Please complete all the required fields." };
  }

  try {
    await db.leave.update({
      where: {
        id,
      },
      data: {
        type: data.type,
        startDate: data.from,
        endDate: data.to,
        reason: data.reason,
      },
    });

    const action = `${user.name} updated a ${data.type} at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Requested leave updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const deleteLeave = async (id: string) => {
  if (!id) {
    return { error: "Please provide a valid leave ID." };
  }

  try {
    const leave = await db.leave.delete({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    const action = `${leave.user.name} deleted a leave at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Leave deleted successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};

export const updateStatus = async (id: string, status: string) => {
  const { user } = await useUser();

  if (!user) {
    return { error: "You must be logged in to perform this action." };
  }

  if (!status) {
    return { error: "Please select a status." };
  }

  try {
    await db.leave.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    const action = `${user.name} updated a leave status at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { success: "Leave status updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again." };
  }
};
