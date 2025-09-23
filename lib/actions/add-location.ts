"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not Authenticated");
  }

  const address = formData.get("address")?.toString();
  if (!address) {
    throw new Error("Address Missing");
  }

  const count = await prisma?.location.count({
    where: {
      tripId,
    },
  });

  await prisma?.location.create({
    data: {
      locationTitle: address,
      lat: 19.076,
      lng: 72.8777,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}
