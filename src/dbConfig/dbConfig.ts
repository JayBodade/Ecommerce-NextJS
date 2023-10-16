import mongoose from "mongoose";

const connect =  async () =>{


    try{


  
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.addListener('connected',()=>{
            console.log('connected to data base');
        })
    
        connection.addListener('errro',()=>{
            console.log('connnected to database');
        })
    }
    catch(e){
        console.log('connection error');
    }

  
      
}

export default connect;