
# ApiCoffee

**ApiCoffee** is a backend API server built with TypeScript, Express, Firebase, and GraphQL. It provides CRUD (Create, Read, Update, Delete) operations for managing coffee data, leveraging Firebase Firestore for data storage and GraphQL for flexible querying.

## Table of Contents

- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Interfaces](#interfaces)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **TypeScript**: Superset of JavaScript for type-safe code.
- **Express**: Web framework for Node.js.
- **Firebase Firestore**: NoSQL database for data storage.
- **GraphQL**: Query language for APIs.
- **Axios**: Promise-based HTTP client.
- **Jest**: Testing framework.
- **dotenv**: Environment variable management.
- **Sequelize**: ORM for SQL databases (included as a dependency).
- **Other Tools**: Nodemon, ts-node, etc.

## Folder Structure

```
apicoffee/
├── app/
│   ├── base.ts
│   ├── .firebase/
│   │   └── firebase-setup.ts
│   ├── graphql/
│   │   ├── graphql-setup.ts
│   │   └── schema.graphql
│   ├── interfaces/
│   │   └── coffee-interfaces.ts
│   ├── models/
│   │   └── coffee.ts
│   ├── repositories/
│   │   └── coffee-dao.ts
│   ├── services/
│   │   └── coffee-management.ts
│   ├── routers/
│   │   └── router-manager.ts
│   ├── utils/
│   │   └── custom-error-feedback.ts
│   └── index.ts
├── dist/
│   └── app/
│       └── graphql/
│           └── schema.graphql
├── tests/
│   └── ... (test files)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Description

- **app/**: Contains the core application code.
  - **.firebase/**: Firebase configuration and initialization.
  - **graphql/**: GraphQL setup, including schema definitions and resolver configurations.
  - **interfaces/**: TypeScript interfaces.
  - **models/**: Data models representing business entities.
  - **repositories/**: Data Access Objects (DAOs) for interacting with databases.
  - **services/**: Business logic and service layer.
  - **routers/**: Express router management.
  - **utils/**: Utility functions and custom error handling.
  - **base.ts**: Centralized handler for GraphQL events.
  - **index.ts**: Entry point of the application.
- **dist/**: Compiled JavaScript files.
- **tests/**: Contains test suites for the application.
- **package.json**: Project metadata and dependencies.
- **tsconfig.json**: TypeScript configuration.
- **README.md**: Project documentation.

## Installation

1. **Clone the repository**

   ```bash
   https://github.com/antfconeto/apiCoffeeBack.git
   cd apiCoffeeBack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the project**

   ```bash
   npm run build
   ```

4. **Start the server**

   ```bash
   npm start
   ```

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory and populate it with the following variables:

   ```env
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_client_email
   PORT=5000
   ```

   **Note:** Ensure that sensitive information like `FIREBASE_PRIVATE_KEY` is kept secure and **never** committed to version control.

## Usage

Once the server is running, you can interact with the API using GraphQL queries and mutations at the `/graphql` endpoint or via the root route (`/`) which performs a sample GraphQL query using Axios.

### Example GraphQL Queries

- **List All Coffees**

  ```graphql
  query {
    listAllCoffees {
      id
      name
      description
      price
      createdAt
      updatedAt
    }
  }
  ```

- **Get Coffee by ID**

  ```graphql
  query {
    getCoffeeById(coffeeId: "coffee_id_here") {
      id
      name
      description
      price
      createdAt
      updatedAt
    }
  }
  ```

- **Create a New Coffee**

  ```graphql
  mutation {
    createCoffee(coffee: {
      name: "Espresso",
      description: "Strong and bold coffee",
      price: 2.99
    }) {
      id
      name
      description
      price
      createdAt
      updatedAt
    }
  }
  ```

- **Update an Existing Coffee**

  ```graphql
  mutation {
    updateCoffee(coffee: {
      id: "coffee_id_here",
      name: "Latte",
      description: "Coffee with milk",
      price: 3.99
    }) {
      id
      name
      description
      price
      createdAt
      updatedAt
    }
  }
  ```

- **Delete a Coffee**

  ```graphql
  mutation {
    deleteCoffee(coffeeId: "coffee_id_here")
  }
  ```

## API Endpoints

- **GraphQL Endpoint**

  - **Path:** `/graphql`
  - **Description:** Primary endpoint for all GraphQL queries and mutations.
  - **Access:** Accessible via GraphiQL interface for testing and development.

- **Root Endpoint**

  - **Path:** `/`
  - **Method:** `GET`
  - **Description:** Executes a sample GraphQL query to list all coffees using Axios and returns the response.
  - **Response:** JSON data containing the list of coffees or an error message.

## Interfaces

### Coffee Interface

Defines the structure of a Coffee object.

```typescript
export interface Coffee {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
}
```

### ICoffeeDAO

Defines the data access methods for Coffee.

```typescript
export interface ICoffeeDAO {
  createCoffee(coffee: CoffeeModel): Promise<CoffeeModel>;
  updateCoffee(coffee: CoffeeModel): Promise<CoffeeModel>;
  getCoffeeById(id: string): Promise<CoffeeModel | undefined>;
  deleteCoffee(id: string): Promise<boolean>;
  listAllCoffees(): Promise<CoffeeModel[]>;
}
```

### ICoffeeManagement

Defines the business logic methods for Coffee management.

```typescript
export interface ICoffeeManagement {
  createCoffee(coffee: CoffeeModel): Promise<CoffeeModel>;
  updateCoffee(coffee: CoffeeModel): Promise<CoffeeModel>;
  getCoffeeById(id: string): Promise<CoffeeModel | undefined>;
  deleteCoffee(id: string): Promise<boolean>;
  listAllCoffees(): Promise<CoffeeModel[]>;
}
```

## Error Handling

Custom error handling is implemented using the `CustomError` class, which extends the native `Error` class and includes an HTTP status code.

```typescript
export class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    
    Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
```

- **Usage:** Throw `CustomError` with appropriate status codes (e.g., 400 for Bad Request, 500 for Internal Server Error) to handle different error scenarios gracefully.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**

   ```bash
   git commit -m "Add your message"
   ```

4. **Push to the branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

## License

This project is licensed under the [ISC License](LICENSE).

---

**Note:** Ensure that the `.env` file is properly configured and that sensitive information is secured. Avoid committing `.env` files to version control.
