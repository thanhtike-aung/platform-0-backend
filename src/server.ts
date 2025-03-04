import express from "express";
import dotenv from "dotenv";
import { setPostRoutes } from "./routes/postRoute";
import { setUserRoutes } from "./routes/userRoute";
import cors from "cors";
import { setAuthRoutes } from "./routes/authRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

/**
 * TODO: to use port via .env
 */
const port = 5000;

// routing
setAuthRoutes(app);
setUserRoutes(app);
setPostRoutes(app);

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
