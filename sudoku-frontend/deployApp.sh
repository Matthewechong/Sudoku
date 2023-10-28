#!/bin/bash

# Build App
npm run build

# Move dist directory in /opt/
sudo rm -rf /opt/dist
sudo cp -R dist /opt/

# Restart Server
sudo systemctl restart nginx
