DROP DATABASE IF EXISTS vacations;
CREATE DATABASE vacations;
USE vacations;

-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.16-MariaDB

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (NULL,'lital','kaminsky','litalk','$2b$10$myGy/Wgq9oASmgnPlFx4S.m2j5kQYxKEc8IM7NOcFOLXlMD3qcRbm',0),
(NULL,'lital','kaminsky','litaladmin','$2b$10$myGy/Wgq9oASmgnPlFx4S.m2j5kQYxKEc8IM7NOcFOLXlMD3qcRbm',1),
(NULL,'shlomi','levi','shlomil','$2b$10$myGy/Wgq9oASmgnPlFx4S.m2j5kQYxKEc8IM7NOcFOLXlMD3qcRbm',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `target` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (1,'Like all great cities, you can spend months in Paris and barely scratch the surface of the city’s cultural treasures. It has museums galore, stellar shopping and busy cafés perfect for people-watching.',12,'france.jpeg','2019-09-12','2019-09-12','Paris, France'),(NULL,'New York is true to its roots and remains a city of immigrants with inspiring architecture and a thriving arts scene. Take in a show on Broadway, shop in SoHo, spend a lazy day in Central Park and explore the city’s diverse neighborhoods.',13,'new-york.jpeg','2019-09-14','2019-09-14','New York'),(NULL,'The Eternal City Rome celebrates its long history with monuments, churches and restored ruins that offer a glimpse into life during the days of the great Roman Empire. Celebrate the city’s roots and immerse yourself in the culture over a heaping bowl of p',12,'Rome-Italy.jpeg','2019-08-12','2019-08-12','Rome, Italy'),(NULL,'Miles of beaches, endless luxury accommodations and a nonstop party atmosphere in Cancun have transformed this once sleepy village on the Yucatan coast into one of Mexicos most popular tourist attractions, particularly during spring break.',19,'Mexico.jpeg','2019-08-12','2019-08-12','Cancun, Mexico'),(NULL,'London is a cosmopolitan city with a unique blend of historic traditions and a hip, modern culture. You can enjoy tea and crumpets and celebrate the city’s royal roots before heading out to a slick gastropub for gourmet dinner and drinks.',20,'london.jpeg','2019-08-12','2019-08-12','London, England'),(NULL,'The American Riviera, Hollywood of the East, SoBe, or the Art Deco District -- whatever you call it, Miamis South Beach is hot year-round. The embodiment of excess, South Beach is an international playground offering non-stop nightlife, sandy shores, uniq',33,'miami.jpeg','2019-08-12','2019-08-12','Miami, Florida'),(NULL,'There’s fun around every corner in Orlando with wild roller coasters, twisting waterslides and theme-park fun. Mickey Mouse certainly plays a starring role in the festivities, but there’s plenty of magic beyond the realm of Disney.',22,'florida.jpeg','2019-08-12','2019-08-12','Orlando, Florida'),(NULL,'Bring a hearty appetite and good walking shoes to the City by the Bay. For a quintessential San Francisco experience, climb aboard a cable car, peruse the farm-fresh goods at the Ferry Market, stroll through Golden Gate Park and board a ferry to the islan',55,'California.jpeg','2019-08-12','2019-08-12','San Francisco, California');
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations_users`
--

DROP TABLE IF EXISTS `vacations_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations_users` (
  `vacationid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`userid`,`vacationid`),
  KEY `fk_vacation_id` (`vacationid`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_vacation_id` FOREIGN KEY (`vacationid`) REFERENCES `vacation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations_users`
--

LOCK TABLES `vacations_users` WRITE;
/*!40000 ALTER TABLE `vacations_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacations_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
