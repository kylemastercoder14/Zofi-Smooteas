"use client";

import { Shift, User } from "@prisma/client";
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
import { Eye, EyeClosed } from "lucide-react";
import { createStaff, updateStaff } from "@/actions/staff";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatTime } from "@/lib/utils";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    shift: z.string().optional(),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email address is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const StaffForm = ({
  initialData,
  shift,
}: {
  initialData: User | null;
  shift: Shift[];
}) => {
  const title = initialData ? "Edit Staff" : "Create Staff";
  const description = initialData
    ? "Please complete all the required fields to edit a staff."
    : "Please complete all the required fields to add a new staff";
  const action = initialData ? "Save Changes" : "Add Staff";

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: initialData?.password || "",
      confirmPassword: initialData?.password || "",
      shift: initialData?.shiftId || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (initialData) {
        // Update staff
        const res = await updateStaff(initialData.id, values);
        if (res.success) {
          toast.success(res.success);
          router.push("/manage-staff");
        } else {
          toast.error(res.error);
        }
      } else {
        // Create staff
        const res = await createStaff(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/manage-staff");
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
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="password"
                disabled={loading}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...field}
                        />
                        {!initialData && (
                          <Button
                            onClick={handleShowPassword}
                            type="button"
                            className="absolute top-6 right-1 hover:bg-transparent text-muted-foreground"
                            size="icon"
                            variant="ghost"
                          >
                            {showPassword ? <Eye /> : <EyeClosed />}
                          </Button>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                disabled={loading}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type={showPassword1 ? "text" : "password"}
                          placeholder="Enter confirm password"
                          {...field}
                        />
                        {!initialData && (
                          <Button
                            onClick={handleShowPassword1}
                            type="button"
                            className="absolute top-6 right-1 hover:bg-transparent text-muted-foreground"
                            size="icon"
                            variant="ghost"
                          >
                            {showPassword1 ? <Eye /> : <EyeClosed />}
                          </Button>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="shift"
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
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shift.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} - {item.day} ({item.endTime && item.startTime ? `${formatTime(item.startTime)} - ${formatTime(item.endTime)}` : "Day Off"})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default StaffForm;
