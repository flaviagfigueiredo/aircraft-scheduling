import React from "react";
import { Droppable } from "react-beautiful-dnd";
import List from "../List/List";
import Card from "../Card/Card";
import { Wrapper, Header } from "./styles";

const DroppableList = ({id, title, data, onRemove = undefined, isDragDisabled = false}) => {    
    return (
    <Wrapper>
        <Header>{title}</Header>
            <Droppable droppableId={id}>
                {(provided) => (
                    <List innerRef={provided.innerRef}>
                        {data?.map((flight, index) => (
                            <Card
                                key={flight.id}
                                index={index}
                                flight={flight}
                                onRemove={onRemove}
                                isDragDisabled={isDragDisabled}
                            />)
                        )}
                        {provided.placeholder}
                    </List>)}
            </Droppable>
    </Wrapper>);
};

export default DroppableList;