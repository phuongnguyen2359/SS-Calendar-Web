'use strict';

var RoomService = {};

RoomService.getRooms = function getRooms(connection) {
    var sql = "SELECT * FROM room where status = 1";
    return connection.query(sql);
};

RoomService.getallRooms = function getallRooms(connection) {
    var sql = "SELECT * FROM room";
    return connection.query(sql);
};


RoomService.getRoom = function getRoom(connection, id) {
    var sql = "SELECT id, name, description, status FROM room where id= :id";
    return connection.query(sql, { id: id });
};

RoomService.getBookings = function getBookings(connection) {
    var sql = "SELECT start_time, end_time, purpose, room_id FROM booking where book_status = 1 ";
    return connection.query(sql);
};


RoomService.editRoom = function editRoom(connection, room) {
    
    
    var sql = "UPDATE room set name = :name, description = :description where id = :id";
    return connection.query(sql, { id: room.id,name: room.name, description: room.description });
};

RoomService.deleteRoomMe = function deleteRoomMe(connection, id) {
    var sql = "UPDATE room set status = 0 WHERE id= :id";
    return connection.query(sql, { id: id });
};


RoomService.addRoom = function addRoom(connection, review) {
    var sql = "INSERT INTO room ( name, description,status) VALUES (:name, :description, :status)";
    return connection.query(sql, review);
};

module.exports = RoomService;