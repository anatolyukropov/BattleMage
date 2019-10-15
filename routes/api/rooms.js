const express = require('express'),
    uuid = require('uuid'),
    logger = require('../../config/logger'),
    Rooms = require('../../src/models/Rooms');
router = express.Router();

router.get('/', async (req, res) => {
    let rez = await Rooms.getAll();
    res.status(200).json({
        success: true,
        response: rez,
    });
});

router.put('/', async (req, res) => {
    let rez = await Rooms.update(req.body.room_id, req.body.userName);
    res.status(200).json({
        success: true,
        response: rez,
    });
});

router.post('/', async (req, res) => {
    let rez = await Rooms.create(req.body);
    res.status(200).json({
        success: true,
        response: rez,
    });
});

router.delete('/user/', async (req, res) => {
    let rez = await Rooms.deleteUser(req.body.userName);
    res.status(200).json({
        success: true,
        response: rez,
    });
});

router.delete('/', async (req, res) => {
    let rez = await Rooms.deleteRoom(req.body.roomId);
    res.status(200).json({
        success: true,
        response: rez,
    });
});


module.exports = router;
