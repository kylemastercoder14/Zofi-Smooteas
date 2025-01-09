import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import AttendanceClient from "./_components/client";
import { AttendanceReportColumn } from "./_components/column";
import { format } from "date-fns";

const AttendanceReport = async () => {
  const attendance = await db.attendance.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      shift: true,
    },
  });

  const formattedData: AttendanceReportColumn[] = attendance.map((item) => {
    return {
      id: item.id,
      name: item.user.name || "N/A",
      timeIn: item?.timeIn ? format(item.timeIn, "hh:mm a") : "N/A",
      timeOut: item?.timeOut ? format(item.timeOut, "hh:mm a") : "N/A",
      shift: item.shift.day + " (" + item.shift.name + ")",
      status: item.status,
    };
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Attendance Report"
          description="View the attendance report of your staff members, including their check-in and check-out times. Ensure your team is always on time."
        />
      </div>
      <AttendanceClient data={formattedData} />
    </div>
  );
};

export default AttendanceReport;
