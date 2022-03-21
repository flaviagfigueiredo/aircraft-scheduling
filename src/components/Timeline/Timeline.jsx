import React, {useEffect, useState} from "react";
import { Status, DAY_IN_SECONDS } from "../../utils/constants";
import { Onservice, Turnaround, Hours, Idle, Bar, TimelineWrapper} from "./styles";

const Timeline = (periods = []) => {
    const [ timeline, setTimeline ] = useState([]);

    useEffect(() => {
        setTimeline(periods.periods);
    }, [periods])

    return (
    <TimelineWrapper>
        <Hours>
            <span>00:00</span>
            <span>12:00</span>
            <span>24:00</span>
        </Hours>
         <Bar>
            {timeline.length !== 0 ? 
                timeline.map((segment, index) => {
                    const duration = segment.duration * 100 / DAY_IN_SECONDS;

                    return (
                        <React.Fragment key={index}>
                            { segment.type === Status.Onservice && (<Onservice duration={duration}/>)}
                            { segment.type === Status.Turnaround && (<Turnaround duration={duration}/>)}
                            { segment.type === Status.Idle && (<Idle duration={duration}/>)}
                        </React.Fragment>
                    );
                })
                 : (<Idle key={'free'} duration={100}/>)
            }
        </Bar>
    </TimelineWrapper>
    )
}

export default Timeline;