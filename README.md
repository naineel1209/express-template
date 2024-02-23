# Express Starter Template

This is an Express starter template that includes custom error handling, error throwing, logging, and cookie parsing functionality.

## Features

- Custom Error Handling Middleware
- Error Thrower Utility
- Logger Middleware
- Cookie Parsing Middleware

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your/repository.git .
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

   For Development:
    ```bash
    npm run dev
    ```
   For Production:
    ```bash
    npm start
    ```

## Usage

### Custom Error Handling Middleware

The custom error handling functionality is defined in the `errors` folder. `errorThrower.ts` returns a new error with the specified statusCode and message.

### Error Thrower Utility

The `errorThrower.ts` utility provides a convenient way to throw errors with custom status codes and messages.

Example usage:

```typescript
import errorThrower from './errors/errorThrower';

// Inside a route handler
if (!user) {
  throw errorThrower(404, 'User not found');
}
```

### Logger Middleware

The logger middleware (`winston.config.ts`) logs incoming requests with relevant information such as request method, URL, status code, and response time.

Use `logger.info("<your message string>")` for logging regular messages. This will create a log in the `logs/all.log` file.

For logging errors, use `logger.error("<your error string>")`. This will create a log in the `logs/error.log` file.

### Cookie Parsing Middleware

The cookie parsing middleware (`cookieParser()`) parses incoming cookies from the request headers and makes them available in `req.cookies`.

## Configuration

You can customize the error messages, logging format, and cookie settings by modifying the respective middleware files.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve this starter template.
