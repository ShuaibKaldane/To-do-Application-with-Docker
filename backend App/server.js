const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { MONGO_URL, PORT } = require("./config")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/tasks", require("./routes/task"))

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)
