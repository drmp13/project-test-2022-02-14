# jubelio-project-test

**Techstack**<br />
JavaScript platform: Node.js<br />
JavaScript API: Hapi.js<br />
Database: PostgreSQL<br />
Initial database migration & seed: docker-entrypoint-initdb.d<br />
Container platform: Docker and Docker Compose<br />
API documentation: Swagger<br />
Unit and integration tests: Mocha<br />
Version control: GitHub<br />

## Authentication Service
**API Basepoint**<br />
http://localhost:9000

**Documentation**<br />
http://localhost:9000/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec auth_service npm test
```

## Product Service
**API Basepoint**<br />
http://localhost:8000

**Documentation**<br />
http://localhost:8000/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec product_service npm test
```

## Adjustment Transaction Service
**API Basepoint**<br />
http://localhost:8001

**Documentation**<br />
http://localhost:8001/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec trans_service npm test
```
