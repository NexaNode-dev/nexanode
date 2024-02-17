# Getting Started with NexaNode

Welcome to NexaNode! This guide is designed to help you set up your development environment and start working on NexaNode projects efficiently. Follow these steps to get up and running.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (LTS version)
- Yarn package manager
- Git
- Nx CLI (Install via `npm install -g nx` or `yarn global add nx`)

## Cloning the Repository

1. Open a terminal or command prompt.
2. Clone the NexaNode repository using Git:
   ```bash
   git clone https://github.com/NexaNode_dev/nexanode.git
   ```
3. Navigate into the project directory:
   ```bash
   cd NexaNode
   ```

## Installing Dependencies

NexaNode uses Yarn to manage its dependencies. To install them, run the following command in the root of your project directory:

```bash
cd NexaNode
```

## Running the Application

NexaNode is structured as a monorepo, containing multiple applications and libraries. To serve a specific application locally:

1. Use the Nx CLI to serve an application. For example, to serve a web application named web-app, run:

```bash
yarn nx serve web-app
```

2. Replace `web-app` with the actual name of the application you wish to serve.
   To serve a mobile application, ensure you have the appropriate mobile development environment set up, then run:

```bash
yarn nx serve web-app
```

Again, replace `mobile-app` with the name of your mobile application.

## Next Steps

Now that you've set up your development environment and familiarized yourself with the project structure, here are your next steps to dive deeper into NexaNode:

- **Explore the Documentation**: For a comprehensive understanding of NexaNode's architecture and development practices, refer to our detailed documentation:

  - [Architecture Overview](ARCHITECTURE.md): Learn about the design principles and architectural choices behind NexaNode.
  - [Developer Guide](docs/DeveloperGuide.md): Dive into coding conventions, best practices, and how to make the most of Nx within the NexaNode ecosystem.

- **Start Coding**: Begin by exploring existing code within the `/apps` and `/libs` directories. Try modifying a library or adding a new feature to an application to see your changes in action.

- **Contribute**: Ready to make your first contribution? Check out our [Contributing Guidelines](CONTRIBUTING.md) for information on how to propose bug fixes, improvements, or new features. Your contributions are what make NexaNode thrive.

## Stay Engaged

- **Join the Community**: Connect with other NexaNode developers by joining our chat on [Discord](#).
- **Follow Updates**: Keep an eye on the project's [GitHub Issues](https://github.com/NexaNode_dev/nexanode/issues) and [Pull Requests](https://github.com/NexaNode_dev/nexanode/pulls) for the latest discussions and updates.

## Need Help?

- If you encounter any issues or have questions as you work with NexaNode, please don't hesitate to [open an issue](https://github.com/NexaNode_dev/nexanode/issues) on GitHub. Our community is here to help you succeed.

Thank you for contributing to NexaNode. We're excited to see what you'll build!
