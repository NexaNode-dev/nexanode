# Architecture of NexaNode

NexaNode is designed to be a versatile and scalable framework for web and mobile app development. It adopts a pragmatic approach to architecture, utilizing a three-tier architecture as its default while offering the flexibility to implement a hexagonal architecture for more complex or enterprise-level applications. This document outlines the high-level structure of both the backend and frontend components of NexaNode, providing insight into our architectural decisions and organization.

## General Architecture

NexaNode follows a **three-tier architecture** by default, which is segmented into the presentation, application (business logic), and data layers. This architecture provides a clear separation of concerns, facilitating easier maintenance and scalability. For scenarios requiring more complex interactions or where domain-driven design is paramount, **hexagonal architecture** is employed to further decouple the core logic from external concerns such as user interfaces and data storage.

## High-Level Structure

### Backend

The backend architecture of NexaNode is organized into several key libraries, each serving a distinct layer of the three-tier architecture:

- **Data-Access Libraries:** These libraries are responsible for interactions with databases and other storage solutions, forming the data layer of the application. They abstract the complexity of data storage and retrieval, providing a clean interface for the application layer to consume data.

- **Application Libraries:** Containing services that encapsulate the business logic of the application, these libraries sit at the application layer. They orchestrate data flow between the presentation layer and the data layer, ensuring business rules are consistently applied.

- **Presentation Libraries:** These libraries include controllers that handle API endpoints, facilitating communication between the frontend and backend. They translate user actions and data from the frontend into operations performed by the application layer.

### Frontend

The frontend structure is similarly organized to promote modularity and ease of development:

- **Data-Access Libraries:** Responsible for communicating with the backend API endpoints, these libraries ensure that frontend components can access and manipulate data as needed.

- **State Libraries (Optional):** For applications requiring advanced state management, libraries such as Redux or NgRx are utilized. These are especially useful in large-scale applications to maintain consistency and predictability of the application state.

- **Feature Libraries:** Encapsulating the business logic specific to features within the application, these libraries bridge the gap between the data-access layer and the UI, ensuring that business requirements are met.

- **UI Libraries:** Focused on presentation, these libraries contain reusable UI components and styling definitions. They define the look and feel of the application, providing a consistent user experience across the application.

## DevOps and CI/CD

NexaNode leverages **GitHub Actions** for Continuous Integration and Continuous Deployment (CI/CD), automating the workflow from code changes to deployment. This approach ensures that every commit is built and tested automatically, maintaining high code quality and enabling rapid deployment of new features and bug fixes.

In addition, we utilize **Nx's default tooling** for linting, testing, building, and deploying applications. Nx provides out-of-the-box support for these tasks, streamlining the development process and ensuring consistency across the monorepo. By leveraging Nx, we can efficiently manage project dependencies, enforce coding standards, and execute automated tests, all within a unified development environment.

## Conclusion

By adhering to these architectural principles and leveraging advanced tooling like GitHub Actions and Nx, NexaNode aims to provide a robust framework for rapidly developing web and mobile applications. Our architecture is designed to be flexible, scalable, and maintainable, catering to a wide range of application complexities and business requirements.
