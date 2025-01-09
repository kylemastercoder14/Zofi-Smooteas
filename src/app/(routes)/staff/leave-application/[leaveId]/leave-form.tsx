"use client";

import { Leave } from "@prisma/client";
import React from "react";
import Heading from "@/components/ui/heading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createLeave, updateLeave } from "@/actions/leave";

const formSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
  from: z.string().min(1, { message: "From date is required" }),
  to: z.string().min(1, { message: "To date is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
});

const LeaveForm = ({ initialData }: { initialData: Leave | null }) => {
  const title = initialData ? "Edit Leave" : "Create Leave";
  const description = initialData
    ? "Please complete all the required fields to edit a leave."
    : "Please complete all the required fields to add a new leave";
  const action = initialData ? "Save Changes" : "Add Leave";

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: initialData?.type || "",
      from: initialData?.startDate || "",
      to: initialData?.endDate || "",
      reason: initialData?.reason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (initialData) {
        // Update leave
        const res = await updateLeave(initialData.id, values);
        if (res.success) {
          toast.success(res.success);
          router.push("/staff/leave-application");
        } else {
          toast.error(res.error);
        }
      } else {
        // Create leave
        const res = await createLeave(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/staff/leave-application");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading title={title} description={description} />
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Vacation Leave">
                        Vacation Leave
                      </SelectItem>
                      <SelectItem value="Emergency Leave">
                        Emergency Leave
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="from"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter from date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter to date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="reason"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter reason here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="mt-5" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LeaveForm;
