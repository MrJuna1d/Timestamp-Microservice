const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/freecodecamp.html");
});

app.get("/api/:date?", (req, res) => {
  const date_string = req.params.date;

  let date;
  let unix;
  let utc;

  if (!date_string) {
    date = new Date();
  } else if (/^\d{5,}$/.test(date_string)) {
    date = new Date(parseInt(date_string));
  } else {
    date = new Date(date_string);

    const inputDate = date_string.split("-").map(Number); // Split the input date string
    const parsedYear = date.getFullYear();
    const parsedMonth = date.getMonth() + 1; // JavaScript months are 0-based

    if (
      inputDate[0] !== parsedYear ||
      inputDate[1] !== parsedMonth ||
      inputDate[2] !== date.getDate()
    ) {
      // The parsed date does not match the input, so it's invalid
      res.json({ error: "Invalid Date" });
      return;
    }
  }

  if (!isNaN(date)) {
    unix = date.getTime();
    utc = date.toUTCString();

    res.json({ unix, utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/:universeURL", (req, res) => {
  res.send("ERROR!!" + req);
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
