import dotenv from 'dotenv'

dotenv.config({
    override:true,
    path:'./src/.env'
})

export const config={
    app:{
        PORT:process.env.PORT||8080,
        PERSISTENCIA:process.env.PERSISTENCIA,
        SECRET:process.env.SECRET
    },
    database:{
        MONGOURL:process.env.MONGOURL,
    }
}