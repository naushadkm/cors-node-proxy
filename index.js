const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/adfs/oauth2/token/", async (req, res, next) => {
  // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    // CORS Preflight
    res.send();
  } else {
    try {
      // Extract form data from the request body
      const formData = req.body;
      console.log("Form data: -----------------> ", formData);

      // Specify the endpoint to which you want to send the form data
      const endpoint = "https://sts.sentara.com/adfs/oauth2/token/";

      // Make a POST request to the endpoint with the form data
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const responseData = response.data;
      console.log("responseData: -------------->", responseData);
      // Send the extracted data as JSON response
      res.json(responseData);
    } catch (error) {
      // Handle errors
      console.error("Error sending form data:", error.message);
      res.status(500).send("Error sending form data");
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
