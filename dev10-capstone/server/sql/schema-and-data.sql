drop database if exists club;
create database club;

use club;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

create table club (
	club_id int primary key auto_increment,
    app_user_id int not null,
    `name` varchar(50) not null,
    category varchar(50) not null,
    location varchar(100) not null,
    membership_fee int not null,
    `description` varchar(250),
    constraint fk_club_id_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table `member` (
	member_id int primary key auto_increment,
    app_user_id int not null,
    `name` varchar(50) not null,
    phone varchar(25) not null,
    address varchar(250) not null,
    membership_status varchar(50) not null,
    membership_type varchar(50) not null,
    join_date date not null,
    expiration_date date not null,
    constraint fk_member_id_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table club_member (
	club_id int not null,
    member_id int not null,
    constraint pk_club_member_id
        primary key (club_id, member_id),
    constraint fk_club_id
        foreign key (club_id)
        references club(club_id),
    constraint fk_member_id
        foreign key (member_id)
        references `member`(member_id)
);

create table `event` (
	event_id int primary key auto_increment,
    club_id int not null,
    title varchar(50) not null,
    `date` date not null,
    start_time time not null,
    end_time time not null,
    location varchar(100) not null,
    `description` varchar(250) not null,
    img_url varchar(500) not null,
    constraint fk_event_club_id
		foreign key (club_id)
        references club(club_id)
);

create table booking (
	booking_id int primary key auto_increment,
    club_id int not null,
    member_id int,
    facility varchar(100) not null,
    `status` bit not null,
    start_date date not null,
    end_date date not null,
    start_time time not null,
    end_time time not null,
    constraint fk_booking_club_id
		foreign key (club_id)
        references club(club_id),
    constraint fk_booking_member_id
		foreign key (member_id)
        references `member`(member_id)
);

insert into app_user (username, password_hash, enabled) values
	('elite@fitness.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('book@works.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('nathan@straub.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('fitness@guru.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('nerd@alert.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('guest@user.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);
    
insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');
    
insert into club (app_user_id, `name`, category, location, membership_fee, `description`) values
	(1, "Elite Fitness", "Fitness Club", "New York, NY", 50, "State-of-the-art gym offering personal training, group classes, and top-notch equipment."),
    (2, "Bookworms Club", "Hobby Club", "Boston, MA", 10, "Monthly book club discussing literature from various genres, fostering lively discussions and debates."),
    (3, "Tracks Nightclub", "Social Club", "Denver, CO", 0, "Tracks is Denver's premiere LGBTQ+ nightclub.");

insert into `member` (app_user_id, `name`, phone, address, membership_status, membership_type, join_date, expiration_date) values
	(4, "Fitness Guru", "222-666-6789", "678 Apple Rd", "Active", "Basic", "2024-04-25", "2025-04-20"),
    (5, "Angelina Ballerina", "515-555-3030", "345 Grove Ave", "Active", "Premium", "2020-01-23", "2022-02-19"),
    (6, "Guest User", "123-456-7890", "123 Main St, Anytown, USA", "Active", "Premium", "2023-05-10", "2024-05-10");

insert into club_member (club_id, member_id) values
	(1, 1),
    (2, 2),
    (3, 3);
    
insert into `event` (club_id, title, `date`, start_time, end_time, location, `description`, img_url) values
	(1, "Beginner's Yoga Class", "2024-04-25", "19:00", "20:00", "Fitness Studio", "Join us for a relaxing beginner's yoga class led by our certified instructor. Mats provided.", "https://hips.hearstapps.com/hmg-prod/images/woman-posing-with-one-arm-raised-in-yoga-class-royalty-free-image-1706639320.jpg"),
	(2, "Monthly Meeting", "2024-04-15", "18:00", "20:00", "Clubhouse", "Join us for our monthly meeting where we'll discuss upcoming events, club updates, and member feedback.", "https://media.istockphoto.com/id/1627657997/vector/stack-of-books-and-cup-of-coffee.jpg?s=612x612&w=0&k=20&c=BaoPIkC97eF1XC3u7v4xIsOzFrfoBWj3Z6X6nlPjvyk=");
	
insert into booking (club_id, member_id, facility, `status`, start_date, end_date, start_time, end_time) values
	((select club_id from club where club_id = 1), (select member_id from `member` where member_id = 2), "Fitness Studio", 1, "2024-04-20", "2024-04-20", "08:00", "09:00"),
    ((select club_id from club where club_id = 2), null, "The Great Gatsby",  0, "2024-04-28", "2024-05-12", "11:00", "11:00");
    
insert into app_user_role values
    (1, 2),
    (2, 2),
    (3, 2),
    (4, 1),
    (5, 1),
    (6, 1);