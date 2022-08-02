const path = require('path');

const fs = require('fs')

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

//read the data file
function getStoredRestaurants() {

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants
}


//write over the data file (update)
function storeRestaurants(restaurants) {
    fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
};