# NexaNode

Welcome to NexaNode - your gateway to rapid web and mobile app development. Utilizing the power of Nx, NexaNode offers a unified framework and library ecosystem managed within a monorepo, streamlining the development process across multiple platforms.

## Features

- **Nx-Powered Monorepo:** Leverage Nx for superior monorepo management, optimizing build times and ensuring consistency across projects.
- **Reusable Libraries:** Access a vast collection of pre-built libraries for instant integration, boosting development speed.
- **Cross-Platform Efficiency:** Develop for web, mobile, and beyond with a single codebase, making your apps universally compatible.
- **Developer-Friendly Tools:** From code generation to automated testing, Nx enhances your development workflow with powerful tools.

## Getting Started

Jump into NexaNode development with these steps:

1. **Clone the Repository:**

```bash
git clone https://github.com/NexaNode-dev/nexanode.git
cd nexanode
```

## Getting Started

To set up your development environment for NexaNode, follow these steps:

### Install Dependencies

Once you've cloned the repository, navigate to the project directory. Install the dependencies using Yarn:

```bash
yarn install
```

This command installs all necessary dependencies for the entire monorepo, leveraging Yarn's efficient dependency management system.

### Serve an Application

To start a development server for a specific application with Nx and Yarn, use the following command. For a web application, run:

```bash
yarn nx serve web-app-name
```

Or, for a mobile application (make sure you have the necessary mobile development environment set up):

```bash
nx serve mobile-app-name
```

Yarn will manage the dependencies, while Nx efficiently orchestrates the build and serve processes.

### Explore the Workspace

**Apps**: Located in /apps, this directory contains individual applications. Utilize Nx commands to generate and manage these applications efficiently.
**Libraries**: Shared code libraries are found in /libs. They can be utilized across applications within the workspace, facilitated by Yarn and Nx for dependency management and modular development.

### Documentation

For more detailed information on our project architecture, getting started guides, contribution guidelines, and developer guides, please refer to the following documents:

- [Architecture Overview](ARCHITECTURE.md) - Learn about the structure and design principles behind our project.
- [Getting Started](GETTING_STARTED.md) - Step-by-step guide to set up your development environment and start contributing.
- [Contributing Guidelines](CONTRIBUTING.md) - Information on how to contribute to the project, including code of conduct and pull request processes.
- [Developer Guide](docs/DeveloperGuide.md) - Comprehensive guide on our development practices, including coding standards, testing, commit message standards and more.

## Quick Start

### Contributing

Contributions are warmly welcomed. To contribute to NexaNode, please first review our Contributing Guide. Your insights and improvements help us grow!

### License

NexaNode is open-source, licensed under the MIT license.

### Support

Encountering issues or have questions? Please open an issue here on GitHub.

Your collaboration and feedback make NexaNode better for everyone. Thank you for being part of our journey!
