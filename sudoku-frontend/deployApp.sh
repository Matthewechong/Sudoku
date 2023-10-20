npm run build
sudo rm -rf /opt/dist
sudo cp -R dist /opt/
sudo systemctl restart nginx
