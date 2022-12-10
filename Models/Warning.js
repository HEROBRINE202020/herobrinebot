const {Schema, model} = require('mongoose');

let warningSchema = new Schema({
    GuildId: String,
    UserId: String,
    UserTag: String,
    Content: Array
});

module.exports = model("WarningSchema", warningSchema);