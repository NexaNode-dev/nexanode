# CI/CD Pipeline with GitHub Actions and NX Cloud

This guide outlines the Continuous Integration and Continuous Deployment (CI/CD) pipeline for our project using GitHub Actions and NX Cloud. Our approach leverages the strengths of both platforms to ensure a smooth, efficient, and reliable development process.

## Overview

Our CI/CD pipeline is designed to automate the processes of integrating new code changes, testing, and deploying our applications. Using GitHub Actions, we automate our workflows directly within our GitHub repository, while NX Cloud provides us with intelligent, distributed caching and insights into our builds and tests.

## Setting Up GitHub Actions

1. **Create a `.github/workflows` Directory**: This directory will contain all our GitHub Actions workflow files.

2. **Define Workflow Files**: Create YAML files within the `.github/workflows` directory to define your CI/CD workflows. A basic CI workflow might include steps for installing dependencies, running tests, and building your application.

3. **Triggering Workflows**: Workflows can be triggered on various events, such as `push` to specific branches, `pull_request` events, or even on a schedule.

## Integrating NX Cloud

1. **Setup NX Cloud**: Sign up for NX Cloud and link it to your GitHub repository to start utilizing distributed caching and insights.

2. **Configure NX in your Project**: Ensure your `nx.json` file is configured to use NX Cloud by setting the `nxCloud` property to `true`.

3. **Enhancing GitHub Actions with NX Cloud**: Utilize NX Cloud's distributed caching in your GitHub Actions workflows by using NX commands for building, testing, and linting. NX Cloud will automatically cache these operations, significantly reducing build and test times.

## Example Workflow

Here is an example of a basic GitHub Actions workflow integrated with NX Cloud for a Node.js project:

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:

permissions:
  actions: read
  contents: read

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      # Connect your workspace on nx.app and uncomment this to enable task distribution.
      # The "--stop-agents-after" is optional, but allows idle agents to shut down once the "build" targets have been requested
      # - run: yarn nx-cloud start-ci-run --distribute-on="5 linux-medium-js" --stop-agents-after="build"

      # Cache node_modules
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "yarn"
      - run: yarn install --frozen-lockfile
      - uses: nrwl/nx-set-shas@v4

      - run: yarn nx-cloud record -- nx format:check
      - run: yarn nx affected -t lint test build
```

This workflow checks out the code, sets up Node.js, installs dependencies, and then uses NX to run build and test commands only on affected projects, leveraging NX Cloud's caching to speed up the process.

## Best Practices

- **Optimize Workflow Triggers**: Be strategic about the events that trigger your workflows to avoid unnecessary runs.

- **Utilize NX Cloud Insights**: Regularly review insights provided by NX Cloud to identify bottlenecks and optimize your development workflow.

- **Parallelize Tasks**: Take advantage of NX's ability to parallelize tasks to reduce your CI/CD pipeline's execution time.

- **Secure Secrets**: Use GitHub Actions secrets to securely store and use sensitive information like API keys or access tokens.

## Conclusion

Integrating GitHub Actions with NX Cloud for our CI/CD pipeline offers a powerful, efficient, and scalable approach to automating our development workflows. By following these guidelines and best practices, we can ensure a high-quality and efficient development process.
