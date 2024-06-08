const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sensor_value: String,
    Intensity: String,
    'Voltage R1' : String,
    'Voltage C1' : String,
    'Voltage R2' : String,
    'Voltage C2' : String 
},{
    timestamps: true
})

module.exports = mongoose.model('data', dataSchema);