import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import userRouter from "./src/modules/user/userRoutes.js";
import CompanyRouter from "./src/modules/company/companyRoutes.js";
import JobRouter from "./src/modules/job/jobRoutes.js";
import ApplicationRouter from "./src/modules/application/applicationRoute.js";
import { globalErrorHandler } from "./src/middlewares/errorHandling.middleware.js";
import bodyParser from "body-parser";
import { config } from "dotenv";


const app = express();
config();

app.use(express.json());
const port=process.env.PORT
app.use(bodyParser.json());

app.use("/auth" ,userRouter)
app.use("/company" ,CompanyRouter)
app.use("/job" , JobRouter)
app.use("/application",ApplicationRouter)
app.use(globalErrorHandler);

dbConnection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
