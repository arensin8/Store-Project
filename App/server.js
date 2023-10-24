const { log, error } = require("console");
const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require('http-errors')

module.exports = class application {
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }
  connectToMongoDB() {
    mongoose.connect(this.#DB_URL, {}).then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });
    mongoose.connection.on('connected' , () => {
        console.log('mongoose connected to DB');
    });
    mongoose.connection.on('disconnected' , () => {
        console.log('mongoose disconnected to DB');
    });
    //for closing connection to mongo after Ctrl+C and ...
    process.on('SIGINT', async () => {
        await mongoose.connection.close(0);
        console.log('stopped connection');
        process.exit(0);
    })
  }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
     next(createError.NotFound('Address not found!'))
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError()
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        data : null ,
        errors : {
          statusCode,
          message
        }
       } );
    });
  }
};
