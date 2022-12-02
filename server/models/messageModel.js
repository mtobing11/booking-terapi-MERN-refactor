import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: String,
    creator: String,
    isDuration: {type: 'boolean', default: true},
    duration: {type: 'number', default: 1},
    timestamp: Date,
    status: {type: 'boolean', default: true}
})

const Message = mongoose.model('Message', messageSchema);
export default Message;