<<<<<<< Updated upstream
import dotenv from 'dotenv'

dotenv.config({
    override:true,
    path:'./src/.env'
})
=======
import dotenv from "dotenv";

const environments = ["development", "staging", "production"];
export const currentEnvironment = environments[0];

dotenv.config({
  override: true,
  path: `./src/.env.${currentEnvironment}`,
});
>>>>>>> Stashed changes

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