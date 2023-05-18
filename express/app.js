const express = require('express')
const axios = require('axios')
const app = express()

app.use('/api', async (req, res) => {
  try {
    const search = req.query
    if (!search.s) throw new Error('쿼리가 없습니다.')
    const result = await axios.get(
      `https://omdbapi.com/?apikey=7035c60c&s=${search.s}`
    )
    res.json(result.data)
  } catch (err) {
    console.error(err)
    res.json({ Error: err.message })
  }
})

app.use('/main.js', (req, res) => {
  res.send(`
    document.body.append("Hello, JavaScript")
    `)
})
app.use('/style.css', (req, res) => {
  // res.setHeader('Content-Type', 'text/css')
  res.send(`.title {
    color: red;
  }`)
})

app.use('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <script defer src="/main.js" ></script>
  <link rel="stylesheet" href="style.css">
    <body>
      <h1 class="title">hello, world!</h1>
      <p>숨막조를 위한 서버 인프라 설명</p>
    </body>
  </html>
  `)
})

const PORT = 1234

app.listen(PORT, () => {
  console.log('PORT :', PORT, 'is running')
})
