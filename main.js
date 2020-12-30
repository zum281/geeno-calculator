const show_geeno_app_btn = $("#show-geeno-app");
const show_bmi_app_btn = $("#show-bmi-app");
const show_bmr_app_btn = $("#show-bmr-app");
const geeno_app_div = $("#geeno-app");
const bmi_app_div = $("#bmi-app");
const bmr_app_div = $("#bmr-app");

const bmi_app_results_div = $("#bmi-app-results");
const bmi_app_result_btn = $("#bmi-app-result-btn");
const bmi_app_clear_btn = $("#bmi-app-clear-btn");

const bmr_app_results_div = $("#bmr-app-results");
const bmr_app_result_btn = $("#bmr-app-result-btn");
const bmr_app_clear_btn = $("#bmr-app-clear-btn");

let h;
let w;
let age;
let sex;

// element.style.display = 'none';
$(document).ready(function () {
    // Toggle menu
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    // Show page on button click -- SELECT APP
    show_geeno_app_btn.click(function () {
        geeno_app_div.show();
        bmi_app_div.hide();
        bmr_app_div.hide();
        $("#app-using-stored-values-alert").hide();
        $("#app-error-alert").hide();
    });

    show_bmi_app_btn.click(function () {
        geeno_app_div.hide();
        bmi_app_div.show();
        bmr_app_div.hide();
        $("#app-using-stored-values-alert").hide();
        $("#app-error-alert").hide();
    });

    show_bmr_app_btn.click(function () {
        geeno_app_div.hide();
        bmi_app_div.hide();
        bmr_app_div.show();
        $("#app-using-stored-values-alert").hide();
        $("#app-error-alert").hide();
    });

    // BMI APP
    bmi_app_clear_btn.click(function () {
        bmi_app_results_div.hide();
        $("#app-error-alert").hide();
        $("#bmi-app-bmi-result").html("");
        $("#bmi-app-bmi-range-result").html("");
    });

    bmi_app_result_btn.click(function (e) {
        e.preventDefault();
        $("#using-stored-values-message").html("");
        if ($("#bmi-weight-input").val() === "" && sessionStorage.getItem(w)) {
            w = sessionStorage.getItem(w);
            $("#using-stored-values-message").append("Weight: " + w + "<br>");
            $("#app-using-stored-values-alert").show();
        } else {
            w = $("#bmi-weight-input").val();
            sessionStorage.setItem(w, w);
            $("#app-using-stored-values-alert").hide();
        }
        if ($("#bmi-height-input").val() === "" && sessionStorage.getItem(h)) {
            h = sessionStorage.getItem(h);
            $("#using-stored-values-message").append("Height: " + h + "<br>");
            $("#app-using-stored-values-alert").show();
        } else {
            h = $("#bmi-height-input").val();
            sessionStorage.setItem(h, h);
            $("#app-using-stored-values-alert").hide();
        }

        if (w !== "" && h !== "") {
            $("#app-error-alert").hide();
            $("#bmi-app-bmi-result").html("");
            $("#bmi-app-bmi-range-result").html("");

            let bmi = get_bmi(w, h);
            let bmi_range = get_bmi_range(bmi);

            let bmi_app_bmi_result_p = $("#bmi-app-bmi-result");
            let bmi_app_bmi_range_result_p = $("#bmi-app-bmi-range-result");

            bmi_app_bmi_result_p.append(bmi);
            bmi_app_bmi_range_result_p.append(bmi_range);

            bmi_app_results_div.show();
        } else {
            $("#bmi-app-bmi-result").html("");
            $("#bmi-app-bmi-range-result").html("");
            $("#app-error-alert").show();
        }
    });

    //BMR APP
    bmr_app_clear_btn.click(function () {
        bmr_app_results_div.hide();
        $("#app-error-alert").hide();
        $("#bmr-app-bmr-result").html("");
    });

    bmr_app_result_btn.click(function (e) {
        e.preventDefault();

        $("#using-stored-values-message").html("");
        if ($("#bmr-weight-input").val() === "" && sessionStorage.getItem(w)) {
            w = sessionStorage.getItem(w);
            $("#using-stored-values-message").append("Weight: " + w + "<br>");
            $("#app-using-stored-values-alert").show();
        } else {
            w = $("#bmr-weight-input").val();
            sessionStorage.setItem(w, w);
            $("#app-using-stored-values-alert").hide();
        }
        if ($("#bmr-height-input").val() === "" && sessionStorage.getItem(h)) {
            h = sessionStorage.getItem(h);
            $("#using-stored-values-message").append("Height: " + h + "<br>");
            $("#app-using-stored-values-alert").show();
        } else {
            h = $("#bmr-height-input").val();
            sessionStorage.setItem(h, h);
            $("#app-using-stored-values-alert").hide();
        }

        sex = $("#bmr-sex-input").val();

        if (w !== "" && h !== "" && $("#bmr-dob-input").val() !== "") {
            $("#app-error-alert").hide();
            $("#bmr-app-bmr-result").html("");

            let dob = new Date($("#bmr-dob-input").val());
            age = get_age(dob);
            let bmr = get_bmr(age, sex, w, h);
            console.log($("#calculate-tee-checkbox").is(":checked"));
            if ($("#calculate-tee-checkbox").is(":checked")) {
                //TODO calc and display tee
                let tee = "culo";
                $("#bmr-app-tee-result").html(tee);
                $("#bmr-app-tee-result-div").show();
            } else {
                $("#bmr-app-tee-result").html("");
                $("#bmr-app-tee-result-div").hide();
            }

            let bmr_app_bmr_result_p = $("#bmr-app-bmr-result");

            bmr_app_bmr_result_p.html(bmr);

            bmr_app_results_div.show();
        } else {
            $("#app-error-alert").show();
        }
    });

    $("#calculate-tee-checkbox").click(function () {
        $("#calculate-tee-div").toggle(this.checked);
    });
});

// HELPER FUNCTIONS
function get_age(dob) {
    today = new Date();
    age = today.getFullYear() - dob.getFullYear();

    if (dob.getMonth() > today.getMonth()) {
        age--;
    } else if (
        dob.getMonth() == today.getMonth() &&
        dob.getDate() > today.getDate()
    ) {
        age--;
    }
    return age;
}

function get_bmi(w, h) {
    let bmi = (w / h ** 2) * 10000;
    return bmi.toFixed(2);
}

function get_bmi_range(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 25) return "Normal (healthy weight)";
    else if (bmi < 30) return "Overweight";
    else if (bmi < 35) return "Obese Class I (Moderately obese)";
    else if (bmi < 40) return "Obese Class II (Severely obese) ";
    else return "Obese Class III (Very severely obese)";
}

function get_bmr(age, sex, w, h) {
    if (sex === "M")
        return (66.473 + 13.7156 * w + 5.0033 * h - 6.755 * age).toFixed(2);
    else if (sex === "F")
        return (655.095 + 9.5634 * w + 1.849 * h - 4.6756 * age).toFixed(2);
    else return -1;
}

function get_desired_weight(bmi, height) {
    return (bmi * Math.pow(height / 100, 2)).toFixed(2);
}

function get_desired_bmi(weight, height) {
    return (weight * Math.pow(100 / height, 2)).toFixed(2);
}
