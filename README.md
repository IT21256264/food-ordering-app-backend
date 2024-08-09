# Food Order App Backend

This is the backend service for a food ordering application, built with Node.js, Express, TypeScript, and MongoDB. It includes integration with Stripe for payment processing and Cloudinary for image handling.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x)
- Stripe CLI (for local webhook testing)

### Installation

1. Clone the repository:

2. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory and add your environment variables. For example:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

### Scripts

Here’s a breakdown of the scripts defined in the `package.json` file:

- **dev**: Runs the development server using `concurrently` to handle multiple processes. It starts `nodemon` to watch for file changes and the Stripe CLI to listen for webhook events.
    ```sh
    npm run dev
    ```

- **nodemon**: Starts the server with `nodemon` for automatic restarts on file changes.
    ```sh
    npm run nodemon
    ```

- **stripe**: Starts the Stripe CLI to listen for webhook events and forward them to your local server.
    ```sh
    npm run stripe
    ```

- **build**: Compiles the TypeScript files into JavaScript.
    ```sh
    npm run build
    ```

- **start**: Starts the compiled Node.js server.
    ```sh
    npm start
    ```

- **postinstall**: Runs the build script automatically after dependencies are installed.
    ```sh
    npm run build
    ```

### Running the Project

1. Start the development server:
    ```sh
    npm run dev
    ```

2. The server should be running at `http://localhost:5000`.

### Dependencies

- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **stripe**: Stripe API integration.
- **cloudinary**: Image and video management.
- **jsonwebtoken**: JSON Web Token implementation.
- **dotenv**: Loads environment variables from a `.env` file.
- **concurrently**: Run multiple commands concurrently.
- **multer**: Middleware for handling `multipart/form-data`.

### Dev Dependencies

- **typescript**: TypeScript language support.
- **ts-node**: TypeScript execution environment for Node.js.
- **nodemon**: Automatically restarts the server on file changes.
- **@types/...**: TypeScript type definitions for various packages.


