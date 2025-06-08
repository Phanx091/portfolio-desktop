#!/bin/bash

# Download the latest certificates
curl -o cert.pem https://curl.se/ca/cacert.pem

# Set the environment variable
export NODE_EXTRA_CA_CERTS="$(pwd)/cert.pem"

# Try installing with the new certificates
yarn install 