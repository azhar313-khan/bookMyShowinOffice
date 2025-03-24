import express from "express";
import dotenv from "dotenv";
import dbConfig from "./dbConfig/dbConfig";
import router from "./routes/routes";
import { setupSwagger } from "./utils/swagger";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//config
dbConfig();

app.use(express.json());
app.use(cors());

// Initialize Swagger
setupSwagger(app);

//config Route
app.use("/", router);

app.listen(PORT, () => {
  console.log("server is started " + PORT);
});
