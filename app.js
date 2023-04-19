import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connection.js";
import { AuthRouter, CustomerRouter, EmployeeRouter, ManagerRouter } from "./src/modules/index.router.js";
dotenv.config({ path: "./config/.env" });
const app = express();
const port = process.env.PORT;
app.use(express.json());
connectDB();
const baseURL = process.env.BASE_URL;
app.use(`${baseURL}employee`, EmployeeRouter);
app.use(`${baseURL}auth`, AuthRouter);
app.use(`${baseURL}manager`,ManagerRouter)
app.use(`${baseURL}customer`, CustomerRouter);

app.use((err, req, res, next) => {
  if (err) {
    return res
      .status(err["cause"])
      .json({ message: "catch error", error: err.message });
  }
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "page is not found" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
