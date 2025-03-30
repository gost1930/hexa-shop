const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = 3001;
const router = require("./routes/routers");
app.use(cookieParser())

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use('/uploads', express.static('uploads'));
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});