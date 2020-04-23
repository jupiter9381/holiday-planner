var express = require('express');
var router = express.Router();
const { Plan } = require('../Model/plan');

router.get('/plan',(req,res)=>{
	Plan.find({}, (err, result) => {
		if(!result){
            res.send({
                message:'No Doctors',
                data: ''
            });
        }
        res.send({
            message:'success',
            data:result
        })
	})
});

router.post('/create',(req,res)=>{
	const plan = new Plan({
        area: req.body.area
    }).save((err, response) => {
        if (err) res.status(400).send(err);
        res.status(200).send(response)
    });
});
module.exports  = router;