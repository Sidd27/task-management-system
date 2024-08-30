# Client

This project is a React application using Vite for development and build, with Material-UI, styling with TailwindCSS and Redux for state management.

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed. This project is compatible with Node.js versions 16 and above.

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sidd27/task-management-system
   cd task-management-system/client
   ```

2. **Install Dependencies**

Install the required dependencies using npm or yarn.

```bash
npm install
```

3. **Create or Edit the .env File**

If a .env file doesn’t already exist in the server directory, create one. If it exists, open it for editing. Add or update the following environment variables in the .env file:

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

4. **Run the Development Server**

Start the Vite development server. This will compile the project and serve it at http://localhost:3000.

```bash
npm run dev
```

5. **Build for Production**

Create an optimized production build of the application.

```bash
npm run build
```

6. **Preview the Production Build**

Serve the production build locally to test it.

```
npm run preview
```

## Scripts

- dev: Starts the development server.
- build: Builds the application for production.
- lint: Lints the codebase using ESLint.
- preview: Previews the production build locally.

## Linting

To lint the codebase, run:

```bash
npm run lint
```

## Dependencies

- React: A JavaScript library for building user interfaces.
- Material-UI: A React component library for Material Design.
- TailwindCSS: A utility-first CSS framework for styling.
- Redux: A state management library for JavaScript apps.
- Chart.js: A JavaScript library for creating charts.
- Date-fns: A library for date manipulation.

## License

This project is licensed under the MIT License.
