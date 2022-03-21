import useAxios from "./useAxios";

const url = "https://infinite-dawn-93085.herokuapp.com/flights";

const useGetFlights = () => {
    return  useAxios(url);
};

export default useGetFlights;