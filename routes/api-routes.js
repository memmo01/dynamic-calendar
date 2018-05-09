var db = require("../models")

module.exports=function(app){

    app.post("/api/addevent",function(req,res){
        db.events.create(req.body).then(function(results){
            res.json(results)
        })
    })

    app.get("/api/getSingleEvent/:id?",function(req,res){
        db.events.findAll({
            where:{
                id:req.params.id
            }
        }).then(function(results){
            res.json(results)
        })
    })

    app.get("/api/daterange/:start?/:end?",function(req,res){
        db.events.findAll({
            where:{
                date:{
                    $gte:req.params.start,
                    $lte:req.params.end
                }
            }
        }).then(function(results){
            res.json(results)
        })
    })

    app.put("/api/editEvent",function(req,res){
        db.events.update({
            time:req.body.time,
            event:req.body.event
        },{
            where:{
                id:req.body.id
            }
        }).then(function(results){
            res.json(results)
        })
    })

    app.delete("/api/deleteEvent",function(req,res){
        db.events.destroy({
            where:{
                id:req.body.id
            }
        }).then(function(results){
            res.json(results)
        })
    })
}