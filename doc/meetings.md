# Réunion 1

---
Date: 30/10/20
Participants:

    - Louis Dufeu
    - Antoine Montes
    - Gauthier Fiorentino
    - Anas El Halouani

---

## Préparation

### Qu'est ce qu'on fait ?

Un twitter pour EPITA permettant aux étudiants de l'école de discuter entre eux:

- Connexion des utilisateurs
- Indication de la promo/majeure de l'utilisateur
- Permettre d'envoyer un message
- Permettre de repondre a un message
- Permettre de liker un message
- Avoir un flux qui s'update avec les messages

Front:

- React

Back:

- Express

DB:

- MySQL en P2
- MongoDB en P3

Utiliser Cloud Formation pour deployer, que ce soit en plateforme 2 ou 3.

### Platform 2

Users stocker dans notre DB MySQL.

EC2: Back + Front

DB: RDS

Utilisation de VPC + Subnets.

2 AZ au minimum (eu-west a + eu-west b par exemple).

Load balancing obligatoire pour les 2 AZ.

Creation d'un VPC pour contenir nos services (Front + Back + DB).
2 Subnets par AZ: 1 public pour notre Front + Back et 1 prive pour proteger notre DB.

#### Questions

Est-ce que du coup on aura besoin de Nginx pour servir notre api et notre front ?
DB: Est-ce qu'il vaut mieux utiliser RDS ou bien faire du master slave à la main avec MySQL et un EC2?
Explication de l'internet gateway

#### Bonus

A la limite pour gerer la DB on pourra mettre un EC2 avec PHPMyAdmin, mais pas forcement tres utile.

#### Useful links

https://dev.to/asim_ansari7/deploy-a-react-node-app-to-production-on-aws-2gdf

### Platform 3

- Back: Lambda
- Front: S3
- DB: DynamoDB

API Gateway pour nos endpoints et creer les lambda.
On utilise Lambda car les containers sont payants (pas dans le free tier)
Cognito pour gerer nos user.

#### Questions

Devons nous utiliser de Cloudfront ?

### Dans le Free Tier

https://aws.amazon.com/fr/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc

### Ce qu'on a fait

- Reflexion autour de l'application [X]
- Création du repo [X]
- Schéma architecture [X]
- Création des comptes AWS [X]

### Question

- Le front rentre dans quelle catégorie dans le tableau ?
- Qu'est ce qu'il entend par IP en Platform 2 ? Devons-nous avoir une URL via un Route53 en Platform2 ?

## Réunion

P2 = Plateforme 2\
P3 = Plateforme 3

- Le Twitter-like from scratch est trop gros comme projet

- Neff propose de faire du NoSQL dans la plateforme 2 et 3 plutôt que de changer.\
  Plateforme 2 : mettre la db dans une VM

- Amazon RDS, peut-etre du P3 mais pas du tout du P2

### Schema P2

- 2 AZ implique ELB, Neff confirme que oui

Neff trouve que le schéma est très bien.

### Schéma P3

- Amazon Cognito, Neff trouve que c'est bien

- En P3, faut utiliser CloudFront ?
  > Pas obligatoire

Rien à redire sur les schémas, trouve que c'est très bien.

### Conclusion

Neff trouve qu'on avance bien, il a rien à redire.\
Juste, faire attention au temps consacré à l'appli.
