const mongoose = require('mongoose');
const Univer = require('../model/Univer');

const getUniverList = 
    async (country) => {
        const list = await Univer.find({ country })
                .catch(err => console.error(err));
        return list;
    }

const getUniver = 
    async (id) => {
        const univer = Univer.findById(id);
        return univer;
    }

module.exports = {
    getUniverList,
    getUniver
}