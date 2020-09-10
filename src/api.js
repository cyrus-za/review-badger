const axios = require('axios')
const { GITHUB_AUTH_HEADER, GITHUB_API_URL, SLACK_WEBHOOK_URL } = require('./constants.js')
const { GITHUB_REPOSITORY, INPUT_SLACKCHANNEL } = process.env

function getPRs() {
  return axios({
    method: 'GET',
    url: `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/pulls`,
    headers: GITHUB_AUTH_HEADER,
  }).catch(err => console.log(err))
}

function postSlackMsg({ text, blocks } = {}) {
  if (!SLACK_WEBHOOK_URL)
    throw new Error('No SLACK_WEBHOOK_URL supplied - messages cannot be posted.')

  if (!INPUT_SLACKCHANNEL) throw new Error('No slackChannel supplied - messages cannot be posted.')

  return axios({
    method: 'POST',
    url: SLACK_WEBHOOK_URL,
    data: {
      channel: INPUT_SLACKCHANNEL,
      username: 'Review Badger',
      text,
      blocks,
    },
  }).catch(err => console.log(err))
}

module.exports = {
  getPRs,
  postSlackMsg,
}
