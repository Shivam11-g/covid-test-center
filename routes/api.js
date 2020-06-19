
const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

router.get('/n', (req,res,next)=>{
  res.json('hi')
})
// get a list of ninjas from the DB
router.get('/ninjas', function(req,res,next){
/*  Ninja.find({}).then(function(ninjas){
    res.send(ninjas)
  }) */



//  ==> THIS BELOW METHOD Ninja.geoNear METHOD IS OUT DATED INSTEAD OF THIS USE Ninja.aggregate METHOD <==

  // Ninja.geoNear(
  //   {type: 'Point',coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)]},
  //   {maxDistance: 100000, spherical: true},
  //   function(ninjas){
  //      res.send(ninjas)
  //   }
  // )

 

  Ninja.aggregate([
        {
            $geoNear: {
                near: {'type':'Point', 'coordinates':[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
                distanceField: "dist.calculated",
                maxDistance: parseFloat(req.query.rng)*1000,
                spherical: true
            }
            
        }
    ]).then(function(ninjas){
        res.json(ninjas);
    }).catch(next);

})
// add a new ninja to the DB
router.post('/ninjas', function(req,res,next){
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja)
  }).catch(next)

})

//update a ninja in DB
router.put('/ninjas/:id', function(req,res,next){
 Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
   Ninja.findOne({_id: req.params.id}).then(function(ninja){
     res.send(ninja)
   })
 })
})


// delete a ninja from the DB
router.delete('/ninjas/:id', function(req,res,next){
 Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
   res.send(ninja)
 })
 res.send({type:'DELETE'})

})


module.exports = router;