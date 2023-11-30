const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

router.post("/contact/:a", async (req, res) => {
  // const email = req.body.email;
  // const website = req.body.website;
  const { email, website, message } = req.body;
  const action = req.params.a;

  switch (action) {
    case "send":
      const contactData = { email: email, website: website, message: message };
      const newContact = new schemas.Contact(contactData);
      const saveContact = await newContact.save();
      if (saveContact) {
        res.send("Message Sent. Thank you");
      } else {
        res.send("Failed to send message.");
      }

      break;

    default:
      res.send("Invalid request");
      break;
  }
  res.end();
});

router.post("/support/:a", async (req, res) => {
  const { name, email, donation, message } = req.body;
  const action = req.params.a;

  switch (action) {
    case "send":
      const supportData = { email: email, name: name, message: message, donation: donation };
      const newSupport = new schemas.Support(supportData);
      const saveSupport = await newSupport.save();
      if (saveSupport) {
        res.send("Message Sent. Thank you");
      } else {
        res.send("Failed to send message.");
      }

      break;

    default:
      res.send("Invalid request");
      break;
  }
  res.end();
});

router.get("/users", async (req, res) => {
  const users = schemas.Users;

  // const userData = await users.find({}).exec()
  // if (userData) {
  //   res.send(JSON.stringify(userData))
  // }

  const userData = [
    {
      id: 1,
      donation: "$0.00"
    },
    {
      id: 2,
      donation: "$1.00"
    },
    {
      id: 3,
      donation: "$5.00"
    },
    {
      id: 4,
      donation: "$10.00"
    },
    {
      id: 5,
      donation: "$69.69"
    },
  ];

  res.send(userData);
});

module.exports = router;

//tell brybo

// atm any changes made must restart the server
