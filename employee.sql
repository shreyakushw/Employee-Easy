create table Employee(EmployeeId int(10) not null auto_increment, Email_id varchar(50) not null, Password_e varchar(10) not null, Fullname char(50) not null, Gender char(6) not null, Address varchar(70) not null, contact_no varchar(10) not null, department varchar(20) not null, position varchar(20) not null,  primary key(EmployeeId));

drop table Employee;


select * from Employee;
show tables;
SHOW GRANTS FOR 'root'@'localhost';

create database Employee_main;
use Employee_main;
