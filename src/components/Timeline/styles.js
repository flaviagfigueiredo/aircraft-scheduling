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

const Onservice = styled.div`
    height: 15px;
    width: ${({ duration }) => `${duration}%` };
    background-color: #9bb659;

    ${globalStyles}
`

const Turnaround = styled.div`
    height: 15px;
    width: ${({ duration }) => `${duration}%` };
    background-color: #9184b8;
     
    ${globalStyles}
`

const Idle = styled.div`
    height: 15px;
    width: ${({ duration }) => `${duration}%` };
    background-color: #bfbfbf;
     
    ${globalStyles}
`
const Bar = styled.div`
    display: flex;
    flex-direction: row;
    width: 400px;
`

const TimelineWrapper = styled.div`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    place-items: center;
`

const Hours = styled.div`
    place-content: space-between;
    width: 400px;
    font-size: 10px;
    display: flex
`


export { Onservice, Turnaround, Hours, Idle, Bar, TimelineWrapper};