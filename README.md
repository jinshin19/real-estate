# Jinshin19 Real Estate

A real estate web application currently under development, built to provide a simple and accessible experience for browsing properties such as townhouses, subdivisions, and other real estate offerings.

The project follows a client-server architecture, with the Angular frontend and NestJS backend maintained separately within the same repository.

---

## 🛠️ Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge\&logo=angular\&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge\&logo=nestjs\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![NoSQL](https://img.shields.io/badge/NoSQL-FFB300?style=for-the-badge\&logo=databricks\&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge\&logo=npm\&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge\&logo=yarn\&logoColor=white)

| Layer                        | Technology |
| ---------------------------- | ---------- |
| **Language**                 | TypeScript |
| **Frontend**                 | Angular    |
| **Backend**                  | NestJS     |
| **Runtime**                  | Node.js    |
| **Database**                 | MongoDB    |
| **Database Type**            | NoSQL      |
| **Frontend Package Manager** | npm        |
| **Backend Package Manager**  | Yarn       |

---

## 🔑 Key Features

* 🔐 **JWT Authentication** — Secure authentication using JSON Web Tokens.
* 👥 **Role-Based Access Control (RBAC)** — Access and permissions are managed based on user roles.
* 🏠 **Property Management** — Support for managing and displaying real estate properties and listings.
* 🔌 **RESTful API** — Backend services exposed through structured API endpoints.
* 🗄️ **MongoDB Integration** — NoSQL database integration for application data.
* 🧩 **Client-Server Architecture** — Separate Angular frontend and NestJS backend applications.
* ⚙️ **Scalable Structure** — Project structure designed to accommodate additional features and services as the application grows.

---

## 📁 Project Structure

```text
jinshin19-real-estate/
│
├── clients/
│   └── app/
│       └── ...                 # Angular application
│
├── servers/
│   └── app/
│       └── ...                 # NestJS application
│
└── README.md
```

### `clients/app`

The frontend application built with **Angular**.

This application contains the user-facing landing page where visitors can browse and explore available real estate properties, such as:

* Townhouses
* Subdivisions
* Residential properties
* Other property listings
* Property information and details

The Angular application communicates with the backend through the available APIs.

### `servers/app`

The backend application built with **NestJS**.

This application provides the APIs consumed by the Angular frontend. It is responsible for handling backend logic, property-related data, and other services required by the client application.

---

## 🏗️ Architecture

The project maintains a clear separation between the frontend and backend applications:

```text
jinshin19-real-estate/
│
├── clients/app
│   └── Angular Frontend
│
└── servers/app
    └── NestJS Backend / API
```

The frontend and backend are maintained independently while sharing the same repository.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

* Node.js
* npm
* Yarn
* Angular CLI
* NestJS CLI
* MongoDB

---

### Frontend Setup

The Angular application is located at:

```text
clients/app
```

Navigate to the frontend:

```bash
cd clients/app
```

Install dependencies using **npm**:

```bash
npm install
```

Start the development server:

```bash
npm start
```

---

### Backend Setup

The NestJS application is located at:

```text
servers/app
```

Navigate to the backend:

```bash
cd servers/app
```

Install dependencies using **Yarn**:

```bash
yarn install
```

Start the development server:

```bash
yarn start:dev
```

---

## 📦 Package Management

Each application uses its own package manager.

### Frontend — npm

```bash
cd clients/app
npm install
npm start
```

### Backend — Yarn

```bash
cd servers/app
yarn install
yarn start:dev
```

Please use the appropriate package manager for each application to keep dependency management consistent.

---

## 🔐 Environment Configuration

Environment-specific configuration is managed separately from the source code.

Depending on the current development setup, configuration may include:

```text
Database connection
API URL
Application ports
Environment settings
Authentication configuration
```

Sensitive credentials and environment variables should not be committed to the repository.

---

## 📖 About

**Jinshin19 Real Estate** is a personal real estate project designed to go beyond a simple practice application and provide a more realistic, meaningful development experience.

The project aims to follow a real-world application structure, with a dedicated frontend, backend API, database integration, and a foundation that can support additional features over time.

It serves as a practical space for exploring modern web development, applying development best practices, and gradually building a complete real estate platform.
