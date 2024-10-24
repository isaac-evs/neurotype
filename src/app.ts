/* Import necessary Frameworks/Libraries */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database";
import routes from "./routes/index";
import path from "path";
import setupSwaggerDocs from "./swaggerDocs";

/* Load Environment Variables */
dotenv.config();

/* Start an instance of express */
const app = express();

/* Define port */
const port = process.env.PORT || 3000;

/* Connect to the Database */
connectDB();

/* Middlewares */
app.use(cors());
app.use(helmet());
app.use(express.json());

/* routes */
app.use("/assets", express.static(path.join(__dirname, "..", "public")));

app.use("/api", routes);

// Set up Swagger
setupSwaggerDocs(app);

/* Start Server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`📄 Swagger docs available at http://localhost:${port}/api-docs`);
});
