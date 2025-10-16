# DTS Developer Technical Test – Task Manager

Welcome!  

This repository contains my submission for the **DTS Developer Technical Test**.  
I worked on this project from **13/10 to 16/10**. Minor tweaks may be added in future commits.

---

## 🛠 Tech Stack

- **Backend:** Java Spring Boot  
- **Database:** PostgreSQL  
- **Frontend:** React  

---

## 🚀 Getting Started

You can run this project on your computer using **Docker** or through **manual setup**.

---

### Option 1: Using Docker

1. Clone this repository:

   ```bash
   git clone git@github.com:Bokorou/DTS-developer-technical-test.git

2. Open a terminal in the root directory where docker-compose.yml is located:
   ```bash
   cd <your-path>/DTS-developer-technical-test/

3. Ensure Docker is installed and running.

4. Build and start the containers:
   ```bash
   docker-compose up --build

5. Once the containers are running, open http://localhost:5173
 in your browser to access the frontend.

### Option 2: Manual Setup

If you prefer not to use Docker, follow these steps:

Backend Setup

Clone the repository.

Ensure you have Java JDK 17+ installed and configured, as required by Maven and Spring Boot.

Create a PostgreSQL database named taskmanager.

Open the backend project in your IDE as a Java project.

Create or edit the application properties file:

```bash
src/main/resources/application.properties
```
```bash
spring.application.name=task_manager
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.defer-datasource-initialization=true
server.port=8080
```

Sync the Maven project and run the backend. The server will start on port 8080.

Frontend Setup

Open the frontend as a Node.js project.

Install dependencies:

```bash
npm i
npm run dev
```

Open http://localhost:5173 in your browser.


### Usage

On first launch, you will see the login page.

There are no pre-existing users, so please create a new account.

After logging in, you can add, edit, and delete tasks on the main page.

### API documentation (OpenAPI/Swagger) is available at:

```bash
http://localhost:8080/swagger-ui.html
```

Running Tests

Run the backend unit tests with:

```bash
mvn test
```

