# Lokalise
## Quality Engineering - Take Home Assignment


[![Build Status](https://github.com/smcostareis/Lokalise-Challenge/actions/workflows/playwright.yml/badge.svg)]()

### Project Description
For this take home assignment I've decided to create a [Playwright](https://playwright.dev/ ) testing framework with a Page Object pattern.
I've also created a [GitHub actions Workflow](https://github.com/smcostareis/Lokalise-Challenge/actions/workflows/playwright.yml) where its possible to trigger the test scenarios manually/on push or merge.

### Install and Run the Project
After cloning the repo,

Run the command to install the project:
`$ npm install`
Run the command to run the project: 
`$ npx playwright test --workers=1`

This project requires [Node.js](https://nodejs.org/) v14+ to run.

### Improvements 

Nothing is final and everything can be improved. 
Given the time to deliver this project was limitted, I also wanted to refer some points I think that I could add and Improve:

- Make cross-browser work in the CI
- Add Visual Regression Tests
- Add Docker container
- Create seeded data for the preconditions directly through the relevant API endpoints
- Performance Tests

### Comments
This was a real fun and useful exercise to do, it allowed me get to know Lokalise a little bit better.
Thank you very much for the opportunity :) 