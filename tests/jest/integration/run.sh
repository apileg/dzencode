#!/usr/bin/env bash

# Remember: this script runs in the root of project, 
# so all relative paths here are relative to the root of the project

compose_file=./tests/jest/integration/docker-compose.yml

docker compose -f "$compose_file" up -d
exit_status=$?

if [ $exit_status -ne 0 ]; then
    exit 1
fi

/usr/bin/env npx prisma migrate deploy && \
/usr/bin/env npx jest ./tests/jest/integration

docker compose -f "$compose_file" down
