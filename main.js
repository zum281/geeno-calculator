const show_overview_tab_btn = $("#show-overview-tab");
const show_bmi_app_btn = $("#show-bmi-app");
const show_bmr_app_btn = $("#show-bmr-app");
const show_weight_obj_btn = $("#show-weight-objective-app");
const overview_tab_div = $("#overview-tab");
const bmi_app_div = $("#bmi-app");
const bmr_app_div = $("#bmr-app");
const weight_obj_div = $("#weight-objective-app");
const weight_obj_select_var = $("#weight-obj-desired-input");

const bmi_app_results_div = $("#bmi-app-results");
const bmi_app_result_btn = $("#bmi-app-result-btn");
const bmi_app_clear_btn = $("#bmi-app-clear-btn");

const bmr_app_results_div = $("#bmr-app-results");
const bmr_app_result_btn = $("#bmr-app-result-btn");
const bmr_app_clear_btn = $("#bmr-app-clear-btn");

const weight_obj_clear_btn = $("#weight-obj-clear-btn");
const weight_obj_result_btn = $("#weight-obj-result-btn");
const weight_obj_results_div = $("#weight-obj-results");

let h;
let w;
let age;
let sex;
let laf;
let bmi;
let bmr;
let desired_weight;
let desired_bmi;
let time_range;
let tee;

