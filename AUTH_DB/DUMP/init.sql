SET search_path TO public;

create table users
(
username varchar primary key,
password varchar,
api_key__elevania varchar
);

insert into users values ('tester','tester','721407f393e84a28593374cc2b347a98');
