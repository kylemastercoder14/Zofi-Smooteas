"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Coffee, LogIn, LogOut } from "lucide-react";
import { formatCountdown, formatTime } from "@/lib/utils";
import { Attendance, Shift } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import QRCode from "react-qr-code";
import { userTimeIn, userTimeOut } from "@/actions/attendance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AttendanceClientDashboard = ({
  shift,
  attendance,
}: {
  shift: Shift | null;
  attendance: Attendance | null;
}) => {
  const router = useRouter();
  const [breakTime, setBreakTime] = useState(3600);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [timeInModal, setTimeInModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBreakTime = localStorage.getItem("breakTime");
    const savedIsBreakActive = localStorage.getItem("isBreakActive");

    if (savedBreakTime) {
      setBreakTime(parseInt(savedBreakTime, 10));
    }

    if (savedIsBreakActive === "true") {
      setIsBreakActive(true);
    }
  }, []);

  // Save to localStorage whenever breakTime or isBreakActive changes
  useEffect(() => {
    localStorage.setItem("breakTime", breakTime.toString());
    localStorage.setItem("isBreakActive", isBreakActive.toString());
  }, [breakTime, isBreakActive]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreakActive && breakTime > 0) {
      timer = setInterval(() => {
        setBreakTime((prev) => prev - 1);
      }, 1000);
    }

    // Clear timer when the countdown ends or the component unmounts
    if (breakTime <= 0) {
      setIsBreakActive(false);
    }

    return () => clearInterval(timer);
  }, [isBreakActive, breakTime]);

  const handleBreakTimeOut = () => {
    setIsBreakActive(true);
  };

  const timestamp = new Date().toISOString();

  const handleTimeIn = async () => {
    try {
      const dateNow = new Date();
      await userTimeIn(timestamp, dateNow.toISOString(), shift?.id ?? "");
      toast.success("Successfully timed in.");
      router.refresh();
      setTimeInModal(false);
    } catch (error) {
      console.error("Failed to record time in:", error);
    }
  };

  const handleTimeOut = async () => {
    try {
      const dateNow = new Date();
      await userTimeOut(
        timestamp,
        dateNow.toISOString(),
        shift?.id ?? "",
        attendance?.id ?? ""
      );
      toast.success("Successfully timed out.");
      router.refresh();
      setTimeOutModal(false);
    } catch (error) {
      console.error("Failed to record time out:", error);
    }
  };
  return (
    <>
      <Modal
        title="Time In"
        description="Please scan the QR code to time in."
        isOpen={timeInModal}
        onClose={() => setTimeInModal(false)}
      >
        <div className="flex flex-col items-center">
          <QRCode value={timestamp} />
        </div>
        <Button onClick={handleTimeIn} className="mt-4">
          Confirm Time In
        </Button>
      </Modal>
      <Modal
        title="Time Out"
        description="Please scan the QR code to time out."
        isOpen={timeOutModal}
        onClose={() => setTimeOutModal(false)}
      >
        <div className="flex flex-col items-center">
          <QRCode value={timestamp} />
        </div>
        <Button onClick={handleTimeOut} className="mt-4">
          Confirm Time Out
        </Button>
      </Modal>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="bg-green-600 text-white p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogIn />
              <p>{attendance?.timeIn ? "Timed In" : "Not Timed In"}</p>
            </div>
            <Badge variant="secondary">{attendance?.status}</Badge>
          </div>
          <div>
            <h3 className="text-xl mt-3 font-semibold">{shift?.name}</h3>
            <p className="text-sm text-white">{shift?.day}</p>
          </div>
          <p className="mt-3 font-semibold text-sm">WORKING HOURS</p>
          <p className="mt-1 font-semibold">
            {shift?.startTime && shift?.endTime ? (
              `${formatTime(shift.startTime)} TO ${formatTime(shift.endTime)}`
            ) : (
              <Badge>Day Off</Badge>
            )}
          </p>
          <Button
            onClick={() => setTimeInModal(true)}
            className="mt-3 w-full"
            size="sm"
            disabled={!!attendance?.timeIn}
            variant="secondary"
          >
            {" "}
            <CheckCircle />
            Time In
          </Button>
        </div>
        <div className="bg-primary text-white p-4 rounded-md">
          <div className="flex items-center gap-3">
            <Coffee />
            <p>Lunch Break</p>
          </div>
          <div>
            <h3 className="text-xl mt-3 font-semibold">{shift?.name}</h3>
            <p className="text-sm text-white">{shift?.day}</p>
          </div>
          <p className="mt-3 font-semibold text-sm">GO BACK AFTER</p>
          <p className="mt-1 font-semibold">
            {isBreakActive ? formatCountdown(breakTime) : "1 Hour"}
          </p>
          <Button
            onClick={handleBreakTimeOut}
            disabled={isBreakActive}
            className="mt-3 w-full"
            size="sm"
            variant="secondary"
          >
            {" "}
            <CheckCircle />
            Break Time
          </Button>
        </div>
        <div className="bg-red-600 text-white p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogOut />
              <p>{attendance?.timeOut ? "Timed Out" : "Not Timed Out"}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl mt-3 font-semibold">{shift?.name}</h3>
            <p className="text-sm text-white">{shift?.day}</p>
          </div>
          <p className="mt-3 font-semibold text-sm">WORKING HOURS</p>
          <p className="mt-1 font-semibold">
            {shift?.startTime && shift?.endTime ? (
              `${formatTime(shift.startTime)} TO ${formatTime(shift.endTime)}`
            ) : (
              <Badge>Day Off</Badge>
            )}
          </p>
          <Button
            onClick={() => setTimeOutModal(true)}
            disabled={!!attendance?.timeOut}
            className="mt-3 w-full"
            size="sm"
            variant="secondary"
          >
            {" "}
            <CheckCircle />
            Time Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default AttendanceClientDashboard;
