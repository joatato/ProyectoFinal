import passport from 'passport';
import local from 'passport-local';
import github from 'passport-github2';
import { usuarioModelo } from "../models/usuario.modelo.js";
import { creaHash, esClaveValida } from "../utils/utils.js";

export const inicializaEstrategias=()=>{


    passport.use('github', new github.Strategy({
        clientID:'Iv1.cef6323d9460de58',
        clientSecret: '6bdd0717b05069145648bbff6284d417d4af873c',
        callbackURL : 'http://localhost:3000/api/sessions/callbackGithub'
    },async(accessToken, refreshToken, profile, done)=>{

        try {
            console.log(profile);

            let nombre=profile._json.name;
            let email=profile._json.email;
    
            let usuario=await usuarioModelo.findOne({email:email});
            if(!usuario){
                let usuarioNuevo={
                    nombre,
                    email, 
                    github:true,
                    githubProfile:profile._json
                }
                usuario=await usuarioModelo.create(usuarioNuevo);
            }else{
                let actualizaUsuario={
                    github:true,
                    githubProfile:profile._json
                }
    
                await usuarioModelo.updateOne({email:email},actualizaUsuario);
            }
    
            done(null, usuario)
                
        } catch (error) {
            done(error)            
        }

        
    }))


    passport.use('registro', new local.Strategy({usernameField:'email', passReqToCallback:true}, async(req, username, password, done)=>{

        try {
            let {nombre, apellido, edad}=req.body;

            if(!username || !password) return done(null, false)
        
            let usuarioActual=await usuarioModelo.findOne({email:username})
            
            if(usuarioActual) return done(null, false);
            
            let usuario = await usuarioModelo.create({
                nombre, apellido, 
                email:username, 
                password:creaHash(password),
                edad
            })

            return done(null, usuario);
                
        } catch (error) {
            done(error);            
        }

    
    }))

    passport.use('login', new local.Strategy({usernameField:'email'}, async(username, password, done)=>{

        try {
            // let {email, password}=req.body;

            if(!username || !password) return done(null, false)
        
            // let usuario=await usuarioModelo.findOne({email:email, password:crypto.createHash('sha256','palabraSecreta').update(password).digest('base64')})
            let usuario=await usuarioModelo.findOne({email:username})
            
            if(!usuario) return done(null,false);
            if(!esClaveValida(password, usuario))  return done(null,false);

            return done(null, usuario);
            
        } catch (error) {
            return done(error);         
        }
    }))



    passport.serializeUser((user, done)=>{
        done(null, user._id)
    });

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usuarioModelo.findOne({_id:id});
        done(null, usuario);
    });

} // fin inicalizaEstrategias




