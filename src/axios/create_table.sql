-- 创建预约信息表
create table reservation(
	id int auto_increment primary key, --预约id
    canteen varchar(255), -- 餐厅名称
    floor varchar(255), --楼层
    seatgroup varchar(255), --座位分区
    seatnumber varchar(255), --座位号
    time int --预约时间
);