$(document).ready(function () {
    // uncheck checkbox
    $("#calculate-tee-checkbox").prop("checked", false);

    // Toggle menu
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    // Show page on button click -- SELECT APP
    show_overview_tab_btn.click(function () {
        if (window.outerWidth < 425) {
            $("#wrapper").removeClass("toggled");
        }
        $("#overview-content").show();
        $("#overview-tab").addClass("d-flex");
        overview_tab_div.show();
        bmi_app_div.hide();
        bmr_app_div.hide();
        weight_obj_div.hide();
        $("#app-using-stored-values-alert").hide();
        $("#app-error-alert").hide();
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
        if (
            !(
                sessionStorage.getItem(age) ||
                sessionStorage.getItem(h) ||
                sessionStorage.getItem(w) ||
                sessionStorage.getItem(bmi) ||
                sessionStorage.getItem(bmr) ||
                sessionStorage.getItem(tee)
            )
        )
            $("#no-results-div").show();
        else $("#overview-title").show();
    });

    show_bmi_app_btn.click(function () {
        if (window.outerWidth < 425) {
            $("#wrapper").removeClass("toggled");
        }
        overview_tab_div.hide();
        bmi_app_div.show();
        bmr_app_div.hide();
        weight_obj_div.hide();
        $("#app-using-stored-values-alert").hide();
        $("#app-error-alert").hide();
        $("#overview-tab").removeClass("d-flex");
        $("#overview-content").hide();

        // populate input if needed
        if (sessionStorage.getItem(w)) {
            $("#bmi-weight-input").val(sessionStorage.getItem(w));
        }
        if (sessionStorage.getItem(h)) {
            $("#bmi-height-input").val(sessionStorage.getItem(h));
        }
    });

    show_bmr_app_btn.click(function () {
        if (window.outerWidth < 425) {
            $("#wrapper").removeClass("toggled");
        }
        overview_tab_div.hide();
        bmi_app_div.hide();
        bmr_app_div.show();
        weight_obj_div.hide();
        $("#app-using-stored-values-alert").hide();
        $("#app-error-alert").hide();
        $("#overview-tab").removeClass("d-flex");
        $("#overview-content").hide();

        // populate input if needed
        if (sessionStorage.getItem(w)) {
            $("#bmr-weight-input").val(sessionStorage.getItem(w));
        }
        if (sessionStorage.getItem(h)) {
            $("#bmr-height-input").val(sessionStorage.getItem(h));
        }
    });

    show_weight_obj_btn.click(function () {
        if (window.outerWidth < 425) {
            $("#wrapper").removeClass("toggled");
        }
        overview_tab_div.hide();
        bmi_app_div.hide();
        bmr_app_div.hide();
        weight_obj_div.show();
        $("#app-using-stored-values-alert").hide();
        $("#app-error-alert").hide();
        $("#overview-tab").removeClass("d-flex");
        $("#overview-content").hide();

        // populate input if needed
        if (sessionStorage.getItem(w)) {
            $("#weight-obj-weight-input").val(sessionStorage.getItem(w));
        }
        if (sessionStorage.getItem(h)) {
            $("#weight-obj-height-input").val(sessionStorage.getItem(h));
        }

        if (sessionStorage.getItem(bmr)) {
            $("#weight-obj-bmr-input").val(sessionStorage.getItem(bmr));
        }
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
        w = $("#bmi-weight-input").val();

        if (w !== sessionStorage.getItem(w)) {
            if (sessionStorage.getItem(bmr)) sessionStorage.removeItem(bmr);
            if (sessionStorage.getItem(laf)) sessionStorage.removeItem(laf);
            if (sessionStorage.getItem(age)) sessionStorage.removeItem(age);
            if (sessionStorage.getItem(tee)) sessionStorage.removeItem(tee);
            sessionStorage.setItem(w, w);
        }
        h = $("#bmi-height-input").val();
        if (h !== sessionStorage.getItem(h)) {
            if (sessionStorage.getItem(bmr)) sessionStorage.removeItem(bmr);
            if (sessionStorage.getItem(laf)) sessionStorage.removeItem(laf);
            if (sessionStorage.getItem(age)) sessionStorage.removeItem(age);
            if (sessionStorage.getItem(tee)) sessionStorage.removeItem(tee);
            sessionStorage.setItem(h, h);
        }

        if (w !== "" && h !== "") {
            $("#app-error-alert").hide();
            $("#bmi-app-bmi-result").html("");
            $("#bmi-app-bmi-range-result").html("");

            bmi = get_bmi(w, h);
            sessionStorage.setItem(bmi, bmi);
            let bmi_range = get_bmi_range(bmi);

            let bmi_app_bmi_result_p = $("#bmi-app-bmi-result");
            let bmi_app_bmi_range_result_p = $("#bmi-app-bmi-range-result");

            bmi_app_bmi_result_p.append(bmi + " kg/m<sup>2</sup>");
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
        $("#calculate-tee-div").hide();
    });

    bmr_app_result_btn.click(function (e) {
        e.preventDefault();
        w = $("#bmr-weight-input").val();
        if (w !== sessionStorage.getItem(w)) {
            if (sessionStorage.getItem(bmi)) sessionStorage.removeItem(bmi);
            sessionStorage.setItem(w, w);
        }
        h = $("#bmr-height-input").val();
        if (h !== sessionStorage.getItem(h)) {
            if (sessionStorage.getItem(bmi)) sessionStorage.removeItem(bmi);
            sessionStorage.setItem(h, h);
        }

        sex = $("#bmr-sex-input").val();

        if (w !== "" && h !== "" && $("#bmr-dob-input").val() !== "") {
            $("#app-error-alert").hide();
            $("#bmr-app-bmr-result").html("");

            let dob = new Date($("#bmr-dob-input").val());
            age = get_age(dob);
            bmr = get_bmr(age, sex, w, h);
            sessionStorage.setItem(age, age);
            sessionStorage.setItem(bmr, bmr);
            if ($("#calculate-tee-checkbox").is(":checked")) {
                laf = $("#bmr-laf-input").val();
                if (laf !== sessionStorage.getItem(laf)) {
                    sessionStorage.setItem(laf, laf);
                }
                if (laf !== "") {
                    tee = get_tee(bmr, laf);
                    sessionStorage.setItem(tee, tee);
                    $("#bmr-app-tee-result").html(tee + " kcal");
                    $("#bmr-app-tee-result-div").show();
                } else {
                    $("#app-error-alert").show();
                    $("#bmr-app-tee-result").html("");
                    $("#bmr-app-tee-result-div").hide();
                }
            } else {
                $("#bmr-app-tee-result").html("");
                $("#bmr-app-tee-result-div").hide();
            }

            let bmr_app_bmr_result_p = $("#bmr-app-bmr-result");

            bmr_app_bmr_result_p.html(bmr + " kcal");

            bmr_app_results_div.show();
        } else {
            $("#app-error-alert").show();
        }
    });

    $("#calculate-tee-checkbox").click(function () {
        $("#calculate-tee-div").toggle(this.checked);
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
        weight_obj_results_div.hide();
        bmi_app_results_div.hide();
        $("#app-error-alert").hide();
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
            let weight_obj = (
                tee -
                ((w - desired_weight) * 7000) / time_range_days
            ).toFixed(2);

            $("#app-error-alert").hide();

            $("#weight-obj-desired-bmi-result").html(
                desired_bmi + " kg/m<sup>2</sup><br>"
            );
            $("#weight-obj-desired-weight-result").html(
                desired_weight + " kg<br>"
            );
            $("#weight-obj-weight-obj-result").html(weight_obj + " kcal<br>");

            weight_obj_results_div.show();
        } else {
            $("#app-error-alert").show();
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

function get_tee(bmr, laf) {
    return (bmr * laf).toFixed(2);
}

function get_desired_weight(bmi, height) {
    return (bmi * Math.pow(height / 100, 2)).toFixed(2);
}

function get_desired_bmi(weight, height) {
    return (weight * Math.pow(100 / height, 2)).toFixed(2);
}
