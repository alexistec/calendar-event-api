const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { createUser, loginUser, revalidToken  } = require('../controllers/auth');
const { validField } = require('../middlewares/valid-fields');
const { validarJWT } = require('../middlewares/valid-jwt');



router.post('/',
        [
        //middlewares
            check('email', 'Email is required').isEmail(),
            check('password','Password must contain 6 characters').isLength({ min:6 }),
            validField
        ], 
        loginUser )

router.post('/new',
            [
                //middlewares
                check('name', 'Name is required').not().isEmpty(),
                check('email', 'Email is required').isEmail(),
                check('password','Password must contain 6 characters').isLength({ min:6 }),
                validField
            ],
            createUser )

router.get('/renew', validarJWT ,revalidToken)



module.exports = router;