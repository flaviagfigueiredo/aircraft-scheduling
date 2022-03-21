import React from "react";
import AircraftCard from "../AircraftCard/AircraftCard";
import List from "../List/List";
import { Wrapper, Header } from "./styles";

const AircraftList = ({ aircrafts, usage }) => {
    
    return (
        <Wrapper>
            <Header>Aircrafts</Header>
            <List>
                {aircrafts.map((aircraft) => (
                    <AircraftCard key={aircraft.ident} aircraft={aircraft} percentage={usage} />
                ))}
            </List>
        </Wrapper>)
};

export default AircraftList;