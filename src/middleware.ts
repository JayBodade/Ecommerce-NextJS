
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  
   const path = request.nextUrl.pathname;
  
   const isPublicPath = path==='/login' || path === '/signup';
   const token=request.cookies.get('token')?.value || "";
   const advancePath = path.startsWith('/orders') || path.startsWith('/order') || path.startsWith('/order/') || path==='/myaccount';

   const adminPath = path === '/admin/addproduct'|| path === '/admin/admindashboard' || path === '/admin/alloutofstock';

   const adminToken = request.cookies.get('adminToken')?.value;
  
   if (adminPath) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/unauthorized', request.nextUrl));
    }
  }
 
    else if(isPublicPath || advancePath){

      if(!isPublicPath && !token){
   
        return NextResponse.redirect(new URL('/login',request.nextUrl));
    
        
       }
       if(advancePath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl));
    
       }
    
       if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl));
       }

    }
   
}
 

export const config = {
  type:'route',
    matcher:[
      '/',
      '/login',
      '/orders',
      '/order',
      '/order/',
      '/admin/alloutofstock',
      '/admin/admindashboard',
      '/admin/addproduct',
      '/signup',
      '/myaccount'
    ]
  }