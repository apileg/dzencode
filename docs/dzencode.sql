-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (arm64)
--
-- Host: 127.0.0.1    Database: dzencode
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `OrderEntity`
--

DROP TABLE IF EXISTS `OrderEntity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderEntity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderEntity_userId_fkey` (`userId`),
  CONSTRAINT `OrderEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderEntity`
--

LOCK TABLES `OrderEntity` WRITE;
/*!40000 ALTER TABLE `OrderEntity` DISABLE KEYS */;
INSERT INTO `OrderEntity` VALUES (1,'Order buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com',1652116800,1),(2,'Order 2 of a@a.com',1652203200,1),(3,'Order 3 of a@a.com',1652289600,1),(4,'Order 4 of a@a.com',1652376000,1),(5,'Order 5 of a@a.com',1652462400,1),(6,'Order 6 of a@a.com',1652548800,1),(7,'Order 7 of a@a.com',1652635200,1),(8,'Order 8 of a@a.com',1652721600,1),(9,'Order 9 of a@a.com',1652808000,1),(10,'Order 0 of a@a.com',1652894400,1),(11,'Order buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com',1652116800,2),(12,'Order 2 of takanaka@seychelles.com',1652203200,2),(13,'Order 3 of takanaka@seychelles.com',1652289600,2),(14,'Order 4 of takanaka@seychelles.com',1652376000,2),(15,'Order 5 of takanaka@seychelles.com',1652462400,2),(16,'Order 6 of takanaka@seychelles.com',1652548800,2),(17,'Order 7 of takanaka@seychelles.com',1652635200,2),(18,'Order 8 of takanaka@seychelles.com',1652721600,2),(19,'Order 9 of takanaka@seychelles.com',1652808000,2),(20,'Order 0 of takanaka@seychelles.com',1652894400,2);
/*!40000 ALTER TABLE `OrderEntity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductEntity`
--

DROP TABLE IF EXISTS `ProductEntity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductEntity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serialNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `availability` enum('Available','InMaintenance') COLLATE utf8mb4_unicode_ci NOT NULL,
  `usedOrNew` enum('Used','New') COLLATE utf8mb4_unicode_ci NOT NULL,
  `guaranteeEnd` int NOT NULL,
  `priceUsd` int unsigned NOT NULL,
  `priceUah` int unsigned NOT NULL,
  `groupName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerFullName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` int NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductEntity_orderId_fkey` (`orderId`),
  CONSTRAINT `ProductEntity_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderEntity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductEntity`
--

LOCK TABLES `ProductEntity` WRITE;
/*!40000 ALTER TABLE `ProductEntity` DISABLE KEYS */;
INSERT INTO `ProductEntity` VALUES (1,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',1,'/photos/takanaka.jpeg','Type A'),(2,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',1,'/photos/takanaka.jpeg','Type B'),(3,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',1,'/photos/takanaka.jpeg','Type C'),(4,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',1,'/photos/takanaka.jpeg','Type A'),(5,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',1,'/photos/takanaka.jpeg','Type B'),(6,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',1,'/photos/takanaka.jpeg','Product of a@a.com'),(7,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',2,'/photos/takanaka.jpeg','Type A'),(8,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',2,'/photos/takanaka.jpeg','Type B'),(9,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',2,'/photos/takanaka.jpeg','Type C'),(10,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',2,'/photos/takanaka.jpeg','Type A'),(11,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',2,'/photos/takanaka.jpeg','Type B'),(12,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',2,'/photos/takanaka.jpeg','Product of a@a.com'),(13,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',3,'/photos/takanaka.jpeg','Type A'),(14,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',3,'/photos/takanaka.jpeg','Type B'),(15,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',3,'/photos/takanaka.jpeg','Type C'),(16,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',3,'/photos/takanaka.jpeg','Type A'),(17,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',3,'/photos/takanaka.jpeg','Type B'),(18,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',3,'/photos/takanaka.jpeg','Product of a@a.com'),(19,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',4,'/photos/takanaka.jpeg','Type A'),(20,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',4,'/photos/takanaka.jpeg','Type B'),(21,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',4,'/photos/takanaka.jpeg','Type C'),(22,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',4,'/photos/takanaka.jpeg','Type A'),(23,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',4,'/photos/takanaka.jpeg','Type B'),(24,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',4,'/photos/takanaka.jpeg','Product of a@a.com'),(25,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',5,'/photos/takanaka.jpeg','Type A'),(26,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',5,'/photos/takanaka.jpeg','Type B'),(27,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',5,'/photos/takanaka.jpeg','Type C'),(28,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',5,'/photos/takanaka.jpeg','Type A'),(29,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',5,'/photos/takanaka.jpeg','Type B'),(30,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',5,'/photos/takanaka.jpeg','Product of a@a.com'),(31,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',6,'/photos/takanaka.jpeg','Type A'),(32,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',6,'/photos/takanaka.jpeg','Type B'),(33,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',6,'/photos/takanaka.jpeg','Type C'),(34,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',6,'/photos/takanaka.jpeg','Type A'),(35,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',6,'/photos/takanaka.jpeg','Type B'),(36,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',6,'/photos/takanaka.jpeg','Product of a@a.com'),(37,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',7,'/photos/takanaka.jpeg','Type A'),(38,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',7,'/photos/takanaka.jpeg','Type B'),(39,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',7,'/photos/takanaka.jpeg','Type C'),(40,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',7,'/photos/takanaka.jpeg','Type A'),(41,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',7,'/photos/takanaka.jpeg','Type B'),(42,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',7,'/photos/takanaka.jpeg','Product of a@a.com'),(43,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',8,'/photos/takanaka.jpeg','Type A'),(44,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',8,'/photos/takanaka.jpeg','Type B'),(45,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',8,'/photos/takanaka.jpeg','Type C'),(46,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',8,'/photos/takanaka.jpeg','Type A'),(47,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',8,'/photos/takanaka.jpeg','Type B'),(48,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',8,'/photos/takanaka.jpeg','Product of a@a.com'),(49,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',9,'/photos/takanaka.jpeg','Type A'),(50,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',9,'/photos/takanaka.jpeg','Type B'),(51,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',9,'/photos/takanaka.jpeg','Type C'),(52,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',9,'/photos/takanaka.jpeg','Type A'),(53,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',9,'/photos/takanaka.jpeg','Type B'),(54,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',9,'/photos/takanaka.jpeg','Product of a@a.com'),(55,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of a@a.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',10,'/photos/takanaka.jpeg','Type A'),(56,'Product 2 of a@a.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',10,'/photos/takanaka.jpeg','Type B'),(57,'Product 3 of a@a.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',10,'/photos/takanaka.jpeg','Type C'),(58,'Product 4 of a@a.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',10,'/photos/takanaka.jpeg','Type A'),(59,'Product 5 of a@a.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',10,'/photos/takanaka.jpeg','Type B'),(60,'Special product of a@a.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',10,'/photos/takanaka.jpeg','Product of a@a.com'),(61,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',11,'/photos/takanaka.jpeg','Type A'),(62,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',11,'/photos/takanaka.jpeg','Type B'),(63,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',11,'/photos/takanaka.jpeg','Type C'),(64,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',11,'/photos/takanaka.jpeg','Type A'),(65,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',11,'/photos/takanaka.jpeg','Type B'),(66,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',11,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(67,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',12,'/photos/takanaka.jpeg','Type A'),(68,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',12,'/photos/takanaka.jpeg','Type B'),(69,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',12,'/photos/takanaka.jpeg','Type C'),(70,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',12,'/photos/takanaka.jpeg','Type A'),(71,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',12,'/photos/takanaka.jpeg','Type B'),(72,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',12,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(73,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',13,'/photos/takanaka.jpeg','Type A'),(74,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',13,'/photos/takanaka.jpeg','Type B'),(75,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',13,'/photos/takanaka.jpeg','Type C'),(76,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',13,'/photos/takanaka.jpeg','Type A'),(77,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',13,'/photos/takanaka.jpeg','Type B'),(78,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',13,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(79,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',14,'/photos/takanaka.jpeg','Type A'),(80,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',14,'/photos/takanaka.jpeg','Type B'),(81,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',14,'/photos/takanaka.jpeg','Type C'),(82,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',14,'/photos/takanaka.jpeg','Type A'),(83,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',14,'/photos/takanaka.jpeg','Type B'),(84,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',14,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(85,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',15,'/photos/takanaka.jpeg','Type A'),(86,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',15,'/photos/takanaka.jpeg','Type B'),(87,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',15,'/photos/takanaka.jpeg','Type C'),(88,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',15,'/photos/takanaka.jpeg','Type A'),(89,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',15,'/photos/takanaka.jpeg','Type B'),(90,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',15,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(91,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',16,'/photos/takanaka.jpeg','Type A'),(92,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',16,'/photos/takanaka.jpeg','Type B'),(93,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',16,'/photos/takanaka.jpeg','Type C'),(94,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',16,'/photos/takanaka.jpeg','Type A'),(95,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',16,'/photos/takanaka.jpeg','Type B'),(96,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',16,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(97,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',17,'/photos/takanaka.jpeg','Type A'),(98,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',17,'/photos/takanaka.jpeg','Type B'),(99,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',17,'/photos/takanaka.jpeg','Type C'),(100,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',17,'/photos/takanaka.jpeg','Type A'),(101,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',17,'/photos/takanaka.jpeg','Type B'),(102,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',17,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(103,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',18,'/photos/takanaka.jpeg','Type A'),(104,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',18,'/photos/takanaka.jpeg','Type B'),(105,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',18,'/photos/takanaka.jpeg','Type C'),(106,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',18,'/photos/takanaka.jpeg','Type A'),(107,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',18,'/photos/takanaka.jpeg','Type B'),(108,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',18,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(109,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',19,'/photos/takanaka.jpeg','Type A'),(110,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',19,'/photos/takanaka.jpeg','Type B'),(111,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',19,'/photos/takanaka.jpeg','Type C'),(112,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',19,'/photos/takanaka.jpeg','Type A'),(113,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',19,'/photos/takanaka.jpeg','Type B'),(114,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',19,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com'),(115,'Product 1 buffalo buffalo buffalo buffalo buffalo buffalo buffalo buffalo of takanaka@seychelles.com','SN001','Available','New',172800000,9900,250000,'Group A','John Doe',20,'/photos/takanaka.jpeg','Type A'),(116,'Product 2 of takanaka@seychelles.com','SN002','Available','Used',1814400000,4900,150000,'Group A','Jane Smith',20,'/photos/takanaka.jpeg','Type B'),(117,'Product 3 of takanaka@seychelles.com','SN003','InMaintenance','New',1640908800,14900,400000,'Group B','Bob Johnson',20,'/photos/takanaka.jpeg','Type C'),(118,'Product 4 of takanaka@seychelles.com','SN004','Available','Used',172800000,7900,200000,'Group B','Alice Brown',20,'/photos/takanaka.jpeg','Type A'),(119,'Product 5 of takanaka@seychelles.com','SN005','InMaintenance','New',1734302400,19900,600000,'Group C','David Lee',20,'/photos/takanaka.jpeg','Type B'),(120,'Special product of takanaka@seychelles.com','SN100','Available','Used',172800000,4200,100000,'Insatiable High inc.','Bilbo Baggins',20,'/photos/takanaka.jpeg','Product of takanaka@seychelles.com');
/*!40000 ALTER TABLE `ProductEntity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserEntity`
--

DROP TABLE IF EXISTS `UserEntity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserEntity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `avatarUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserEntity_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserEntity`
--

LOCK TABLES `UserEntity` WRITE;
/*!40000 ALTER TABLE `UserEntity` DISABLE KEYS */;
INSERT INTO `UserEntity` VALUES (1,'/photos/takanaka.jpeg','a@a.com','$2b$10$OV2A8XVI7iDb7gIPymwFtuaVRySdkgKQ4yHDxC3.hgje0TA9YTSqG'),(2,'/photos/takanaka.jpeg','takanaka@seychelles.com','$2b$10$nDq3NL8WZF8vC.pvu0o48.IClPfioJO.fRg2AXAgLdniPD7n3Eg1O');
/*!40000 ALTER TABLE `UserEntity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0c85ab47-62b4-45e4-88fa-3d50a70db924','7eec20a419b76fd0748af4183ca851242c9855f6dda6df93c7db5c3e3d43d3d4','2023-05-24 15:56:15.781','20230517130359_add_cascade_products_deletion',NULL,NULL,'2023-05-24 15:56:15.751',1),('25df9a67-a22d-4d3d-b240-b59b6362160a','6b60aa48351b35e8258784a83b22264f830891e16c88723035bc5491e214b48b','2023-05-24 15:56:15.717','20230516132700_rewrite',NULL,NULL,'2023-05-24 15:56:15.657',1),('60cc24c3-89da-4d17-98f5-e915c84a41aa','af6d2d3a6ba062f1370dfacf16e0501620f5dac3d4ab30d8a781aefab1ee3bf9','2023-05-24 15:56:15.641','20230515110729_initial',NULL,NULL,'2023-05-24 15:56:15.573',1),('64c9763e-5862-4a63-979a-cbe1c17eb649','3afe355f4e69718510db27f9aa6b50156c4f36fd9443988d05b01d03a555333c','2023-05-24 15:56:15.818','20230519125709_add_user',NULL,NULL,'2023-05-24 15:56:15.782',1),('6dbad62e-267c-4354-b40a-2a09507b515a','0725d3b524dd77cb0f6ba1bc0ec9eaa89c121aa946c396f24a7e00a9665711b6','2023-05-24 15:56:15.750','20230516134045_fix_date_columns',NULL,NULL,'2023-05-24 15:56:15.732',1),('94b199b0-b292-4eb0-9521-73fa5a6d1d9e','8667883489080359631ad07be2d5924006695c1c8eb431d165e93d9d9a74860b','2023-05-24 15:56:15.656','20230515192819_rename_photo_and_is_new',NULL,NULL,'2023-05-24 15:56:15.643',1),('9f408f28-046c-4c5d-ba05-2a384001ea16','821bfbd1c1e3994a6d9340b3dabc46c4333f3aca17df7c4e49ee3bbb4fc0e16b','2023-05-24 15:56:15.839','20230519131137_add_more_user_fileds',NULL,NULL,'2023-05-24 15:56:15.819',1),('a78760f0-637b-414a-a3cd-e6d7738768e8','e35613678a6c07e299c20b5e16df615df7cc7924c88143469130a1769876f250','2023-05-24 15:56:15.731','20230516132839_add_image_url',NULL,NULL,'2023-05-24 15:56:15.718',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-24 19:06:24
