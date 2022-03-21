import { TURNAROUND_IN_SECONDS } from "../constants";

/**
 *
 *
 * @param {*} flights
 * @param {*} currentFlightId
 * @param {*} previousFlightId
 * @return {*} 
 */
export const checkIfValid = (flights, rotation, currentFlightId, previousFlightId) => {
    const flight = flights.find(f => f.id === currentFlightId);
    const newRotationArray = [ ...rotation, flight];
    const previousFlight = newRotationArray[previousFlightId - 1] || null;
    const nextFlight = newRotationArray[previousFlightId + 1] || null;

    // First flight in rotation
    if(!previousFlight && !nextFlight) {
        return true;
    }

    // If there's a flight already in the spot behind
    if(previousFlight){
        console.log("previousFlight", previousFlight);
        console.log("flight", flight);
        console.log("previousFlight departure", previousFlight.readable_departure, previousFlight.departuretime + TURNAROUND_IN_SECONDS);
        console.log("flight arrival", flight.readable_arrival, flight.arrivaltime);
        console.log(previousFlight.destination, flight.origin);

        if( previousFlight.arrivaltime + TURNAROUND_IN_SECONDS <= flight.departuretime && previousFlight.destination === flight.origin) {
            return true;
        }
    }

    if(nextFlight){
        console.log("nextFlight", nextFlight);
        console.log("flight", flight);
        console.log(flight.departuretime + TURNAROUND_IN_SECONDS, nextFlight.arrivaltime );
        console.log(flight.destination, nextFlight.origin);

        if(flight.departuretime + TURNAROUND_IN_SECONDS <= nextFlight.arrivaltime && flight.destination === nextFlight.origin) {
            return true;
        }
    }

    return false;
};
