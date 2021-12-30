const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');



const createUser = async(req, res = response ) => {
    
    const { email, password } = req.body; 
    try {

        let usuario = await User.findOne({ email });

        if( usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'User already exits'
            })
        }
        usuario = new User( req.body );
        //Encript password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        //json web token
        const token = await generateJWT(usuario.id, usuario.name)

        //take of errors
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name : usuario.name,
            token       
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error try insert user'
        })
    }

}


const loginUser = async( req, res = response ) => {

    const { email, password } = req.body; 

    try {
        
        const usuario = await User.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'The user not exists with this email'
            })
        }

        //Confirm  password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrect'
            })
        }

        //Generate JSON WEB TOKEN
        const token = await generateJWT(usuario.id, usuario.name)
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token      
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error try login user'
        })
    }
    

}


const revalidToken =  async ( req, res = response )=> {

    const { uid, name }  = req;

    const token = await generateJWT(uid, name)

    res.json({
        ok:true,
        uid,
        name,
        token
    })

}

module.exports = {
    createUser,
    loginUser,
    revalidToken
};