const express = require('express')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
app.use('/scripts', express.static(`${__dirname}/node_modules/`))

// Redirect all traffic to index.html (Catch All SSR)
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server started at ${PORT}`)
    }
})