#!/bin/bash
domain=" "
properties_path="./templates/application.properties.template"
environment_path="./templates/.env.production.template"
nginx_path="./templates/nginx.conf.template"

properties_path_dest="../sudoku-backend/src/main/resources/application.properties"
environment_path_dest="../sudoku-frontend/.env.production"
nginx_path_dest="/etc/nginx/nginx.conf"



while getopts ":d:" opt; do
    case $opt in
        d)
            domain=$OPTARG
        ;;
        \?)
            echo "Invalid Option: -$OPTARG" >&2
            echo "Usage $0 -d domainName" >&2
            exit 1
        ;;
        :)
            echo "Option -$OPTARG requires an argument." >$2
            exit 1
        ;;
    esac
done

if [ -z "$domain" ]; then
    echo "Domain name is required" >$2
    exit 1
fi


echo "Deploy templates"

cp "$properties_path" "$properties_path_dest"
cp "$environment_path" "$environment_path_dest"
cp "$nginx_path" "$nginx_path_dest"

echo "Changing domain name to $domain"

sed -i "s/DOMAIN/${domain}/g" "$environment_path_dest"
sed -i "s/DOMAIN/${domain}/g" "$properties_path_dest"
sudo sed -i "s/DOMAIN/${domain}/g" "$nginx_path_dest"

#echo "Build and deploy api"
#cd ../sudoku-backend/
#./deployService.sh

# Restart Server
#sudo systemctl restart nginx
