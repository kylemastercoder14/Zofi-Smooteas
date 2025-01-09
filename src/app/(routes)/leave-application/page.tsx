import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import LeaveClient from "./_components/client";

const LeaveApplication = async () => {
  const leave = await db.leave.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    }
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Leave Application"
          description="Easily manage your leave applications, including updating leave status. Ensure your leave information is always up to date."
        />
      </div>
      <LeaveClient leave={leave} />
    </div>
  );
};

export default LeaveApplication;
