## Contributing guidelines

### Setup local development

1. clone this repo
2. have `yarn` install package dependencies and manage the symlinking between packages for you

```sh
git clone ...encodable && cd encodable
yarn install
yarn build
```

### File organization

[lerna](https://github.com/lerna/lerna/) and [yarn](https://yarnpkg.com) are used to manage versions
and dependencies between packages in this monorepo.

```
encodable/
  lerna.json
  package.json
  ...
  packages/
    package1/
      package.json
      ...
      src/
      test/  # unit tests
      types/ # typescript type declarations
      ...
      lib/   # commonjs output
      esm/   # es module output
      ...
    ...
```

### Builds, linting, and testing

Each package defines its own build config, linting, and testing. You can have lerna run commands
across all packages using the syntax `yarn run test` (or `yarn run test:watch` for watch mode) from
the root `encodable` directory.

### Committing

This repository follows
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit
messages and has a `commitlint` hook which will require you to have the valid commit message before
committing. You can use `npm run commit` to help you create a commit message.

### Publishing (via ci)

```sh
npm run changelog
git cm "docs: update changelog"
npm run bump-version
# Then follow the prompt to pick new versions for each package
```

### Publishing (manual)

**Prerequisite:** You'll need an [npmjs.com](https://npmjs.com) account that is part of the
`encodable` admin.

1. Make sure you're logged in to NPM from your shell. Run `npm login` if necessary.
2. To make the release, run `yarn release` and follow the prompts.
