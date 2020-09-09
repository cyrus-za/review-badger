const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_AUTH_HEADER = { Authorization: `token ${GITHUB_TOKEN}` }
const GITHUB_REPO = process.env.GITHUB_REPOSITORY
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const SLACK_CHANNEL = process.env.SLACK_CHANNEL

module.exports = {
  GITHUB_API_URL,
  GITHUB_TOKEN,
  GITHUB_AUTH_HEADER,
  GITHUB_REPO,
  SLACK_WEBHOOK_URL,
  SLACK_CHANNEL,
}
