-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema OnlineLibrarySystem
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema OnlineLibrarySystem
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `OnlineLibrarySystem` DEFAULT CHARACTER SET utf8 ;
USE `OnlineLibrarySystem` ;

-- -----------------------------------------------------
-- Table `OnlineLibrarySystem`.`Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `OnlineLibrarySystem`.`Book` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `BookNo` VARCHAR(45) NOT NULL,
  `Edition` VARCHAR(45) NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Author` VARCHAR(100) NOT NULL,
  `ISBN` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineLibrarySystem`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `OnlineLibrarySystem`.`Student` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Studentnum` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Mobile num` VARCHAR(10) NOT NULL,
  `Email id` VARCHAR(100) NULL,
  `Address line1` VARCHAR(100) NOT NULL,
  `Address line2` VARCHAR(100) NULL,
  `City` VARCHAR(45) NOT NULL,
  `State` VARCHAR(45) NOT NULL,
  `Pincode` VARCHAR(45) NOT NULL,
  `Country` VARCHAR(45) NOT NULL,
  `Alternate mobile` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineLibrarySystem`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `OnlineLibrarySystem`.`Reservation` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `StartDate` DATE NOT NULL,
  `Duration` INT NOT NULL,
  `ReturnedDate` DATETIME NULL,
  `Status` VARCHAR(45) NOT NULL,
  `Book_Id` INT NOT NULL,
  `Student_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Reservation_Book1_idx` (`Book_Id` ASC) VISIBLE,
  INDEX `fk_Reservation_Student1_idx` (`Student_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Reservation_Book1`
    FOREIGN KEY (`Book_Id`)
    REFERENCES `OnlineLibrarySystem`.`Book` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservation_Student1`
    FOREIGN KEY (`Student_Id`)
    REFERENCES `OnlineLibrarySystem`.`Student` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
