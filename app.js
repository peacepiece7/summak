const axios = require("axios")
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.text())

app.use("/movies", async (req,res) => {
    try{
        const title = req.query.title
        const {data} = await axios({
            url : `https://omdbapi.com/?apikey=7035c60c&s=${title}`,
            method : "GET"
        })
        console.log(data.Search)
        res.status(202).json(data.Search)
    }catch(err){
        console.error(err)
        res.status(404).send("404 not found title query string을 입력해주세요!")
    }
})

app.use("/", (req,res) => {
    console.log("Hello, world!")
    res.status(202).send("Hi Ubunto")
})

app.listen(6060, () => {
    console.log("Express Server가 연결 되었습니다.")
})