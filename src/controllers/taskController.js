import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  try{
    const { completed } = req.query;

    let parsedCompleted;

    if (completed !== undefined) {
      if (completed === 'true') {
        parsedCompleted = true;
      } else if (completed === 'false') {
        parsedCompleted = false;
      } else {
        return res.status(400).json({
          error: "Invalid query parameter: 'completed' must be 'true' or 'false'."
        });
      }
    }

    const tasks = await taskService.getAllTasks({ completed: parsedCompleted });
    res.json(tasks);
  }catch (error){
    next(error);
  }
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
