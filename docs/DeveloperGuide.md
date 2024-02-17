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

## Further Reading

For more detailed guidance on specific development aspects, please explore the documentation in the `/docs` directory:

- [Backend Data Access](docs/backend-data-access.md)
- [Frontend Data Access](docs/frontend-data-access.md)
- [State Management](docs/frontend-state-management.md)
- [Testing Guidelines](docs/testing-guidelines.md)
- [CI/CD Pipeline](docs/ci-cd-pipeline.md)

## Need Help?

If you have questions or need further clarification, don't hesitate to reach out by [opening an issue](https://github.com/NexaNode_dev/nexanode/issues) on GitHub.

Thank you for contributing to NexaNode. Together, we're building something amazing!
