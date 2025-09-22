"use client";

import { Trip } from "@prisma/client";
import Image from "next/image";

interface TripDetailsClient {
  trip: Trip;
}

export default function TripDetailsClient({ trip }: TripDetailsClient) {
  return (
    <div className="container mx-auto px-4 py-8  space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96  overflow-hidden rounded-xl shadow-lg  relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}
    </div>
  );
}
