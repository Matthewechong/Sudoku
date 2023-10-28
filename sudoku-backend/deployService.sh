#!/bin/bash

# Build the app
mvn clean package

# Deploy
sudo systemctl restart sudoku-backend.service
