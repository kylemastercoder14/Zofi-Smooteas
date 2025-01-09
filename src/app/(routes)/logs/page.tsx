import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import { LogsColumn } from "./_components/column";
import { format } from "date-fns";
import LogsClient from "./_components/client";

const Logs = async () => {
  const datas = await db.logs.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedData: LogsColumn[] = datas.map((item) => {
    const position = datas.indexOf(item) + 1;
    return {
      id: item.id,
      position: position.toString(),
      action: item.action,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Logs"
          description="This is the logs page where you can see all the logs of the system."
        />
      </div>
      <LogsClient data={formattedData} />
    </div>
  );
};

export default Logs;
