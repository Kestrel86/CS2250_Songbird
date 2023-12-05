import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/contact.css";
import Boxes from "../components/Boxes";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectData, setSelectData] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);
    return () => {
      processing = false;
    };
  }, []);

  const axiosFetchData = async (processing) => {
    await axios
      .get("https://songbird.onrender.com/users")
      .then((res) => {
        if (processing) {
          setSelectData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const axiosPostData = async () => {
    const postData = {
      name: name,
      email: email,
      donation: selectValue,
      message: message,
    };

    await axios
      .post("https://songbird.onrender.com/support/send", postData)
      .then((res) => setError(<p className="success">{res.data}</p>));
  };

  const SelectDropdown = () => {
    return (
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      >
        <option value="" key="none">
          {" "}
          -- Select One --{" "}
        </option>
        {selectData?.map((item) => (
          <option value={item.donation} key={item.donation}>
            {item.donation}
          </option>
        ))}
      </select>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) {
      setError(
        <p className="required">Message is empty. Please type a message.</p>
      );
    } else {
      setError("");
    }

    setError("");
    axiosPostData();
  };

  return (
    <>
      <div className="parallax">
        <br />
        <div>
          <form className="contactForm">
            <h1 className="title">Support Us!</h1>
            <label>Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              <b>Would You Kindly</b> Donate?
            </label>
            <SelectDropdown /> {/* unleashed dropdown*/}
            <label>Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {error}
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
          <br />
        </div>
      </div>
      <div>
        <Boxes />
      </div>
    </>
  );
}

export default Contact;
