const { default: mongoose } = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "user" },
  message: { type: String },
  dateTime: { type: String },
});

const LocationSchema = new mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "user" },
  location: { type: Object , default : {}},
  dateTime: { type: String },
});

const RoomsSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  messages: { type: [MessageSchema], default: [] },
  locations: { type: [LocationSchema], default: [] },
});

const ConversationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  endpoint: { type: String, required: true },
  rooms: { type: [RoomsSchema], default: [] },
});

module.exports = {
    ConversationModel : mongoose.model('conversation' , ConversationSchema)
}