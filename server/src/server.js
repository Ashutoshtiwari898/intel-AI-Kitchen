import express from "express";
import cors from "cors";
import morgan from "morgan";
import {dbconnect} from "./config/index.js";
dbconnect();
import userRouter from "./routes/user.js";
import kitchenRouter from "./routes/chat.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // specify port name



// Enable cors for all routes
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());


app.use("/user", userRouter);
app.use("/kitchen", kitchenRouter);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
