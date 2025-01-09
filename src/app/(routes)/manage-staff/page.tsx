import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StaffClient from './_components/client';

const ManageStaff = async () => {
  const staff = await db.user.findMany({
    where: {
      role: "Staff",
    },
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Manage Staff"
          description="Easily manage your staff members, including adding, updating, and removing employee details. Ensure your team information is always up to date."
        />
        <Link href="/manage-staff/new">
          <Button size="sm">+ Add Staff</Button>
        </Link>
      </div>
      <StaffClient staff={staff} />
    </div>
  );
};

export default ManageStaff;
