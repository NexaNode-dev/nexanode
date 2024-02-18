# Developer Guide for NexaNode

Welcome to the NexaNode Developer Guide! This document provides an overview of our development practices, general approaches, and naming standards to ensure consistency and quality across the NexaNode project. For detailed guidelines on specific aspects of development, please refer to the respective documentation files within the `/docs` directory.

## General Development Approach

At NexaNode, we strive for clean, maintainable, and efficient code. We encourage contributions that align with these principles and our architectural decisions described in [ARCHITECTURE.md](../ARCHITECTURE.md).

### Key Principles

- **Modularity:** Break down the application into distinct, reusable modules to enhance code reuse and simplify maintenance.
- **Scalability:** Design with scalability in mind, allowing the application to grow seamlessly in features and users.
- **Performance:** Optimize for performance to ensure a smooth user experience across all applications and services.

## Naming Standards

Adhering to consistent naming conventions is crucial for readability and maintainability of the code. Here are our standards:

### General

- **Variables and Functions:** Use camelCase for variable names and function names.
- **Classes and Interfaces:** Use PascalCase for class and interface names.
- **Constants:** Use UPPER_CASE for constants, separating words with underscores.

### Naming of Apps

- **Web Apps:** Name web applications as `<business_name>-frontend`, where `<business_name>` is the name of the app. Place them in the `/apps/<business_name>/frontend` directory.
- **Mobile Apps:** Name mobile applications as `<business_name>-mobile` and place them in the `/apps/<business_name>/mobile` directory.
- **Backend Apps:** Name backend applications as `<business_name>-backend` and place them in the `/apps/<business_name>/backend` directory.

### Naming of Libraries

- **Frontend Libraries:**
  - Data access libraries: `frontend-<domain>-data-access`
  - State management libraries: `frontend-<domain>-state`
  - Feature libraries: `frontend-<domain>-feature`
  - UI libraries: `frontend-<domain>-ui`
- **Mobile Libraries:** Use the same convention as frontend libraries but prefix with `mobile-` instead of `frontend-`.
- **Backend Libraries:**
  - Data access libraries: `backend-<domain>-data-access`
  - Application logic libraries: `backend-<domain>-application`
  - Presentation libraries: `backend-<domain>-presentation`

Place reusable libraries in `/libs/shared/{backend,frontend,mobile}/<type>`, where `<type>` is one of `data-access`, `application`, `presentation`, `state`, `feature`, `UI`.

### App-Specific Libraries

If a library is specific to a certain app and not intended for reuse across the project, prepend `<business_name>` to the library name. For example, `frontend-<business_name>-<domain>-ui` for a UI library specific to a web app. Store these in `/libs/<business_name>/{backend,frontend,mobile}/<type>`.

### Specific to Frontend

- **Components:** Prefix component names with the feature or context (e.g., `UserProfileCard`, `NavigationHeader`).
- **Services:** Suffix service names with `Service` to distinguish them from other types of classes (e.g., `AuthService`, `DataService`).

### Specific to Backend

- **Controllers:** Suffix controller names with `Controller` to clearly identify their role (e.g., `UserController`, `ProductController`).
- **Models:** Use PascalCase for model names, reflecting the entity they represent (e.g., `User`, `Product`).

## Development Workflow

Our development workflow emphasizes collaboration, code quality, and continuous improvement. Key aspects include:

- **Code Reviews:** All contributions are subject to code review to ensure adherence to project standards and quality.
- **Testing:** Comprehensive testing is essential. We aim for high test coverage across unit, integration, and end-to-end tests.
- **CI/CD:** Utilize continuous integration and deployment to automate testing and deployment processes, ensuring reliable application updates.

## Code Formatting with Prettier

Maintaining a consistent code style across our entire codebase is crucial for readability, maintainability, and reducing merge conflicts. To achieve this, we leverage Prettier, an opinionated code formatter that supports many languages and integrates well with most editors.

### Importance of Using Prettier

- **Consistency:** Prettier ensures that all developers contributing to the project follow the same set of formatting rules, leading to a more uniform codebase.
- **Efficiency:** Automating code formatting with Prettier allows developers to focus on the logic and functionality of their code rather than its appearance.
- **Reduced Merge Conflicts:** By standardizing the format of our code files, we minimize the potential for merge conflicts related to styling differences.

### Best Practices

- **Automate Formatting:** Utilize the pre-commit hooks set up by NX to automatically format staged files with Prettier before each commit. This ensures that all committed code adheres to our formatting standards without requiring manual intervention.
- **Editor Integration:** Most IDEs and editors have plugins or built-in support for Prettier. Configure your editor to format files on save or use the format command frequently to keep your code consistently formatted.
- **Code Reviews:** While reviewing code, avoid focusing on stylistic issues that Prettier can automatically fix. This allows reviewers and contributors to concentrate on the quality of the code itself.

### Continuous Integration

Our CI pipeline includes a step to check that all submitted code follows our formatting standards. If a pull request introduces code that is not properly formatted, it will be flagged automatically, and the contributor will be asked to format the code before merging.

By adhering to these practices, we ensure that our project's code is clean, consistent, and easy to work with for all team members. Remember, writing code is not just about making it work but also about making it readable and maintainable for future you and others.

## Further Reading

For more detailed guidance on specific development aspects, please explore the documentation in the `/docs` directory:

- [Domain Interfaces](docs/domain-interfaces.md)
- [Data Transfer Objects](docs/DTOs.md)
- [Backend Data Access](docs/backend-data-access.md)
- [Backend Application Layer](docs/backend-application-layer.md)
- [Backend Presentation](docs/backend-presentation.md)
- [Frontend Data Access](docs/frontend-data-access.md)
- [Frontend Feature](docs/frontend-feature.md)
- [Frontend UI](docs/frontend-ui.md)
- [Frontend State Management](docs/frontend-state.md)
- [Backend Apps](docs/backend-app.md)
- [Frontend Apps](docs/frontend-app.md)
- [Testing Guidelines](docs/testing-guidelines.md)
- [CI/CD Pipeline](docs/ci-cd-pipeline.md)

## Need Help?

If you have questions or need further clarification, don't hesitate to reach out by [opening an issue](https://github.com/NexaNode_dev/nexanode/issues) on GitHub.

Thank you for contributing to NexaNode. Together, we're building something amazing!
