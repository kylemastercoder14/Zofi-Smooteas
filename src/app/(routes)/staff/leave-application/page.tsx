/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import LeaveClient from "./_components/client";
import { useUser } from "@/hooks/use-user";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LeaveApplication = async () => {
  const { user } = await useUser();
  const leave = await db.leave.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Leave Application"
          description="Easily manage your leave applications, including requesting of leave. Ensure your leave information is always up to date."
        />
        <Link href="/staff/leave-application/request">
          <Button size="sm"> + Request Leave</Button>
        </Link>
      </div>
      <LeaveClient leave={leave} />
    </div>
  );
};

export default LeaveApplication;
