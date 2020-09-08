export const GITHUB_API_URL = 'https://api.github.com'
export const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN
export const GITHUB_AUTH_HEADER = { Authorization: `token ${GITHUB_API_TOKEN}` }
export const GITHUB_ORG = process.env.GITHUB_ORG
export const GITHUB_REPO = process.env.GITHUB_REPO
export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
export const SLACK_CHANNEL = process.env.SLACK_CHANNEL
