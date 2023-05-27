/* import { Router } from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";

export class MiRouter{
    constructor(){
        this.router=Router();
        this.init()
    }

    init(){} // completar en la clase hija

    getRouter(){
        return this.router;
    }

    // router.get('/',(req,res)=>{
    //     res.send('hola...!!!')
    // })

    get(path, permisos, ...funciones){ 
        this.router.get(path , passport.authenticate('jwt',{session:false}) ,this.misRespuestas, this.handlePolicies(permisos), this.applyCallbacks(funciones))
    }

    post(path, permisos, ...funciones){
        this.router.post(path, passport.authenticate('jwt',{session:false}), this.misRespuestas, this.handlePolicies(permisos), this.applyCallbacks(funciones))
    }

    put(path, permisos, ...funciones){
        this.router.put(path, passport.authenticate('jwt',{session:false}), this.misRespuestas, this.handlePolicies(permisos), this.applyCallbacks(funciones))
    }

    delete(path, permisos, ...funciones){
        this.router.delete(path, passport.authenticate('jwt',{session:false}), this.misRespuestas, this.handlePolicies(permisos), this.applyCallbacks(funciones))
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback=>async(...params)=>{
            try {
                console.log(`Que vemos ${params}`);
                
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send('Error interno del servidor')
            }        
        })
    }

    misRespuestas(req,res,next){
        res.success=(respuesta)=>res.status(200).send({status:'OK', respuesta})
        res.success2=(respuesta, datos)=>res.status(200).send({status:'OK', respuesta, datos})
        res.errorCliente=(error)=>res.status(400).send({status:'error cliente', error})
        res.errorAutenticacion=(error)=>res.status(401).send({status:'error Autenticacion', error})
        res.errorAutorizacion=(error)=>res.status(403).send({status:'error Autorizacion', error})

        next();
    }

    handlePolicies(arrayPermisos){
        return(req, res, next)=>{
            if(arrayPermisos.includes('PUBLIC')) return next();

            let autHeader=req.headers.authorization;
            if(!autHeader) return res.errorAutenticacion('No esta autenticado');
            let token=autHeader.split(' ')[1]
            let contenidoToken=jwt.verify(token,'miPalabraSecreta',(err,decoder)=>{
                if(err) return false;
                return decoder
            })
            if(!contenidoToken) return res.errorAutenticacion('No esta autenticado');
            
            let usuario=contenidoToken.usuario

            if(!arrayPermisos.includes(usuario.rol.toUpperCase())) return res.errorAutorizacion('No tiene privilegios suficientes para acceder al recurso')
            req.user=usuario;
            console.log(usuario);
            next();
        }
    }


} // fin class MiRouter */