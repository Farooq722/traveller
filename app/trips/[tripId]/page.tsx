"use server";

import { auth } from "@/auth";
import TripDetailsClient from "@/components/trip-details";

export default async function TripDetails({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId }  = await params;

  const session = await auth();
  if (!session || !session.user) {
    return <div>Please Sign In.</div>;
  }

  const tripp = await prisma?.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user?.id
    },
    include: {
      locations: true
    }
  });

  if(!tripp) {
    return <div className="text-xl font-semibold text-center mx-auto text-black">Trip not found</div>
  }

  return <TripDetailsClient trip={tripp} />
}