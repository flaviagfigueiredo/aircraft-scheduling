import { TURNAROUND_IN_SECONDS } from "../constants";

/**
 *  Validate if flight can be placed in the desired slot
 *
 * @param {*} flights Array of flights
 * @param {*} currentFlightId Selected flight
 * @param {*} destinationSlotId Id from the flight in the destination slot
 * @return {*} 
 */
export const checkIfValid = (flights, rotation, currentFlightId, destinationSlotId) => {
    const flight = flights.find(f => f.id === currentFlightId);
    // Flight in the previous slot
    const previousFlight = rotation[destinationSlotId - 1] || null;
    // Flight in the next slot
    const nextFlight = rotation[destinationSlotId + 1] || null;

    // First flight in rotation
    if(!previousFlight && !nextFlight) {
        return true;
    }

    // If there's a flight already set in the spot behind
    // the one you want to assign the selected flight
    if(previousFlight){
        if( previousFlight.arrivaltime + TURNAROUND_IN_SECONDS > flight.departuretime || previousFlight.destination !== flight.origin) {
            return false;
        }
    }
    // If there's a flight already set in the spot infront
    // the one you want to assign the selected flight
    if(nextFlight){
        if(flight.departuretime + TURNAROUND_IN_SECONDS > nextFlight.arrivaltime || flight.destination !== nextFlight.origin) {
            return false;
        }
    }

    return true;
};
