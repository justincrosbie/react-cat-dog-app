# Cat and Dog Facts App

This is a React application that displays random facts about cats and dogs. It features infinite scrolling and allows users to filter facts by animal type.

## Features

- Display random facts about cats and dogs
- Filter facts by cat, dog, or both
- Infinite scrolling to load more facts using a custom hook
- Uses a Context to manage the selection state of the app, decoupling the components from the data
- Responsive design for mobile and desktop
- Uses the Chakra-UI library for pretty components and styling

## Variants

### Redux

This version demonstrates the usage of Redux with Redux Toolkit to manage state, and decouple the components from the data. 
Note this is overkill for such a small app, but it's just to demonstrate how Redux can be used.

See the `redux` branch for this version.

### Context

This version uses a Context to manage the selection state of the app, decoupling the components from the state data.
See the `context` branch for this version.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js (version 20.0 or later)

## Installing Cat and Dog Facts App

To install the Cat and Dog Facts App, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/justincrosbie/react-cat-dog-facts.git
   ```
2. Navigate to the project directory:
   ```
   cd react-cat-dog-facts
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuring the API Endpoint

By default, the app uses `https://cat-fact.herokuapp.com/facts/random` as the API endpoint. You can override this by setting the `REACT_APP_API_BASE_URL` environment variable.

### Using a .env file

1. Create a file named `.env` in the root of your project.
2. Add the following line to the file, replacing the URL with your desired API endpoint:
   ```
   REACT_APP_API_BASE_URL=https://your-api-endpoint.com/facts/random
   ```

## Using Cat and Dog Facts App

To use the Cat and Dog Facts App, follow these steps:

1. Start the development server:
   ```
   npm start
   ```
2. Open your web browser and visit `http://localhost:3000`

The app should now be running and you can start exploring cat and dog facts!

## Running the Local API Server

This app can also use a local API server to serve facts, for testing purposes. To run the server:

1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install server dependencies (if you haven't already):
   ```
   npm install
   ```
3. Start the server:
   ```
   node server.js
   ```

The server will start running on `http://localhost:3001`.
Be sure to configure the client to connect to the server, by setting the `REACT_APP_API_BASE_URL` environment variable to `http://localhost:3001/facts/random`.

## Building for Production

To create a production build of the app:

1. Run the build command:
   ```
   npm run build
   ```
2. The build files will be created in the `build/` directory.
