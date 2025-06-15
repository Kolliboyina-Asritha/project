
const express=require('express');
const router=express.Router();

const refreshTokenController=require('../../controller/refreshTokenController');
router.get('/',refreshTokenController.handleRefreshToken);
router.post('/',refreshTokenController.handleRefreshToken);


module.exports=router;
