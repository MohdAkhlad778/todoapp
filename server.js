const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your-secret-key-change-this';

mongoose.connect('mongoose.connect('mongodb+srv://admin:James5566@#@cluster0.jjlmmrm.mongodb.net/todoapp?retryWrites=true&w=majority')')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error:', err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    completed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

const Todo = mongoose.model('Todo', todoSchema);

function verifyToken(req,res,next) {
    const token = req.headers['authorization'];
    if(!token) {
        return res.json({error: 'No token provided'});
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.json({error: 'Invalid Token'});
        }
        req.userId = decoded.userId;
        next();
    });

}
app.post('/signup', async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const existingUser = await User.findOne({ email: email});
        if(existingUser) {
            return res.json({error: 'User already exists'});
        }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email: email,
                password: hashedPassword
            });
            await user.save();
            res.json({
                message: 'User Created',
                email: email
            });
        } catch(err) {
            res.json({error: 'Signup Failed'});
        }
    });

    app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    
    // Find user
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ error: 'Wrong password' });
    }
    
    // Create token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    
    res.json({
      message: 'Login successful!',
      token: token
    });
  } catch (err) {
    res.json({ error: 'Login failed' });
  }
});

app.post('/todos', verifyToken, async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.userId,
      title: req.body.title,
      description: req.body.description
    });
    
    await todo.save();
    
    res.json({
      message: 'To-do created!',
      todo: todo
    });
  } catch (err) {
    res.json({ error: 'Failed to create to-do' });
  }
});

app.get('/todos', verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json({
      total: todos.length,
      todos: todos
    });
  } catch (err) {
    res.json({ error: 'Failed to get to-dos' });
  }
});

app.put('/todos/:id', verifyToken, async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.userId;
    
    // Check if todo belongs to user
    const todo = await Todo.findById(todoId);
    if (todo.userId !== userId) {
      return res.json({ error: 'Not your to-do' });
    }
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
      },
      { new: true }
    );
    
    res.json({
      message: 'To-do updated!',
      todo: updatedTodo
    });
  } catch (err) {
    res.json({ error: 'Failed to update to-do' });
  }
});

app.delete('/todos/:id', verifyToken, async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.userId;
    
    // Check if todo belongs to user
    const todo = await Todo.findById(todoId);
    if (todo.userId !== userId) {
      return res.json({ error: 'Not your to-do' });
    }
    
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    
    res.json({
      message: 'To-do deleted!',
      todo: deletedTodo
    });
  } catch (err) {
    res.json({ error: 'Failed to delete to-do' });
  }
});
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
