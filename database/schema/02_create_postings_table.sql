-- create postings table
CREATE TABLE postings (
  id            INT NOT NULL AUTO_INCREMENT,
  user_id       INT NOT NULL,
  postingType   VARCHAR(100),
  contents      VARCHAR(2000),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_posting FOREIGN KEY (user_id) REFERENCES users (id) on delete cascade
);

-- create posting_images table
CREATE TABLE posting_images (
  id            INT NOT NULL AUTO_INCREMENT,
  posting_id    INT NOT NULL,
  image_url     VARCHAR(250),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_posting_posting_image FOREIGN KEY (posting_id) REFERENCES postings (id) on delete cascade
);

-- create comments table
CREATE TABLE comments (
  id            INT NOT NULL AUTO_INCREMENT,
  comment       VARCHAR(2000) NOT NULL,
  posting_id    INT NOT NULL,
  user_id       INT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_comment FOREIGN KEY (user_id) REFERENCES users (id) on delete cascade,
  CONSTRAINT fk_posting_comment FOREIGN KEY (posting_id) REFERENCES postings (id) on delete cascade
);

-- create likes table
CREATE TABLE likes (
  id            INT NOT NULL AUTO_INCREMENT,
  posting_id    INT NOT NULL,
  user_id       INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_like FOREIGN KEY (user_id) REFERENCES users (id) on delete cascade,
  CONSTRAINT fk_posting_like FOREIGN KEY (posting_id) REFERENCES postings (id) on delete cascade
);