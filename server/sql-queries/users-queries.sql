-- -- Step 1: Add new columns allowing NULL
-- ALTER TABLE `Users` ADD COLUMN `createdAt` DATETIME;
-- ALTER TABLE `Users` ADD COLUMN `updatedAt` DATETIME;

-- -- Step 2: Update existing records with dummy data
-- UPDATE `Users` 
-- SET 
--   `createdAt` = IFNULL(`createdAt`, '2023-10-01 00:00:00'),
--   `updatedAt` = IFNULL(`updatedAt`, '2023-10-01 00:00:00')
-- WHERE 
--   `createdAt` IS NULL OR `updatedAt` IS NULL;

-- -- Optional Step 3: Enforce NOT NULL constraints

-- -- Disable foreign key constraints
-- PRAGMA foreign_keys = OFF;

-- -- Create a new Users table with NOT NULL constraints
-- CREATE TABLE `Users_new` (
--   `id` INTEGER PRIMARY KEY,
--   `googleId` TEXT UNIQUE NOT NULL,
--   `name` TEXT NOT NULL,
--   `email` TEXT UNIQUE NOT NULL,
--   `profilePicture` TEXT,
--   `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Copy data to the new Users table
-- INSERT INTO `Users_new` (`id`, `googleId`, `name`, `email`, `profilePicture`, `createdAt`, `updatedAt`)
-- SELECT 
--   `id`, 
--   `googleId`, 
--   `name`, 
--   `email`, 
--   `profilePicture`, 
--   IFNULL(`createdAt`, CURRENT_TIMESTAMP), 
--   IFNULL(`updatedAt`, CURRENT_TIMESTAMP)
-- FROM `Users`;

-- -- Drop the old Users table
-- DROP TABLE `Users`;

-- -- Rename Users_new to Users
-- ALTER TABLE `Users_new` RENAME TO `Users`;

-- -- Re-enable foreign key constraints
-- PRAGMA foreign_keys = ON;




DROP TABLE IF EXISTS `Users_backup`;

SELECT * FROM `Users`;