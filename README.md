# liveCity

Site disponnible à : [https://livecity.vlntn.pw/](https://livecity.vlntn.pw/).

Recherche d'une ville en France. Ensuite, affichage des informations sur la ville, de la météo, de tweets, et de la carte.
A venir : Séances de cinéma, photos de la ville.

## Développement

Les APIs étant accessible en SSL uniquement, vous devez lancer Angular avec des certificats SSL.
Les commandes suivantes installent le nécéssaire, génèrent un certificat de test, et lancent le serveur.

```shell
npm install
mkdir ssl
cd ssl
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
ng serve --ssl --ssl-key "ssl/server.key" --ssl-cert "ssl/server.crt" --live-reload false
```
