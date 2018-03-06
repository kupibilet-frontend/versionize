const shell = require('shelljs');
const { version } = require('./package.json')

const currentBranch = shell.exec("git rev-parse --abbrev-ref HEAD", { silent: true }).stdout
const lastCommitHash = shell.exec("git log --pretty=format:'%h' -n 1", { silent: true }).stdout

const slugRefBranch = currentBranch.replace('/', '-').trim()

const buildVersion = `${version}-${slugRefBranch}-${lastCommitHash}`

shell.exec(`npm version ${buildVersion}`)
