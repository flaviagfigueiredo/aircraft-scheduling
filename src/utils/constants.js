const Status = {
    Onservice: "onservice",
    Turnaround: "turnaround",
    Idle: "idle"
};

const DAY_IN_SECONDS = 86400;
const TURNAROUND_IN_SECONDS = 20;

const AIRCRAFTS_URL = "https://infinite-dawn-93085.herokuapp.com/aircrafts";
const FLIGHTS_URL = "https://infinite-dawn-93085.herokuapp.com/flights";


export {
    Status,
    DAY_IN_SECONDS,
    TURNAROUND_IN_SECONDS,
    AIRCRAFTS_URL,
    FLIGHTS_URL
};
