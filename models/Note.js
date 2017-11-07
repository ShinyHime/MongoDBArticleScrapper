// Initialize Mongoose + Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Open: Note Schema
var noteSchema = new Schema({
    // Connected with Article's ID
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    // For Note Text
    text: String
}); // Close: Note Schema

// create Note model using noteSchema
var Note = mongoose.model("Note", noteSchema);

module.exports = Note;