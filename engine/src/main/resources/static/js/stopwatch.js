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

    stopwatchTime(seconds, milliseconds) {
        let minutes;
        let tenSeconds;
        let units;
        let tenthSeconds;
        let hundredthSeconds;
        minutes = (Math.floor(seconds / 60)).toString();
        tenSeconds = (Math.floor((seconds % 60)/10)).toString();
        units = ((seconds % 60)%10).toString();
        tenthSeconds = (Math.floor(milliseconds / 10)).toString();
        hundredthSeconds = (Math.floor(milliseconds % 10)).toString();
        return minutes.concat(":".concat(tenSeconds).concat(units.concat(":".concat(tenthSeconds.concat(hundredthSeconds)))));
    }
}

module.exports = StopwatchFunctions;