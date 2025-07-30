CREATE DATABASE IF NOT EXISTS academic_management_university; 
USE academic_management_university;

CREATE TABLE students (
id_student INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(100),
email VARCHAR(255),
gender VARCHAR(20),
identification INT UNIQUE NOT NULL,
career VARCHAR(255),
birthday DATE,
rollment_date DATE
);

CREATE TABLE professors (
id_professor INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(100),
institutional_email VARCHAR(255) NOT NULL,
academic_department VARCHAR(255) NOT NULL,
years_experience INT
);

CREATE TABLE courses (
id_course INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
code_course VARCHAR(10) UNIQUE NOT NULL,
credits INT,
semester INT,
id_professor INT NOT NULL,
FOREIGN KEY (id_professor) REFERENCES professors(id_professor)
);

CREATE TABLE enrollments (
id_enrollment INT AUTO_INCREMENT PRIMARY KEY,
id_student INT NOT NULL,
id_course INT NOT NULL,
enrollment_date DATE,
final_grade DECIMAL(3,2) NOT NULL CHECK (final_grade >= 0.00 AND final_grade <= 5.00),
FOREIGN KEY (id_student) REFERENCES students(id_student),
FOREIGN KEY (id_course) REFERENCES courses(id_course)
);


INSERT INTO students (full_name, email, gender, identification, career, birthday, rollment_date) VALUES
('Laura Gomez', 'laura.gomez@email.com', 'Female', 123456789, 'Systems Engineering', '2000-05-12', '2019-01-15'),
('Carlos Rodriguez', 'carlos.rodriguez@email.com', 'Male', 987654321, 'Business Administration', '1999-08-25', '2018-08-01'),
('Ana Torres', 'ana.torres@email.com', 'Female', 112233445, 'Psychology', '2001-01-30', '2020-07-20'),
('Juan Perez', 'juan.perez@email.com', 'Male', 556677889, 'Systems Engineering', '2002-11-10', '2021-01-10'),
('Maria Lopez', 'maria.lopez@email.com', 'Female', 334455667, 'Social Communication', '2000-03-18', '2019-08-05'),
('Daniela Morales', 'daniela.morales@email.com', 'Female', 778899001, 'Marketing', '2001-06-14', '2020-08-10'),
('Andres Salazar', 'andres.salazar@email.com', 'Male', 665544332, 'Law', '1998-12-02', '2017-07-25'),
('Natalia Rios', 'natalia.rios@email.com', 'Female', 220033445, 'Environmental Engineering', '2000-09-09', '2019-08-01'),
('Esteban Torres', 'esteban.torres@email.com', 'Male', 993322110, 'Systems Engineering', '2002-04-17', '2021-02-15'),
('Juliana Pineda', 'juliana.pineda@email.com', 'Female', 554433221, 'Industrial Design', '1999-03-03', '2018-08-01');

INSERT INTO professors (full_name, institutional_email, academic_department, years_experience) VALUES
('Sofia Ramirez', 'sofia.ramirez@uni.edu', 'Engineering', 10),
('Luis Martinez', 'luis.martinez@uni.edu', 'Social Sciences', 7),
('Claudia Herrera', 'claudia.herrera@uni.edu', 'Psychology', 12);

INSERT INTO courses (name, code_course, credits, semester, id_professor) VALUES
('Programming I', 'SIS101', 3, 1, 1),
('General Psychology', 'PSY201', 2, 2, 3),
('Administrative Theory', 'ADM301', 3, 3, 2),
('Databases', 'SIS202', 4, 2, 1),
('Marketing Basics', 'MKT101', 2, 1, 2),
('Environmental Ethics', 'ENV301', 3, 5, 3),
('Legal Foundations', 'LAW102', 4, 2, 2);

INSERT INTO enrollments (id_student, id_course, enrollment_date, final_grade) VALUES
(1, 1, '2023-01-10', 4.50),
(1, 4, '2023-01-15', 4.20),
(2, 3, '2023-01-12', 3.80),
(3, 2, '2023-01-20', 4.00),
(4, 1, '2023-01-11', 3.50),
(4, 4, '2023-01-17', 4.00),
(5, 2, '2023-01-19', 4.70),
(5, 3, '2023-01-13', 3.90),
(6, 5, '2023-02-01', 4.30),
(6, 4, '2023-02-10', 4.00),
(7, 7, '2023-02-05', 3.90),
(8, 6, '2023-02-07', 4.50),
(8, 2, '2023-02-11', 4.00),
(9, 1, '2023-02-02', 3.80),
(9, 4, '2023-02-12', 4.40),
(10, 5, '2023-02-08', 4.20);

-- Obtener el listado de todos los estudiantes junto con sus inscripciones y cursos (JOIN).
SELECT students.full_name, students.career, courses.name, enrollments.enrollment_date
FROM students
JOIN enrollments ON students.id_student = enrollments.id_student
JOIN courses ON enrollments.id_course = courses.id_course
ORDER BY students.full_name;

-- Listar los cursos dictados por docentes con más de 5 años de experiencia.
SELECT courses.name, professors.years_experience FROM courses JOIN professors ON courses.id_professor = professors.id_professor
WHERE professors.years_experience >= 5
ORDER BY courses.name;

SELECT courses.name, AVG(enrollments.final_grade) AS average_grade
FROM courses JOIN enrollments ON courses.id_course = enrollments.id_course
GROUP BY courses.name
ORDER BY average_grade;