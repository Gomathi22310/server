ALTER TABLE `onlinelibrarysystem`.`student` 
CHANGE COLUMN `Studentnum` `StudentNum` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `Mobile num` `MobileNum` VARCHAR(10) NOT NULL ,
CHANGE COLUMN `Email id` `EmailId` VARCHAR(100) NULL DEFAULT NULL ,
CHANGE COLUMN `Address line1` `AddressLine1` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `Address line2` `AddressLine2` VARCHAR(100) NULL DEFAULT NULL ,
CHANGE COLUMN `Alternate mobile` `AlternateMobile` VARCHAR(45) NULL DEFAULT NULL ;
