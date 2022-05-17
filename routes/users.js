const { Router } = require('express')
const { registerUser, loginUser } = require('../model/supabase')
const router = new Router()

router.post('/register', (req, res) => {
    registerUser(req.body)
        .then(data => res.json({
            status: 'ok',
            data: data
        }))
        .catch(error => res.json({
            status: 'error',
            error: error
        }))
});
router.post('/login', (req, res) => {
    loginUser(req.body)
        .then(data => {
            if (data[0].password == req.body.password) {
                res.json({
                    status: 'ok',
                    // data: data
                })
            }
        })
        .catch(error => res.json({
            status: 'error',
            error: error
        }))
});
router.get('/logout', (req, res) => res.send(`/:id ${req.params.id}`));

module.exports = router;