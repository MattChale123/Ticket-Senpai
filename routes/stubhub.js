var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const btoa = require('btoa');

// POST access token
router.post("/accesstoken", function (req, res, next) {
  // check for username & password
  if (!req.body.password || !req.body.username) {
    // if not, return error
    return res
      .status(400)
      .json({ error: "Please include username and password." });
  }
  //send username & password to StubHub
  const consumerKey = process.env.CONSUMER_KEY
  const consumerSecret = process.env.CONSUMER_SECRET
  const consumerKeyAndSecret = consumerKey + ":" + consumerSecret;
  const base64EncodedConsumerKeyAndSecret = btoa(consumerKeyAndSecret);

  fetch(`https://api.stubhub.com/sellers/oauth/accesstoken?grant_type=client_credentials`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64EncodedConsumerKeyAndSecret}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": req.body.username,
        "password": req.body.password
    })
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if (data.errorResponse) {
        console.error(data.errorResponse)
        return res.json({
          error: 'Could not login to StubHub.'
        })
      }
        // respond w/ access token
      res.json(data)
      console.log(data);
    });
});

module.exports = router;
