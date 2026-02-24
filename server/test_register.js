const { register } = require("./modules/auth/auth.service");

async function run(){
  try{
    const u = await register({
      email:"manual@example.com",
      username:"manualuser",
      password:"secret"
    });
    console.log("Registered",u);
  }catch(e){
    console.error("Error during test register",e);
  }finally{
    process.exit(0);
  }
}

run();
