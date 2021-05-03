class StopwatchFunctions {
    constructor() {
    }

    getSeconds(time) {
        if (typeof time != "number") {
            throw new Error("time must be a number")
        }else if(time < 0){
            throw new Error("time must be positive")
        }else {
            return Math.trunc(time);
        }
    }

    getMilliseconds(time) {
        if (typeof time != "number") {
            throw new Error("time must be a number")
        }else if(time < 0){
            throw new Error("time must be positive")
        }else {
            this.decimal = time % 1;
            return (100 * (this.decimal).toFixed(2));
        }
    }

    stopwatchTime(seconds, milliseconds) {
        this.minutes = (Math.floor(seconds / 60)).toString();
        this.tenSeconds = (Math.floor((seconds % 60)/10)).toString();
        this.units = ((seconds % 60)%10).toString();
        this.tenthSeconds = (Math.floor(milliseconds / 10)).toString();
        this.hundredthSeconds = (Math.floor(milliseconds % 10)).toString();
        return this.minutes.concat(":".concat(this.tenSeconds).concat(this.units.concat(":".concat(this.tenthSeconds.concat(this.hundredthSeconds)))));
    }
}

module.exports = StopwatchFunctions;