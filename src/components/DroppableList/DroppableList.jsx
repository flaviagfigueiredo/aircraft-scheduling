import React, { Children, useMemo } from "react";
import { Droppable } from "react-beautiful-dnd";
import Timeline from "../Timeline/Timeline";
import { calculateTimePeriods } from "../../utils/helpers/timeline";
import { List } from "../List";
import RotationCard from "../RotationCard/RotationCard";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px 
`;

const Header = styled.h2`
    padding-bottom: 5px;
`;

const RotationList = ({ title, children }) => {    
    return (
    <Wrapper>
        <Header>{title}</Header>
        {children}
    </Wrapper>);
}

export default RotationList;