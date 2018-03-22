# versionize

Small package that generate package version and run `npm version` based on current version, HEAD branch and commit hash.

For example:

`1.0.2-branch-name-6178a07d`

It's usefull for publishing pre-version of package for test in production environments.




## Install

```sh
yarn add versionize --dev
```
or
```sh
npm i versionize --save-dev
```
## Usage

Add script into your npm scripts:

```json
{
  "name": "your-project",
  "scripts": {
    "versionize": "versionize"
  }
}
```

Run

```sh
yarn versionize
```
or
```sh
npm run versionize
```

## License

MIT © [kupibilet.ru](https://kupibilet.ru)
