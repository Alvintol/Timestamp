// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/", (req, res) => {

  const date = new Date()
  const unix = Math.floor(date.getTime());
  const utc = date.toUTCString();
    
    res.send({unix, utc})
  });

app.get("/api/:date", (req, res) => {

  const isUnix = (date) =>
    date.search(/-/g) < 0 ? true : false;

  let date = new Date(Number(req.params.date));
  let unix = parseInt(req.params.date);
  let utc = date.toUTCString();

  if (!isUnix(req.params.date)) {
    date = new Date(req.params.date);
    unix = Math.floor(date.getTime());
    utc = date.toUTCString();
  };

  res.send(date.toString() === 'Invalid Date' ?
    { error: "Invalid Date" } :
    {
      unix,
      utc
    })
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
