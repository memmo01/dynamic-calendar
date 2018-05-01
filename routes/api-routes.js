var db = require("../models")

module.exports=function(app){

    app.post("/api/addevent",function(req,res){
        db.events.create(req.body).then(function(results){
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
}