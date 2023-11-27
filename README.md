## How to start

It has to be an `.env` file. Sample: `.env-sample`

### Checking node version

```bash
node -v # 16.14.0
```

### Installing packages

```bash
npm install
```

### Start server

```bash
npm run start # listens via port number in local .env file
# or
npm run dev
```

## Documentation

[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Migrations

### How to create a migration

```bash
npm run migration:add -- --name="$migrationName"
```

### How to run migrations

```bash
npm run migration:up
```

### How to undo migration

```bash
npm run migration:down
```

## Test

### How to run unit test

```bash
npm run test:unit
```

### How to run integration test

```bash
npm run test:integration
```

## How to create dev db with docker

```bash
docker run --name docker_pg_postgis -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgis/postgis
```

- Open pgAdmin or other editor
- Create and select database
- Run `CREATE EXTENSION postgis;` code

## SonarQube integration

Referenced by https://medium.com/swlh/nodejs-code-evaluation-using-jest-sonarqube-and-docker-f6b41b2c319d

- Installing dependencies:

1. **sonarqube-scanner** is necessary to scan JS code very simply, without needing to install any specific tool or (Java) runtime.
2. **jest-sonar-reporter** is a custom results processor for Jest. The processor converts Jest’s output into Sonar’s generic test data format.

### Automated test

```bash
npm run test:covarage
```

> **_NOTE:_** After all tests are successfully executed, a folder named “coverage” will be generated.

Coverage folder files are being referenced in sonar-project.js finally, the command must be executed

```bash
npm run sonar
```
