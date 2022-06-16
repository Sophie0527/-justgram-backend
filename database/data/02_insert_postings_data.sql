-- insert postings data
INSERT INTO postings(id, user_id, postingType, contents)
VALUES
(1, 1, "images", "작은 성공이 주는 성취감으로 하루를 마무리 할 수 있기를"),
(2, 1, "videos", "오늘은 코딩하기 좋은날 "),
(3, 2, "videos", "db 모델링이 정말 재밌어요 ㅎㅎ"),
(4, 3, "images", "어려워도 우린 결국 해낼겁니다.");

-- insert posting_images data
INSERT INTO posting_images(id, posting_id, image_url)
VALUES
(1, 1, "http://posting_1_image_1.jpeg"),
(2, 1, "http://posting_1_image_2.jpeg"),
(3, 2, "http://posting_2_image_1.jpeg"),
(4, 3, "http://posting_3_image_1.jpeg"),
(5, 3, "http://posting_3_image_2.jpeg"),
(6, 3, "http://posting_3_image_3.jpeg"),
(7, 4, "http://posting_4_image_1.jpeg");

-- insert comments data
INSERT INTO comments(id, comment, posting_id, user_id)
VALUES
(1, "작은 성공이 모여 큰 성취가 되니까요!", 1, 3),
(2, "같이 힘냅시다", 4, 1),
(3, "햇살이 너무 좋아서 코딩하고 싶지 않아요",2, 2),
(4, "지금 비오는걸요", 2, 4),
(5, "모델링 최고! 생각하는거 너무 재밌죠", 3, 3),
(6, "언제나 길이 있기 마련입니다.", 4, 1),
(7, "자다가 코딩하는 꿈꿀 것 같아요", 1, 4);

-- insert likes data
INSERT INTO likes(id, posting_id, user_id)
VALUES
(1, 3, 1),
(2, 2, 3);
