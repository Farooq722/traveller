"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Calendar, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import Map from "./map";

type TripWithLocations = Prisma.TripGetPayload<{
  include: { locations: true };
}>;

interface TripDetailsClient {
  trip: TripWithLocations;
}

export default function TripDetailsClient({ trip }: TripDetailsClient) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96  overflow-hidden rounded-xl shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}

      <div className="bg-white p-6 shadow rounded-lg flex  justify-between items-start md:items-center">
        <div className="">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>
          <div className="flex items-center text-gray-500 mt-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} -{" "}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-2">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button className=" cursor-pointer">
              <Plus />
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow p-6 rounded-lg space-x-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 ">
            <TabsTrigger value="overview" className="text-lg cursor-pointer">
              {" "}
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-lg cursor-pointer">
              {" "}
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg cursor-pointer">
              {" "}
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4"> Trip Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700"> Dates</p>
                      <p className="text-sm text-gray-500">
                        {trip.startDate.toLocaleDateString()} -{" "}
                        {trip.endDate.toLocaleDateString()}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} days(s)`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-gray-600" />
                    <div>
                      <p>Destination</p>
                      {trip.locations.length}{" "}
                      {trip.locations.length === 1 ? "location" : "locations"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-72  rounded-lg overflow-hidden shadow">
                <Map itineraries={trip.locations} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
