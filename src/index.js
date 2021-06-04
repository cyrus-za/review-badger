const { formatDistanceToNow } = require('date-fns')
const { getPRs, postSlackMsg } = require('./api.js')
const { GITHUB_REPOSITORY } = require('./constants.js')

function getIntroMsg(numberOfPRs) {
  if (numberOfPRs === 1)
    return `There is 1 PR that still needs to be reviewed or re-reviewed for the repo *${GITHUB_REPOSITORY}*.`

  return `There are ${numberOfPRs} PRs that still need to be reviewed or re-reviewed for the repo *${GITHUB_REPOSITORY}*.`
}

const IGNORED_AUTHORS = ['dependabot[bot]', 'renovate[bot]', 'renovate']

async function start() {
  const { data } = await getPRs()
  const PRsNeedingReview = data
    .filter(PR => !IGNORED_AUTHORS.inclues(PR.user.login))
    .filter(
      PR => PR.assignees.length === 0 && PR.requested_reviewers.length === 0 && PR.draft === false,
    )

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
        ...[].concat(
          ...PRsNeedingReview.map(PR => {
            const { html_url, title, created_at } = PR
            const timeSinceCreation = formatDistanceToNow(new Date(created_at))

            return [
              {
                type: 'divider',
              },
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*<${html_url}|:point_right: ${title}>*`,
                },
              },
              {
                type: 'context',
                elements: [
                  {
                    type: 'mrkdwn',
                    text: `_${timeSinceCreation}_ since pull request was opened`,
                  },
                ],
              },
            ]
          }),
        ),
      ],
    })
  }
}

start()
