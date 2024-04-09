# Frontend Layout Libraries with StencilJS

Frontend layout libraries are essential for creating consistent, scalable, and maintainable user interfaces across web applications. By leveraging StencilJS within an Nx monorepo, developers can build a collection of layout components that are easily shared and reused across projects. This documentation outlines the process of creating dynamic layout libraries using StencilJS, showcasing a blog layout component as an example to illustrate dynamic configuration capabilities.

## StencilJS for Dynamic Layout Components

StencilJS compiles to Web Components, making it an excellent choice for developing layout libraries. Its compatibility with various frameworks ensures that components are reusable in different contexts. The example below demonstrates how to create a `blog-layout` component that can dynamically adjust its layout based on provided configurations.

### Example: Dynamically Configurable Blog Layout Component

This example shows how to create a `blog-layout` component within an Nx monorepo. The component is designed to be flexible, allowing its structure and style to be dynamically configured through properties (props).

#### Step 1: Generate StencilJS Library in Nx

First, ensure you have the `@nxext/stencil` plugin installed in your Nx workspace. Generate a new Stencil library for your layout components.

```bash
nx generate @nxext/stencil:library layout-lib
```

#### Step 2: Create the Blog Layout Component

Inside the newly created library, add a StencilJS component for the blog layout. This component accepts a `layoutConfig` prop, enabling dynamic configuration.

**libs/layout-lib/src/components/blog-layout/blog-layout.tsx:**
```tsx
import { Component, Prop, h } from '@stencil/core';

interface BlogLayoutConfig {
  showAuthor: boolean;
  titleAlignment: 'left' | 'center' | 'right';
  contentPadding: string;
}

@Component({
  tag: 'blog-layout',
  styleUrl: 'blog-layout.css',
  shadow: true,
})
export class BlogLayout {
  @Prop() title: string;
  @Prop() author: string;
  @Prop() content: string;
  @Prop() layoutConfig: string;

  get config(): BlogLayoutConfig {
    try {
      return JSON.parse(this.layoutConfig);
    } catch (e) {
      console.error('Error parsing layout configuration:', e);
      return { showAuthor: true, titleAlignment: 'left', contentPadding: '20px' };
    }
  }

  render() {
    const { showAuthor, titleAlignment, contentPadding } = this.config;
    return (
      <article style={{ textAlign: titleAlignment, padding: contentPadding }}>
        <h1>{this.title}</h1>
        {showAuthor ? <p>By {this.author}</p> : null}
        <section innerHTML={this.content}></section>
      </article>
    );
  }
}
```

**libs/layout-lib/src/components/blog-layout/blog-layout.css:**
```css
article {
  max-width: 800px;
  margin: auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
h1 {
  font-size: 24px;
}
p {
  font-style: italic;
}
```

### Integrating Layout Components

StencilJS components, being standard Web Components, can be integrated into any project:

- **In Angular Applications**: Import the custom elements schema in your Angular module and use the component directly in your templates.

- **In React Applications**: Use the custom element in JSX, ensuring the StencilJS component script is included in your project.

- **In Plain HTML**: Include the script for the compiled StencilJS components and use the `blog-layout` directly in your HTML.

### Building and Sharing Components in Nx Monorepo

Compile your StencilJS library using Nx's powerful build tools:

```bash
nx build layout-lib
```

Make sure to export your components in the library's `index.ts` for easy importing across your projects:

```typescript
export * from './components';
```

### Using the Component with Dynamic Configuration

The `blog-layout` component can be dynamically configured using the `layout-config` property:

```html
<blog-layout
  title="Welcome to Our Blog"
  author="John Doe"
  content="<p>This is a dynamically configured blog post layout.</p>"
  layout-config='{"showAuthor": false, "titleAlignment": "center", "contentPadding": "30px"}'>
</blog-layout>
```

### Conclusion

Utilizing StencilJS to create frontend layout libraries within an Nx monorepo offers significant advantages, including enhanced code reusability, framework agnosticism, and the ability to dynamically configure layouts. The `blog-layout` component exemplifies how developers can build versatile, maintainable UI structures, streamlining development across large-scale projects and diverse tech stacks.