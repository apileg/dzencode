#!/usr/bin/env bash

# This command is used on the deployment server
docker-compose -f ./docker/docker-compose.production.yml "$@"
