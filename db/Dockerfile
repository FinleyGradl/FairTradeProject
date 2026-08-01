# Dockerfile to build PostgreSQL + PostGIS natively for Raspberry Pi (ARM)
# Builds on the official Debian-based postgres image and installs PostGIS
# so the resulting image is compatible with the Pi's architecture.

FROM postgres:16

# Install PostGIS and required packages
RUN apt-get update \
 && apt-get install -y --no-install-recommends postgis postgresql-16-postgis-3 \
 && rm -rf /var/lib/apt/lists/*

# Expose postgres port
EXPOSE 5432

# Use the default postgres entrypoint/CMD provided by the base image

# Summary:
# - This Dockerfile builds Postgres + PostGIS on the host architecture (e.g., arm64 on Raspberry Pi),
#   avoiding the "exec format error" caused by pulling an amd64-only image on an ARM host.
# - The docker-compose.yml is updated to build this image from ./db so the DB runs natively on the Pi.
