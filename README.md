# jubelio-project-test

**Techstack**
JavaScript platform: Node.js
JavaScript API: Hapi.js
Database: PostgreSQL
Initial database migration & seed: docker-entrypoint-initdb.d
Container platform: Docker and Docker Compose
API documentation: Swagger
Unit and integration tests: Mocha
Version control: GitHub

## Authentication Service
**API Basepoint**
http://localhost:9000

**Documentation**
http://localhost:9000/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec auth_service npm test
```

## Product Service
**API Basepoint**
http://localhost:8000

**Documentation**
http://localhost:8000/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec product_service npm test
```

## Adjustment Transaction Service
**API Basepoint**
http://localhost:8001

**Documentation**
http://localhost:8001/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec trans_service npm test
```
