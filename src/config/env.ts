export default () => ({
  PORT: parseInt(process.env.PORT) || 3333,
  EXCHANGE_RATE_API_KEY: String(process.env.EXCHANGE_RATE_API_KEY)
})