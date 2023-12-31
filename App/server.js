const { log, error } = require("console");
const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
require('dotenv').config()
const { AllRoutes } = require("./router/router");

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
    // this.initRedis();
  }
  configApplication() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "Aren's store",
              version: "2.0.0",
              description: "The biggest store",
              contact: {
                name: "Aren Sinaei",
                email: "arensinani4@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:3000",
                // url: "http://localhost:5000",
              },
            ],
            // components: {
            //   securitySchemes: {
            //     BearerAuth: {
            //       type: "http",
            //       scheme: "bearer",
            //       bearerFormat: "JWT",
            //     },
            //   },
            // },
            // security: [{ BearerAuth: [] }],
          },
          apis: ["./app/router/**/*.js"],
        }),
        { explorer: true }
      )
    );
  }
  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app);

    // Add an error event handler
    server.on("error", (err) => {
      console.error("Server error:", err);
      // Handle the error appropriately, e.g., close the server or take corrective action.
    });

    server.listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }

  async connectToMongoDB() {
    try {
      await mongoose.connect(this.#DB_URL, {
        useNewUrlParser: true,
        UseUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");

      // Add your event listeners here, if needed.
      mongoose.connection.on("connected", () => {
        console.log("mongoose connected to DB");
      });
      mongoose.connection.on("error", (error) => {
        console.error("Mongoose connection error:", error);
      });
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("disconnected");
        process.exit(0);
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  }
  // initRedis() {
  //   require("./utils/init_redis");
  // }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("Address not found!"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        data: null,
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
