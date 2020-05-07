// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
​
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
​
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
​
let tables   = []; 
let waitlist = []; 
​
// Routes
// =============================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html")); 
});
​
app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
​
app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "makeRes.html"));
});
​
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});
​
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});
​
// Create New Reservations
app.post("/api/tables", function(req, res) {
  let newReservation = req.body;
  let result = false;
  console.log(`[SERVER.js - POST = "/api/tables"] Creating new reservation:  ${newReservation}`);
​
  if (tables.length < 5) {
    tables.push(newReservation);
    result = true;
  }
  else {
    waitlist.push(newReservation);
  }
​
  return result;
});
​
app.post("/api/tables/clear", function(req, res) {
  // How to clear an array in javascript -> Master GOOGLE-FU!!
  tables.splice(0, tables.length);
  waitlist.splice(0, waitlist.length);
​
  console.log(`Tables array:  ${tables}`);
  console.log(`Waiting List array:  ${waitlist}`);
​
  if (tables.length === 0 && waitlist.length === 0)
    return res.json(true);
  else
    return res.json(false);
  //return (tables.length === 0 && waitlist.length === 0) ? res.json(true) : res.json(false);
});
​
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`[SERVER.js] App listening on PORT ${PORT}`);
});