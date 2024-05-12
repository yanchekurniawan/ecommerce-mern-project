import express from "express";
import router from "./routes/Routes.js";
import cors from "cors";
import env from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

/* DB Connection */
import "./config/Database.js";

env.config();

app.use(express.json({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(router);
app.use("/images", express.static("upload/images"));

const port = 4000;

app.listen(port, (error) => {
  if (error) {
    console.log("Error: ", error);
    return;
  }
  console.log(`Server listening on port: ${port}`);
});
