import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


const Content = styled.div`
    display: flex;
    flex: 0 1 24%;
    font-size: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100px;
    width: 200px;

    // border: 2px solid black;
    border-radius: 5px;

    box-shadow: 5px 5px 19px #ccc;
   
    margin-top: 10px; 
    padding: 6px;

    background-color: ${({isDragging}) => isDragging ? "red" : "white"};

`;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Flight = ({ flight, isDragDisabled = false, index }) => {
    return (
        <Draggable isDragDisabled={isDragDisabled} draggableId={flight.ident} index={index}>
            {(provided, snapshot) => {
                // console.log(provided.draggableProps.style)
                return (
                    <Content
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...snapshot}>
                        <div>
                            <h3>{flight.ident}</h3>
                        </div>
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
        </Draggable>
    );
};

export default Flight;
