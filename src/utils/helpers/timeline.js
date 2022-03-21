import { Status, DAY_IN_SECONDS, TURNAROUND_IN_SECONDS} from "../constants";

/**
 *
 * Calculate aircraft usage in the day (in percentage)
 *
 * @param {*} timeline
 * @return {*} Usage in percentage
 */
const calculateUsage = (timeline) => {
    const onServicePeriods = timeline.filter((period) => period.type === Status.Onservice);

    const sum = onServicePeriods.reduce(
        (acc, currentValue) => acc + currentValue.duration,
        0
      );

    return (sum / DAY_IN_SECONDS) * 100;
}

/**
 *
 * Generate array of periods of time related to the aircraft status
 *  
 * @param {*} rotation
 */
const calculateTimePeriods = (rotation) => (
    rotation.reduce((acc, value, index) => {
        // From midnight until the first flight
       if(index === 0) {
           acc.push({ type: Status.Idle, duration: value.departuretime});
       }

        // Normal flight duration
       acc.push({ type: Status.Onservice, duration: value.arrivaltime - value.departuretime});

       if(rotation[index + 1]){
           // Turnaround Period
           acc.push({ type: Status.Turnaround, duration: TURNAROUND_IN_SECONDS});
           // Idle time until next flight
           acc.push({ type: Status.Idle, duration:  rotation[index + 1].departuretime - value.arrivaltime + TURNAROUND_IN_SECONDS});
       } else {
           // From the last flight until the end of the day
           acc.push({ type: Status.Idle, duration:  DAY_IN_SECONDS - value.arrivaltime});
       }

       return acc;
   },  [])
);

export {
    calculateUsage,
    calculateTimePeriods
};