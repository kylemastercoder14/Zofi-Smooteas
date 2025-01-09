import React from "react";
import db from "@/lib/db";
import LeaveForm from "./leave-form";

const LeaveId = async ({ params }: { params: { leaveId: string } }) => {
  const leave = await db.leave.findUnique({
    where: {
      id: params.leaveId,
    },
  });
  return (
    <div>
      <LeaveForm initialData={leave} />
    </div>
  );
};

export default LeaveId;
