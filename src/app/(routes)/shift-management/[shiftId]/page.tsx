import React from "react";
import db from "@/lib/db";
import ShiftForm from "./shift-form";

const ShiftId = async (props: { params: Promise<{ shiftId: string }> }) => {
  const params = await props.params;
  const shift = await db.shift.findUnique({
    where: {
      id: params.shiftId,
    },
  });
  return (
    <div>
      <ShiftForm initialData={shift} />
    </div>
  );
};

export default ShiftId;
