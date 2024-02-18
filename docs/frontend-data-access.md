# Frontend Data Access Libraries

Creating frontend data access libraries involves encapsulating HTTP request logic to interact with backend APIs. These libraries serve as a bridge between the UI components and the backend services, ensuring modularity and reusability. Below, we present how to implement data access libraries in Angular and React, two popular frontend frameworks.

## Angular

Angular data access libraries typically consist of services using the `HttpClient` module for HTTP requests. These services can be injected across components and other services within an Angular application.

### Service Implementation

#### UserService Example

```typescript
// src/app/data-access/user.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user.interface"; // Assume User interface is defined in a shared location

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "https://api.example.com/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

This Angular service demonstrates basic CRUD operations, making it a foundational piece for interacting with user data in an Angular application.

## React

In React, data access can be managed through custom hooks that encapsulate the logic for making HTTP requests, using either the native `fetch` API or a third-party library like Axios.

### Custom Hook Implementation

#### useUsers Hook Example

```javascript
// src/hooks/useUsers.js
import { useState, useEffect } from "react";
import axios from "axios";

const useUsers = (url = "https://api.example.com/users") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

This React hook (`useUsers`) is an example of how to fetch and manage user data within React components. It leverages `axios` for HTTP requests and the React hook pattern to manage state and side effects, providing a clean and reusable way to access user data.

Both Angular services and React hooks offer structured approaches to handle data fetching and manipulation, promoting clean code practices and the separation of concerns within frontend applications. Implementing these patterns in your project can significantly improve the maintainability and scalability of your codebase.
