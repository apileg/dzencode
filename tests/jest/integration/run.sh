#!/usr/bin/env bash

# Obtain the directory where this script file is located
dir="$(cd "$(dirname "$0")" && pwd)"

export DATABASE_URL="mysql://root@localhost:3307/tests"

compose_file="$dir/docker-compose.yml"

docker compose -f "$compose_file" up -d
exit_status=$?

if [ $exit_status -ne 0 ]; then
    exit 1
fi

sleep 10

npx prisma migrate deploy
exit_status=$?

if [ $exit_status -ne 0 ]; then
    echo "Running prisma \`deploy\` failed. Maybe MySQL didn't start. Try to adjust sleep parameter at line 18"
else
    npx jest "$dir"
fi

docker compose -f "$compose_file" down
