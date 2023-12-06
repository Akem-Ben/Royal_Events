import express, {Request, Response} from 'express';

export const registerUser = async(req:Request, res:Response)=>{
    try{
        const {name, user_name,} = req.body
    }catch(err:any){
        console.log(err.message)
        return res.status(500).json({
            status: 'error',
            message: `Internal Server Error`
        })
    }
}