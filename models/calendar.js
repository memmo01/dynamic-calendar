module.exports=function(sequelize,DataTypes){

    var event = sequelize.define("events",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true
            
        },
        date:DataTypes.TEXT,
        time:DataTypes.TEXT,
        event:DataTypes.TEXT
    },{
        timestamps:false
    
    })
    return event;
}