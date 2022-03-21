import useAxios from "./useAxios";

const url = "https://infinite-dawn-93085.herokuapp.com/aircrafts";

const useGetAircraft = () => {
    return useAxios(url);
};

export default useGetAircraft;