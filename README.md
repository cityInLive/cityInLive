# live-city

## Development

```shell
npm install
mkdir ssl
cd ssl
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
ng serve --ssl --ssl-key "ssl/server.key" --ssl-cert "ssl/server.crt" --live-reload false
```
