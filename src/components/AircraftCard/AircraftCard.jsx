import React from "react";
import { Card } from "./styles";

const AircraftCard = ({ aircraft, percentage = 0}) => {

    const roundedPercentage = Math.round(percentage * 10) / 10;

    return (
        <Card>
            <h3>{aircraft.ident}</h3>
            <br/>
            <h5>{`${roundedPercentage}%`}</h5>
        </Card>
    );
};

export default AircraftCard;
