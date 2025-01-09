import React from "react";
import db from "@/lib/db";
import StaffForm from "./staff-form";

const StaffId = async ({ params }: { params: { staffId: string } }) => {
  const staff = await db.user.findUnique({
    where: {
      id: params.staffId,
    },
    include: {
      shift: true,
    }
  });

  const shift = await db.shift.findMany({
    where: {
      NOT: {
        isOff: true,
      }
    }
  });
  return (
    <div>
      <StaffForm shift={shift} initialData={staff} />
    </div>
  );
};

export default StaffId;
