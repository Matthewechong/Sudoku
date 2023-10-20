#!/bin/bash

# Configuration
KEY_SIZE=2048
CERT_COMMON_NAME=localhost, http://ec2-18-222-136-174.us-east-2.compute.amazonaws.com
KEYSTORE_ALIAS=Sudoku
KEYSTORE_PASSWORD=Sudoku

# Generate a configuration file for OpenSSL
cat <<EOF > openssl.cnf
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = $CERT_COMMON_NAME

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = $CERT_COMMON_NAME
EOF

# Generate a new key pair and CSR
openssl req -newkey rsa:$KEY_SIZE -nodes -keyout localhost-private-key.pem -out localhost.csr -config openssl.cnf

# Create a self-signed certificate from the CSR, including the SAN
openssl x509 -req -in localhost.csr -signkey localhost-private-key.pem -out localhost-certificate.crt -extensions v3_req -extfile openssl.cnf

# Copy the certificate to a .pem file
cp localhost-certificate.crt localhost-certificate.pem

# Generate a PKCS12 file with the certificate (using the same password)
openssl pkcs12 -export -in localhost-certificate.pem -inkey localhost-private-key.pem -out localhost.p12 -name $KEYSTORE_ALIAS -passout pass:$KEYSTORE_PASSWORD

# Import the PKCS12 file into a Java keystore (using the same password)
keytool -importkeystore -srckeystore localhost.p12 -srcstoretype PKCS12 -destkeystore localhost.jks -deststoretype JKS -deststorepass $KEYSTORE_PASSWORD

mv localhost.p12 ssl
mv localhost-private-key.pem ssl
mv localhost-certificate.pem ssl
mv localhost-certificate.crt ssl
mv localhost.csr ssl
mv localhost.jks ssl
mv openssl.cnf ssl

echo "Certificate generation and import completed."
