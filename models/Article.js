// Initialize Mongoose + Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Open: Article Schema
var articleSchema = new Schema({
    // For Headline
    headline: {
        type: String,
        required: true,
        unique: true
    },
    // For Summary
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // If it is Saved
    saved: {
        type: Boolean,
        default: false
    }
}); // Open: Article Schema

// Article Model Created
var Article = mongoose.model("Article", articleSchema);

module.exports = Article;