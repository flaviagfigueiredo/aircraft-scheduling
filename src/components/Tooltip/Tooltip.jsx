import React from "react";
import styled from "styled-components";

const Hover = styled.span`
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    position: absolute;
    z-index: 1;
`

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;

    &:hover ${Hover} {
        visibility: visible;
    }
`

const Tooltip = ({ children }) => {
    return (
        <Wrapper>
            {children}
            <Hover> Hello </Hover>
        </Wrapper>)
}

export default Tooltip;