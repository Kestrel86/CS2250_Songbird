const express = require("express");
const router = express.Router();
const schemas = require('../models/schemas')

router.post("/contact/:a", async(req, res) => {
  // const email = req.body.email;
  // const website = req.body.website;
  const { email, website, message } = req.body;
  const action = req.params.a

  switch(action) {
    case "send":
    const contactData = {email: email, website: website, message: message}
    const newContact = new schemas.Contact(contactData)
    const saveContact = await newContact.save()
    if (saveContact) {
      res.send("Message Sent. Thank you");
    } else {
      res.send("Failed to send message.")
    }

    break;

      default:
        res.send('Invalid request')
        break;

  }
  res.end()
});

router.get('/contact/:a/:id', (req, res) => {

})

router.get("/users", async (req, res) => {
  const users = schemas.Users

  const userData = await users.find({}).exec()
  if (userData) {
    res.send(JSON.stringify(userData))
  }

  //const userData = [
    // {
    //   id: 1,
    //   name: "Leanne Graham",
    //   username: "Bret",
    //   email: "Sincere@april.biz",
    //   address: {
    //     street: "Kulas Light",
    //     suite: "Apt. 556",
    //     city: "Gwenborough",
    //     zipcode: "92998-3874",
    //     geo: {
    //       lat: "-37.3159",
    //       lng: "81.1496",
    //     },
    //   },
    //   phone: "1-770-736-8031 x56442",
    //   website: "hildegard.org",
    //   company: {
    //     name: "Romaguera-Crona",
    //     catchPhrase: "Multi-layered client-server neural-net",
    //     bs: "harness real-time e-markets",
    //   },
    // },
    // {
    //   id: 2,
    //   name: "Ervin Howell",
    //   username: "Antonette",
    //   email: "Shanna@melissa.tv",
    //   address: {
    //     street: "Victor Plains",
    //     suite: "Suite 879",
    //     city: "Wisokyburgh",
    //     zipcode: "90566-7771",
    //     geo: {
    //       lat: "-43.9509",
    //       lng: "-34.4618",
    //     },
    //   },
    //   phone: "010-692-6593 x09125",
    //   website: "anastasia.net",
    //   company: {
    //     name: "Deckow-Crist",
    //     catchPhrase: "Proactive didactic contingency",
    //     bs: "synergize scalable supply-chains",
    //   },
    // },
    // {
    //   id: 3,
    //   name: "Clementine Bauch",
    //   username: "Samantha",
    //   email: "Nathan@yesenia.net",
    //   address: {
    //     street: "Douglas Extension",
    //     suite: "Suite 847",
    //     city: "McKenziehaven",
    //     zipcode: "59590-4157",
    //     geo: {
    //       lat: "-68.6102",
    //       lng: "-47.0653",
    //     },
    //   },
    //   phone: "1-463-123-4447",
    //   website: "ramiro.info",
    //   company: {
    //     name: "Romaguera-Jacobson",
    //     catchPhrase: "Face to face bifurcated interface",
    //     bs: "e-enable strategic applications",
    //   },
    // },
    // {
    //   id: 4,
    //   name: "Patricia Lebsack",
    //   username: "Karianne",
    //   email: "Julianne.OConner@kory.org",
    //   address: {
    //     street: "Hoeger Mall",
    //     suite: "Apt. 692",
    //     city: "South Elvis",
    //     zipcode: "53919-4257",
    //     geo: {
    //       lat: "29.4572",
    //       lng: "-164.2990",
    //     },
    //   },
    //   phone: "493-170-9623 x156",
    //   website: "kale.biz",
    //   company: {
    //     name: "Robel-Corkery",
    //     catchPhrase: "Multi-tiered zero tolerance productivity",
    //     bs: "transition cutting-edge web services",
    //   },
    // },
  // ];

  res.send(userData);
});

module.exports = router;

//tell brybo

// atm any changes made must restart the server
