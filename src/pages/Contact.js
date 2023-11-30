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

  // this code shows how to use the React fetch http for GET and POST
  // const fetchData = async(processing) => {
  //     const options = {
  //         method: 'POST',
  //         headers: {'Content-type': 'application/json'},
  //         body: JSON.stringify({
  //             email: email,
  //             message: message
  //         })
  //     }
  //
  //     await fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(res => res.json())
  //     .then(data => {
  //         if (processing) {
  //             setSelectData(data)
  //         }
  //     })
  //     .catch(err => console.log(err))
  // }

  const axiosFetchData = async (processing) => {
    await axios
      .get("http://localhost:4000/users")
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
      .post("http://localhost:4000/support/send", postData)
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
      <h1>Support Us!</h1>

      <form className="contactForm">
        <label>UserName</label>
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
        <label>How Did You Hear About Us?</label>
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
      <div>
        <Boxes />
      </div>
    </>
  );
}

export default Contact;

// http://localhost:3000/contact-us

// I am missing certain files and components so this test does not look nice
