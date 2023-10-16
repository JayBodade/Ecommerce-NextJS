"use client"
import React, { useEffect, useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { usePathname } from 'next/navigation'
import Loader from './Loader'



const Main = ({children}:any) => {
  const [progress, setProgress] = useState(0) 
  const [linkClick,setLinkClick] = useState(Boolean);
  const [token,setToken]=useState('');
  const [key,setKey] = useState(0);
  const path = usePathname();
  const [isrouting,setRounting] = useState(false);
 

  useEffect(() => {
    let storedToken = localStorage.getItem('token') ;
    
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken?.split('.')[1]));
      const expirationTimestamp = decodedToken.exp * 1000;
      const currentTimestamp = Date.now();
      if (currentTimestamp > expirationTimestamp) {
      
       
        localStorage.removeItem('token');
        setToken(''); 
        setKey(Math.random());

      } 
      else{
        setToken(storedToken); 
        setKey(Math.random());

      }
     
    }

    
    setTimeout(()=>{
      setRounting(false)
    },1000)
    
    console.log('path is changing');
    
  }, [path]);

  useEffect(()=>{

  },[token]);
  
  useEffect(()=>{
    setRounting(false);
      },[])
    

  
  return (<>
      <Navbar key={key}  progress={progress} setProgress={setProgress} setRounting={setRounting} token={token} setToken={setToken}  setLinkClick={setLinkClick}/>
      {isrouting ? <Loader/>:""}
      {children}<Footer />
      </>
  )
}

export default Main
