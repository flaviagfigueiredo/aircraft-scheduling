export const calculateUsage = (timeline) => {
    const busyPeriods = timeline.filter((period) => period.type === "Busy");

    const sum = busyPeriods.reduce(
        (acc, currentValue) => acc + currentValue.duration,
        0
      );

    return (sum / 86400) * 100
}

export const calculateTimePeriods = (rotation) => (
    rotation.reduce((acc, value, index) => {
       if(index === 0) {
           acc.push({ type: "Free", duration: value.departuretime});
       }

       acc.push({ type: "Busy", duration: value.arrivaltime - value.departuretime});

       if(rotation[index + 1]){
           acc.push({ type: "Turnaround", duration: 1200});
           acc.push({ type: "Free", duration:  rotation[index + 1].departuretime - value.arrivaltime + 1200});
       } else {
           acc.push({ type: "Free", duration:  86400 - value.arrivaltime});
       }

       return acc;
   },  [])
);