class CalculationFunctions {
    constructor() {
        this.allSpeed = [1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400];
    }
    fuelDrop(value) {
        if (value < 0 || value > 15) {
            return false;
        }else {
            return true;
        }
    }

    isBlank(value) {
        if (value == "") {
            return true
        }else {
            return false
        }
    }

    isNumber(value) {
        if (isNaN(Number(value))) {
            return false
        }else {
            return true
        }
    }

    speed(value) {
        for (var i = 0; i < this.allSpeed.length; i++) {
            if (value == this.allSpeed[i]) {
                return true;
            }
        }
        return false;
    }

    fuelTime(value) {
        if (value >= 125 || value < 0) {
            return false;
        }
        return true;
    }

    torque(value, fuel) {
        if (fuel == "P") {
            if (value >= 27 || value <= 18) {
                return false;
            }
            return true;
        } else {
            if (value >= 33 || value <= 25) {
                return false;
            }
            return true;
        }
    }
}

module.exports = CalculationFunctions;