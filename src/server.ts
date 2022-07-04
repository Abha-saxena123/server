import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/dreams";
import helmet from "helmet";
const cors = require("cors");
const router: Express = express();
// adding Helmet to enhance your API's security

router.use(express.json());
router.use(helmet());
// adding morgan to log HTTP requests
router.use(morgan("combined"));
router.use(cors())

// router.use((req, res, next) => {
//   // set the CORS policy
//   res.header("Access-Control-Allow-Origin", "*");
//   // set the CORS headers
//   res.header(
//     "Access-Control-Allow-Headers",
//     "origin, X-Requested-With,Content-Type,Accept, Authorization"
//   );
//   // set the CORS method headers
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
//     return res.status(200).json({});
//   }
//   next();
// });

router.use("/api/v1", routes);

const httpServer = http.createServer(router);

router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const PORT: any = process.env.PORT || 3001;

httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
