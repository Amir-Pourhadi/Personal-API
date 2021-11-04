const express = require("express");
const path = require("path");
const Mailchimp = require("mailchimp-api-v3");
require("dotenv").config({ path: path.join(__dirname, "/variables.env") });

const mc_api_key = process.env.MAILCHIMP_API_KEY;
const list_id = process.env.MAILCHIMP_LIST_ID;

const port = process.env.PORT || 5000;

const app = express();
const mailchimp = new Mailchimp(mc_api_key);

// API endpoint
app.get("/api/memberAdd", (req, res) => {
  const { email } = req.query;
  mailchimp.post(
    `/lists/${list_id}/members`,
    {
      email_address: email,
      status: "subscribed",
    },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
