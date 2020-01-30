const express = require("express");
const app = express();
app.use(express.json());
const projects = [];

function logRequests(req, res, next) {
  console.count("Número de requisições");

  return next();
}
function projectNotExists(req, res, next) {
  const { id } = req.params;
  if (!projects) {
    return res.status(400).json({ error: "This project not exist" });
  }
  return next();
}
app.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(project);
});
app.post("/projects/:id/tasks", projectNotExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(x => x.id == id);

  project.tasks.push(title);
  return res.json(project);
});
app.get("/projects", (req, res) => {
  return res.json(projects);
});
app.get("/projects/:id", projectNotExists, (req, res) => {
  const { id } = req.params;
  const project = projects.find(x => x.id == id);

  return res.json(project);
});

app.put("/projects/:id", projectNotExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(x => x.id == id);

  project.title = title;

  return res.json(project);
});
app.delete("/projects/:id", projectNotExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(x => x.id == id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

app.listen(3000);
