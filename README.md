# Visa Navigator Hub

## Project Overview

Visa Navigator Hub is a web application that helps users navigate through various visa-related information. It provides users with easy access to visa options, sorting functionality, and potentially personalized features like saving preferences and authenticating through Firebase.

## Live Demo
[Visa Navigator Hub](https://visa-hub.surge.sh)

---

## Features

- **Visa Information Navigation**: Browse through different visa options and information.
- **Search & Sort**: Sort and search through visa options using match sorting and sort-by features.
- **Notifications**: Receive real-time updates and alerts via React Toastify and SweetAlert2.
- **Authentication**: Firebase integration for user authentication and personalized features.
- **Responsive UI**: Built with TailwindCSS and DaisyUI for responsive, mobile-friendly design.

## Technologies

### Frontend

- **React** (v18.3.1)
- **React Router** (v7.0.2)
- **Axios** (v1.7.9) for HTTP requests
- **Firebase** (v11.0.2) for authentication and possibly data storage
- **Bootstrap** (v5.3.3) for UI components
- **DaisyUI** (v4.12.14) and **TailwindCSS** (v3.4.15) for styling
- **React Toastify** (v10.0.6) for toast notifications
- **SweetAlert2** (v11.14.5) for user alerts
- **Match Sorter** (v8.0.0) and **Sort-By** (v1.2.0) for sorting data

### Development Tools

- **Vite** (v6.0.1) for fast builds and hot module replacement
- **ESLint** for code linting
- **PostCSS** with **Autoprefixer** for CSS handling

## Installation

### Clone the Repository

Clone this project to your local machine:

```bash
git clone https://github.com/RRDesignHub/visa-navigator-hub.git

### Install dependencies:
#### Client:
```sh
cd visahub-client-side
npm install
npm run dev
```

#### Server:
```sh
cd visa-hub-server
npm install
nodemon index.js
```

### Environment Variables
Create a `.env` file in the server directory and configure the necessary environment variables such as:
```
PORT=5173
JWT_SECRET=93d84e47c750bff4c87557a9a40d97deb199561720b6655f549d8809a15452a2b0f63823760ab93a2d07eb0fff15fc939b626aab0ea435aa1f2730c4316d13e7

```
