# Réunion 1

---
Date: 30/10/20
Participants:

    - Louis Dufeu
    - Antoine Montes
    - Gauthier Fiorentino
    - Anas El Halouani

---

## Qu'est ce qu'on fait ?

Un twitter pour EPITA:
    - Connexion des utilisateurs
    - Indication de la majeure de l'utilisateur
    - Permettre d'envoyer un message
    - Permettre de repondre a un message
    - Permettre de liker un message
    - Avoir un flux qui s'update des messages

    Front:
        - React
    Back:
        - Express

Utiliser Cloud Formation pour deployer, que ce soit en plateforme 2 ou 3.

## Platform 2:

Users stocker dans notre DB MySQL.

EC2: Back + Front + MySQL

DB: Est-ce qu'il vaut mieux utiliser RDS ou bien faire du master slave à la main avec MySQL ?

Utilisation de VPC.

2 AZ.

## Platform 3:

Back: Lambda
Front: S3
DB: DynamoDB

Api Gateway pour nos endpoints et creer les lambda

Cognito pour gerer nos user


## Dans le Free Tier

https://aws.amazon.com/fr/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc

## Ce qu'on a fait

- Reflexion autour de l'application [X]
- Création du repo [X]
- Schéma architecture
- Création des comptes AWS

## Question

- Le front rentre dans quelle catégorie dans le tableau ?
- Qu'est ce qu'il entend par IP en Platform 2 ? Devons-nous avoir une URL via un Route53 en Platform2 ?
- Est-ce qu'en Platform2 nous devons avoir un AutoScallingGroup et du LoadBalancing sur nos EC2 ?

