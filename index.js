#!/usr/bin/env node

const shell = require('shelljs')
const slug = require('slug')
const finder = require('find-package-json')
const semver = require('semver')

const {
  TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_COMMIT,
  CI_COMMIT_REF_NAME,
  CI_COMMIT_SHA,
} = process.env

slug.charmap['/'] = '-'

const finding = finder()
const { version } = finding.next().value
const validVersion = semver.valid(semver.coerce(version))

let currentBranch = ''
let lastCommitHash = ''

// For Travis environment
if (TRAVIS_PULL_REQUEST_BRANCH && TRAVIS_COMMIT) {
  currentBranch = TRAVIS_PULL_REQUEST_BRANCH
  lastCommitHash = TRAVIS_COMMIT
// For GitLab environment
} else if (CI_COMMIT_REF_NAME && CI_COMMIT_SHA) {
  currentBranch = CI_COMMIT_REF_NAME
  lastCommitHash = CI_COMMIT_SHA
} else {
  currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout
  lastCommitHash = shell.exec("git log --pretty=format:'%h' -n 1", { silent: true }).stdout
}

// Slicing first 8 symbols from commit hash for Travis ans GitLab
lastCommitHash = lastCommitHash.slice(0, 8)

const slugRefBranch = slug(currentBranch).trim()

const buildVersion = `${validVersion}-${slugRefBranch}-${lastCommitHash}`

shell.echo(`new version of package: ${buildVersion}`)
shell.exec(`npm version ${buildVersion}`)
