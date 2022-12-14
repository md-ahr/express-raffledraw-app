import express from 'express';

const Router = express.Router();

router.route('/t/:id')
    .get()
    .put()
    .delete();

router.route('/u/:username')
    .get()
    .put()
    .delete();

router.post('/bulk');
router.get('/draw');

router.route('/')
    .get()
    .post();
