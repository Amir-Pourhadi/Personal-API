const express = require("express");
const Mailchimp = require("mailchimp-api-v3");
const cors = require("cors");
require("dotenv").config();

const mc_api_key = process.env.MAILCHIMP_API_KEY;
const list_id = process.env.MAILCHIMP_LIST_ID;

const port = process.env.PORT;

const app = express();
const mailchimp = new Mailchimp(mc_api_key);

app.use(cors());

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
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(port);
