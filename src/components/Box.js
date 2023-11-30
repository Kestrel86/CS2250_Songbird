import "../assets/css/box.css";

export default function Box(props) {
  const { email, name, msg, donation } = props;
  return (
    <div className="data">
      <h2>{name}</h2>
      <h3>{email}</h3>
      <h4>Donation Amount: {donation}</h4>
      <p>{msg}</p>
    </div>
  );
}
