# CMS with WYSIWYG Editor and Plugin Architecture

## Overview
This CMS application is built with **Next.js** and provides a WYSIWYG editor for rich text formatting. It also features a **plugin architecture** that allows developers to extend core functionalities by adding custom components or blocks.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Database Setup](#database-setup)
3. [API Endpoints](#api-endpoints)
   - [Post Endpoints](#post-endpoints)
   - [Page Endpoints](#page-endpoints)
4. [Plugin System](#plugin-system)
   - [Example Plugin: Image Slider](#example-plugin-image-slider)
5. [WYSIWYG Editor Integration](#wysiwyg-editor-integration)
6. [Deployment](#deployment)

---

## Getting Started

To run this project locally:

```bash
npm install
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Folder Structure
- **`app`**: Main application folder containing routes and components.
- **`utils/plugins`**: Plugin management system, where custom plugins can be registered and used in the CMS.
- **`components`**: Reusable UI components for posts, pages, and plugins.

---

## Database Setup

The CMS uses PostgreSQL for data storage. Use the following SQL commands to create the required tables:

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
This example demonstrates how to add a simple image slider as a plugin.

#### Creating a Plugin
To create a new plugin:
1. Define the component in `utils/plugins/[plugin-name].ts`.
2. Register the plugin using `registerPlugin`.

```typescript
// utils/plugins/imageSliderPlugin.tsx
import { registerPlugin } from '../utils/plugins/pluginManager';

const ImageSlider = ({ images }) => {
  // Slider component logic here
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
/>
```

---

## Deployment

To deploy this CMS, we recommend using Vercel or Railway. Follow these steps:
1. Connect your GitHub repository.
2. Configure environment variables as needed (e.g., for database connections).
3. Set up automatic builds to trigger on each commit.

For detailed deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---




































































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

If using docker simply run in the termnial : docker compose up --build

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

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





































































This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



This was not working in zsh :
mkdir -p app/api/pages/create
touch app/api/pages/create/route.ts

mkdir -p app/api/pages/get/[id]
touch app/api/pages/get/[id]/route.ts

mkdir -p app/api/pages/update/[id]
touch app/api/pages/update/[id]/route.ts

mkdir -p app/api/pages/delete/[id]
touch app/api/pages/delete/[id]/route.ts

mkdir -p app/api/pages/all
touch app/api/pages/all/route.ts


So did this in root directory:
mkdir -p app/api/pages/create
touch app/api/pages/create/route.ts

mkdir -p app/api/pages/get/\[id\]
touch app/api/pages/get/\[id\]/route.ts

mkdir -p app/api/pages/update/\[id\]
touch app/api/pages/update/\[id\]/route.ts

mkdir -p app/api/pages/delete/\[id\]
touch app/api/pages/delete/\[id\]/route.ts

mkdir -p app/api/pages/all
touch app/api/pages/all/route.ts



Created Tables in Postgresql by query of : 


cms_db=# CREATE TABLE Post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Response: CREATE TABLE

cms_db=# CREATE TABLE Page (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Response: CREATE TABLE



Certainly! Here’s a list of all the API requests (CRUD operations) we’ve set up for posts, along with their respective endpoints, HTTP methods, and brief descriptions.

### API Endpoints for `Post` Entity

| **Operation**         | **Endpoint**                    | **Method** | **Description**                                     |
|-----------------------|---------------------------------|------------|-----------------------------------------------------|
| **Create Post**       | `/api/posts/create`            | `POST`     | Creates a new post with a unique slug.              |
| **Get All Posts**     | `/api/posts/all`               | `GET`      | Retrieves a list of all posts, ordered by creation date. |
| **Get Post by ID**    | `/api/posts/get/{id}`          | `GET`      | Fetches a single post by its ID.                    |
| **Update Post by ID** | `/api/posts/update/{id}`       | `PUT`      | Updates an existing post by its ID.                 |
| **Delete Post by ID** | `/api/posts/delete/{id}`       | `DELETE`   | Deletes a post by its ID.                           |

### Request Details

1. **Create Post**:
   - **URL**: `http://localhost:3000/api/posts/create`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "title": "Post Title",
       "slug": "post-slug",
       "content": "Post content here."
     }
     ```

2. **Get All Posts**:
   - **URL**: `http://localhost:3000/api/posts/all`
   - **Method**: `GET`
   - **Description**: No body is required for this request. It returns an array of posts.

3. **Get Post by ID**:
   - **URL**: `http://localhost:3000/api/posts/get/{id}`
   - **Method**: `GET`
   - **Description**: Replace `{id}` with the actual ID of the post you want to retrieve.

4. **Update Post by ID**:
   - **URL**: `http://localhost:3000/api/posts/update/{id}`
   - **Method**: `PUT`
   - **Body**:
     ```json
     {
       "title": "Updated Post Title",
       "slug": "updated-post-slug",
       "content": "Updated content here."
     }
     ```
   - **Description**: Replace `{id}` with the ID of the post you want to update.

5. **Delete Post by ID**:
   - **URL**: `http://localhost:3000/api/posts/delete/{id}`
   - **Method**: `DELETE`
   - **Description**: Replace `{id}` with the ID of the post you want to delete.

### Summary

Each endpoint serves a specific CRUD operation for the `Post` entity, allowing you to create, read, update, and delete posts within the CMS. Let me know if you need further details or help testing any of these requests!


