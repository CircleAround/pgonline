-- 使い方: postgresqlの環境ができている前提で、testdbを作成したら以下を実行する（postgresql v11.9で確認）
-- psql -d testdb -f ./create.sql

-- 便宜上、実行する度にDBを消しています。流用する場合には注意してください。
drop table if exists members;
drop table if exists users;
drop table if exists clubs;
-- 便宜上、実行する度にDBを消しています。流用する場合には注意してください。

CREATE TABLE users
(
  id bigserial not null primary key,
  name varchar(255)
);

CREATE TABLE clubs
(
  id bigserial not null primary key,
  name varchar(255)
);

CREATE TABLE members
(
  id bigserial not null primary key,
  club_id bigint not null references clubs(id),
  user_id bigint not null references users(id),
  role integer default 0 not null,
  UNIQUE(club_id, user_id)
);

-- 初期データを入れています
INSERT INTO users(name)
  VALUES ('佐藤'), ('鈴木'), ('田中');

INSERT INTO clubs(name)
  VALUES ('サッカー部'), ('テニス部'), ('将棋部');

INSERT INTO members(user_id, club_id) -- role default 0 を確認するのであえて指定しない
  VALUES (1, 1), (1, 3), (2, 2);

INSERT INTO members(user_id, club_id, role)
  VALUES (3, 3, 1);

-- 結果:
-- 佐藤はサッカーと将棋を兼部
-- 鈴木はテニス部
-- 田中は将棋部の部長