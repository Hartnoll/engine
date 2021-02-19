function selectFuelType(name) {
    var j = 0;
    var fuelType = document.getElementsByName(name)
    for (i = 0; i < fuelType.length; i++) {
        if (fuelType[i].checked) {
            j++;
            // alert("checked" + fuelType[i].value);
            break;
        }
    }
    if (j == 0) return false;
    else return true;
}

function checkFuelType(name) {
    var fuelType = document.getElementsByName(name)
    for (i = 0; i < fuelType.length; i++) {
        if (fuelType[i].checked) {
            return fuelType[i].value;
            break;
        }
    }
}

function checkInput(id) {
    var m = document.getElementById(id);
    if (isNaN(Number(m.value))) {
        Swal.fire({
            title: "Oops...",
            text: "Your input should be numbers! Symbols other than the decimal point are not allowed!",
            icon: "warning",
        });
        return false;
    }
    if (m.value == "") {
        Swal.fire({
            title: "Oops...",
            text: "Your blanks must be filled in!",
            icon: "warning",
        });
        return false;
    }
    return true;
}

function checkFuelDropLength(id) {
    var fuelDropLength = document.getElementById(id);
    if (fuelDropLength.value < 0 || fuelDropLength.value > 7.5) {
        Swal.fire({
            title: "Sorry...",
            text: "This is not a valid fuel drop length!",
            icon: "error",
        });
        return false;
    }
    return true;
}

function checkStepOne() {

    if (checkInput("fuelDropLength")) {
        checkFuelDropLength("fuelDropLength");
    }

    var q1 = selectFuelType("Q1");
    if (checkFuelDropLength("fuelDropLength")) {
        if (q1 == false) {
            Swal.fire({
                title: "Sorry...",
                text: "please choose a fuel type!",
                icon: "error",
            });
        }
    }

    a = checkInput("fuelDropLength");
    b = checkFuelDropLength("fuelDropLength");
    if (a & b & q1 == true) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Step1 is done.',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function checkStepTwo() {
    var speed = document.getElementById("speed");
    var torque = document.getElementById("torque");
    var fuelTime = document.getElementById("fuelTime");
    var s = parseInt(speed.value);
    var t = parseFloat(torque.value);
    var ft = parseFloat(fuelTime.value);
    var allSpeed = [1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400];

    a = checkInput("speed");
    b = checkInput("torque");
    c = checkInput("fuelTime");

    if (a & b & c) {
        for (i = 0; i < allSpeed.length; i++) {
            if (s == allSpeed[i]) {
                break;
            }
            if (i == allSpeed.length - 1) {
                Swal.fire({
                    title: "Sorry...",
                    text: "This is not a valid speed!",
                    icon: "error",
                });
            }
        }

        if (checkFuelType("Q1") == "A") {
            if (t >= 26 || t <= 19) {
                Swal.fire({
                    title: "Sorry...",
                    text: "This is not a valid torque for petrol!",
                    icon: "error",
                });
                return false;
            }
            if (ft >= 22 || ft <= 14) {
                Swal.fire({
                    title: "Sorry...",
                    text: "This is not a valid fuel time for petrol!",
                    icon: "error",
                });
                return false;
            }
            if (19 < t < 26 & 14 < ft < 22) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Step2 is done.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

        if (checkFuelType("Q1") == "B") {
            if (t >= 32 || t <= 26) {
                Swal.fire({
                    title: "Sorry...",
                    text: "This is not a valid torque for diesel!",
                    icon: "error",
                });
                return false;
            }
            if (ft >= 25 || ft <= 10) {
                Swal.fire({
                    title: "Sorry...",
                    text: "This is not a valid fuel time for diesel!",
                    icon: "error",
                });
                return false;
            }
            if (26 < t < 32 & 10 < ft < 25) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Step2 is done.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
}

function data(x) {
    if (x >= 1000) {
        return Math.round(x)
    }
    return x.toPrecision(3)
}

function checkStepThree() {
    var flow = document.getElementById("fuel flow");
    var bPower = document.getElementById("brake power");
    var fPower = document.getElementById("fuel power");
    var efficiency = document.getElementById("brake thermal efficiency");
    var fuelDropLength = document.getElementById("fuelDropLength");
    var fuelTime = document.getElementById("fuelTime");
    var speed = document.getElementById("speed");
    var torque = document.getElementById("torque");
    var s = parseInt(speed.value);
    var t = parseFloat(torque.value);
    var ft = parseFloat(fuelTime.value);

    a = checkInput("fuel flow");
    b = checkInput("brake power");
    c = checkInput("fuel power");
    d = checkInput("brake thermal efficiency");

    if (a & b & c & d) {
        if (checkFuelType("Q1") == "A") {
            var m = (755 * ((fuelDropLength.value * 9.04 / 2) / 10 ** 6)) / ft
            if (flow.value != data(m)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about fuel flow in your calculations!",
                    icon: "error",
                });
                return false;
            }

            var n = 2 * Math.PI * t * s / 60
            if (bPower.value != data(n)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about brake power in your calculations!",
                    icon: "error",
                });
                return false;
            }

            var p = 1000 * (m * 44400)
            if (fPower.value != data(p)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about flue power in your calculations!",
                    icon: "error",
                });
                return false;
            }

            var e = 100 * (n / p)
            if (efficiency.value != data(e)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about brake thermal efficiency in your calculations!",
                    icon: "error",
                });
                return false;
            }

            Swal.fire({
                title: "Congratulation! All your calculations are correct!",
                icon: "success",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
            });
        }

        if (checkFuelType("Q1") == "B") {
            var m = (832 * ((fuelDropLength.value * 9.04 / 2) / 10 ** 6)) / ft
            if (flow.value != data(m)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about fuel flow in your calculations!",
                    icon: "error",
                });
                return false;
            }

            var n = 2 * Math.PI * t * s / 60
            if (bPower.value != data(n)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about brake power in your calculations!",
                    icon: "error",
                });
                return false;
            }

            var p = 1000 * (m * 43400)
            if (fPower.value != data(p)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about flue power in your calculations!",
                    icon: "error",
                });
                return false;
            }

            var e = 100 * (n / p)
            if (efficiency.value != data(e)) {
                Swal.fire({
                    title: "Sorry...",
                    text: "There is an error about brake thermal efficiency in your calculations!",
                    icon: "error",
                });
                return false;
            }


            Swal.fire({
                title: "Congratulation! All your calculations are correct!",
                icon: "success",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
            });
        }
    }

}