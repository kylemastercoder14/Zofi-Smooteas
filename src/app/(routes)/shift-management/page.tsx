import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShiftClient from "./_components/client";

const ShiftManagement = async () => {
  const shifts = await db.shift.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      user: true,
    }
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Shift Management"
          description="Easily manage your shifts, including adding, updating, and removing shift details. Ensure your shift information is always up to date."
        />
        <Link href="/shift-management/new">
          <Button size="sm">+ Add Shift</Button>
        </Link>
      </div>
      <ShiftClient shifts={shifts} />
    </div>
  );
};

export default ShiftManagement;
