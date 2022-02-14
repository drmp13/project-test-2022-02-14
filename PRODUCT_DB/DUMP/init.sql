SET search_path TO public;

create table products
(
id serial primary key,
username varchar not null,
sku varchar unique not null,
name varchar not null,
image json,
price bigint not null,
stock bigint not null,
description text,
created_at timestamp,
updated_at timestamp
);
