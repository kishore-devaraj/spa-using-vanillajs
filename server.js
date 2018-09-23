const express = require('express')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
app.use('/scripts', express.static(`${__dirname}/node_modules/`))

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server started at ${PORT}`)
    }
})