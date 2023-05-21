module.exports = app => {
  const projects = require("../controllers/projects.controller");

  //creates prjects 
  app.post("/create", projects.createProject);

  //retrieves all projects
  app.get("/retrieve-all", projects.findAll);

  //retrieves projects by name or id 
  app.get("/retrieve",projects.find);

  //updates a project by ID 
  app.put("/update",projects.update);

  //deletes a project by ID
  app.delete("/delete",projects.delete);

  //deletes all projects
 app.delete("/delete-all",projects.deleteAll);

}