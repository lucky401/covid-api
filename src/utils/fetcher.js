const axios = require('axios');

const updateData = async(rootData) => {
    const { data } = await axios.get('https://data.covid19.go.id/public/api/update.json');
    let returnData;
    if(rootData == false) {
        returnData = data.update;
    }else {
        returnData = data;
    }
    return returnData
}

module.exports = { updateData };