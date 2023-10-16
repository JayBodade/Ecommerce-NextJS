import Product from "@/model/product";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { join } from "path";
import fs  from "fs";

const saveFile = async (file: formidable.File) => {
  // Save the file to the database
  // ...
};



export async function POST(req: NextRequest) {

   const config = {
    api: {
       bodyParser: false,
    }
}


    const data:any = await req.formData();

    // console.log('THSIS IS  IT', data.get('file'));
    const file: File | null = data.get('file') as unknown as File;
   
    console.log(file);
    let index = 0;
    let uniqueId = Date.now();
   
    let fileArray = [];
    for (const [key, value] of data.entries()) {

      const file: File | null = data.get(key) as unknown as File;
      if(!file){
         return NextResponse.json({success:false});

      }
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      let filename = uniqueId+'-'+file.name;
       fs.writeFileSync(`./public/uploads/${filename}`, buffer);
      fileArray.push(filename);
      index++;
    }

    console.log(fileArray);


    return NextResponse.json({success:true,fileArray});

  
  }