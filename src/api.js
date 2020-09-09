const axios = require('axios')
const {
  GITHUB_AUTH_HEADER,
  GITHUB_API_URL,
  GITHUB_ORG,
  GITHUB_REPO,
  SLACK_WEBHOOK_URL,
  SLACK_CHANNEL,
} = require('./constants.js')

export function getPRs() {
  return axios({
    method: 'GET',
    url: `${GITHUB_API_URL}/repos/${GITHUB_REPO}/pulls`,
    headers: GITHUB_AUTH_HEADER,
  })
}

export function postSlackMsg({ text, blocks } = {}) {
  return axios({
    method: 'POST',
    url: SLACK_WEBHOOK_URL,
    data: {
      channel: SLACK_CHANNEL,
      username: 'Review Badger',
      text,
      blocks,
    },
  })
}
