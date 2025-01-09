"use client";

import { Inventory } from "@prisma/client";
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
  createInventory,
  updateInventory,
} from "@/actions/inventory";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  quantity: z.coerce.number().min(0, { message: "Quantity is required" }),
});

const InventoryForm = ({ initialData }: { initialData: Inventory | null }) => {
  const title = initialData ? "Edit Inventory" : "Create Inventory";
  const description = initialData
    ? "Please complete all the required fields to edit a inventory."
    : "Please complete all the required fields to add a new inventory";
  const action = initialData ? "Save Changes" : "Add Inventory";

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      quantity: initialData?.quantity || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (initialData) {
        // Update inventory
        const res = await updateInventory(initialData.id, values);
        if (res.success) {
          toast.success(res.success);
          router.push("/inventory-management");
        } else {
          toast.error(res.error);
        }
      } else {
        // Create inventory
        const res = await createInventory(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/inventory-management");
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name e.g. Fresh Milk, Cups, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category e.g. Beverages, Ingredients, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter stock quantity"
                      {...field}
                    />
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

export default InventoryForm;
