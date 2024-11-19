export const apiKey = '3d57b65857354e32b03152949231102';

export const weatherImages = {
    'Partly cloudy': require('../assets/images/partlycloudy.png'),
    'Moderate rain': require('../assets/images/moderaterain.png'),
    'Patchy rain possible': require('../assets/images/moderaterain.png'),
    'Sunny': require('../assets/images/sun.png'),
    'Clear': require('../assets/images/sun.png'),
    'Overcast': require('../assets/images/cloud.png'),
    'Cloudy': require('../assets/images/cloud.png'),
    'Light rain': require('../assets/images/moderaterain.png'),
    'Moderate rain at times': require('../assets/images/moderaterain.png'),
    'Heavy rain': require('../assets/images/heavyrain.png'),
    'Heavy rain at times': require('../assets/images/heavyrain.png'),
    'Moderate or heavy freezing rain': require('../assets/images/heavyrain.png'),
    'Moderate or heavy rain shower': require('../assets/images/heavyrain.png'),
    'Moderate or heavy rain with thunder': require('../assets/images/heavyrain.png'),
    'other': require('../assets/images/moderaterain.png')
};

export const getImageForWeather = (weatherCondition) => {
    // Check if the weather condition exists in the weatherImages object
    if (weatherImages[weatherCondition]) {
        return weatherImages[weatherCondition];
    } else {
        // If it doesn't exist, require a default image
        return require('../assets/images/moderaterain.png');
    }
};

// Usage example:
const weatherCondition = 'Snow'; // Example of a condition that doesn't exist
const image = getImageForWeather(weatherCondition);