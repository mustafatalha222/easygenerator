# Easygenerator - Auth

Project is a web application deployed on Vercel. It consists of a React frontend and a NestJS backend API.

## Deployment

The application is deployed and accessible at [App Link](https://easy-generator.vercel.app/).

## Technologies Used

- React
- NestJS
- Vite
- Turbo
- Mongo

## Project Structure

The project is organized into two main folders:

- **client**: Contains all the code for the React frontend.
- **api**: Contains all the code for the NestJS backend API.

## Running the Project

To run the project locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.

### Running Projects Simultaneously - On Dev

To run both the frontend and backend simultaneously, you can use the following command:

```bash
npm run dev
```

This command will start both the React frontend and the NestJS backend. The React app will run on port http://localhost:5173/, and the NestJS API will run on port http://localhost:3000 | http://localhost:3000/api.

### Note - Development Run

- Nest will take a bit longer to run as compare to react vite app so need to wait a little longer for the nest app to run in development mode.
- Additionally, I have not implemented email confirmation, OTP and forgetPassword flows as they were not specified in the provided documentation

### Running in Production Mode

To run the project as a production build, use the following commands:

```bash
npm run build
npm start
```

Now you can visit http://localhost:3000 to see the project.

### Accessing Swagger Documentation

Swagger documentation for the NestJS API is also added. Just Visit
http://localhost:3000/swagger

### Environment Variables

The environment variables are included in the repository for your reference. I will remove this in a future for security purposes.

### Contact

In case of any issues, please contact:

- Email: mustafatalha222@gmail.com
- Phone: +923482127668
