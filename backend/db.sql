CREATE DATABASE IF NOT EXISTS cms;
USE cms;

DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    company VARCHAR(100),
    job_title VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', 'Example Corp', 'Software Engineer'),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', 'Tech Innovations', 'Project Manager'),
('Emily', 'Johnson', 'emily.johnson@example.com', '555-8765', 'Creative Solutions', 'Graphic Designer'),
('Michael', 'Brown', 'michael.brown@example.com', '555-4321', 'Global Enterprises', 'Sales Executive'),
('Linda', 'Davis', 'linda.davis@example.com', '555-6789', 'Health Services', 'Nurse');


select * from contacts;