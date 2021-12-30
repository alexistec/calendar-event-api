const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const isDate = require("../helpers/isDate");
const { validField } = require("../middlewares/valid-fields");
const { validarJWT } = require("../middlewares/valid-jwt");

const router = Router();


//middlewares
router.use( validarJWT );


//Get Event
router.get('/', getEvents );
//Create Event
router.post(
    '/',
    [
        check('title','The title is required').not().isEmpty(),
        check('start','Start date is required').custom( isDate ),
        check('end','End date is required').custom( isDate ),
        validField
    ], 
    createEvent 
);
//Update Event
router.put(
    '/:id', 
    [
        check('title','The title is required').not().isEmpty(),
        check('start','Start date is required').custom( isDate ),
        check('end','End date is required').custom( isDate ),
        validField
    ], 
    updateEvent 
);
//delete Event
router.delete(
    '/:id', 
    deleteEvent 
);


module.exports = router;