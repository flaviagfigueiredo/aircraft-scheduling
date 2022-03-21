import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Plane from "../Icon/Plane";
import Cross from "../Icon/Cross";
import { Header, Content, InfoWrapper, Button } from "./styles"


const Card = ({ flight, index, onRemove = undefined }) => {

    return (
        <Draggable draggableId={flight.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <Content
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...snapshot}>
                        {onRemove && <Button onClick={() => onRemove(flight.id)}> <Cross /></Button>}
                        <Header>
                            <Plane />
                            <h3 style={{ padding: "5px"}} >{flight.id}</h3>
                        </Header>
                        <InfoWrapper>
                            <div>
                                <p>{flight.readable_departure}</p>
                                <p>{flight.origin}</p>
                            </div>
                            <div>
                                <p>{flight.readable_arrival}</p>
                                <p>{flight.destination}</p>
                            </div>
                        </InfoWrapper>
                    </Content>
                );
            }}
        </Draggable>);
};

export default Card;
