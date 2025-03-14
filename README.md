# Teatreats Microfrontend Project

This project consists of three microfrontends:
1. **Container**
2. **mf-purchase**
3. **mf-product**

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Running the Microfrontends

1. **Clone the repository:**

    ```bash
    git clone https://github.com/eht-ck/microfrontend
    cd microfrontend
    ```

2. **Install dependencies for each microfrontend:**

    ```bash
    cd container
    npm install

    cd ../mf-purchase
    npm install

    cd ../mf-product
    npm install
    ```

3. **Run the Container Microfrontend:**

    ```bash
    cd container
    npm start
    ```

    This will start the Container microfrontend on `http://localhost:3000`.

4. **Run the mf-purchase Microfrontend:**

    ```bash
    cd ../mf-purchase
    npm start
    ```

    This will start the mf-purchase microfrontend on `http://localhost:3001`.

5. **Run the mf-product Microfrontend:**

    ```bash
    cd ../mf-product
    npm start
    ```

    This will start the mf-product microfrontend on `http://localhost:3002`.

### Project Structure

- **Container:** The main application that integrates the other microfrontends.
- **mf-purchase:** Handles the purchase-related functionalities.
- **mf-product:** Manages the product-related functionalities.

### Technologies Used

- **React 18**
- **Webpack Module Federation** (for microfrontend integration)
- **npm** (for package management)

## Development

### Adding a New Microfrontend

1. **Create a new directory for the microfrontend:**

    ```bash
    mkdir mf-new
    cd mf-new
    ```

2. **Initialize a new React project:**

    ```bash
    npx create-react-app .
    ```

3. **Configure Webpack Module Federation:**

    - Add `webpack.config.js` and configure it for module federation.
    - Update `package.json` to include the necessary dependencies.

4. **Run the new microfrontend:**

    ```bash
    npm start
    ```

### Integrating Microfrontends

- Ensure each microfrontend is configured to expose its components using Webpack Module Federation.
- Update the Container microfrontend to dynamically load and render components from the other microfrontends.

