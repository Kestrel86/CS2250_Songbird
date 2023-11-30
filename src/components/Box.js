import "../assets/css/box.css";

export default function Box(props) {
  const { email, name, msg, donation } = props;
  return (
    <div className="container">
      <h1>Sponsors:</h1>
      <div className="items">
        <div className="data">
          <h2>test</h2>
          <h3>testName</h3>
          <h4>Donation Amount: </h4>
          <p>msg</p>
        </div>
        <div className="data">
          <h2>test</h2>
          <h3>testName</h3>
          <h4>Donation Amount: </h4>
          <p>msg</p>
        </div>
      </div>
    </div>
  );
}
