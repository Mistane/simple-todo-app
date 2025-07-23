const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false } ,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
});

module.exports = mongoose.model('Task', Task);