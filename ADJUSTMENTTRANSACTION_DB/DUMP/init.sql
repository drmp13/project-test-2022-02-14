SET search_path TO public;

create table transaction
(
id serial primary key,
username varchar,
sku varchar,
qty bigint,
amount bigint,
created_at timestamp,
updated_at timestamp
);
