const express = require('express');
const { tokenRequire } = require('./token');

const vacation = express.Router();

const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './uploads');
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        },
    }),
});

const vacationBL = require('../bll/vacation');

vacation.get('/', tokenRequire, async (req, res) => {
    const { user } = req;

    const vacations = await vacationBL.getVacations({ userId: user.id });

    if (!vacations) {
        res.status(500).json({ error: 'NO_VACATION_IN_DATABASE' });
        return;
    }
    res.json({ vacations });
});

vacation.get('/reports', async (req, res) => {
    const vacations = await vacationBL.getVacationStats();

    if (!vacations) {
        res.status(500).json({ error: 'NO_VACATION_IN_DATABASE' });
        return;
    }
    res.json({ vacations });
});

vacation.post('/', upload.single('file'), async (req, res) => {
    let form = req.body.vacation;
    if (typeof form === 'string') {
        form = JSON.parse(form);
    }

    const vacation = await vacationBL.createVacation(form);

    res.json({ vacation });
});

vacation.put('/', upload.single('file'), async (req, res) => {
    let form = req.body.vacation;
    if (typeof form === 'string') {
        form = JSON.parse(form);
    }

    const vacation = await vacationBL.updateVacation(form);

    res.json({ vacation });
});

vacation.delete('/', tokenRequire, async (req, res) => {
    const { id } = req.body;

    const result = await vacationBL.deleteVacation({ id });

    if (!result) {
        res.status(500).json({ error: 'DELETE' });
        return;
    }

    res.json({ delete: true });
});

vacation.post('/:id/follow', tokenRequire, async (req, res) => {
    const { user } = req;

    const result = await vacationBL.followVacation({ vacationId: req.params.id, userId: user.id });

    res.json({ result: true });
});

vacation.post('/:id/unfollow', tokenRequire, async (req, res) => {
    const { user } = req;

    const result = await vacationBL.unfollowVacation({ vacationId: req.params.id, userId: user.id });

    res.json({ result: true });
});

module.exports = vacation;
