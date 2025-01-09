import { User } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Actions from "./actions";

const StaffClient = ({ staff }: { staff: User[] }) => {
  return (
    <div className="mt-5 grid md:grid-cols-5 grid-cols-1 gap-4">
      {staff.map((user) => {
        // Generate a random avatar URL using a service like DiceBear
        const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.name}`;

        return (
          <div key={user.id} className="p-3 border shadow-md rounded-md">
            <Actions id={user.id} />
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <Avatar className="w-[8rem] h-[8rem]">
                  <AvatarImage src={avatarUrl} alt={user.name || "User"} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StaffClient;
