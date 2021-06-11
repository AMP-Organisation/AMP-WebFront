# AMP-WebFront
Notre répertoire pour la partie web de notre application

## Installation de Quasar
npm install -g @quasar/cli

## Ajout de l'adresse du back
Dans le fichier "amp-front/src/boot/axios.js" ne pas oublié d'ajouter l'adresse du back dans baseUrl :

```
  axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1'
    /** http://localhost:8000/api/v1 **/
    /** http://localhost:2395/api/ **/
  })
```

## Lancement en local
une fois dans le dossier "amp-front" exécuter la commande :
```
quasar dev
```

## Lancement via le Dockerfile
build du dockerfile :
```
docker build -t dockerize-amp-front .
```

commande pour le docker run :
```
docker run -it -p 8000:80 dockerize-amp-front
```
