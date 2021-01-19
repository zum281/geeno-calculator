const show_overview_tab_btn = $("#show-overview-tab");
const show_calculator_app_btn = $("#show-calculator-app");
const show_weight_obj_app_btn = $("#show-weight-objective-app");
const overview_tab_div = $("#overview-tab");
const calculator_app_div = $("#calculator-app");

const calculator_app_clear_btn = $("#calculator-app-clear-btn");
const calculator_app_result_btn = $("#calculator-app-result-btn");

const weight_obj_div = $("#weight-objective-app");
const weight_obj_select_var = $("#weight-obj-desired-input");

const weight_obj_clear_btn = $("#weight-obj-clear-btn");
const weight_obj_result_btn = $("#weight-obj-result-btn");

let h;
let w;
let age;
let sex;
let laf;
let bmi;
let bmi_range;
let bmr;
let desired_weight;
let desired_bmi;
let time_range;
let tee;
let weight_obj;

$(document).ready(function () {
    // uncheck checkbox
    $("#calculate-tee-checkbox").prop("checked", false);
    // close alert
    $(".alert-close-btn").click(function () {
        $("#app-error-alert").hide();
        $("#app-error-alert").addClass("hidden");
    });

    // Show page on button click -- SELECT APP
    show_overview_tab_btn.click(function () {
        show_overview_tab_btn.addClass("active-tab");
        show_calculator_app_btn.removeClass("active-tab");
        show_weight_obj_app_btn.removeClass("active-tab");
        $("#overview-content").show();
        overview_tab_div.show();
        calculator_app_div.hide();
        weight_obj_div.hide();
        $("#app-error-alert").hide();
        $("#app-error-alert").addClass("hidden");
        if (sessionStorage.getItem(age)) {
            $("#overview-age").show();
            $("#overview-age-span").html(sessionStorage.getItem(age) + " anni");
            $("#no-results-div").hide();
        } else {
            $("#overview-age-span").html("");
            $("#overview-age").hide();
        }
        if (sessionStorage.getItem(h)) {
            $("#overview-height").show();
            $("#overview-height-span").html(sessionStorage.getItem(h) + " cm");
            $("#no-results-div").hide();
        } else {
            $("#overview-height-span").html("");
            $("#overview-height").hide();
        }
        if (sessionStorage.getItem(w)) {
            $("#overview-weight").show();
            $("#overview-weight-span").html(sessionStorage.getItem(w) + " kg");
            $("#no-results-div").hide();
        } else {
            $("#overview-weight-span").html("");
            $("#overview-weight").hide();
        }
        if (sessionStorage.getItem(bmi)) {
            $("#overview-bmi").show();
            $("#overview-bmi-span").html(
                sessionStorage.getItem(bmi) + " kg/m<sup>2</sup>"
            );
            $("#no-results-div").hide();
        } else {
            $("#overview-bmi-span").html("");
            $("#overview-bmi").hide();
        }
        if (sessionStorage.getItem(bmi_range)) {
            $("#overview-bmi-range").show();
            $("#overview-bmi-range-span").html(
                sessionStorage.getItem(bmi_range)
            );
            $("#no-results-div").hide();
        } else {
            $("#overview-bmi-range-span").html("");
            $("#overview-bmi-range").hide();
        }
        if (sessionStorage.getItem(bmr)) {
            $("#overview-bmr").show();
            $("#overview-bmr-span").html(sessionStorage.getItem(bmr) + " kcal");
            $("#no-results-div").hide();
        } else {
            $("#overview-bmr-span").html("");
            $("#overview-bmr").hide();
        }
        if (sessionStorage.getItem(tee)) {
            $("#overview-tee").show();
            $("#overview-tee-span").html(sessionStorage.getItem(tee) + " kcal");
            $("#no-results-div").hide();
        } else {
            $("#overview-tee-span").html("");
            $("#overview-tee").hide();
        }

        if (sessionStorage.getItem(desired_bmi)) {
            $("#overview-desired-bmi").show();
            $("#overview-desired-bmi-span").html(
                sessionStorage.getItem(desired_bmi) + " kg/m<sup>2</sup>"
            );
            $("#no-results-div").hide();
        } else {
            $("#overview-desired-bmi-span").html("");
            $("#overview-desired-bmi").hide();
        }

        if (sessionStorage.getItem(desired_weight)) {
            $("#overview-desired-weight").show();
            $("#overview-desired-weight-span").html(
                sessionStorage.getItem(desired_weight) + " kg"
            );
            $("#no-results-div").hide();
        } else {
            $("#overview-desired-weight-span").html("");
            $("#overview-desired-weight").hide();
        }

        if (sessionStorage.getItem(weight_obj)) {
            $("#overview-weight-obj").show();
            $("#overview-weight-obj-span").html(
                sessionStorage.getItem(weight_obj) + " kcal"
            );
            $("#no-results-div").hide();
        } else {
            $("#overview-weight-obj-span").html("");
            $("#overview-weight-obj").hide();
        }

        if (
            !(
                sessionStorage.getItem(age) ||
                sessionStorage.getItem(h) ||
                sessionStorage.getItem(w) ||
                sessionStorage.getItem(bmi) ||
                sessionStorage.getItem(bmr) ||
                sessionStorage.getItem(tee) ||
                sessionStorage.getItem(bmi_range) ||
                sessionStorage.getItem(desired_bmi) ||
                sessionStorage.getItem(desired_weight) ||
                sessionStorage.getItem(weight_obj)
            )
        ) {
            $("#no-results-div").show();
            $("#overview-content").hide();
        } else $("#overview-title").show();
    });

    show_calculator_app_btn.click(function () {
        show_overview_tab_btn.removeClass("active-tab");
        show_calculator_app_btn.addClass("active-tab");
        show_weight_obj_app_btn.removeClass("active-tab");

        overview_tab_div.hide();
        calculator_app_div.show();
        weight_obj_div.hide();
        $("#app-error-alert").hide();
        $("#app-error-alert").addClass("hidden");

        $("#overview-content").hide();

        if (sessionStorage.getItem(w)) {
            $("#weight-input").val(sessionStorage.getItem(w));
        }
        if (sessionStorage.getItem(h)) {
            $("#height-input").val(sessionStorage.getItem(h));
        }
        if (sessionStorage.getItem(h)) {
            $("#laf-input").val(sessionStorage.getItem(laf));
        }
    });

    show_weight_obj_app_btn.click(function () {
        show_overview_tab_btn.removeClass("active-tab");
        show_calculator_app_btn.removeClass("active-tab");
        show_weight_obj_app_btn.addClass("active-tab");
        overview_tab_div.hide();
        calculator_app_div.hide();
        weight_obj_div.show();

        $("#app-error-alert").hide();
        $("#app-error-alert").addClass("hidden");

        $("#overview-content").hide();

        if (sessionStorage.getItem(w)) {
            $("#weight-obj-weight-input").val(sessionStorage.getItem(w));
        }
        if (sessionStorage.getItem(h)) {
            $("#weight-obj-height-input").val(sessionStorage.getItem(h));
        }
        if (sessionStorage.getItem(laf)) {
            $("#weight-obj-laf-input").val(sessionStorage.getItem(laf));
        }
        if (sessionStorage.getItem(bmr)) {
            $("#weight-obj-bmr-input").val(sessionStorage.getItem(bmr));
        }
    });

    // CALCULATOR
    calculator_app_clear_btn.click(function () {
        $("#app-error-alert").hide();
        $("#app-error-alert").addClass("hidden");

        $("#dob-input").val("");
        $("#height-input").val("");
        $("#weight-input").val("");
        $("#laf-input").val("");

        $("#calculate-tee-checkbox").prop("checked", false);
        $("#calculate-tee-div").hide();
        $("#calculate-tee-div").addClass("hidden");
    });

    calculator_app_result_btn.click(function (e) {
        e.preventDefault();
        w = $("#weight-input").val();
        if (w !== sessionStorage.getItem(w)) {
            if (sessionStorage.getItem(bmr)) sessionStorage.removeItem(bmr);
            if (sessionStorage.getItem(laf)) sessionStorage.removeItem(laf);
            if (sessionStorage.getItem(age)) sessionStorage.removeItem(age);
            if (sessionStorage.getItem(tee)) sessionStorage.removeItem(tee);
            sessionStorage.setItem(w, w);
        }

        h = $("#height-input").val();
        if (h !== sessionStorage.getItem(h)) {
            if (sessionStorage.getItem(bmr)) sessionStorage.removeItem(bmr);
            if (sessionStorage.getItem(laf)) sessionStorage.removeItem(laf);
            if (sessionStorage.getItem(age)) sessionStorage.removeItem(age);
            if (sessionStorage.getItem(tee)) sessionStorage.removeItem(tee);
            sessionStorage.setItem(h, h);
        }

        sex = $("#sex-input").val();
        if (sex !== sessionStorage.getItem(sex)) {
            if (sessionStorage.getItem(bmr)) sessionStorage.removeItem(bmr);
            if (sessionStorage.getItem(laf)) sessionStorage.removeItem(laf);
            if (sessionStorage.getItem(age)) sessionStorage.removeItem(age);
            if (sessionStorage.getItem(tee)) sessionStorage.removeItem(tee);
            sessionStorage.setItem(sex, sex);
        }

        if (w !== "" && h !== "" && $("#dob-input").val() !== "") {
            $("#app-error-alert").hide();
            $("#app-error-alert").addClass("hidden");

            let dob = new Date($("#dob-input").val());
            age = get_age(dob);
            bmi = get_bmi(w, h);
            sessionStorage.setItem(bmi, bmi);
            bmi_range = get_bmi_range(bmi);
            sessionStorage.setItem(bmi_range, bmi_range);
            bmr = get_bmr(age, sex, w, h);
            sessionStorage.setItem(age, age);
            sessionStorage.setItem(bmr, bmr);
            if ($("#calculate-tee-checkbox").is(":checked")) {
                laf = $("#laf-input").val();
                if (laf !== sessionStorage.getItem(laf)) {
                    sessionStorage.setItem(laf, laf);
                }
                if (laf !== "") {
                    tee = get_tee(bmr, laf);
                    sessionStorage.setItem(tee, tee);
                } else {
                    $("#app-error-alert").show();
                    $("#app-error-alert").removeClass("hidden");
                }
            }

            show_overview_tab_btn.trigger("click");
            calculator_app_div.hide();
        } else {
            $("#app-error-alert").show();
            $("#app-error-alert").removeClass("hidden");
        }
    });

    $("#calculate-tee-checkbox").click(function () {
        $("#calculate-tee-div").toggle(this.checked);
        if (
            $("#calculate-tee-div")
                .attr("class")
                .split(/\s+/)
                .includes("hidden")
        ) {
            $("#calculate-tee-div").removeClass("hidden");
            $("#calculate-tee-div").css("display", "flex");
            $("#calculate-tee-div").show();
        } else {
            $("#calculate-tee-div").addClass("hidden");
            $("#calculate-tee-div").hide();
        }
    });

    // populate span
    weight_obj_select_var
        .change(function () {
            var str = "";
            $("#weight-obj-desired-input option:selected").each(function () {
                str += $(this).text();
            });
            $("#weight-obj-desired-span").text(str);
        })
        .trigger("change");

    // WEIGHT OBJ APP
    weight_obj_clear_btn.click(function () {
        $("#weight-obj-height-input").val("");
        $("#weight-obj-weight-input").val("");
        $("#weight-obj-laf-input").val("");
        $("#app-error-alert").hide();
        $("#app-error-alert").addClass("hidden");
    });
    weight_obj_result_btn.click(function (e) {
        e.preventDefault();
        w = $("#weight-obj-weight-input").val();
        if (w !== sessionStorage.getItem(w)) {
            if (sessionStorage.getItem(bmi)) sessionStorage.removeItem(bmi);
            if (sessionStorage.getItem(bmr)) sessionStorage.removeItem(bmr);
            sessionStorage.setItem(w, w);
        }

        h = $("#weight-obj-height-input").val();
        if (h !== sessionStorage.getItem(h)) {
            if (sessionStorage.getItem(bmi)) sessionStorage.removeItem(bmi);
            if (sessionStorage.getItem(bmr)) sessionStorage.removeItem(bmr);
            sessionStorage.setItem(h, h);
        }

        laf = $("#weight-obj-laf-input").val();
        if (laf !== sessionStorage.getItem(laf)) {
            sessionStorage.setItem(laf, laf);
        }

        bmr = $("#weight-obj-bmr-input").val();
        if (bmr !== sessionStorage.getItem(bmr)) {
            sessionStorage.setItem(bmr, bmr);
        }
        if (
            h !== "" &&
            w !== "" &&
            laf !== "" &&
            bmr !== "" &&
            $("#weight-obj-time-range").val() !== ""
        ) {
            time_range = $("#weight-obj-time-range").val();
            let time_range_days = time_range * 30;
            tee = get_tee(bmr, laf);
            sessionStorage.setItem(tee, tee);
            let option = $("#weight-obj-desired-input option:selected").text();
            if (option == "BMI") {
                desired_bmi = $("#weight-obj-variable-input").val();
                desired_weight = get_desired_weight(desired_bmi, h);
            } else if (option == "Peso") {
                desired_weight = $("#weight-obj-variable-input").val();
                desired_bmi = get_desired_bmi(desired_weight, h);
            } else {
                desired_weight =
                    w - (w * $("#weight-obj-variable-input").val()) / 100;
                desired_bmi = get_desired_bmi(desired_weight, h);
            }
            sessionStorage.setItem(desired_bmi, desired_bmi);
            sessionStorage.setItem(desired_weight, desired_weight);
            weight_obj = (
                tee -
                ((w - desired_weight) * 7000) / time_range_days
            ).toFixed(2);
            sessionStorage.setItem(weight_obj, weight_obj);

            show_overview_tab_btn.trigger("click");
            weight_obj_div.hide();
        } else {
            $("#app-error-alert").show();
            $("#app-error-alert").removeClass("hidden");
        }
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
    if (bmi < 18.5) return "Sottopeso";
    else if (bmi < 25) return "Normopeso";
    else if (bmi < 30) return "Sovrappeso";
    else if (bmi < 35) return "Obesità Classe I";
    else if (bmi < 40) return "Obesità Classe II";
    else return "Obesità Classe III";
}

function get_bmr(age, sex, w, h) {
    if (sex === "M")
        return (66.473 + 13.7156 * w + 5.0033 * h - 6.755 * age).toFixed(2);
    else if (sex === "F")
        return (655.095 + 9.5634 * w + 1.849 * h - 4.6756 * age).toFixed(2);
    else return -1;
}

function get_tee(bmr, laf) {
    return (bmr * laf).toFixed(2);
}

function get_desired_weight(bmi, height) {
    return (bmi * Math.pow(height / 100, 2)).toFixed(2);
}

function get_desired_bmi(weight, height) {
    return (weight * Math.pow(100 / height, 2)).toFixed(2);
}
