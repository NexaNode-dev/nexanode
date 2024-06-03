# Frontend Applications in an NX Workspace

When building frontend applications within an NX workspace, adhering to best practices is crucial for maintaining a scalable, manageable codebase. A key principle is keeping the application codebase lean, focusing on importing necessary libraries and adding specific configurations as needed. This document outlines the approach for structuring frontend applications in an NX workspace, emphasizing the importance of leveraging libraries for most of the application logic.

## Structuring Frontend Applications

### Lean Codebase Philosophy

The primary goal for any application within an NX workspace is to minimize the amount of application-specific code. Instead, functionality should be encapsulated within libraries that the application imports. This approach promotes code reuse, simplifies testing, and enhances the overall maintainability of the codebase.

### Application Setup

When creating a new frontend application in NX, the focus should be on configuring the application environment, routing, and integrating libraries that contain the business logic, UI components, state management, and data access layers.

**Creating a New Frontend Application:**

Use the NX Console plugin for the IDE!!!

This generates a command that scaffolds a new application with a basic setup. The next steps involve integrating feature libraries, UI component libraries, and state management libraries that have been developed within the workspace.

### Integrating Libraries

1. **Feature Libraries:** Import feature libraries that encapsulate specific business logic and functionality. This might include user management, dashboard functionality, or other domain-specific features.

2. **UI Libraries:** Utilize shared UI component libraries for consistent styling and behavior across your frontend applications. These libraries should contain all the reusable UI elements like buttons, forms, modals, etc.

3. **State Management:** If using state management libraries like NgRx for Angular or Redux for React, ensure that the application imports the core state management library and any domain-specific state slices from within the workspace.

4. **Data Access Libraries:** Incorporate data access libraries to abstract away the HTTP communication with backend services. These libraries provide a unified interface for the application to interact with backend APIs.

### Application Configuration

Beyond importing libraries, frontend applications might require specific configurations, such as:

- **Environment Configuration:** Setting up different environments (development, production) and configuring environment-specific variables.

- **Routing Configuration:** Defining the application routes, lazy loading modules (for Angular), or setting up dynamic route handling (for React).

- **Customization:** While libraries provide the bulk of the functionality, applications can include customization or configuration layers that tailor the libraries for specific use cases or integrate them in a particular way unique to the application.

## Best Practices

- **Consistency Across Applications:** Maintain consistency in how applications are structured and configured within the NX workspace to simplify understanding and development across multiple frontend projects.

- **Maximize Library Usage:** Strive to implement as much functionality as possible within reusable libraries rather than within the application itself to leverage NX's powerful code-sharing capabilities.

- **Regular Refactoring:** As applications evolve, regularly refactor and evaluate the codebase to identify opportunities to extract application logic into libraries or to consolidate and simplify existing libraries.

By following these guidelines and structuring frontend applications to be lean and focused primarily on integrating libraries, teams can achieve a highly modular, maintainable, and scalable codebase within an NX workspace.

### Example: Integrating a Feature Library in Angular

Assuming you have a feature library `frontend-feature-user-management` that includes a user listing component, here's how you could integrate it into your Angular application using the standalone component approach.

**1. Feature Library Component (UserListComponent):**

In your feature library, ensure the component is marked as standalone:

```typescript
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'myorg-user-list',
  template: `<!-- User list template -->`,
  standalone: true,
  imports: [CommonModule],
})
export class UserListComponent {}
```

**2. App Module (AppModule):**

With Angular's standalone component approach, you can directly import the `UserListComponent` into your application module or any other module where you wish to use it, without needing to import the entire module.

In your main application, you can dynamically import the component for routes or directly use it in templates:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// Assume UserListComponent is exported and can be imported directly
import { UserListComponent } from '@myorg/frontend-feature-user-management';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    loadComponent: () => import('@myorg/frontend-feature-user-management').then((m) => m.UserListComponent),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

This code snippet shows how you can set up a route to dynamically load the `UserListComponent` as a standalone component. This reduces the initial load time by only loading the component when the route is activated.

### Benefits of Standalone Components

- **Modularity:** Standalone components promote a more modular architecture by allowing components to be imported and used without the need for a surrounding module.
- **Simplicity:** Reduces the boilerplate associated with Angular modules, making the codebase simpler and more straightforward to navigate.
- **Lazy Loading:** Facilitates easier lazy loading of components, improving application performance by loading components only when needed.

For integrating a feature library into a React application, let's use a similar example where we have a feature library `frontend-feature-user-management` that includes a UserList component for displaying users. React's approach is inherently modular, making the integration straightforward.

### Example: Integrating a Feature Library in React

Assuming you have a `UserList` component in your feature library, you would first export it from the library, and then you can directly import and use it in your React application.

**1. Feature Library Component (UserList.js):**

This is your `UserList` component in the feature library:

```javascript
import React from 'react';

const UserList = () => (
  <div>
    {/* User list implementation */}
    <p>List of Users</p>
    {/* Map through your users here */}
  </div>
);

export default UserList;
```

**2. Integrating the UserList in Your React App:**

Then, in your React application, you simply import and use the `UserList` component where needed:

```javascript
import React from 'react';
import UserList from '@myorg/frontend-feature-user-management';

const App = () => (
  <div>
    <h1>Users</h1>
    <UserList />
  </div>
);

export default App;
```

This example shows how you can integrate reusable components from your libraries into your main application. In a monorepo setup managed with NX, this approach facilitates sharing code across multiple applications, streamlining development and maintenance processes.
