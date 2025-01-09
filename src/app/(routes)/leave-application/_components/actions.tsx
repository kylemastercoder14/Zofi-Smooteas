"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import AlertModal from "@/components/ui/alert-modal";
import { deleteLeave, updateStatus } from "@/actions/leave";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Actions = ({ id }: { id: string }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [statusModal, setStatusModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteLeave(id);
      if (res.success) {
        toast.success(res.success);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setDisabled(true);
    try {
      const res = await updateStatus(id, status);
      if (res.success) {
        toast.success(res.success);
        setStatusModal(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };
  return (
    <>
      <AlertModal
        onConfirm={handleDelete}
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Are you sure you want to delete this data?"
        loading={loading}
      />
      <Modal
        title="Update Leave Status"
        description="You can approve or reject the leave application"
        isOpen={statusModal}
        onClose={() => setStatusModal(false)}
      >
        <Select
          disabled={disabled}
          defaultValue={status}
          onValueChange={(value) => setStatus(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Approve">Approve</SelectItem>
            <SelectItem value="Reject">Reject</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => setStatusModal(false)}
            className="mr-2"
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button disabled={disabled} onClick={handleUpdate} type="submit">
            Save Changes
          </Button>
        </div>
      </Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex ml-auto">
          <Button variant="outline" size="sm">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setStatusModal(true);
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
