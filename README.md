# PWA Offline First MVP App

This is a simple PWA application that demonstrates how to build an offline-first application using Vite and ReactJs.

## Environment Considerations

Before running the application, you need to undertand how to use the application.
The offline app just work with build version, because the dev mode expects the networks stays alive.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and Yarn.

## Installation

1.  Clone this repository to your local machine:

`git clone https://github.com/lribeiromoura/pwa-app-vite`

2.  Navigate to the project directory:

`cd pwa-app-vite`

3.  Install the required dependencies:

`yarn install`

## Running the Application

To run the application, you can use the following command:

`yarn dev`

This will start the development server and open the application in your default web browser.

The application will be available at `http://localhost:5173/` by default.

Run the following command to start the build server watch:

`yarn preview:watch`

The application will be available at `http://localhost:4173` by default.

## Building the Application

To build the application, you can use the following command:

`yarn build`

This will create a production build of the application in the `dist` directory.

## Running the Production Build

To run the production build, you can use the following command:

`yarn serve`

This will start a local server and serve the production build of the application.

## Features

The frontend application offers the following features:

- **Offline First** - The application is designed to work offline, and the service worker caches the files and the app works without internet connection.
- **Responsive Design** - The application is designed to work on mobile and desktop devices.
- **PWA** - The application is a Progressive Web App, and it can be installed on the user's device.

## Contribution

Contributions to this project are welcome. Feel free to submit pull requests with new features, improvements, or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
