const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const router = express.Router();
const morgan = require("morgan");
const path = require("path");
const helmet = require('helmet');
const cors = require('cors');

// Constants
const {
  HOST,
  PORT,
  SESS_SECRET,
  NODE_ENV,
  IS_PROD,
  COOKIE_NAME
} = require("./config/config");
const { MongoURI } = require("./config/database");
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours


// Express Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Morgan setup
app.use(morgan("dev"));


// Below corsOptions are for Local development
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Below corsOptions work in deployment as Docker containers
const corsOptionsProd = {
  origin: 'http://localhost',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));


router.get("/", (req, res) => res.send("HELLO FRIEND"));

// API / Routes;
// Uncomment Below for Development
app.use("/api", require("./routes/main"));

//Uncomment Below for Production, routes mounted at /sessions-auth-app and not root domain
//app.use("/sessions-auth-app/api/users", require("./routes/users"));
// app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));
