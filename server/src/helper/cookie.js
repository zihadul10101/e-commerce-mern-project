const setAccessTokenCookie=(res,accessToken)=>{
    res.cookie('accessToken',accessToken,{
        maxAge: 50 * 60 * 1000 , //15 minute
        httpOnly:false,
        secure:false,
        sameSite: 'none',
    
       }) ;
      
}



const setRefreshTokenCookie=(res,refreshToken)=>{
    res.cookie('refreshToken',refreshToken,{
        maxAge: 7 * 24 * 60 * 60 * 1000 , //7 day
        httpOnly:false,
        secure:false,
        sameSite: 'none',
      
       });
     
}

module.exports={setAccessTokenCookie,setRefreshTokenCookie};