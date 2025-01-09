"use client";

import { Shift } from "@prisma/client";
import React from "react";
import Heading from "@/components/ui/heading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { createShift, updateShift } from "@/actions/shift";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  day: z.string().min(1, { message: "Day is required" }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isOff: z.boolean().optional(),
});

const ShiftForm = ({ initialData }: { initialData: Shift | null }) => {
  const title = initialData ? "Edit Shift" : "Create Shift";
  const description = initialData
    ? "Please complete all the required fields to edit a shift."
    : "Please complete all the required fields to add a new shift";
  const action = initialData ? "Save Changes" : "Add Shift";

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      day: initialData?.day || "",
      startTime: initialData?.startTime || "",
      endTime: initialData?.endTime || "",
      isOff: initialData?.isOff || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (initialData) {
        // Update shift
        const res = await updateShift(initialData.id, {
          ...values,
          startTime: values.startTime || "",
          endTime: values.endTime || "",
          isOff: values.isOff || false,
        });
        if (res.success) {
          toast.success(res.success);
          router.push("/shift-management");
        } else {
          toast.error(res.error);
        }
      } else {
        // Create shift
        const res = await createShift({
          ...values,
          startTime: values.startTime || "",
          endTime: values.endTime || "",
          isOff: values.isOff || false,
        });
        if (res.success) {
          toast.success(res.success);
          router.push("/shift-management");
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
              name="name"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Shift</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name e.g. Morning" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="day"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isOff"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day Off</FormLabel>
                  <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none ">
                      <FormDescription>
                        Check the box if you want to make this day off
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!form.watch("isOff") && (
              <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <FormField
                  control={form.control}
                  name="startTime"
                  disabled={loading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Enter start time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  disabled={loading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Enter end time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <Button disabled={loading} className="mt-5" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShiftForm;
