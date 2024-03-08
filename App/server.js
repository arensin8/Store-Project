const { log, error } = require("console");
const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
require("dotenv").config();
const { AllRoutes } = require("./router/router");
const expressEjsLayouts = require("express-ejs-layouts");
const { initialSocket } = require("./utils/initSocket");
const { socketHandler } = require("./socket.io");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { COOKIE_PARSER_SECRET_KEY } = require("./utils/constant");

module.exports = class application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.connectToMongoDB();
    this.initTemplateEngine();
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
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "Bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },
          apis: ["./app/router/**/*.js"],
        }),
        {
          explorer: true,
          swaggerOptions: {
            security: [
              {
                BearerAuth: [],
              },
            ],
          },
        }
      )
    );
  }
  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app);
    const io = initialSocket(server);
    socketHandler(io);

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
      await mongoose.connect(this.#DB_URI, {
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
  parseCookies(req, res, next) {
    const cookieHeader = req.headers.cookie || ""; // Ensure cookie header exists
    req.parsedCookies = cookie.parse(cookieHeader);
    next();
  }
  initClientSession() {
    // this.#app.use(cookieParser(COOKIE_PARSER_SECRET_KEY));
    this.#app.use(this.parseCookies);
    this.#app.use(
      session({
        secret: COOKIE_PARSER_SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {
          secure: false,
        },
      })
    );
  }
  initTemplateEngine() {
    this.#app.use(expressEjsLayouts);
    this.#app.set("view engine", "ejs");
    this.#app.set("views", "resource/views");
    this.#app.set("layout extractStyles", true);
    this.#app.set("layout extractScripts", true);
    this.#app.set("layout", "./layouts/master");
  }

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
