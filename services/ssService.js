'use strict';

var SSService = {};

SSService.getUsers = function getUsers(connection) {
    var sql = "SELECT username, password FROM user";
    return connection.query(sql);
};

SSService.getBookings = function getBookings(connection) {
    var sql = "SELECT * FROM booking where book_status = 1";
    return connection.query(sql);
};

SSService.getBooking = function getBooking(connection, book_id) {
    var sql = "SELECT * FROM booking where book_id= :book_id";
    return connection.query(sql, { book_id: book_id });
};


SSService.deleteRoomMe = function deleteRoomMe(connection, username) {
    var sql = "DELETE FROM user WHERE username= :username";
    return connection.query(sql, { username: username });
};


SSService.deleteBooking = function deleteBooking(connection, book_id) {
    var sql = "UPDATE booking set book_status = 0 WHERE book_id= :book_id";
    return connection.query(sql, { book_id: book_id });
};


SSService.getUser = function getUser(connection, username) {
    var sql = "SELECT username, password FROM user where username= :username";
    return connection.query(sql, { username: username });
};


SSService.editUser = function editUser(connection, user) {
    var sql = "UPDATE user set username = :username, password = :password where username = :username";
    return connection.query(sql, { username: user.username, password: user.password });
};

SSService.addUser = function addUser(connection, user) {
    var sql = "INSERT INTO user ( username, password) VALUES (:username, :password)";
    return connection.query(sql, user);
};

module.exports = SSService;