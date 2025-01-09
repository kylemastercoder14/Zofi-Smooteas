import { Shift, User } from "@prisma/client";
import React from "react";
import Actions from "./actions";
import { CheckCircle } from "lucide-react";
import { calculateHours, formatTime } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from '@/components/ui/badge';

interface ShiftClientProps extends Shift {
  user: User[];
}

const ShiftClient = ({ shifts }: { shifts: ShiftClientProps[] }) => {
  return (
    <div className="mt-5 grid md:grid-cols-5 grid-cols-1 gap-4">
      {shifts.map((shift) => {
        const hours =
          shift.startTime && shift.endTime
            ? calculateHours(shift.startTime, shift.endTime)
            : 0;

        return (
          <div key={shift.id} className="p-3 border shadow-md rounded-md">
            <Actions id={shift.id} />
            <div>
              <h3 className="text-xl font-semibold">{shift.name}</h3>
              <p className="text-sm text-muted-foreground">{shift.day}</p>
            </div>
            <div className="border-t-4 mt-5 border-primary rounded-md bg-zinc-100 p-3">
              <p className="text-muted-foreground font-semibold text-sm">
                WORKING HOURS
              </p>
              <p className="mt-2">
                {shift.startTime && shift.endTime
                  ? `${formatTime(shift.startTime)} TO ${formatTime(
                      shift.endTime
                    )}`
                  : <Badge>Day Off</Badge>}
              </p>
              <p className="text-muted-foreground font-semibold text-sm mt-3 mb-2">
                HOURS
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-700" />
                <p>{hours.toFixed(1)} hour/s</p>
              </div>
            </div>
            <Separator className="my-5" />
            <p className="text-sm font-semibold">
              # of Employees: {shift.user.length}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ShiftClient;
