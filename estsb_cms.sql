-- Creating the User Table to store login information for all actors
CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    type ENUM('Teacher', 'Student', 'Admin') NOT NULL
);

-- Creating the Teacher Table (to store additional teacher-specific details)
CREATE TABLE Teacher (
    teacherId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
);

-- Creating the Student Table (to store additional student-specific details)
CREATE TABLE Student (
    studentId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
);

-- Creating the Admin Table (to store additional admin-specific details)
CREATE TABLE Admin (
    adminId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
);

-- Creating the Course Table
CREATE TABLE Course (
    courseId INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(255) NOT NULL,
    description TEXT
);

-- Creating the Grade Table
CREATE TABLE Grade (
    gradeId INT AUTO_INCREMENT PRIMARY KEY,
    score FLOAT NOT NULL,
    comments TEXT
);

-- Creating the Report Table
CREATE TABLE Report (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT
);

-- Creating the Teacher-Student Relationship Table
CREATE TABLE Teacher_Student (
    teacherId INT,
    studentId INT,
    PRIMARY KEY (teacherId, studentId),
    FOREIGN KEY (teacherId) REFERENCES Teacher(teacherId) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES Student(studentId) ON DELETE CASCADE
);

-- Creating the Course-Teacher Relationship Table
CREATE TABLE Course_Teacher (
    courseId INT,
    teacherId INT,
    PRIMARY KEY (courseId, teacherId),
    FOREIGN KEY (courseId) REFERENCES Course(courseId) ON DELETE CASCADE,
    FOREIGN KEY (teacherId) REFERENCES Teacher(teacherId) ON DELETE CASCADE
);

-- Creating the Course-Student Relationship Table
CREATE TABLE Course_Student (
    courseId INT,
    studentId INT,
    PRIMARY KEY (courseId, studentId),
    FOREIGN KEY (courseId) REFERENCES Course(courseId) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES Student(studentId) ON DELETE CASCADE
);

-- Creating the Grade-Student Relationship Table
CREATE TABLE Grade_Student (
    gradeId INT,
    studentId INT,
    PRIMARY KEY (gradeId, studentId),
    FOREIGN KEY (gradeId) REFERENCES Grade(gradeId) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES Student(studentId) ON DELETE CASCADE
);

-- Adding indexes to optimize queries (optional but recommended)
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_course_name ON Course(courseName);

