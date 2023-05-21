const db = require("./db");


const Project = function(project) {

  this.id=project.id;
  this.projectname=project.projectname;
  this.projectdesc=project.projectdesc;
  this.startdate=project.startdate;
  this.enddate=project.enddate;
};


//retrive all the projects
Project.getAll= result => {
  db.query("select * from projects", (err,res) =>{
    if(err) {
      console.log("error:", err);
      result(null,err);
      return;
    }
    console.log("projects:", res);
    result(null,res);
  });
};

//adds a project too the databse
Project.create = (newProject, result) => {
  db.query("INSERT INTO projects SET ?", newProject, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Created project:", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};

//finds a project by its ID
Project.getByID=(id,result) =>
{
  db.query("select * from projects where id ="+id, (err,res) =>{
    if(err) {
      console.log("error:", err);
      result(null,err);
      return;
    }
    console.log("projects:", res);
    result(null,res);
  });

}

//finds a project by its name 
Project.getByName=(name,result) =>
{
  db.query("select * from projects where id ="+name, (err,res) =>{
    if(err) {
      console.log("error:", err);
      result(null,err);
      return;
    }
    console.log("projects:", res);
    result(null,res);
  });

}

//updates the project by its ID
Project.update=(newProject,result) =>
{
  //removes any variables not given in body so it doesint make them null
  if (newProject.enddate==undefined)
  {
    delete newProject.enddate;
  }
  if (newProject.startdate==undefined)
  {
    delete newProject.startdate;
  }
  if (newProject.projectdesc==undefined)
  {
    delete newProject.projectdesc;
  }
  if (newProject.projectname==undefined)
  {
     delete newProject.projectname;
  }
  
  //querys database to update the project
  db.query("UPDATE projects SET ? where id="+newProject.id,newProject, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("updated project:", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });

}

//removes a project by its id
Project.remove=(id,result) => {
  //removes any variables not given in body so it doesint remove them from the table 
  
  db.query("DELETE from projects where id ="+id, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("deleted project where id ="+id);
    result(null, null);
  });

}

//removes all projects from the table 
Project.removeAll=(result) => {
  //removes any variables not given in body so it doesint remove them from the table 
  
  db.query("DELETE from projects", (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("deleted all projects");
    result(null, null);
  });
}


module.exports = Project;