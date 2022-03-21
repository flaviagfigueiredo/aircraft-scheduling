import React, { useState, useMemo, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AircraftCard } from "../AircraftCard";
import Flight from "../Flight/Flight";
import { List } from "../List";
import { move } from "../../utils/helpers/dnd";
import { Timeline } from "../Timeline";
import DroppableList from "../DroppableList/DroppableList";
import { checkIfValid } from "../../utils/helpers/validations";
import { aircrafts, flights } from "../../utils/data";
import { calculateTimePeriods, calculateUsage } from "../../utils/helpers/timeline";
import styled from "styled-components";
import Card from "../Card/Card";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

const Header = styled.h2`
    padding-bottom: 5px;
`;

function Dashboard() {
    const [ rotation, setRotation ] = useState([]);
    const [ availableFlights, setAvailableFlights ] = useState(flights);

    const periods = useMemo(() => calculateTimePeriods(rotation), [rotation]);
    const usage = useMemo(() => calculateUsage(periods), [periods]);

    const removeFromRotation = useCallback((ident) => {
        const flight = rotation.find(f => f.ident === ident);
        setRotation(rotation.filter(f => f !== flight));
        setAvailableFlights(prev => [ flight, ...prev ]);

    }, [rotation])

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination || source.droppableId == "rotation" || destination.droppableId === "droppable" ) {
            return;
        }

        if (destination.droppableId == "rotation") {

            // Departure Airport of the flight must be the same of the previous flight
            if(checkIfValid(flights, rotation, draggableId, destination.index)) {
                const r = move(availableFlights, rotation, source, destination);
                setRotation(r.rotation);
                setAvailableFlights(r.droppable);
            }
            
            return;
        }
    };

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
                                        key={flight.ident}
                                        index={index}
                                        flight={flight}
                                        onRemove={removeFromRotation}/>)
                                    )}
                                {provided.placeholder}
                            </List>)}
                    </Droppable>
                    <Timeline periods={periods}/>
                </DroppableList>

                {/* Flight List */}
                <DroppableList title="Available Flights" >
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <List innerRef={provided.innerRef}>
                                {availableFlights.map((flight, index) => (
                                    <Card
                                        key={flight.ident}
                                        index={index}
                                        flight={flight}
                                    />)
                                )}
                                {provided.placeholder}
                            </List>)}
                    </Droppable>
                </DroppableList>
            </Wrapper>
        </DragDropContext>);
}

export default Dashboard;
