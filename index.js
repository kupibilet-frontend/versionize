const shell = require('shelljs')
const slug = require('slug')
const path = require('path')
const finder = require('find-package-json')

slug.charmap['/'] = '-'

const finding = finder()
const { version } = finding.next().value

const currentBranch = shell.exec("git rev-parse --abbrev-ref HEAD", { silent: true }).stdout
const lastCommitHash = shell.exec("git log --pretty=format:'%h' -n 1", { silent: true }).stdout

const slugRefBranch = slug(currentBranch).trim()

const buildVersion = `${version}-${slugRefBranch}-${lastCommitHash}`

shell.echo(`new version of package: ${buildVersion}`)
shell.exec(`npm version ${buildVersion}`)
