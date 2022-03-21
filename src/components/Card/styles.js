import styled from "styled-components";

const Header = styled.div`
    display: flex;
`;

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
gmgmgsada
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
    top: 5px;
    margin-top: -14px;
    left: 50%;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    border: 0;
    height: 20px;
    width: 20px;
    cursor: initial;
    background-color: white;
    border-radius: 50%;
`;

export {
    Header,
    Content,
    InfoWrapper,
    Button
};
