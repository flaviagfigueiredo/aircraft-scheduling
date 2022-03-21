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
    const flight = flights.find(f => f.ident === currentFlightId);
    const newRotationArray = [ ...rotation, flight];
    const previousFlight = newRotationArray[previousFlightId - 1] || null;
    const nextFlight = newRotationArray[previousFlightId + 1] || null;

    // First flight in rotation
    if(!previousFlight && !nextFlight) {
        return true;
    }

    // If there's a flight already in the spot behind
    if(previousFlight){
        if( previousFlight.arrivaltime + TURNAROUND_IN_SECONDS <= flight.departuretime && previousFlight.destination === flight.origin) {
            return true;
        }
    }

    if(nextFlight){
        if(flight.departuretime + TURNAROUND_IN_SECONDS <= nextFlight.arrivaltime && flight.destination === nextFlight.origin) {
            return true;
        }
    }

    return false;
};
