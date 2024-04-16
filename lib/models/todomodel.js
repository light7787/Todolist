import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    IsCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const TodoModel =mongoose.connection.models.list || mongoose.model('list',Schema);

export default TodoModel;