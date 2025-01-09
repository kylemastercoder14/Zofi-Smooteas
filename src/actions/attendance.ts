/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const userTimeIn = async (
  timeIn: string,
  dateNow: string,
  shiftId: string
) => {
  const { user } = await useUser();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    const shift = await db.shift.findUnique({
      where: {
        id: shiftId,
      },
    });

    const shiftStartTime = new Date(`${dateNow}T${shift?.startTime}`);
    const userTimeInTime = new Date(`${dateNow}T${timeIn}`);
    let status = "On time";

    if (userTimeInTime > shiftStartTime) {
      status = "Late";
    } else if (userTimeInTime < shiftStartTime) {
      status = "Early In";
    } else if (userTimeInTime === shiftStartTime) {
      status = "On time";
    } else if (userTimeInTime === null) {
      status = "Absent";
    }

    await db.attendance.create({
      data: {
        userId: user.id,
        date: dateNow,
        shiftId: shiftId,
        timeIn: timeIn,
        status: status,
      },
    });
  } catch (error) {
    console.error("Failed to record time in:", error);
    return { error: "Failed to record time in" };
  }
};

export const userTimeOut = async (
  timeOut: string,
  dateNow: string,
  shiftId: string,
  attendanceId: string
) => {
  const { user } = await useUser();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    await db.attendance.update({
      data: {
        timeOut: timeOut,
      },
      where: {
        id: attendanceId,
      },
    });
  } catch (error) {
    console.error("Failed to record time out:", error);
    return { error: "Failed to record time out" };
  }
};
