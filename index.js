#!/usr/bin/env node

const shell = require('shelljs')
const slug = require('slug')
const finder = require('find-package-json')
const semver = require('semver')

slug.charmap['/'] = '-'

const finding = finder()
const { version } = finding.next().value
const validVersion = semver.valid(semver.coerce(version))

const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout
const lastCommitHash = shell.exec("git log --pretty=format:'%h' -n 1", { silent: true }).stdout

const slugRefBranch = slug(currentBranch).trim()

const buildVersion = `${validVersion}-${slugRefBranch}-${lastCommitHash}`

shell.echo(`new version of package: ${buildVersion}`)

const { code } = shell.exec(`npm version ${buildVersion}`)

if (code) process.exit(code)
