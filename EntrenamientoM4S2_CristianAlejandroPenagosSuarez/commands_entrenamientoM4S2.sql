-- Create the academic_management_university database
CREATE DATABASE IF NOT EXISTS academic_management_university; 
USE academic_management_university;

-- Create the tables for academic_management_university database
CREATE TABLE students (
id_student INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL,
gender VARCHAR(20) NOT NULL,
identification INT UNIQUE NOT NULL,
career VARCHAR(255) NOT NULL,
birthday DATE NOT NULL,
rollment_date DATE NOT NULL
);

CREATE TABLE professors (
id_professor INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(100) NOT NULL,
institutional_email VARCHAR(255) NOT NULL,
academic_department VARCHAR(255) NOT NULL,
years_experience INT NOT NULL
);

CREATE TABLE courses (
id_course INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
code_course VARCHAR(10) UNIQUE NOT NULL,
credits INT NOT NULL,
semester INT NOT NULL,
id_professor INT,
FOREIGN KEY (id_professor) REFERENCES professors(id_professor)
);

CREATE TABLE enrollments (
id_enrollment INT AUTO_INCREMENT PRIMARY KEY,
id_student INT,
id_course INT,
enrollment_date DATE NOT NULL,
final_grade DECIMAL(3,2) NOT NULL CHECK (final_grade >= 0.00 AND final_grade <= 5.00),
FOREIGN KEY (id_student) REFERENCES students(id_student),
FOREIGN KEY (id_course) REFERENCES courses(id_course)
);

-- Insert sample data into the students, professors, courses, and enrollments tables.
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

-- Get the list of all students along with their registrations and courses (JOIN).
SELECT students.full_name, students.career, courses.name, enrollments.enrollment_date
FROM students
JOIN enrollments ON students.id_student = enrollments.id_student
JOIN courses ON enrollments.id_course = courses.id_course
ORDER BY students.full_name;

-- List courses taught by teachers with more than 5 years of experience.
SELECT courses.name, professors.years_experience FROM courses JOIN professors ON courses.id_professor = professors.id_professor
WHERE professors.years_experience >= 5
ORDER BY courses.name;

-- Get the average grade per course (GROUP BY + AVG).
SELECT courses.name, AVG(enrollments.final_grade) AS average_grade
FROM courses JOIN enrollments ON courses.id_course = enrollments.id_course
GROUP BY courses.name
ORDER BY average_grade;

-- Show students who are enrolled in more than one course (HAVING COUNT(*) > 1).
SELECT students.full_name, COUNT(*) AS total_courses
FROM students 
JOIN enrollments ON students.id_student = enrollments.id_student
GROUP BY students.id_student, students.full_name
HAVING COUNT(*) > 1;

-- Add a new column "academic_status" to the students table (ALTER TABLE).
ALTER TABLE students ADD COLUMN academic_status VARCHAR(15) NOT NULL;

-- Delete a teacher and observe the effect on the courses table (use ON DELETE in FK).
DELETE FROM professors WHERE id_professor = 1;

	-- See the foreign key name
	SHOW CREATE TABLE courses;

	-- Delete the current foreign key
	ALTER TABLE courses
	DROP FOREIGN KEY courses_ibfk_1;

	-- Add the foreign key again with ON DELETE CASCADE
	ALTER TABLE courses
	ADD CONSTRAINT fk_courses_professors
	FOREIGN KEY (id_professor) REFERENCES professors(id_professor)
	ON DELETE CASCADE;

-- View courses in which more than 2 students have enrolled (GROUP BY + COUNT + HAVING).
SELECT courses.name, COUNT(*) AS total_students
FROM courses
JOIN enrollments ON courses.id_course = enrollments.id_course
GROUP BY courses.id_course, courses.name
HAVING COUNT(*) > 2;

-- Get the students whose average grade is higher than the general average (AVG() + subquery).
SELECT students.full_name, AVG(enrollments.final_grade) AS average_grade
FROM students
JOIN enrollments ON students.id_student = enrollments.id_student
GROUP BY students.id_student, students.full_name
HAVING AVG(enrollments.final_grade) > (SELECT AVG(final_grade) FROM enrollments);

-- Display the names of programs with students enrolled in courses for semester 2 or later (IN or EXISTS).
SELECT DISTINCT students.career
FROM students
WHERE id_student IN (
  SELECT enrollments.id_student
  FROM enrollments
  JOIN courses ON enrollments.id_course = courses.id_course
  WHERE courses.semester >= 2
);

-- Use functions such as ROUND, SUM, MAX, MIN, and COUNT to explore different system indicators.
	-- Calculate the total number of credits enrolled by each student.
	SELECT students.full_name, SUM(courses.credits) AS total_credits
	FROM students
	JOIN enrollments ON students.id_student = enrollments.id_student
	JOIN courses ON enrollments.id_course = courses.id_course
	GROUP BY students.id_student, students.full_name;

	-- Calculate the maximum and minimum grade per course.
	SELECT courses.name, MAX(enrollments.final_grade) AS max_grade, MIN(enrollments.final_grade) AS min_grade
	FROM courses
	JOIN enrollments ON courses.id_course = enrollments.id_course
	GROUP BY courses.id_course, courses.name;

	-- Average grades per student
	SELECT s.full_name, ROUND(AVG(e.final_grade), 2) AS average_grade
	FROM students s
	JOIN enrollments e ON s.id_student = e.id_student
	GROUP BY s.id_student, s.full_name;

-- Create a view called view_academic_history that displays (Student Name, Course Name, Professor Name, Semester, Final Grade)

CREATE VIEW view_academic_history AS
SELECT students.full_name AS student_name, courses.name AS course_name, professors.full_name AS professor_name, courses.semester, enrollments.final_grade
FROM enrollments
JOIN students ON enrollments.id_student = students.id_student
JOIN courses ON enrollments.id_course = courses.id_course
JOIN professors ON courses.id_professor = professors.id_professor;

-- Query the view_academic_history view.
SELECT * FROM view_academic_history;	

-- Assign read-only permissions to a role named academic_reviewer on the view_academic_history view (GRANT SELECT).
CREATE ROLE academic_reviewer;
GRANT SELECT ON view_academic_history TO academic_reviewer;

-- Assign data modification permissions on the enrollments table to this role (GRANT).
GRANT ALL PRIVILEGES ON enrollments TO academic_reviewer;

-- Revokes data modification permissions on the enrollments table to this role (REVOKE).
REVOKE INSERT, UPDATE, DELETE ON enrollments FROM academic_reviewer;

-- Simulates a grade update operation using BEGIN, SAVEPOINT, ROLLBACK, and COMMIT.
BEGIN;
UPDATE enrollments SET final_grade = 3.4 WHERE id_enrollment = 3;
SAVEPOINT update_grades;

-- If there is an error, the operation can be rolled back.
ROLLBACK TO update_grades;

-- If everything is correct, commit is made.
COMMIT;
