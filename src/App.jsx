import { useEffect, useState } from "react";

export default function App() {
  const [arrivalInfo, setArrivalInfo] = useState({ services: [], bus_stop_id: '' });
  const [busStopId, setBusStopId] = useState('')
  const [loading, setLoading] = useState(false);

  const fetchArrivalData = async () => {
    if (busStopId) {
      setLoading(true);
      //try{ 
      const response = await fetch(`https://sg-bus-arrival.sigma-schoolsc1.repl.co/?id=${busStopId}`);
      //if (!response.ok){throw new Error('Network response was not ok.')}
      const data = await response.json();
      setArrivalInfo(data);
      //} catch (error) {
      // console.error(error);}
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArrivalData();
    const timerId = setInterval(() => {
      console.log('fetching bus data')
      fetchArrivalData();
    }, 5000);

    return () => clearInterval(timerId)
  }, [busStopId]);

  function selectInputChange(event) {
    setBusStopId(event.target.value);
  }

  return (
    <div>

      <h1>Bus Arrival Times</h1>
      <img src="./src/day_bus.gif" height='180' />
      <h2>Bus Stop ID {busStopId}</h2>
      <select value={busStopId} onChange={selectInputChange}>
        <option value="">Select Bus Stop ID</option>
        <option value="18141">18141</option>
        <option value="18131">18131</option>
      </select>

      {loading && <p>Loading...</p>}
      <ul>
        {arrivalInfo.services.map((arrival, index) => {
          const formatTime = arrival.next_bus_mins < 0 ? `Arrived ${-arrival.next_bus_mins} minutes ago` : `Arriving in ${arrival.next_bus_mins} minutes`;
          return (
            <li key={index}>
              Bus {arrival.bus_no} : {formatTime}
            </li>
          );
        })}
      </ul>
    </div>
  );
}



//.map((arrival) =>)



//const formatArrivalTime = (nextBusMins) => {
//  if (nextBusMins <= 0) {
//    return 'Arrived';
//  } else {
//    return `${nextBusMins} minutes`;}}

// Bus :{formatArrivalTime(arrival.next_bus_mins)}