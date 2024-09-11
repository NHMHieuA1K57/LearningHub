use db_learninghub;
INSERT INTO `db_learninghub`.`role`
(`role_id`, `name`)
VALUES
("ADMIN","admin"),("USER","user");

INSERT INTO `db_learninghub`.`user`
(`email`,`real_name`,`phone_num`,`password`,`role_id`,`is_Active`,`signup_date`)
VALUES
("truongpdhe170417@fpt.edu.vn", "Phan Dang Truong", "0915438401", "$2a$10$bsZ0GwPLZ2/BpZPdiAKK8uHQR3oS2CHU5Ro23HEPdEmQguEoOw9tu", "ADMIN", true, "2023-01-01");

-- password is admin123
INSERT INTO `db_learninghub`.`feature`
(`id`,`name`,`is_Active`)
VALUES
(1,"flashcard",true),(2,"task management",true),(3,"pomodoro",false);

INSERT INTO `db_learninghub`.`note`
(`id`, `title`, `description`, `user_id`, `created_date`, `is_Active`)
VALUES
(1,"test note","test desc","truongpdhe170417@fpt.edu.vn","2023-01-01",1);


INSERT INTO `db_learninghub`.`board`
(`name`,`created_date`,`note_id`,`is_Active`)
VALUES
("my board","2023-01-01",1,true);

INSERT INTO `db_learninghub`.`kanban_column`
(`id`,`board_id`, `name`, `position`, `is_Active`)
VALUES
(1,1,"To do",0,true),(2,1,"Doing",0,true);

INSERT INTO `db_learninghub`.`card` (`column_id`, `name`, `description`, `date_start`, `date_end`, `is_Active`, `created_date`, `position`) 
VALUES 
(1, 'test', '1', '2023-01-01', '2023-01-01', true, '2023-01-01', 0),
(1, 'test2', '2', '2023-01-01', '2023-01-01', true, '2023-01-01', 0),
(1, 'test3', '3', '2023-01-01', '2023-01-01', true, '2023-01-01', 0);
INSERT INTO `db_learninghub`.`board_label`
(`id`,`board_id`,`name`,`color`)
VALUES
(1,1,'test 1','green'),
(2,1,'test 2','red');

INSERT INTO `db_learninghub`.`card_label`
(`label_id`,`card_id`)
VALUES
(1,1),(2,1),(1,2);

INSERT INTO `db_learninghub`.`core_label`
(`name`,`color`)
VALUES
("low","green"),
("medium","yellow"),
("high","red");


