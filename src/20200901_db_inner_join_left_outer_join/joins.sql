-- いろいろ試しましょう

-- ユーザー一覧
SELECT *
FROM users;

-- メンバー情報
SELECT *
FROM clubs
         JOIN members ON clubs.id = members.club_id;

-- メンバーの総数
SELECT count(*)
FROM clubs
         JOIN members ON clubs.id = members.club_id;

-- とりあえず結合して全部出す
-- INNER JOIN
SELECT *
FROM users
         JOIN members ON users.id = members.user_id
         JOIN clubs ON clubs.id = members.club_id;

-- LEFT OUTER JOIN （LEFT JOIN と省略できるので省略で書きます）
SELECT *
FROM users
         LEFT JOIN members ON users.id = members.user_id
         LEFT JOIN clubs ON clubs.id = members.club_id;

SELECT users.id, users.name, clubs.name
FROM users
         LEFT JOIN members ON users.id = members.user_id
         LEFT JOIN clubs ON clubs.id = members.club_id;

--- 無所属の人は「帰宅部」と表示
SELECT users.id,
       users.name,
       clubs.name IS NULL as is_null,
       CASE clubs.name
           WHEN clubs.name THEN clubs.name
           ELSE '帰宅部'
       END as club_name
FROM users
         LEFT JOIN members ON users.id = members.user_id
         LEFT JOIN clubs ON clubs.id = members.club_id;

-- ユーザーが幾つの部活に入っているか（INNER JOIN）
SELECT users.name, count(members.id)
FROM users
         JOIN members ON users.id = members.user_id
         JOIN clubs ON clubs.id = members.club_id
GROUP BY users.id;

-- ユーザーが幾つの部活に入っているか（LEFT OUTER JOIN）
SELECT users.name, count(members.id)
FROM users
         LEFT JOIN members ON users.id = members.user_id
         LEFT JOIN clubs ON clubs.id = members.club_id
GROUP BY users.id;
