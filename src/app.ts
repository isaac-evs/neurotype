/* Import necessary Frameworks/Libraries */
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import path from "path";

/* Load Environment Variables */
dotenv.config();

/* Start an instance of express */
const app = express();

/* Define port */
const port = process.env.PORT || 3000;

/* Middlewares */
app.use(express.json());

/* routes */
app.use("/assets", express.static(path.join(__dirname, "..", "public")));

app.use(routes);

/* Start Server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
