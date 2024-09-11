create database db_learninghub;
use db_learninghub;
#common table
create table `Role`(
role_id nvarchar(5) not null primary key,
`name` nvarchar(15) not null
);
create table User(
email nvarchar(50) primary key,
real_name nvarchar(50) not null,
phone_num nvarchar(15),
`password` text not null,
role_id nvarchar(5) not null,
is_Active bit default true not null ,
signup_date date not null,
foreign key (role_id) references role(role_id)
);
create table Feature(
id bigint not null auto_increment,
`name` nvarchar(50) not null,
is_Active bit default false not null,
`description` nvarchar(200) default 'no_reason_error',
primary key (id)
);

#for task manager feature
create table Note(
id bigint primary key auto_increment,
title text,
`description` text,
user_id  nvarchar(50) not null,
created_date date not null,
is_Active bit default true not null,
foreign key (user_id) references User(email)
);
create table Board(
id bigint primary key auto_increment,
`name` nvarchar(70) default'BOARD_NAME' not null,
created_date date not null,
note_id bigint not null,
is_Active bit default true not null,
foreign key(note_id) references Note(id)
);
create table `Kanban_Column`(
id bigint primary key auto_increment,
board_id bigint not null,
`name` nvarchar(50) not null,
`position` int default -1 not null,
is_Active bit not null,
foreign key (board_id) references Board(id)
);
create table Card(
id bigint primary key auto_increment,
column_id bigint not null,
`name` nvarchar(100) not null,
`description` text,
date_start date,
date_end date,
is_Active bit default true not null,
created_date date ,
`position` int default 0,
foreign key (column_id) references `Kanban_Column`(id)
);
create table Checklist_item(
id bigint primary key auto_increment,
card_id bigint not null,
`name` nvarchar(100) not null,
is_checked bit default false not null,
`position` int default -1 not null,
foreign key (card_id) references `Card`(id)
);
create table Card_attachment(
id bigint primary key auto_increment,
card_id bigint not null,
updated_date date not null,
filename nvarchar(50) not null,
url nvarchar(200) not null,
foreign key (card_id) references Card(id)
);
create table Core_label(
id bigint primary key auto_increment,
`name` nvarchar(100),
color nvarchar(16)
);
create table Board_label(
id bigint primary key auto_increment,
board_id bigint not null,
`name` nvarchar(100),
color nvarchar(16),
foreign key (board_id) references Board(id)
);
--  board to resolved one to one relation
create table Card_label(
label_id bigint not null,
card_id bigint not null,
foreign key (label_id) references Board_label(id),
foreign key (card_id) references Card(id)
);

# for pomodoro feature
create table pomodoro_template(
 id bigint primary key auto_increment,
 `name` nvarchar(100) not null,
 pomodoro int not null default 25,
 short_break int not null default 5,
 long_break int not null default 30,
 long_break_interval int not null default 4,
 user_id nvarchar(50) not null,
 foreign key (user_id) references `User`(email)
);

create table pomodoro_task(
id bigint primary key auto_increment,
pomodoro_id bigint not null,
`name` nvarchar(100) not null,
est_podomoro int not null default 0,
note text,
foreign key (pomodoro_id) references pomodoro_template(id)
);

# for flashcard
create table flashcard_set(
id bigint primary key auto_increment,
user_id nvarchar(50) not null,
title nvarchar(50) not null,
`description` text not null,
created_date date not null,
is_Active bit default true not null,
is_Learned bit default false not null,
foreign key (user_id) references User(email)
);

create table flashcard(
id bigint primary key auto_increment,
set_id bigint not null,
term text,
`definition` text,
`position` int,
foreign key (set_id) references flashcard_set(id)
)


