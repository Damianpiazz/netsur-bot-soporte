#!/bin/sh
set -e

mkdir -p /app/bot_sessions
chown nodejs:nodejs /app
chown -R nodejs:nodejs /app/bot_sessions

exec su -s /bin/sh nodejs -c 'exec "$@"' sh "$@"
