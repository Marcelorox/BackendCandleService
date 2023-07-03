import axios from "axios"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))

app.get("/:crypto/:candleTime",async (req, res) =>{
    const {crypto, candleTime} = req.params
    const currentTime = new Date()
    const eightHoursAgo = new Date(currentTime.getTime() - 8 * 60 * 60 * 1000)
    const startAt = Math.floor(eightHoursAgo.getTime() / 1000)
    const endAt = Math.floor(currentTime.getTime() / 1000)
    console.log(startAt, endAt)

    const {data} = await axios.get(`https://api.kucoin.com/api/v1/market/candles?type=${candleTime}&symbol=${crypto.toUpperCase()}-USDT&startAt=${startAt}&endAt=${endAt}`)
    res.json(data)
})
app.listen(3000, () =>{
    console.log('server running')
})