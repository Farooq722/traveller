import { auth } from "@/auth";
import TripDetailsClient from "@/components/trip-details";

export default async function TripDetails({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId }  = await params;
  console.log("param: ", tripId)

  const session = await auth();
  if (!session || !session.user) {
    return <div>Please Sign In.</div>;
  }

  const trip = await prisma?.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user?.id
    },
  });

  if(!trip) {
    return <div className="text-xl font-semibold text-center mx-auto text-black">Trip not found</div>
  }

  return <TripDetailsClient trip={trip} />
}
/* debug why trip id is not coming in this window */