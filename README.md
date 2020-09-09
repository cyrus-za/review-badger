# PR Review Bot

## Example Usage

```yml
name: PR Reviews Reminder

on:
  schedule:
    # Every weekday every 2 hours during working hours, send notification
    - cron: '0 8-17/2 * * 1-5'

jobs:
  pr-reviews-reminder:
    runs-on: ubuntu-latest
    steps:
      - uses: nicklemmon/review-badger@v0.0.1
        env:
          GITHUB_API_TOKEN: ${{ secrets.GITHUB_API_TOKEN }}
          GITHUB_REPO: ${{ secrets.GITHUB_REPOSITORY }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_CHANNEL: ${{ secrets.SLACK_CHANNEL }}
```
