const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: true, credentials: true}));
// routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


