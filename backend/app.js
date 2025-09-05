import express from 'express'
import cors from 'cors'

import Form from './routes/formRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/forms', Form)

//Welcome route:
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Dynamic forms',
//         status: 'running',
//         endpoints: {

//         }
//     })
// })

export default app;