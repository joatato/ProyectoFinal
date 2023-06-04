import passport from 'passport';
import local from 'passport-local';
import github from 'passport-github2';
import { usuarioModelo } from "../dao/models/usuario.modelo.js";
import { creaHash, esClaveValida } from "../utils/utils.js";
import passportJWT from 'passport-jwt';


const extraerToken = (req) => {
    let token = null;

    if (req.headers.authorization) {
        console.log('toma token desde header authorization, via PASSPORT');
        token = req.headers.authorization.split(' ')[1]
    } else {
        if (req.cookies['codertokenCliente']) {
            console.log('token desde cookie, via PASSPORT')
            token = req.cookies['codertokenCliente'];
        } else {
            if (req.headers.codertoken) {
                console.log('token desde headers, via PASSPORT')
                token = req.headers.codertoken;
            } else {
                if (req.query.codertoken) {
                    console.log('token desde query params, via PASSPORT')
                    token = req.query.codertoken;
                }
            }
        }
    }

    return token;
}


export const inicializaEstrategias = () => {

    passport.use('jwt', new passportJWT.Strategy(
        {
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([extraerToken]),
            secretOrKey: 'miPalabraSecreta'
        },
        (contenidoToken, done) => {
            try {
                if (contenidoToken.usuario.apellido == 'Santos') {
                    done(null, false, { messages: 'El usuario Santos se encuentra temporalmente inhabilitado' })
                }

                done(null, contenidoToken.usuario)
            } catch (error) {
                done(error)
            }
        }
    ))

    passport.use('github', new github.Strategy({
        clientID: 'Iv1.cef6323d9460de58',
        clientSecret: '6bdd0717b05069145648bbff6284d417d4af873c',
        callbackURL: 'http://localhost:3000/api/sessions/callbackGithub'
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            console.log(profile);

            let nombre = profile._json.name;
            let email = profile._json.email;

            let usuario = await usuarioModelo.findOne({ email: email });
            if (!usuario) {
                let usuarioNuevo = {
                    nombre,
                    email,
                    github: true,
                    githubProfile: profile._json
                }
                usuario = await usuarioModelo.create(usuarioNuevo);
            } else {
                let actualizaUsuario = {
                    github: true,
                    githubProfile: profile._json
                }

                await usuarioModelo.updateOne({ email: email }, actualizaUsuario);
            }

            done(null, usuario)

        } catch (error) {
            done(error)
        }


    }))


    passport.use('registro', new local.Strategy({ usernameField: 'email', passReqToCallback: true }, async (req, username, password, done) => {

        try {
            let { nombre, apellido, edad } = req.body;

            if (!username || !password) return done(null, false)

            let usuarioActual = await usuarioModelo.findOne({ email: username })

            if (usuarioActual) return done(null, false);

            let usuario = await usuarioModelo.create({
                nombre, apellido,
                email: username,
                password: creaHash(password),
                edad
            })

            return done(null, usuario);

        } catch (error) {
            done(error);
        }


    }))

    passport.use('login', new local.Strategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            // let {email, password}=req.body;

            if (!username || !password) return done(null, false)

            // let usuario=await usuarioModelo.findOne({email:email, password:crypto.createHash('sha256','palabraSecreta').update(password).digest('base64')})
            let usuario = await usuarioModelo.findOne({ email: username })

            if (!usuario) return done(null, false);
            if (!esClaveValida(password, usuario)) return done(null, false);

            return done(null, usuario);

        } catch (error) {
            return done(error);
        }
    }))



    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        let usuario = await usuarioModelo.findOne({ _id: id });
        done(null, usuario);
    });

} // fin inicalizaEstrategias




