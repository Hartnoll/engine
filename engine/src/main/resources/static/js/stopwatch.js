class StopwatchFunctions {
    constructor() {
    }

    getSeconds(time) {
        return Math.trunc(time);
    }

    getMilliseconds(time) {
        var decimal = time % 1;
        return (100 * (decimal).toFixed(2));
    }
}

module.exports = StopwatchFunctions;