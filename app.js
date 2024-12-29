import express from "express";
import {} from "./models/dbConfig.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import AuthRoute from "./routes/route.auth.js";
import cookieParser from "cookie-parser";
import { authenticate } from "./middleware/middleware.auth.js";
import UserRoute from "./routes/route.user.js";
import PostRoute from "./routes/route.post.js";

dotenv.config();

const PORT  = process.env.PORT || 3000; 

const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(cookieParser());

app.use("/auth", AuthRoute);
app.use("/user", authenticate , UserRoute);
app.use("/post" , PostRoute); // authenticate it later


app.listen(PORT , ()=>{
  console.log("server started at port : ",PORT);
})





