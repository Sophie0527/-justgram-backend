-- create user table
CREATE TABLE users
(
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  nickname VARCHAR(50),
  password VARCHAR(300) NOT NULL,
  profile_image VARCHAR(3000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);