'use strict';

var express = require('express');
var Q = require('q');
var db = require('../database/dbConnection');
var ssService = require('../services/ssService');


var router = express.Router();

router.get('/', function (req, res, next) {
    var connection = null;

    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return ssService.getUsers(connection);
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
            return ssService.getBookings(connection);
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


router.get('/booking/:id', function (req, res, next) {
    var connection = null,
        id = req.params.id;

    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return ssService.getBooking(connection, id);
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


router.get('/:id', function (req, res, next) {
    var connection = null,
        id = req.params.id;

    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return ssService.getUser(connection, id);
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


router.post('/add', function (req, res, next) {
    var connection = null,
        data = null,
        user = req.body;
    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return connection.beginTransaction();
        })
        .then(function () {
            return ssService.addUser(connection, user);
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
            return ssService.deleteRoomMe(connection, review.username);
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

router.post('/booking/del', function (req, res, next) {
    var connection = null,
        data = null,
        review = req.body;

    db.getConnection()
        .then(function (conn) {
            connection = conn;
            return connection.beginTransaction();
        })
        .then(function () {
            return ssService.deleteBooking(connection, review.book_id);
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
            return ssService.editUser(connection, review);
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