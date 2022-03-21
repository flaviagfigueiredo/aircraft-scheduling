
import React from "react";
import styled from "styled-components";

const ListComponent = styled.div`
    text-align: center;
    padding: 10px;
    width: 100%;
    height: calc(100vh - 150px);
    overflow-y: auto;
    margin: 0 5px 0 5px;
    text-align: -webkit-center;
`;

const List = ({ innerRef, children}) => {
    return (
        <ListComponent ref={innerRef} >
            {children}
        </ListComponent>);
};

export default List;
