import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Plane from "../Icon/Plane";
import Cross from "../Icon/Cross";
import { Title, Place, Box, Header, Content, InfoWrapper, Button } from "./styles"


const Card = ({ flight, index, isDragDisabled = false, onRemove = undefined }) => {
    const { id, readable_departure, origin, readable_arrival, destination } = flight;
    
    return (
        <Draggable isDragDisabled={isDragDisabled} draggableId={id} index={index}>
            {(provided, snapshot) => {
                return (
                    <Content
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...snapshot}>
                        {onRemove && <Button onClick={() => onRemove(id)}> <Cross /></Button>}
                        <Header>
                            <Plane />
                            <Title >{id}</Title>
                        </Header>
                        <InfoWrapper>
                            <Box>
                                <p>{readable_departure}</p>
                                <Place>{origin}</Place>
                            </Box>
                            <Box>
                                <p>{readable_arrival}</p>
                                <Place>{destination}</Place>
                            </Box>
                        </InfoWrapper>
                    </Content>
                );
            }}
        </Draggable>);
};

export default Card;
