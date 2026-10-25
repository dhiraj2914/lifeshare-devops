-- ==========================================================================
-- BLOOD BANK AVAILABILITY FINDER WITH GPS
-- Relational Database Management System (MySQL Schema)
-- ==========================================================================

CREATE DATABASE IF NOT EXISTS blood_bank_db;
USE blood_bank_db;

-- --------------------------------------------------------------------------
-- Table structure for table `hospitals`
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitals` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `latitude` DECIMAL(10, 6) NOT NULL,
  `longitude` DECIMAL(10, 6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------------
-- Table structure for table `blood_inventory`
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blood_inventory` (
  `hospital_id` VARCHAR(50) NOT NULL,
  `blood_group` VARCHAR(5) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`hospital_id`, `blood_group`),
  FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------------
-- Table structure for table `donors`
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `donors` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `blood_group` VARCHAR(5) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `latitude` DECIMAL(10, 6) NOT NULL,
  `longitude` DECIMAL(10, 6) NOT NULL,
  `available` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------------
-- Table structure for table `blood_requests`
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blood_requests` (
  `id` VARCHAR(50) NOT NULL,
  `patient_name` VARCHAR(100) NOT NULL,
  `blood_group` VARCHAR(5) NOT NULL,
  `urgency` ENUM('Routine', 'Urgent', 'Critical') NOT NULL DEFAULT 'Routine',
  `hospital_name` VARCHAR(150) NOT NULL,
  `latitude` DECIMAL(10, 6) NOT NULL,
  `longitude` DECIMAL(10, 6) NOT NULL,
  `contact` VARCHAR(20) NOT NULL,
  `message` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================================
-- SEED DATA INSERTS (Mapping to App Default Coordinates in Hyderabad)
-- ==========================================================================

-- 1. Insert Hospitals
INSERT INTO `hospitals` (`id`, `name`, `address`, `phone`, `latitude`, `longitude`) VALUES
('h1', 'NIMS (Nijams Institute of Medical Sciences)', 'Punjagutta, Hyderabad', '+91 40 2348 9000', 17.414000, 78.455200),
('h2', 'Apollo Hospitals', 'Jubilee Hills, Hyderabad', '+91 40 2360 7777', 17.417200, 78.411600),
('h3', 'Care Hospitals', 'Banjara Hills, Hyderabad', '+91 40 3041 8888', 17.409300, 78.448500),
('h4', 'Yashoda Hospital', 'Secunderabad, Hyderabad', '+91 40 4567 4567', 17.441600, 78.498800),
('h5', 'Osmania General Hospital', 'Afzal Gunj, Hyderabad', '+91 40 2460 0122', 17.377600, 78.474600),
('h6', 'Gandhi Medical College & Hospital', 'Musheerabad, Secunderabad', '+91 40 2750 5566', 17.424300, 78.503400);

-- 2. Insert Blood Inventory (Mock Stock levels per Hospital)
INSERT INTO `blood_inventory` (`hospital_id`, `blood_group`, `quantity`) VALUES
('h1', 'O+', 15), ('h1', 'O-', 2), ('h1', 'A+', 18), ('h1', 'B+', 20), ('h1', 'AB-', 1),
('h2', 'O+', 25), ('h2', 'O-', 8), ('h2', 'A+', 30), ('h2', 'B+', 12), ('h2', 'AB-', 3),
('h3', 'O+', 10), ('h3', 'O-', 1), ('h3', 'A+', 12), ('h3', 'B+', 8),  ('h3', 'AB-', 0),
('h4', 'O+', 22), ('h4', 'O-', 5), ('h4', 'A+', 16), ('h4', 'B+', 15), ('h4', 'AB-', 2),
('h5', 'O+', 40), ('h5', 'O-', 3), ('h5', 'A+', 25), ('h5', 'B+', 32), ('h5', 'AB-', 0),
('h6', 'O+', 35), ('h6', 'O-', 4), ('h6', 'A+', 28), ('h6', 'B+', 26), ('h6', 'AB-', 4);

-- 3. Insert Registered Donors (Including Team Members)
INSERT INTO `donors` (`id`, `name`, `blood_group`, `phone`, `email`, `latitude`, `longitude`, `available`) VALUES
('d1', 'Athreya Ram Sharma', 'O+', '+91 94401 23456', 'athreya@lifeshare.org', 17.391200, 78.472000, TRUE),
('d2', 'Boddu Dhiraj Guru Ram', 'A+', '+91 98480 98765', 'dhiraj@lifeshare.org', 17.375000, 78.490000, TRUE),
('d3', 'Bonala Sagar', 'B+', '+91 91770 12345', 'sagar@lifeshare.org', 17.412000, 78.461000, TRUE),
('d4', 'Yasa Rithwik Reddy', 'AB-', '+91 88970 54321', 'rithwik@lifeshare.org', 17.425000, 78.435000, TRUE),
('d5', 'Arjun Verma', 'O-', '+91 99887 76655', 'arjun@gmail.com', 17.399500, 78.455000, TRUE),
('d6', 'Priya Naidu', 'A-', '+91 98660 11223', 'priya@gmail.com', 17.432000, 78.482000, TRUE),
('d7', 'Karthik Rao', 'O+', '+91 95530 44556', 'karthik@yahoo.com', 17.356000, 78.452000, TRUE),
('d8', 'Sneha Patel', 'B-', '+91 91234 56789', 'sneha@outlook.com', 17.452000, 78.471000, FALSE),
('d9', 'Ravi Teja', 'AB+', '+91 80080 12121', 'ravi@gmail.com', 17.362000, 78.521000, TRUE);

-- 4. Insert Active Blood Requests
INSERT INTO `blood_requests` (`id`, `patient_name`, `blood_group`, `urgency`, `hospital_name`, `latitude`, `longitude`, `contact`, `message`) VALUES
('r1', 'Srinivas Rao', 'O-', 'Critical', 'NIMS, Punjagutta', 17.414000, 78.455200, '+91 98850 12345', 'Required for heart bypass operation tomorrow morning. Need 2 units.'),
('r2', 'Md. Saleem', 'AB-', 'Critical', 'Osmania Hospital, Afzal Gunj', 17.377600, 78.474600, '+91 90001 90002', 'Patient in emergency ward. Sepsis complication. Immediate replacement needed.'),
('r3', 'G. Lakshmi', 'A+', 'Urgent', 'Apollo Hospitals, Jubilee Hills', 17.417200, 78.411600, '+91 91100 91100', 'Post-pregnancy surgery requirement. Scheduled for this evening.'),
('r4', 'B. Venkat', 'B+', 'Routine', 'Care Hospitals, Banjara Hills', 17.409300, 78.448500, '+91 93939 12345', 'Platelet transfusion scheduled for Friday.');
