import "../assets/css/box.css";

export default function Box(props) {
  const { email, name, msg, donation } = props;
  return (
    <div className="data">
      <h2>test</h2>
      <h3>testName</h3>
      <h4>Donation Amount: </h4>
      <p>msg</p>
    </div>
  );
}
