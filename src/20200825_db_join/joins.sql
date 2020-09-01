-- いろいろ試しましょう

-- ユーザー一覧
SELECT * FROM users;

-- メンバー情報
SELECT * FROM clubs JOIN members ON clubs.id = members.club_id;

-- メンバーの総数
SELECT count(*) FROM clubs JOIN members ON clubs.id = members.club_id;

-- とりあえず結合して全部出す
SELECT * FROM users
    JOIN members ON users.id = members.user_id
    JOIN clubs ON clubs.id = members.club_id;

-- ユーザーとクラブ名のリスト
SELECT users.name, clubs.name FROM users
    JOIN members ON users.id = members.user_id
    JOIN clubs ON clubs.id = members.club_id;

-- 部長さんだけ見る
SELECT users.name, clubs.name FROM users
    JOIN members ON users.id = members.user_id
    JOIN clubs ON clubs.id = members.club_id
    WHERE members.role = 1;

-- ユーザーが幾つの部活に入っているか
SELECT users.name, count(members.id) FROM users
    JOIN members ON users.id = members.user_id
    JOIN clubs ON clubs.id = members.club_id
    GROUP BY users.id;
