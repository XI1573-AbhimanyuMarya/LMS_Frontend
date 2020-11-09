insert into competency (id,name) values (101,'Beginner');
insert into competency (id,name) values (102,'Mediocre');
insert into competency (id,name) values (103,'Advanced');
insert into competency (id,name) values (104,'Expert');
commit;

insert into category (id,name) values (201,'UI');
insert into category (id,name) values (202,'UX');
insert into category (id,name) values (203,'Backend');
insert into category (id,name) values (204,'BigData');
commit;

insert into courses (id,name,description,category_id,competency_id) values (301,'Introduction To Java','Java and its basics',203,101);
insert into courses (id,name,description,category_id,competency_id) values (302,'Introduction To Python','Python basics',203,101);
insert into courses (id,name,description,category_id,competency_id) values (303,'Python Course','Medium level Learning',203,102);
insert into courses (id,name,description,category_id,competency_id) values (304,'React Course','Learning',201,103);
insert into courses (id,name,description,category_id,competency_id) values (305,'Full Backend','Full Fledged',203,104);
commit;

insert into duration (id,name) values (9,'9 Month');
insert into duration (id,name) values (3,'3 Month');
insert into duration (id,name) values (6,'6 Month');
insert into duration (id,name) values (12,'12 Month');
commit;





