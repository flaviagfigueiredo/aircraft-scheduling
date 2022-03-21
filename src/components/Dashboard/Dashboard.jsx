import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AircraftCard } from "../AircraftCard";
import { List } from "../List";
import { move } from "../../utils/helpers/dnd";
import { Timeline } from "../Timeline";
import DroppableList from "../DroppableList/DroppableList";
import { checkIfValid } from "../../utils/helpers/validations";
import { calculateTimePeriods, calculateUsage } from "../../utils/helpers/timeline";
import Card from "../Card/Card";
import useGetFlights from "../../hooks/useGetFlights";
import { Wrapper } from "./styles";
import useGetAircraft from "../../hooks/useGetAircraft";



const Dashboard = () => {
    const [ rotation, setRotation ] = useState([]);
    const [ availableFlights, setAvailableFlights ] = useState([]);
    const [ aircrafts, setAircrafts ] = useState([]);
    const periods = useMemo(() => calculateTimePeriods(rotation), [rotation]);
    const usage = useMemo(() => calculateUsage(periods), [periods]);

    const { response: flights, error: isErrorFlightFetch, loading: isLoadingFlightFetch } = useGetFlights();
    const { response: fetchedAircrafts, error: isErrorAircraftFetch, loading: isLoadingAircraftFetch } = useGetAircraft();

    console.log(aircrafts);

    useEffect(() => {
        if(flights) {
            setAvailableFlights(flights.data);
        }
    }, [flights]);

    useEffect(() => {
        if(fetchedAircrafts) {
            setAircrafts(fetchedAircrafts.data);
        }
    }, [fetchedAircrafts]);

    const removeFromRotation = useCallback((id) => {
        const flight = rotation.find(f => f.id === id);
        setRotation(rotation.filter(f => f !== flight));
        setAvailableFlights(prev => [ flight, ...prev ]);

    }, [rotation])

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination || source.droppableId === "rotation" || destination.droppableId === "droppable" ) {
            return;
        }

        if (destination.droppableId === "rotation") {

            // Departure Airport of the flight must be the same of the previous flight
            if(checkIfValid(flights.data, rotation, draggableId, destination.index)) {
                const r = move(availableFlights, rotation, source, destination);
                setRotation(r.rotation);
                setAvailableFlights(r.droppable);
            }
            
            return;
        }
    };

    if(isLoadingFlightFetch && isLoadingAircraftFetch) {
        return (<div>IsLoading</div>);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>

                {/* Aircrafts List */}
                <DroppableList title="Aircrafts" >
                    <List>
                        {aircrafts.map((aircraft) => (
                            <AircraftCard key={aircraft.ident} aircraft={aircraft} percentage={usage} />
                        ))}
                    </List>
                </DroppableList>

                {/* Rotation */}
                <DroppableList title="Rotation" >
                    <Droppable droppableId="rotation">
                            {(provided) => (
                                <List innerRef={provided.innerRef}>
                                    {rotation.map((flight, index) => (
                                        <Card
                                        key={flight.id}
                                        index={index}
                                        flight={flight}
                                        onRemove={removeFromRotation}/>)
                                    )}
                                {provided.placeholder}
                            </List>)}
                    </Droppable>
                </DroppableList>
                  

                {/* Flight List */}
                <DroppableList title="Available Flights" >
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <List innerRef={provided.innerRef}>
                                {availableFlights.map((flight, index) => (
                                    <Card
                                        key={flight.id}
                                        index={index}
                                        flight={flight}
                                    />)
                                )}
                                {provided.placeholder}
                            </List>)}
                    </Droppable>
                </DroppableList>

            </Wrapper>
            <Timeline periods={periods}/>
        </DragDropContext>);
}

export default Dashboard;
