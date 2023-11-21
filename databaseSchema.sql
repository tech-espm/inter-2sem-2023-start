/*!40101 SET NAMES utf8 */

;

/*!40014 SET FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET SQL_NOTES=0 */

;

DROP TABLE IF EXISTS comentarios;

CREATE TABLE
    `comentarios` (
        `id` int NOT NULL AUTO_INCREMENT,
        `postId` int NOT NULL,
        `userId` int NOT NULL,
        `userName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
        `comentarios` mediumtext COLLATE utf8mb4_bin NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 56 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_bin;

DROP TABLE IF EXISTS nm_anonimo;

CREATE TABLE
    `nm_anonimo` (
        `Id_nmAnom` int NOT NULL AUTO_INCREMENT,
        `Nm_Anom` varchar(25) DEFAULT NULL,
        PRIMARY KEY (`Id_nmAnom`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb3;

DROP TABLE IF EXISTS post;

CREATE TABLE
    `post` (
        `Id_post` int NOT NULL AUTO_INCREMENT,
        `Id_user` int NOT NULL,
        `Conteudo_Texto` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `Conteudo_Imagem` longblob,
        `isImage` tinyint DEFAULT NULL,
        `Data_post` datetime DEFAULT CURRENT_TIMESTAMP,
        `Likes` int DEFAULT '0',
        `Comentarios` int DEFAULT '0',
        PRIMARY KEY (`Id_post`),
        KEY `Id_User_idx` (`Id_user`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 680 DEFAULT CHARSET = utf8mb3;

DROP TABLE IF EXISTS usuario;

CREATE TABLE
    `usuario` (
        `Id_user` int NOT NULL AUTO_INCREMENT,
        `Nm_user` varchar(25) NOT NULL,
        `isAnom` tinyint(1) NOT NULL,
        `User` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
        `Idade` int DEFAULT NULL,
        `Foto` varchar(264) DEFAULT NULL,
        `Email` varchar(45) DEFAULT NULL,
        `Senha` varchar(16) DEFAULT NULL,
        `isVerified` tinyint(1) DEFAULT NULL,
        PRIMARY KEY (`Id_user`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb3;