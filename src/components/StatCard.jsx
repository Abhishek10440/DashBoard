import CountUp from "react-countup";

const  StatCard=({ title, value }) =>{
     return (
    <div className="card">
      <h3>{title}</h3>

      <h1>
        {/* <CountUp end={value} duration={2} /> */}

        {value}
      </h1>
    </div>
  );
}

export default StatCard;