const express = require("express")

const app = express()

app.use("/", (res,req) => {
    console.log("Hello, world!")
    req.status(202).send("Hi Ubunto")
})

app.listen(6060, () => {
    console.log("Express Server가 연결 되었습니다.")
})