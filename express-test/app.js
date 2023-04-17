const path = require('path')
const axios = require('axios')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.text())

// * view 경로 설정
app.set('views', __dirname + '/views')

// * 화면 engine을 ejs로 설정
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

// * 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
app.use(express.static(__dirname + '/public'))
app.use('/static', express.static('public'))

// * router test
app.use('/product', async (req, res) => {
  res.status(200).render('index.html')
})
app.use('/main', async (req, res) => {
  res.status(200).render('index.html')
})
app.use('/', async (req, res) => {
  res.status(200).render('index.html')
})

// * /movies
app.use('/movies', async (req, res) => {
  try {
    const title = req.query.title
    const { data } = await axios({
      url: `https://omdbapi.com/?apikey=7035c60c&s=${title}`,
      method: 'GET',
    })
    console.log(data.Search)
    res.status(202).json(data.Search)
  } catch (err) {
    console.error(err)
    res.status(404).send('404 not found title query string을 입력해주세요!')
  }
})

// * root
app.use('/', (req, res) => {
  res.status(202).send('<h1>Hello, world</h1>')
})

app.listen(6060, () => {
  console.log('Express Server가 연결 되었습니다.')
})
