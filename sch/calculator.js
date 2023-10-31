$(document).ready(function () {
    $("#urmom").click(function (e) { 
        e.preventDefault();
        let params = get_data();
        do_magic(params);
    });
});

function get_data() {
    let p = [];
    p.points_have = $("#total_point").val()-0;
    p.points_max = $("#max_point").val()-0;
    p.point_worth = $("#point_worth").val()-0;
    p.form_per = $("#form_per").val()-0;
    p.perfectism = $("#perf").val()-0;
    return p;
}

function calc_grade(sp, sm, f) {
    return ((sp / sm) * 80) + ((f-0) * .20);
}

function do_magic(p) {
    let grade = calc_grade(p.points_have, p.points_max, p.form_per);
    console.log(grade);
    let grade_p = calc_grade(p.points_have + p.point_worth, p.points_max + p.point_worth, p.form_per)
    console.log(grade_p);
    let grade_pp = p.point_worth - 0;
    let grade_pm = p.point_worth - 0;
    if(grade_p < p.perfectism) {
        console.log("LMAO xdxddddxdxdxd");
        $("#urdad").text("You can't get your desired grade even with a 100% in this project, :shrug:");
        return;
    }

    let f = (p.form_per/100)*.2;
    let p_ =(p.perfectism/100);
    let b = p.points_max;
    let m = p.point_worth;
    let a = p.points_have;
    grade_pp = (b + m) * (p_ - f) - (0.8 * a);
    grade_pp = 1.25 * grade_pp;
    grade_pp = Math.ceil(grade_pp);

    $("#urdad").text("You need at least " + grade_pp + " points out of " + grade_pm + " points to at least get a " + p.perfectism + "% grade.");
}
