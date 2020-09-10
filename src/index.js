const { getPRs, postSlackMsg } = require('./api.js')

function getIntroMsg(numberOfPRs) {
  if (numberOfPRs === 1) return 'There is 1 PR that still needs a reviewer.'

  return `There are ${numberOfPRs} PRs that still reviewers.`
}

async function start() {
  const { data } = await getPRs()
  const PRsNeedingReview = data
    .filter(PR => PR.requested_reviewers.length === 0 && PR.draft === false)
    .filter(PR => PR.user !== 'nicklemmon')

  if (PRsNeedingReview.length > 0) {
    const introMsg = getIntroMsg(PRsNeedingReview.length)

    await postSlackMsg({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*A wild Review Badger appeared!* \n ${introMsg}`,
          },
        },
        ...PRsNeedingReview.map(PR => {
          const { html_url, number, title } = PR

          return {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `<${html_url}|:point_right: PR #${number} - ${title}>`,
            },
          }
        }),
      ],
    })
  }
}

start()
