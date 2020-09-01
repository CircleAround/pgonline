-- いろいろ試しましょう

-- ユーザー一覧
SELECT * from users;

-- メンバー情報
SELECT * from clubs join members on clubs.id = members.club_id;

-- メンバーの総数
SELECT count(*) from clubs join members on clubs.id = members.club_id;

-- とりあえず結合して全部出す
SELECT * from users
    join members on users.id = members.user_id
    join clubs on clubs.id = members.club_id;

-- ユーザーとクラブ名のリスト
SELECT users.name, clubs.name from users
    join members on users.id = members.user_id
    join clubs on clubs.id = members.club_id;

-- 部長さんだけ見る
SELECT users.name, clubs.name from users
    join members on users.id = members.user_id
    join clubs on clubs.id = members.club_id
    where members.role = 1;

-- ユーザーが幾つの部活に入っているか
SELECT users.name, count(members.id) from users
    join members on users.id = members.user_id
    join clubs on clubs.id = members.club_id
    group by users.id;
