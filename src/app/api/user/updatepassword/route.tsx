import User from "@/model/user";
import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
var CryptoJS = require("crypto-js");

connect();
export async function  POST(req:NextRequest){
    
    let {email,password} = await req.json();
   
    try {

        const projection ={
            _id:1,
        }  
        const user = await User.findOne({ email: email },projection);
        if (user) {
          const dbpassword = CryptoJS.AES.encrypt(password, 'This is my secret key').toString();
          const updatePassword = await User.findByIdAndUpdate(user._id, { password: dbpassword });
          if (updatePassword) {
            return NextResponse.json({ success: true, message: 'Updated Successfully' });
          } else {
            return NextResponse.json({ success: false, message: 'Something went wrong' });
          }
        } else {
          return NextResponse.json({ success: false, message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' });
      }
}