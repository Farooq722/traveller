"use server";
import { auth } from "@/auth";
import { prisma } from "../db";
import { redirect } from "next/navigation";

export async function CreateTrip(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Not Authenticated");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("All feilds are required.");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  await prisma.trip.create({
    data: {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      imageUrl: imageUrl,
      userId: session.user?.id,
    },
  });

  redirect("/trips");
}
