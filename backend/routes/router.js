const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

router.post("/contact/:a", async (req, res) => {
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
      const supportData = {
        email: email,
        name: name,
        message: message,
        donation: donation,
      };
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

router.get("/support", async (req, res) => {
  const support = schemas.Support;

  const supportData = await support.find({}).exec();
  if (supportData) {
    res.send(JSON.stringify(supportData));
  }
});

router.get("/users", async (req, res) => {
  const users = schemas.Users;

  const userData = [
    {
      id: 1,
      donation: "$0.01",
    },
    {
      id: 2,
      donation: "$1.00",
    },
    {
      id: 3,
      donation: "$5.00",
    },
    {
      id: 4,
      donation: "$10.00",
    },
    {
      id: 5,
      donation: "$15.00",
    },
    {
      id: 6,
      donation: "$25.00",
    },
    {
      id: 7,
      donation: "$50.00",
    },
    {
      id: 8,
      donation: "100.00",
    },
  ];

  res.send(userData);
});

module.exports = router;
