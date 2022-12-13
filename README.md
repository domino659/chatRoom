ChatRoom sur Symfony, React et Mercure.

Pour lancer le projet :
```shell
docker-compose up -d
```

Pensez à récupérer les dépendances Yarn, Composer et à
charger les fixtures dans le container Symfony


Problèle rencontré:
- A circular reference has been detected when serializing the object of class. -> Revoir comment je gére ma donnée. (empéche le chat de conserver la donnée)
- Impossibilité de faire marcher le serveur autre part que en localhost.
- Conteneur React ne s'update pas en temps réel. (marche avec application Vite (strange))