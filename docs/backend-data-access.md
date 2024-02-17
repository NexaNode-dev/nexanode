# Backend Data Access Layer

The data access layer is a critical component of the NexaNode backend architecture. It encapsulates all interactions with data sources, such as databases and external APIs, providing a clean and efficient way to fetch, create, update, and delete data.

## Overview

This guide outlines best practices for structuring the data access layer in NexaNode, including the organization of models, repositories, and data services, and recommendations for implementing these patterns.

## Principles

- **Abstraction:** Abstract away the complexities of direct database interactions, providing a simple interface for the business logic layer to interact with data.
- **Modularity:** Keep data access logic modular and cohesive, separating concerns for maintainability and scalability.
- **Encapsulation:** Encapsulate data logic within relevant data access objects to prevent data leaks and ensure data integrity.

## Structure

### Models

Define models to represent the data entities in your application. Models should mirror your database schema but also be designed to cater to the needs of your application's business logic.

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

### Repositories

Repositories act as the bridge between your models and the rest of your application. They should contain all the logic needed to query and manipulate data for a single entity.

```typescript
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Additional methods for create, update, delete...
}
```

### Best Practices

- Use the Repository Pattern: Each entity should have its own repository class that handles all data interactions.
- Single Responsibility Principle: Keep your data access classes focused on a single purpose—either handling database operations for a single model or encapsulating complex data logic.
- DRY Principle: Don't repeat yourself. Abstract common database operations into reusable methods or classes.
- Testability: Design your data access layer to be easily testable, mocking databases or external services as needed.

## Handling Entity Relationships

In NexaNode, to maximize modularity and maintain a clean separation of concerns, entity relationships are not directly defined within entities using TypeORM's relationship decorators (`@OneToMany`, `@ManyToOne`, etc.). Instead, we adopt the following practices:

### Many-to-Many Relationships

- **Separate Data-Access Libraries:** For many-to-many relationships, we create separate entities in dedicated data-access libraries. These entities specifically handle the relationship linking, ensuring that our main entities remain clean and focused on their primary purpose.

Example:

```typescript
@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;
}
```

This `UserProject` entity would reside in a library such as /libs/shared/data-access/user-projects.

### One-to-One and One-to-Many Relationships

- **Application Layer Management**: Relationships that are one-to-one or one-to-many are handled within the application layer. This approach allows us to encapsulate the logic for managing these relationships, providing a more cohesive and modular structure.
  For instance, when associating a user with multiple addresses (one-to-many), the service responsible for managing users would also handle the logic to associate, retrieve, and manage user addresses.

### Benefits of This Approach

- **Modularity**: Keeping entities focused on their primary data structure without embedding relational logic directly enhances the modularity of the codebase.
- **Flexibility**: Managing relationships outside of entities gives us more flexibility to change relationship handling mechanisms without affecting the core entity definitions.
- **Separation of Concerns**: This approach adheres to the principle of separation of concerns by delegating relationship management to the application layer or dedicated relationship entities, keeping the domain model clean and focused.

### Implementing Relationships

When implementing relationships, consider using service methods or dedicated relationship managers to encapsulate the logic for adding, removing, or updating relationships between entities. This encapsulation supports a cleaner architecture and makes the system more maintainable and adaptable to changes.

Remember, the key to effective data access layer design in NexaNode is maintaining clarity, modularity, and separation of concerns, ensuring that our application remains scalable and easy to understand.
