const { response } = require("express");
const Event = require("../models/Event");



const getEvents = async (req, res = response ) => {
    
    const event = await Event.find()
                             .populate('user','name');
    
    res.json({
        ok:true,
        event
    })

}

const createEvent = async (req, res = response ) => {
    
    const event = new Event( req.body );

    try {

        event.user = req.uid;
        
        const eventSave = await event.save();
        
        res.json({
            ok:true,
            event:eventSave
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error try create event'
        })
    }

}

const updateEvent = async (req, res = response ) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok:false,
                msg: 'Event not exits'
            })
        }

        

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:'You cannot edit this event'
            })
        }

        //udapte 
        const newEvent = {
            ...req.body,
            user:uid
        }

        const eventUpdate = await Event.findByIdAndUpdate( eventId, newEvent, { new: true });

        res.json({
            ok:true,
            eventUpdate
        })


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Not found API EVENT'
        })
    }
    
    

}

const deleteEvent = async (req, res = response ) => {
    
    const eventId =  req.params.id;
    const uid     =  req.uid;

    try {
        
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok:false,
                msg:'Event not exists'
            })
        }


        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:'You cannot edit this event'
            })
        }

        //udapte 
        
        await Event.findByIdAndDelete( eventId );

        res.json({
            ok:true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Not found API EVENT'
        })
    }
    

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}