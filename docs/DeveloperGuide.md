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

## Commit Message Guidelines

We enforce a conventional commit message format that simplifies the creation of human and machine-readable commit histories. This format facilitates semantic versioning and simplifies the automation of changelog generation.

### Conventional Commits

A conventional commit message should be structured as follows:

```
<type>(<scope>): <description>
```

- **Type**: This indicates the purpose of the commit and its impact on the version number (based on semantic versioning). Common types include:

  - `feat`: A new feature (minor version bump).
  - `fix`: A bug fix (patch version bump).
  - `docs`: Documentation changes.
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
  - `refactor`: A code change that neither fixes a bug nor adds a feature.
  - `perf`: A code change that improves performance.
  - `test`: Adding missing tests or correcting existing tests.
  - `chore`: Other changes that don't modify `src` or `test` files.

- **Scope**: The scope could be anything specifying the place of the commit change (e.g., `users-data-access`). It provides additional contextual information on the impact of the change.

- **Description**: A brief, imperative mood description of the change.

### Example Commit Message

```
feat(users-data-access): add email verification flow
```

This message indicates that a new feature has been added to the `users-data-access` library, specifically an email verification flow.

### Benefits of Conventional Commits

- **Automated Semantic Versioning**: Using tools like [semantic-release](https://semantic-release.gitbook.io/), version numbers and changelogs can be automatically generated based on the commit messages.
- **Improved Readability**: The structured format makes it easier to understand the nature and scope of changes at a glance.
- **Facilitates Team Collaboration**: Enforces a standardized commit message format, making it easier for team members to follow along and understand the project's history.

### Splitting Commits for Multi-Library Changes

When making changes that affect multiple libraries within our project, we strive for clarity and manageability in our commit history. To achieve this, we recommend splitting the work into smaller, atomic commits that target specific libraries or areas of the project. This approach not only facilitates easier code review and potential rollback but also enhances the traceability of changes across the project.

#### Guidelines for Splitting Commits:

1. **Atomic Commits:** Each commit should encapsulate a complete and self-contained change to a single library or a specific area of the project. This makes the commit easier to understand, review, and, if necessary, revert without impacting unrelated parts of the project.

2. **Descriptive Messages:** Use descriptive commit messages that clearly articulate the scope and nature of the changes. Include the library or area being affected and a brief description of what was done and why, if not immediately obvious.

3. **Example Commit Messages:**

   - `feat(users-data-access): optimize user data-fetching`
   - `feat(articles-data-access): add batch request support`
   - `feat(comments-data-access): implement caching to improve performance`

   These messages clearly indicate the area affected by the changes and the nature of the improvement or feature added.

4. **Cross-Reference Related Commits:** If your commits are part of a larger feature or refactor that spans multiple libraries, reference related commits or the overarching pull request in your commit messages or pull request descriptions. This helps maintain the context and relationships between changes.

5. **Use Pull Requests for Comprehensive Changes:** For complex changes that require modifications across multiple libraries, encapsulate these changes within a single pull request. Use the pull request description to detail the scope of the changes, the libraries affected, and any relevant details that would aid in the review process.

## Further Reading

For more detailed guidance on specific development aspects, please explore the documentation in the `/docs` directory:

- [Domain Interfaces](domain-interfaces.md)
- [Data Transfer Objects](dtos.md)
- [Backend Data Access](backend-data-access.md)
- [Backend Application Layer](backend-application-layer.md)
- [Backend Presentation](backend-presentation.md)
- [Frontend Data Access](frontend-data-access.md)
- [Frontend Feature](frontend-feature.md)
- [Frontend UI](frontend-ui.md)
- [Frontend State Management](frontend-state.md)
- [Backend Apps](backend-app.md)
- [Frontend Apps](frontend-app.md)
- [Testing Guidelines](testing-guidelines.md)
- [CI/CD Pipeline](ci-cd-pipeline.md)

## Need Help?

If you have questions or need further clarification, don't hesitate to reach out by [opening an issue](https://github.com/NexaNode_dev/nexanode/issues) on GitHub.

Thank you for contributing to NexaNode. Together, we're building something amazing!
