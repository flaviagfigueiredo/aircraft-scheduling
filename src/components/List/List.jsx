
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
    box-shadow: inset 0 2px 14px 0px rgb(0 0 0 / 14%), inset 0 3px 1px -2px rgb(0 0 0 / 0%);
    border-radius: 5px
`;

const List = ({ innerRef, children}) => {
    return (
        <ListComponent ref={innerRef} >
            {children}
        </ListComponent>);
};



export default List;
