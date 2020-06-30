-- 使い方: postgresqlの環境ができている前提で、testdbを作成したら以下を実行する（postgresql v9.6で確認）
-- psql -d testdb -f ./create.sql

-- 便宜上、実行する度にDBを消しています。流用する場合には注意してください。
drop table if exists no_check_books;
drop table if exists unique_name_books;
drop table if exists strict_check_books;
drop table if exists users;
-- 便宜上、実行する度にDBを消しています。流用する場合には注意してください。

CREATE TABLE users
(
    id   bigserial not null primary key,
    name varchar
);

CREATE TABLE no_check_books
(
    id      bigserial not null primary key,
    user_id bigint,
    name    varchar
);

CREATE TABLE unique_name_books
(
    id      bigserial not null primary key,
    user_id bigint,
    name    varchar unique
);

CREATE TABLE strict_check_books
(
    id      bigserial not null primary key,
    user_id bigint not null references users(id),
    name    varchar not null unique
);

-- 初期データを入れています
INSERT INTO users(name)
VALUES ('佐藤'), ('鈴木'), ('田中');

INSERT INTO no_check_books(user_id, name)
VALUES (NULL, '坊ちゃん'), (1, 'こころ');

INSERT INTO unique_name_books(user_id, name)
VALUES (NULL, '坊ちゃん'), (1, 'こころ');

INSERT INTO strict_check_books(user_id, name)
VALUES (2, '坊ちゃん'), (1, 'こころ');