import UserModel from '@/model/user';
import connect from '@/dbConfig/dbConfig';
var CryptoJS = require("crypto-js");
import { NextRequest, NextResponse } from 'next/server';
var jwt = require('jsonwebtoken');



connect();


export async function POST(req:NextRequest){





     try{

    
    const { email , password } = await req.json();

    const user = await UserModel.find({email:email});
    
   
    if(user.length >= 1){
        const cipherText = user[0].password; 
        var bytes  = CryptoJS.AES.decrypt(cipherText, 'This is my secret key');
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
       if(password === decryptedData){
        var token = jwt.sign({id:user[0]._id}, 'token for json web token',{ expiresIn:'1h'});
        let response =  NextResponse.json({success:true,message:'Login Success',token});

        response.cookies.set('token',token,{
            httpOnly:true,
            maxAge:3600,
        })  
        return response;
       }
      else{
        return NextResponse.json({success:false,message:'Invalid Credentials'});
      }
      

    }
    else{

        return NextResponse.json({success:false,message:"User not found"});

    }

 } catch(err){
    return NextResponse.json({success:false,error:err})
}

}



    

    

