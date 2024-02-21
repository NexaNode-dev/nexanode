# Backend Presentation Layer

The presentation layer in a backend architecture is crucial for defining how your application communicates with the outside world. This guide focuses on structuring API endpoints to manage user-related operations effectively.

## Controllers

Controllers are responsible for handling incoming HTTP requests and returning responses to the client. They act as the bridge between the user and the application's core functionalities.

### Example: UserController

Below is an example of a `UserController` that demonstrates basic CRUD operations for user data within an application:

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "../application/user.service";
import { CreateUserDto, UpdateUserDto } from "../domain/dtos";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(":id")
  async getUserById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(":id")
  async updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
```

In this example, the `UserController` utilizes the `UserService` to perform operations, demonstrating how the presentation layer interacts with the application layer. It includes methods for fetching all users, fetching a single user by ID, creating a new user, updating an existing user, and deleting a user.

### Handling Requests and Responses

- **Routes**: Define clear and RESTful routes that reflect the actions being performed on the resources.
- **Parameters and Payloads**: Utilize decorators like @Param and @Body to handle dynamic route parameters and request bodies.
- **Response Status Codes**: Ensure that your controllers return appropriate HTTP status codes that reflect the outcome of the request.

### Best Practices

- **Separation of Concerns**: Keep your controllers focused on handling HTTP requests and delegating business logic to the services.
- **Validation**: Use DTOs (Data Transfer Objects) for validating incoming data to ensure that it meets the expected format and constraints before processing.
- **Error Handling**: Implement comprehensive error handling within your controllers to catch and respond to potential errors in a way that is informative for the client.

By adhering to these principles and structuring your backend presentation layer effectively, you can create a robust and scalable API that serves as a reliable interface for your application.
