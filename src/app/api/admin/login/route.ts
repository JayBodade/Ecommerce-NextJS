import UserModel from '@/model/user';
import connect from '@/dbConfig/dbConfig';
var CryptoJS = require("crypto-js");
import { NextRequest, NextResponse } from 'next/server';
var jwt = require('jsonwebtoken');



connect();


export async function POST(req:NextRequest){

     try{

    
        const body = await req.json();
        console.log(body.email);
        if(body.email==='admin' && body.password === 'admin'){
            var token = jwt.sign({email:body.email}, 'token for json web token',{ expiresIn:'1h'});

        let response =  NextResponse.json({success:true,message:'Login Success',token});

        response.cookies.set('adminToken',token,{
            httpOnly:true,
            maxAge:3600,
        })  
        return response;

        }
        else{
            return NextResponse.json({success:false,message:"wrong mail or password"});
        }
        
      
    
   

 } catch(err){
    return NextResponse.json({success:false,error:err})
}

}



    

    

