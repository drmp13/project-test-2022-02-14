# jubelio-project-test
## Techstack
JavaScript platform: Node.js<br />
JavaScript API: Hapi.js<br />
Database: PostgreSQL<br />
Initial database migration & seed: docker-entrypoint-initdb.d<br />
Container platform: Docker and Docker Compose<br />
API documentation: Swagger<br />
Unit and integration tests: Mocha<br />
Version control: GitHub<br />

## Installation
1. Clone this repository
2. Open your terminal
3. Go to parent directory (where is the <i>docker-compose.yml</i> file located)
4. Fill value of <b>SERVICE___API_THIRD_PARTY__ELEVANIA__API_KEY</b> in Docker <b>.env</b> file
5. Start all services with command `docker-compose up`

## Documentation: Authentication Service
**API Basepoint**<br />
http://localhost:9000

**Documentation**<br />
http://localhost:9000/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec auth_service npm test
```

## Documentation: Product Service
**API Basepoint**<br />
http://localhost:8000

**Documentation**<br />
http://localhost:8000/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec product_service npm test
```

## Documentation: Adjustment Transaction Service
**API Basepoint**<br />
http://localhost:8001

**Documentation**<br />
http://localhost:8001/documentation

**Testing**
```
drmp@DRMPs-MacBook-Pro ~ % docker container exec trans_service npm test
```
