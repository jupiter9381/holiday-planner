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
        area: req.body.area,
        country: req.body.country,
        whyGo: req.body.whyGo,
        wheretoGo: req.body.wheretoGo,
        timeInDays: req.body.timeInDays,
        levelofDifficulty: req.body.levelofDifficulty,
        entraceFees: req.body.entraceFees,
        image: req.body.image
    }).save((err, response) => {
        if (err) res.status(400).send(err);
        res.status(200).send(response)
    });
});
router.post('/update',(req,res)=>{
	const update = {
        area: req.body.data.area,
        country: req.body.data.country,
        whyGo: req.body.data.whyGo,
        wheretoGo: req.body.data.wheretoGo,
        timeInDays: req.body.data.timeInDays,
        levelofDifficulty: req.body.data.levelofDifficulty,
        entraceFees: req.body.data.entraceFees,
        image: req.body.data.image
    };
    Plan.findOneAndUpdate({_id: req.body.id}, update, {new: true}, (err, result) => {
    	if (err) res.status(400).send(err);
        res.status(200).send(result);
    })
});
router.post('/delete', (req, res, next) => {
	const id = req.body.id;
	Plan.findOneAndDelete({'_id': id}, (err, result) => {
		if (err){
            res.status(500).send({
                message: 'error',
                data:err
            });
        }
        return res.status(200).send({
            message: 'success',
            data: result
        })
	})
});
module.exports  = router;