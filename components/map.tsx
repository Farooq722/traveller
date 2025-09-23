
interface TripLocation {
    tripId: string;
    id: string;
    locationTitle: string;
    lat: number;
    lng: number;
    order: number;
    createdAt: Date;
}

interface MapProps {
    itineraries: TripLocation[];
}

export default function Map({ itineraries }: MapProps ) {

    return <div>
        Here map comes which i dont have
    </div>
}