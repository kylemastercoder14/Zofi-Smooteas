/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useUser } from "@/hooks/use-user";
import { formattedDate, formattedTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import db from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import AttendanceClientDashboard from "./_components/client";
import AttendanceHistoryClient from "./_components/attendance-history";
import { AttendanceHistoryColumn } from "./_components/column";
import { format } from "date-fns";

const Dashboard = async () => {
  const { user } = await useUser();
  const shift = await db.shift.findUnique({
    where: {
      id: user?.shiftId ?? undefined,
    },
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const attendance = await db.attendance.findFirst({
    where: {
      userId: user?.id, // Ensure it's for the current user
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });

  const attendanceHistory = await db.attendance.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: AttendanceHistoryColumn[] = attendanceHistory.map(
    (item) => {
      const position = attendanceHistory.indexOf(item) + 1;
      return {
        id: item.id,
        position: position.toString(),
        date: format(item.createdAt, "MMMM dd, yyyy"),
        timeIn: item?.timeIn ? format(item.timeIn, "hh:mm a") : "N/A",
        timeOut: item?.timeOut ? format(item.timeOut, "hh:mm a") : "N/A",
        status: item.status,
      };
    }
  );
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Good Day, {user?.name}</h1>
        <Button size="sm">
          <Calendar />
          {formattedDate} - {formattedTime}
        </Button>
      </div>
      <Separator className="mt-3 mb-5" />
      <p className="mb-3 text-2xl font-semibold">Your Attendance Today:</p>
      <AttendanceClientDashboard attendance={attendance} shift={shift} />
      <Separator className="mt-6 mb-5" />
      <p className="mb-3 text-2xl font-semibold">Attendance History:</p>
      <AttendanceHistoryClient data={formattedData} />
    </div>
  );
};

export default Dashboard;
