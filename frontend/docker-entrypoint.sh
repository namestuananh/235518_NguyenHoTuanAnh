#!/bin/sh
echo "window.APP_CONFIG = { API_URL: \"${API_URL:-http://localhost:5000}\" };" > /usr/share/nginx/html/config.js
