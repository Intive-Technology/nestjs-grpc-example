# NestJS gRPC Example
This project is a monorepo that demonstrates the usage of gRPC with NestJS. It contains a gRPC server, a consumer application, and a shared library for proto buffers and schemas.

### Structure
The project is structured into three main parts:

##### gRPC Server: 
This is a NestJS application that serves as the gRPC server. It is responsible for handling gRPC requests and responses. Server app also expose the REST API. so it can handle both REST and gRPC requests.

##### Consumer App: 
This is another NestJS application that acts as the client for the gRPC server. It makes requests to the server and handles the responses.

##### Shared Library: 
This library contains the proto buffer definitions and schemas that are shared between the server and the consumer app. This ensures consistency and avoids duplication.

Setup
To set up the project, follow these steps:

1. Clone the repository
2. Build images with command: `docker-compose build`
3. Run the application with `docker-compose up -d`


##### Contributing
Contributions are welcome. Please make sure to update tests as appropriate.

License
[MIT](https://choosealicense.com/licenses/mit/)