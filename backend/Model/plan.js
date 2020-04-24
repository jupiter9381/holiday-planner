const mongoose = require('mongoose');
const planSchema = mongoose.Schema({
    area: String,
    country: String,
    whyGo: String,
    wheretoGo: String,
    timeInDays: Number,
    levelofDifficulty: String,
    entraceFees: String,
    image: String,
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = {Plan};