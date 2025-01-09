/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/actions/login";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Logged in successfully. Redirecting to dashboard...");
        if (res.user?.role === "Admin") {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.href = "/staff/dashboard";
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden h-[50vh]">
        <CardContent className="grid p-0 md:grid-cols-2 h-full">
          <form
            onSubmit={onSubmit}
            className="p-6 flex justify-center flex-col md:p-8"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/logo.png"
                  alt="Image"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="space-y-1 relative">
                <Label>Password</Label>
                <Input
                  placeholder="--------"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  onClick={handleShowPassword}
                  type="button"
                  className="absolute top-6 right-1 hover:bg-transparent text-muted-foreground"
                  size="icon"
                  variant="ghost"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/bg.jpeg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
