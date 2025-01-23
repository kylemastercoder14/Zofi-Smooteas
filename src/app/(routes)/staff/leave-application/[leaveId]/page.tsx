import React from "react";
import db from "@/lib/db";
import LeaveForm from "./leave-form";

const LeaveId = async (props: { params: Promise<{ leaveId: string }> }) => {
  const params = await props.params;
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
