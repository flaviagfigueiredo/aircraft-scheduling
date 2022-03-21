import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Timeline from "../Timeline/Timeline";
import AircraftList from "../AircraftList/AircraftList";
import useGetFlights from "../../hooks/useGetFlights";
import useGetAircraft from "../../hooks/useGetAircraft";
import DroppableList from "../DroppableList/DroppableList";
import { Wrapper, Loader } from "./styles";
import { move, reorder } from "../../utils/helpers/dnd";
import { checkIfValid } from "../../utils/helpers/validations";
import { calculateTimePeriods, calculateUsage } from "../../utils/helpers/timeline";
import Spinner from "../Icon/Spinner";

const Dashboard = () => {
    const [ rotation, setRotation ] = useState([]);
    const [ availableFlights, setAvailableFlights ] = useState([]);
    const [ aircrafts, setAircrafts ] = useState([]);
    const periods = useMemo(() => calculateTimePeriods(rotation), [rotation]);
    const usage = useMemo(() => calculateUsage(periods), [periods]);

    const { response: flights, loading: isLoadingFlightFetch } = useGetFlights();
    const { response: fetchedAircrafts, loading: isLoadingAircraftFetch } = useGetAircraft();

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

        // Invalid results
        if (!destination || source.droppableId === "rotation") {
            return;
        }

        // Drop from the list that you dragged
        // ("droppable" or "Available Flights" is the only draggable list)
        if (destination.droppableId === "droppable" ) {
            reorder(result, setAvailableFlights);
        }

        if (destination.droppableId === "rotation") {
            if(checkIfValid(flights.data, rotation, draggableId, destination.index)) {
                const r = move(availableFlights, rotation, source, destination);
                setRotation(r.rotation);
                setAvailableFlights(r.droppable);
            }
        }
    };

    if(isLoadingFlightFetch || isLoadingAircraftFetch) {
        return (<Loader><Spinner /></Loader>);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <AircraftList aircrafts={aircrafts} usage={usage}/>
                <DroppableList id={"rotation"} title="Rotation" data={rotation || []} onRemove={removeFromRotation}/>
                <DroppableList id={"droppable"} title="Available Flights" data={availableFlights || []}/>
            </Wrapper>
            <Timeline periods={periods}/>
        </DragDropContext>);
}

export default Dashboard;
