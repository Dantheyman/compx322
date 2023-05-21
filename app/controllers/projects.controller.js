const Project = require("../models/projects.model");
 
//finds all projects and returns them or an error 
exports.findAll = (req, res) => {
   Project.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects."
        });
      else res.send(data);
    });
}  

//finds a project 
exports.find = (req,res) => 
{
    //makes sure there is not more than one key in the url query
    if (Object.keys(req.query).length>1)
    {
        res.status(400).send({
            message:  "Bad request, check format"
        })
    }
    //if id key exists then find by id 
    else if (req.query.id)
    {
        Project.getByID(req.query.id,(err,data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occured while retrieivng the project."
                })
            else res.send(data);
        });
    }
    //if name key exists then find by name
    else if (req.query.name) 
    {
        Project.getByName(req.query.name,(err,data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occured while retrieivng the project."
                })
            else res.send(data);
        });
    }
    //else send an error 
    else 
    res.status(400).send({
        message:  "Bad request, check format"
    })

};
    


//creates a project and adds to table 
exports.createProject = (req, res) => {

    //makes sure there is a message body
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    
    //creates new project
    const newProject = new Project({
        projectname : req.body.projectname,
        projectdesc : req.body.projectdesc,
        startdate : req.body.startdate,
        enddate : req.body.enddate,
    });

    //adds to table and returns what was sent or sends back an error
    Project.create(newProject, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the appointment."
        });
        else res.send(data);
    });
};

//updates exsisting projects 
exports.update = (req,res) => {
    //makes sure there is a message body
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // makes sure an id is in the body 
    if (req.body.id==null)
    {
        res.status(400).send({
            message: "Bad Request, check format"
            });
    }

    //creates new project with data that is to be updated 
    const newProject = new Project({
                 id : req.body.id,
        projectname : req.body.projectname,
        projectdesc : req.body.projectdesc,
        startdate : req.body.startdate,
        enddate : req.body.enddate,
    });
    
    //update the project on the database 
    Project.update(newProject, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the appointment."
        });
        else res.send(data);
    });

};

//deletes a project from the datbase by its id 
exports.delete= (req,res) => {
 
    //checks there is a id key
    if (req.query.id==null)
    {
        res.status(400).send({
            message: "must state the id of the project to be deleted from the table"
            });
    }
 
    //extracts id from query
    var id = req.query.id;

    //removes project from the database 
    Project.remove(id , (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the appointment."
        });
        else res.send(data);
    });


};

//deletes all projects from the database 
exports.deleteAll = (req,res) =>{
    Project.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the appointment."
        });
        else res.send(data);
    });

};

