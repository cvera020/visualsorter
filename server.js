import express from 'express';

// initalize the express app
const app = express();

// example query
// pool.query('SELECT * FROM users', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //allow this domain to access communicate with the server
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// test route, root of api, sends example message as response
app.get('/', (req, res) => {
  res.send("you hit the server!");
});

// api definitions
//app.use('/api/home', home);


// will need to add app.static later on to serve build of reactjs folder


// app starts listening on port 4000
// we would want this as environment variable
app.listen(4000, () => {
  console.log("listening on port 4000");
})
