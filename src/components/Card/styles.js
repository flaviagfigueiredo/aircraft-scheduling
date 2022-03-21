import styled from "styled-components";

const Header = styled.div`
    display: flex;
`;

const Title = styled.div`
    padding: 5px
`

const Content = styled.div`
    display: flex;
    flex: 0 1 24%;
    font-size: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100px;
    width: 200px;

    border-radius: 5px;

    box-shadow: 1px 3px 8px 3px rgb(0 0 0 / 20%);

    margin-top: 20px; 
    padding: 6px;

    background-color: ${({isDragging}) => isDragging ? "antiquewhite" : "#8EC5FCfeed"};
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

    `;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.div`
    position: relative;
    top: -15%;
    left: 50%;
    height: 25px;
    width: 25px;
    border: 0;
    cursor: initial;
    background-color: white;
    border-radius: 50%;
`;

const Box = styled.div`
    line-height: 5px;
`

const Place = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 12px;
`

export {
    Title,
    Place,
    Box,
    Header,
    Content,
    InfoWrapper,
    Button
};
