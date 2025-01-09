import { Leave, User } from "@prisma/client";
import React from "react";
import Actions from "./actions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface LeaveClientProps extends Leave {
  user: User;
}

const LeaveClient = ({ leave }: { leave: LeaveClientProps[] }) => {
  return (
    <div className="mt-5 grid md:grid-cols-5 grid-cols-1 gap-4">
      {leave.map((item) => {
        return (
          <div key={item.id} className="p-3 border shadow-md rounded-md">
            <Actions id={item.id} />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.user.name}</h3>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </div>
              <Badge
                variant={
                  item.status === "Pending"
                    ? "warning"
                    : item.status === "Approve"
                    ? "success"
                    : "destructive"
                }
              >
                {item.status === "Pending"
                    ? "Pending"
                    : item.status === "Approve"
                    ? "Approved"
                    : "Rejected"}
              </Badge>
            </div>
            <div className="border-t-4 mt-5 border-primary rounded-md bg-zinc-100 p-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">From: </p>
                  <p className="text-sm">
                    {format(item.startDate, "MMMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">To: </p>
                  <p className="text-sm">
                    {format(item.endDate, "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold mt-3">
              Reason:{" "}
              <span className="text-muted-foreground">{item.reason}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveClient;
