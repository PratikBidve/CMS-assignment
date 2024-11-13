# CMS with WYSIWYG Editor, Preview Mode, and Plugin Architecture

## Overview
This CMS application is built with **Next.js** and provides a WYSIWYG editor for rich text formatting, a preview mode for viewing content before publishing, and a **plugin architecture** to extend functionality by adding custom components or blocks.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Database Setup](#database-setup)
3. [API Endpoints](#api-endpoints)
   - [Post Endpoints](#post-endpoints)
   - [Page Endpoints](#page-endpoints)
4. [Plugin System](#plugin-system)
   - [Example Plugin: Image Slider](#example-plugin-image-slider)
5. [WYSIWYG Editor Integration](#wysiwyg-editor-integration)
6. [Preview Mode](#preview-mode)
7. [Deployment](#deployment)

---

## Getting Started

To run this project locally:

```bash
npm install
npm run dev
```

If using docker simply run in the termnial : `docker compose up --build`

Once this is done you can visit the 

Then, open [http://localhost:3000] in your browser to view the app.

`http://localhost:3000/posts`,  to make Crud operations for posts.

`http://localhost:3000/pages`,  to make Crud operations for pages. 


### Folder Structure
- **`app`**: Main application folder containing routes and components.
- **`utils/plugins`**: Plugin management system, where custom plugins can be registered and used in the CMS.
- **`components`**: Reusable UI components for posts, pages, and plugins.

---

## Database Setup

The CMS uses PostgreSQL for data storage. Use the following SQL commands to create the required tables, 
or run the `docker compose up --build` command to initialize the database with these tables automatically:

```sql
CREATE TABLE Post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Page (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Post Endpoints

| Operation          | Endpoint               | Method | Description |
|--------------------|------------------------|--------|-------------|
| **Create Post**    | `/api/posts/create`    | `POST` | Creates a new post |
| **Get All Posts**  | `/api/posts/all`       | `GET`  | Retrieves all posts |
| **Get Post by ID** | `/api/posts/get/{id}`  | `GET`  | Fetches a post by ID |
| **Update Post**    | `/api/posts/update/{id}` | `PUT` | Updates a post by ID |
| **Delete Post**    | `/api/posts/delete/{id}` | `DELETE` | Deletes a post by ID |

### Page Endpoints

| Operation          | Endpoint               | Method | Description |
|--------------------|------------------------|--------|-------------|
| **Create Page**    | `/api/pages/create`    | `POST` | Creates a new page |
| **Get All Pages**  | `/api/pages/all`       | `GET`  | Retrieves all pages |
| **Get Page by ID** | `/api/pages/get/{id}`  | `GET`  | Fetches a page by ID |
| **Update Page**    | `/api/pages/update/{id}` | `PUT` | Updates a page by ID |
| **Delete Page**    | `/api/pages/delete/{id}` | `DELETE` | Deletes a page by ID |

---


## Plugin System

### Overview
The plugin architecture allows developers to extend the CMS's core capabilities. Each plugin can:
- Register custom content blocks or components.
- Modify CMS behavior and appearance.

### Example Plugin: Image Slider
This example demonstrates how to add an image slider plugin with a full-screen preview feature.

#### Creating a Plugin
To create a new plugin:
1. Define the component in `utils/plugins/[plugin-name].ts`.
2. Register the plugin using `registerPlugin`.

```typescript
// utils/plugins/imageSliderPlugin.tsx
import { registerPlugin } from '../utils/plugins/pluginManager';

const ImageSlider = ({ images, onImageClick }) => {
  // Slider component logic with preview here
};

registerPlugin({
  name: 'ImageSliderPlugin',
  components: { ImageSlider },
  initialize: () => console.log('ImageSliderPlugin initialized'),
});
```

#### Registering the Plugin
Ensure the plugin file is imported in your main page or component to register it on startup.

---

## WYSIWYG Editor Integration

The CMS uses the TinyMCE WYSIWYG editor for rich text editing. This editor allows users to format content visually. The `Editor` component from `@tinymce/tinymce-react` has been integrated into the CMS, supporting features like:
- Bold, italic, and underline text.
- Adding images and links.
- Bullet lists and numbering.

**Example Usage**:

```jsx
import { Editor } from '@tinymce/tinymce-react';

<Editor
  apiKey="your-tinymce-api-key"
  init={{
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
  }}
  onEditorChange={(content) => setContent(content)}
/>
```

### TypeScript Integration
When using TinyMCE with TypeScript, ensure you specify types for props such as `onEditorChange` for accurate error-free usage.

---

## Preview Mode

### Overview
The Preview Mode allows users to view formatted content as it will appear live, prior to publishing.

### Usage in Forms
The preview mode has been added to both `PostForm` and `PageForm` components. It toggles between edit and preview views to enable users to check their content visually.

**Example:**

```typescript
const [isPreview, setIsPreview] = useState(false);

<button onClick={() => setIsPreview(!isPreview)}>
  {isPreview ? "Back to Edit" : "Preview"}
</button>

{isPreview ? (
  <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
) : (
  <Editor
    initialValue={content}
    onEditorChange={(newContent) => setContent(newContent)}
  />
)}
```

### Key Features
- Preview is triggered by a button, allowing users to toggle back to editing.
- Full formatting from the TinyMCE editor is displayed.

---

## Deployment

To deploy this CMS, follow these instructions:

1. **Platform**: We recommend Vercel or Railway for easy setup with Next.js.
2. **Environment Variables**:
   - Database URL for PostgreSQL
   - TinyMCE API Key for WYSIWYG editor integration
3. **Deployment Steps**:
   - **Vercel**: Link your GitHub repository, configure environment variables, and deploy.
   - **Docker**: Ensure `docker-compose.yml` is correctly configured, allowing automatic setup of the database tables on the first run.

### Continuous Deployment
Set up continuous deployment to trigger new builds upon each commit. This ensures the latest version of the app is always available.

--- 

This documentation covers setup, usage, and deployment details for the CMS, ensuring new developers can get started efficiently. 


































































