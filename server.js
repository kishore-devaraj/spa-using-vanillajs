const express = require('express')
const { getRates } = require('./lib/fixer-service')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
app.use('/scripts', express.static(`${__dirname}/node_modules/`))

// Fetch Latest Currency Rates
app.get('/api/rates', async (req, res) => {
    try {
        const data = await getRates();
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        errorHandler(error, req, res)
    }
})

// Redirect all traffic to index.html (Catch All SSR)
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));



// Express Error handler
const errorHandler = (err, req, res) => {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(403).send({ title: 'Server responded with an error', message: err.message });
    } else if (err.request) {
      // The request was made but no response was received
      res.status(503).send({ title: 'Unable to communicate with server', message: err.message });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).send({ title: 'An unexpected error occurred', message: err.message });
    }
  };

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server started at ${PORT}`)
    }
})