'use strict';
const { Gamesystems } = require('../models');// Sequelize

module.exports = (sequelize, DataTypes) => {
  const Gamesystems = sequelize.define('Gamesystems', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Gamesystems.associate = function(models) {
    // associations can be defined here
  };
  return Gamesystems;
};

function getGameSystembyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {
​
    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("gamesystem by id..." + id);
    //console.log(gamesystems);
​
    Gamesystems.findById(id)
    .then(mygamesystem => {
    console.log(mygamesystem);
    res.status(200).send(mygamesystem);
   })
​
  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystembyId.name, error, res);
  }
}
​
function getGameSystems(req, res) {
​
  try {
        
   console.log("gamesystems...");
   console.log(Gamesystems);
   Gamesystems.findAll({
    /*include: [{
      model: orderstatus
     
    }]
​
    include: [{ all: true, nested: true }]*/
      })
   .then((consoles) => {
     console.log(consoles);
     res.status(200).send(consoles);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });
​
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystems.name, error, res);
  }
}
​
function updateGameSystem(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
​
  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdategamesystem = req.body;
    console.log("update gamesystems ... " + myupdategamesystem.name + " " + myupdategamesystem.descripcion);
 
​
    Gamesystems.findById(id)
      .then(mygamesystem => {
        console.log("Result of findById: " + mygamesystem);
        if (!mygamesystem) {
          res.status(401).send(({}));
        
        }
        return mygamesystem
          .update({ 
            name: myupdategamesystem.name, 
            description: myupdategamesystem.description 
           })
          .then(() => res.status(200).send(mygamesystem) )
          .catch(error => res.status(403).send(mygamesystem));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });
​
  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateGameSystem.name, error, res);
  }
​
}
​
function addGameSystem(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
​
  try {
​
    console.log("params : ");
    var mygamesystem = req.body;
    console.log("gamesystems ... " + mygamesystem);
 
      return Gamesystems
        .create({
          name: mygamesystem.name,
          description: mygamesystem.description,
         
        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mygamesystem) => {
          res.status(201).send(mygamesystem);
              
        })
        .catch((error) => res.status(400).send(error));
    
​
  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addGameSystem.name, error, res);
  }
}
​
​
function deleteGameSystem(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  Gamesystems
    .findById(id)
    .then(mygamesystem => {
      console.log("Result of findById: " + mygamesystem);
      if (!mygamesystem) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mygamesystem
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });
​
​
}
​
module.exports = {
  getGameSystembyId,
  getGameSystems,
  updateGameSystem,
  addGameSystem,
  deleteGameSystem,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}
Contraer
