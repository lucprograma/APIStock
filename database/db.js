const mongoose = require('mongoose')
const path = require('path');
const env = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URL = `mongodb://${env.parsed.MONGO_IP}:${env.parsed.MONGO_PORT}/${env.parsed.MONGO_DB}` || 'mongodb://127.0.0.1:27017/stock'

mongoose.connect(MONGO_URL)
mongoose.connection.on('connected', ()=> { console.log('✔ DB: ' + MONGO_URL) })
mongoose.connection.on('error', (err) => { console.log('⊖: ' + err) })
mongoose.connection.on('disconnected', () => { console.log('✖ Conexión cerrada!')
})

process.on('sigint', () => { mongoose.connection.close(()=> {
    console.log('⨺ Aplicación finalizada!')
    process.exit(0)
  })
})