const express = require('express')
const connectDb = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000
connectDb()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the ContactKeeper API' })
})

app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
