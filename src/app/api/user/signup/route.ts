import UserModel from "@/model/user";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
var CryptoJS = require("crypto-js");


connect();
export async function POST(req: NextRequest) {


  
 try{
    let { username, email, password } = await req.json();

    const dbuser = await UserModel.findOne({ email:email});
    if(dbuser){
        return NextResponse.json({success:false, message:"user already exists"});
    }
    else{
 
        password = CryptoJS.AES.encrypt(password,'This is my secret key').toString();
        let date = Date.now().toString();
        let hashToken = CryptoJS.AES.encrypt(date,'This is my secret key').toString();
        hashToken=hashToken.replace('+','xMl3Jk')
        hashToken=hashToken.replace('/','Por21Ld')
        hashToken=hashToken.replace('=','Ml32');
        const verificationToken = hashToken;
     
        const user = await UserModel.create({username,email,password,verificationToken});
        if(user){
          
           return NextResponse.json({success:true, message:"account created suuccessfully",generatedHash:verificationToken});
        }
        else{
            return NextResponse.json({success:false, message:"something went wrong"});
        }
    }

}catch(e:any){

    return NextResponse.json({success:false,error:e});
}


   

}

