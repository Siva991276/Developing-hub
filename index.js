const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userData = require("./Model/userData")
//siva

const app = express();

const port = 3033

const mongURL="mongodb+srv://badasiva22:Siva991276@cluster0.iis7lrd.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json());
app.use(cors({origin: ""}));

// initalizing mongodb coonect

mongoose.connect(mongURL)
.then(()=>console.log("DB connected"))
.catch((e)=>console.log(e.message))

app.get("/" ,(req,res)=>{
    res.send("Welcome to developer hubs Server")
})

app.post("/register",async(req,res)=>{
    
      try{
        const {fullname,email,mobile,skills,password,confirmpassword}=req.body

        // checking user whether it is exist not
                const isuserExist = await userData.findOne({email: email});
        
                if(isuserExist){
                    return res.send("user Already Register")
        
                }
                if(password!== confirmpassword){
                   return res.send("Password not matched")
                }else{

                    const hashedPassword = await bcrypt.hash(password, 10);//generating enccrypted password for user
                    let newUser = new userData({
                        fullname,
                        email,
                        mobile,
                        skills,
                        password : hashedPassword,
                        confirmpassword : hashedPassword
                    })
            
                    newUser.save();//saving mongodb collection
                   return res.send("user created successfully")
                }
        
              

      }catch(e){
        res.send("Internal Server Error")
      }
    
})


app.listen(port, ()=>{
    console.log(`Server running at ${port}`);
})

