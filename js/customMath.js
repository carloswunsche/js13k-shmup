//////////////////////////
// CUSTOM MATH FUNCTIONS
//////////////////////////
let M = Math;

class CustomMath {
    toRadians(degrees) {
        return degrees * M.PI / 180
    }
    randomBetween(min, max) {
        return M.floor(M.random() * (max - min + 1) + min)
    }
};