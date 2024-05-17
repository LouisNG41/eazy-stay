DROP SCHEMA IF EXISTS EAZYSTAYBDD;
CREATE SCHEMA EAZYSTAYBDD;
USE EAZYSTAYBDD;

DROP TABLE IF EXISTS `location`;
DROP TABLE IF EXISTS `property`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `idProperty` int NOT NULL,
  `dateDeb` date NOT NULL,
  `dateFin` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idProperty` (`idProperty`)
);

DROP TABLE IF EXISTS `property`;
CREATE TABLE IF NOT EXISTS `property` (
  `idProperty` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `adress` varchar(20) NOT NULL,
  `budget` int NOT NULL,
  `type` enum('house','apartment') NOT NULL,
  `photo` varchar(30) NOT NULL,
  PRIMARY KEY (`idProperty`)
);

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `firstName` varchar(10) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `role` tinyint(1) NOT NULL,
  PRIMARY KEY (`idUser`)
);

ALTER TABLE `location`
  ADD CONSTRAINT `fk_user_location` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`),
  ADD CONSTRAINT `fk_property_location` FOREIGN KEY (`idProperty`) REFERENCES `property` (`idProperty`);

INSERT INTO `user` (`email`, `firstName`, `lastName`, `password`, `role`) VALUES
('alice.smith@example.com', 'Alice', 'Smith', 'pass1', 1),
('bob.johnson@example.com', 'Bob', 'Johnson', 'pass2', 0),
('carol.williams@example.com', 'Carol', 'Williams', 'pass3', 0),
('dave.brown@example.com', 'Dave', 'Brown', 'pass4', 1),
('eve.jones@example.com', 'Eve', 'Jones', 'pass5', 0),
('frank.garcia@example.com', 'Frank', 'Garcia', 'pass6', 0),
('grace.miller@example.com', 'Grace', 'Miller', 'pass7', 1),
('heidi.davis@example.com', 'Heidi', 'Davis', 'pass8', 0),
('ivan.rodriguez@example.com', 'Ivan', 'Rodriguez', 'pass9', 0),
('judy.martinez@example.com', 'Judy', 'Martinez', 'pass10', 1);

INSERT INTO `property` (`name`, `adress`, `budget`, `type`, `photo`) VALUES
('Green Villa', '123 Elm St', 500, 'house', 'green_villa.jpg'),
('Blue House', '456 Oak St', 300, 'house', 'blue_house.jpg'),
('Red Apartment', '789 Pine St', 200, 'apartment', 'red_apartment.jpg'),
('Yellow Condo', '321 Maple St', 350, 'apartment', 'yellow_condo.jpg'),
('Purple Mansion', '654 Birch St', 800, 'house', 'purple_mansion.jpg'),
('Orange Loft', '987 Cedar St', 400, 'apartment', 'orange_loft.jpg'),
('White Cottage', '135 Spruce St', 450, 'house', 'white_cottage.jpg'),
('Gray Duplex', '246 Fir St', 600, 'house', 'gray_duplex.jpg'),
('Black Studio', '357 Ash St', 250, 'apartment', 'black_studio.jpg'),
('Brown Townhouse', '468 Willow St', 550, 'house', 'brown_townhouse.jpg');

INSERT INTO `location` (`idUser`, `idProperty`, `dateDeb`, `dateFin`) VALUES
(1, 1, '2024-01-01', '2024-01-10'),
(2, 2, '2024-01-05', '2024-01-15'),
(3, 3, '2024-01-10', '2024-01-20'),
(4, 4, '2024-01-15', '2024-01-25'),
(5, 5, '2024-01-20', '2024-01-30'),
(6, 6, '2024-01-25', '2024-02-05'),
(7, 7, '2024-02-01', '2024-02-10'),
(8, 8, '2024-02-05', '2024-02-15'),
(9, 9, '2024-02-10', '2024-02-20'),
(10, 10, '2024-02-15', '2024-02-25');
