const mongoose =require("mongoose");

const userData =new mongoose.Schema({
    fullname:{
        type:String,
        require:true

    },

    email:{
        type:String,
        require:true

    },

    mobile:{
        type:Number,
        require:true

    },

    skills:{
        type:String,
        require:true

    },

    password:{
        type:String,
        require:true

    },

    confirmpassword:{
        type:String,
        require:true

    },
})

module.exports = mongoose.model("userData",userData)