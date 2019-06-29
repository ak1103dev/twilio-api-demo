import express from 'express'
import twilio from 'twilio'

const app = express()

const AccessToken = twilio.jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant

app.get('/', (req, res) => res.send('Hello, My API'))

app.get('/token', (req, res) => {
  const identity = Math.floor(Math.random() * 1001).toString()
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
  )
  token.identity = identity
  const grant = new VideoGrant()
  token.addGrant(grant)
  const data = {
    identity: identity,
    token: token.toJwt()
  }
  res.send(data)
})

export default app
