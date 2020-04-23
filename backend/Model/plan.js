const mongoose = require('mongoose');
const planSchema = mongoose.Schema({
    area: String,
    country: String,
    whyGo: String,
    wheretoGo: String,
    timeinDays: Number,
    levelofDifficulty: String,
    entraceFees: String
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = {Plan};