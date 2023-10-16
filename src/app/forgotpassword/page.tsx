"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserCredProps {
    email: string,
    password: string,
    userotp: number,
    confirmpassword: string,
}

const ForgotPassword = () => {

    const [loading, setLoading] = useState(false);
    const [userCred, setUserCred] = useState<UserCredProps>({ email: '', userotp: 0, password: '', confirmpassword: "" });
    const [otp, setOtp] = useState<number>(0);
    const [showConatiner, setShowContainer] = useState(false);

    const handleChange = (e: any) => {

        const { name, value } = e.target;


        const parsedValue = name === 'userotp' ? parseInt(value, 10) : value;

        setUserCred((prev) => ({
            ...prev,
            [e.target.name]: parsedValue,
        }))
        console.log(userCred);


    }

    const sendForgotMail = async () => {
        setLoading(true);
        if (userCred.email === '') {
            setLoading(true);
            return;
        }


       const response2 = await fetch('http://localhost:3000/api/user/userinfo',{
          method:'GET',
          headers:{
            'content-type':'application/json',
            'email':userCred.email || '',
          }
       })

        const result2 = await response2.json();


        if(result2.success){
        let localotp = Math.floor(100000 + Math.random() * 900000)
        setOtp(localotp);

        const apiKey = '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';
        const mail = 'jaybodade243@gmail.com';

        const url = 'https://api.brevo.com/v3/smtp/email';

        const data = {
            sender: {
                // name: userCred.username,
                email: mail,
            },
            to: [{ email: userCred.email }],
            subject: 'Update Your Password',
            htmlContent: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="telephone=no"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Update Your Password</title><style type="text/css" emogrify="no">#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style><style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: '\u03D1';} } </style><style type="text/css" emogrify="no">@media (max-width: 600px) { .gmx-killpill { content: ' \u03D1';} .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #ffffff !important } .r2-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 100% !important } .r3-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r4-i { padding-bottom: 20px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important } .r5-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r6-o { border-style: solid !important; width: 100% !important } .r7-i { padding-left: 0px !important; padding-right: 0px !important } .r8-i { padding-bottom: 15px !important; padding-top: 15px !important } .r9-i { padding-bottom: 20px !important; padding-left: 10px !important; padding-right: 10px !important; padding-top: 20px !important } .r10-c { box-sizing: border-box !important; text-align: left !important; valign: top !important; width: 100% !important } .r11-o { border-style: solid !important; margin: 0 auto 0 0 !important; width: 100% !important } .r12-i { padding-top: 15px !important; text-align: center !important } .r13-i { padding-top: 15px !important; text-align: left !important } .r14-c { box-sizing: border-box !important; padding: 0 !important; text-align: center !important; valign: top !important; width: 100% !important } .r15-o { border-style: solid !important; margin: 0 auto 0 auto !important; margin-bottom: 15px !important; margin-top: 15px !important; width: 100% !important } .r16-i { padding: 0 !important; text-align: center !important } .r17-r { background-color: #1B1B1B !important; border-radius: 4px !important; border-width: 0px !important; box-sizing: border-box; height: initial !important; padding: 0 !important; padding-bottom: 12px !important; padding-left: 5px !important; padding-right: 5px !important; padding-top: 12px !important; text-align: center !important; width: 100% !important } .r18-i { background-color: #eff2f7 !important; padding-bottom: 20px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important } .r19-i { color: #3b3f44 !important; padding-bottom: 0px !important; padding-top: 15px !important; text-align: center !important } .r20-i { color: #3b3f44 !important; padding-bottom: 0px !important; padding-top: 0px !important; text-align: center !important } .r21-i { color: #3b3f44 !important; padding-bottom: 15px !important; padding-top: 15px !important; text-align: center !important } .r22-c { box-sizing: border-box !important; text-align: center !important; width: 100% !important } .r23-i { padding-bottom: 15px !important; padding-left: 0px !important; padding-right: 0px !important; padding-top: 0px !important } .r24-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 129px !important } .r25-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 129px !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important; border: none !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style><style type="text/css">p, h1, h2, h3, h4, ol, ul { margin: 0; } a, a:link { color: #696969; text-decoration: underline } .nl2go-default-textstyle { color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 18px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; font-style: normal; font-weight: bold; line-height: 1.15; text-decoration: none; word-break: break-word } .default-heading1 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 32px; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 24px; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style><!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">a:link{color: #696969; text-decoration: underline;}</style></head><body bgcolor="#ffffff" text="#3b3f44" link="#696969" yahoo="fix" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #ffffff; width: 100%;"><tr><td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed; width: 600px;"><tr><td valign="top" class="r1-i" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"><tr><td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r2-c" align="center"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="210" class="r3-o" style="table-layout: fixed; width: 210px;"><tr><td class="r8-i" style="font-size: 0px; line-height: 0px; padding-bottom: 15px; padding-top: 15px;"> <img src="https://img.mailinblue.com/6026993/images/content_library/original/652a3f2e64539014a127c3d2.png" width="210" border="0" style="display: block; width: 100%;"></td> </tr></table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"><tr><td class="r9-i" style="padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r7-i"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r10-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r11-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r12-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 18px; word-break: break-word; line-height: 1.5; padding-top: 15px; text-align: center;"> <div><h1 class="default-heading1" style="margin: 0; color: #1f2d3d; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word;">The OTP for updating password is given below</h1></div> </td> </tr></table></td> </tr><tr><td class="r10-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r11-o" style="table-layout: fixed; width: 100%;"><tr><td align="left" valign="top" class="r13-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 18px; word-break: break-word; line-height: 1.5; padding-top: 15px; text-align: left;"> <div><h5 class="default-heading3" style="margin: 0; color: #1f2d3d; font-family: arial,helvetica,sans-serif; font-size: 24px; word-break: break-word;">The OTP for your forgot password request is ${localotp}</h5></div> </td> </tr></table></td> </tr></table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"><tr><td class="r18-i" style="background-color: #eff2f7; padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r10-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r11-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r19-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-top: 15px; text-align: center;"> <div><p style="margin: 0; font-size: 14px;">This email was sent to {{contact.EMAIL}}</p></div> </td> </tr></table></td> </tr><tr><td class="r10-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r11-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r20-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; text-align: center;"> <div><p style="margin: 0; font-size: 14px;">You've received it because you've subscribed to our newsletter.</p></div> </td> </tr></table></td> </tr><tr><td class="r10-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r11-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r21-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-bottom: 15px; padding-top: 15px; text-align: center;"> <div><p style="margin: 0; font-size: 14px;"><a href="{{ mirror }}" style="color: #696969; text-decoration: underline;">View in browser</a>| <a href="{{ unsubscribe }}" style="color: #696969; text-decoration: underline;">Unsubscribe</a></p></div> </td> </tr></table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"><tr><td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r22-c" align="center"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r3-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r23-i" style="padding-bottom: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r24-c" align="center"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="129" class="r25-o" style="table-layout: fixed;"><tr><td height="48" style="font-size: 0px; line-height: 0px;"> <a href="https://www.brevo.com?utm_source=logo_client&utm_medium=email"><img src="https://creative-assets.mailinblue.com/rnb-assets/en.png" width="129" border="0" style="display: block; width: 100%;"></a></td> </tr></table></td> </tr></table></td> </tr></table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table></td> </tr></table></td> </tr></table></body></html>`,

        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(data),
        })

        const result = await response.json();
        console.log(result);
        if (result.messageId) {
            setShowContainer(true);
            toast.success(`🦄!OTP Sent to your email!!`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

        } else {
            setShowContainer(false);
            toast.error(`🦄!${result.message}!!`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

        setLoading(false);
    }
    else{
        toast.error(`🦄!${result2.message}!!`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setLoading(false);
    }


    }

    const updatePassword = async () => {
 
        let userOtp = 0;
        userOtp = userCred.userotp;
        const data ={
            email:userCred.email,
            password:userCred.password,
        }
        if (otp === userOtp) {
            if(userCred.password === userCred.confirmpassword && userCred.password !== ''){
            const response = await fetch('http://localhost:3000/api/user/updatepassword', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const result = await response.json();

            if (result.success) {
                toast.success(`🦄!${result.message}!!`, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else {
                toast.error(`🦄!${result.message}!!`, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }else{
            toast.error(`🦄!Please Fill all the informationss!!`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

        }
        } else {
            toast.error(`🦄!$OTP is wrong!!`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }


    return (
        <div>
            <section className="h-fit min-h-screen ">

                <div className="h-fit w-3/4 m-auto py-7 mt-7  px-2">

                    <div
                        className="g-6 flex h-full flex-wrap items-center m-auto px-2 py-2  justify-center lg:justify-between">



                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-2/3 lg:m-auto md:m-auto xl:w-5/12">
                            <form>

                                <div
                                    className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="mb-0 mr-4 text-lg">Enter your email</p>

                                </div>

                                <div
                                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p
                                        className="mx-4 mb-0 text-center font-semibold dark:text-white">
                                        Or
                                    </p>
                                </div>


                                <div className="relative mb-6 md:pr-4" data-te-input-wrapper-init>
                                    <div className="relative mb-4">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="text" id="emai" name="email" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        {showConatiner ? (<>
                                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Enter OTP</label>
                                            <input type="number" id="emai" name="userotp" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                                            <label htmlFor="userotp" className="leading-7 text-sm text-gray-600">Password</label>
                                            <input type="text" id="emai" name="password" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                            <input type="text" id="emai" name="confirmpassword" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /></>) : ""}
                                    </div>
                                </div>


                                <div className="text-center lg:text-left">
                                    <button
                                        type="button"
                                        className="inline-block rounded bg-blue-500 bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        data-te-ripple-init
                                        onClick={(e) => {
                                            if (showConatiner === false) {
                                                sendForgotMail()
                                            } else {
                                                updatePassword();
                                            }
                                        }}
                                    >

                                        {loading ? <div className="flex items-center justify-center ">
                                            <div className="w-6 h-6 border-t-4 border-black border-solid rounded-full animate-spin"></div>
                                        </div> : 'Submit'}

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ForgotPassword
