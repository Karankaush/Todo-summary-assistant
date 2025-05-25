const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /todos
// @access  Public
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Server Error' 
    });
  }
};


const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const todo = await Todo.create({
      title,
      description: description || ''
    });

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};


const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    await todo.remove();
    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo
};