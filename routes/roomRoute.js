'use strict';

var express = require('express');
var Q = require('q');
var db = require('../database/dbConnection');
var roomService = require('../services/roomService');

var router = express.Router();

router.get('/', function (req, res, next) {
    var connection = null;
    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return roomService.getRooms(connection);
        })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
        .finally(function () {
            if (connection) connection.release();
        })
        .done();
});


router.get('/all', function (req, res, next) {
    var connection = null;
    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return roomService.getallRooms(connection);
        })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
        .finally(function () {
            if (connection) connection.release();
        })
        .done();
});


router.get('/booking', function (req, res, next) {
    var connection = null;
    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return roomService.getBookings(connection);
        })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err);
        })
        .finally(function () {
            if (connection) connection.release();
        })
        .done();
});



// get room via id
router.get('/:id', function (req, res, next) {
    var connection = null,
        id = req.params.id;

    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return roomService.getRoom(connection, id);
        })
        .then(function (data) {
            res.json(data[0]);
        })
        .catch(function (err) {
            next(err);
        })
        .finally(function () {
            if (connection) connection.release();
        })
        .done();
});


router.post('/del', function (req, res, next) {
    var connection = null,
        data = null,
        review = req.body;

    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return connection.beginTransaction();
        })
        .then(function () {
            return roomService.deleteRoomMe(connection, review.id);
        })
        .then(function (result) {
            data = result;
            return connection.commit();
        })
        .then(function () {
            res.json(data)
        })
        .catch(function (err) {
            next(err);
            return connection.rollback();
        })
        .finally(function () {
            if (connection) connection.release();
        })
        .done();
});


router.post('/add', function (req, res, next) {
    var connection = null,
        data = null,
        review = req.body;
    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return connection.beginTransaction();
        })
        .then(function () {
            return roomService.addRoom(connection, review);
        })
        .then(function (result) {
            data = result;
            return connection.commit();
        })
        .then(function () {
            res.json(data)
        })
        .catch(function (err) {
            next(err);
            return connection.rollback();
        })
        .finally(function () {
            if (connection) connection.release();
        })
        .done();
});


router.put('/edit', function (req, res, next) {
    var connection = null,
        data = null,
        review = req.body;
    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return connection.beginTransaction();
        })
        .then(function () {
            return roomService.editRoom(connection, review);
        })
        .then(function (result) {
            data = result;
            return connection.commit();
        })
        .then(function () {
            res.json(data)
        })
        .catch(function (err) {
            next(err);
            return connection.rollback();
        })
        .finally(function () {
            if (connection) connection.release();
        })
        .done();
});


module.exports = router;