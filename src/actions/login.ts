/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import db from "@/lib/db";
import { cookies } from "next/headers";
import * as jose from "jose";
import { formattedDate, formattedTime } from "@/lib/utils";
import { useUser } from "../hooks/use-user";

export const login = async (email: string, password: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { error: "No user account found." };
    }

    if (user.password !== password) {
      return { error: "Invalid password" };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(user.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    const action = `${user.name} successfully logged in at ${formattedDate} - ${formattedTime}.`;

    await db.logs.create({
      data: {
        action,
      },
    });

    return { token: jwt, user };
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Failed to login." };
  }
};

export const logout = async () => {
  const { user } = await useUser();
  const action = `${user?.name} successfully logged out at ${formattedDate} - ${formattedTime}.`;

  await db.logs.create({
    data: {
      action,
    },
  });

  (await cookies()).set("Authorization", "", { maxAge: 0, path: "/" });
};
