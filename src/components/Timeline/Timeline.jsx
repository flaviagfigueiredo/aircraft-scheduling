import React, {useEffect, useState} from "react";
import Tooltip from "../Tooltip/Tooltip";
import styled, {css} from "styled-components";

const globalStyles = css`
&:first-child {
    border-radius: 10px 0px 0px 10px;
}

&:last-child {
    border-radius: 0px 10px 10px 0px;
}

&:only-child {
    border-radius: 10px 10px 10px 10px;
}
`

const Busy = styled.div`
    height: 15px;
    width: ${({ duration }) => `${duration}px` };
    background-color: red;

    ${globalStyles}
`

const Turnaround = styled.div`
    height: 15px;
    width: ${({ duration }) => `${duration}px` };
    background-color: purple;
     
    ${globalStyles}
`

const Free = styled.div`
    height: 15px;
    width: ${({ duration }) => `${duration}px` };
    background-color: green;
     
    ${globalStyles}
`
const Bar = styled.div`
    display: flex;
    flex-direction: row;
    width: 200px;
`

// 1440 min -> 24 hours
const Timeline = (periods = []) => {
    const [ timeline, setTimeline ] = useState([]);

    useEffect(() => {
        setTimeline(periods.periods);
    }, [periods])

    return (
    <div>
        <div style={{ placeContent: "space-between", fontSize: "10px", display: "flex" }}>
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
        </div>
        <Bar>
            {timeline.length !== 0 ? 
                timeline.map((segment, index) => {
                    const duration = (segment.duration * 2 )/ 864;
                
                    if (segment.type === "Busy") return (<Busy key={index} duration={duration}/>);
                    if (segment.type === "Turnaround") return (<Turnaround  key={index}  duration={duration}/>);
                    if (segment.type === "Free") return (<Free  key={index}  duration={duration}/>);
                }) : (<Free duration={200}></Free>)
            }
        </Bar>
    </div>
    )
}

export default Timeline;