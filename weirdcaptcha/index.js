let mouse_move = [];
let human_opinion = 0;
let mouse_speed = 0;
let locked = 0;
let ms = 0;
let hellmode = true;

$(document).ready(function () {
    $("#ready_button").click(function (e) { 
        e.preventDefault();
        let res = test_captcha($("#inp").val());
        $("#result").text(res);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById("result")]);
    });
    $("#ready_button_m").click(function (e) { 
        e.preventDefault();
        if(ms != 0) {
            let res = $("#inpm").val();
            if(res == ms) {
                $("#result").text("You are a human.");
            } else {
                $("#result").text("Reload the page and try again (you are a robot).");
            }
        }
    });
    $("#hellmode").click(function (e) { 
        e.preventDefault();
        hellmode = false;
    });
});

onmousemove = function(e){
    if(mouse_move.length > 1500) {
        mouse_move = mouse_move.slice(1, mouse_move.length - 1);
        mouse_move.push({x: e.clientX, y: e.clientY, time: Date.now()});
    } else {
        mouse_move.push({x: e.clientX, y: e.clientY, time: Date.now()});
    }
    if(mouse_move.length > 2) {
        let idx = mouse_move.length - 1;
        let distance = function(x1, y1, x2, y2) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        };
        if(distance(mouse_move[idx].x, mouse_move[idx].y, mouse_move[idx - 1].x, mouse_move[idx - 1].y) > 11) {
            human_opinion += 1;
            mouse_speed += distance(mouse_move[idx].x, mouse_move[idx].y, mouse_move[idx - 1].x, mouse_move[idx - 1].y) / distance(mouse_move[idx].time, mouse_move[idx].time, mouse_move[idx - 1].time, mouse_move[idx - 1].time);
        }
        if(distance(mouse_move[idx].time, mouse_move[idx].time, mouse_move[idx - 1].time, mouse_move[idx - 1].time) < 1) {
            mouse_speed += 0.5;
        }
    }
}

function test_captcha(inp) {
    let actual = inp;
    if(inp.length < 12) {
        return "You need to input more than 12 zeros or ones.";
    }
    if(locked) {
        return "Reload and redo the test, sorry.";
    }
    let list = [];
    for(let i = 0; i < actual.length; i++) {
        if(actual[i] == '0') {
            list.push(0);
        } else {
            list.push(1);
        }
    }
    let res = testPass(2, '0,0', list, 0.25);
    res += testPass(2, '0,1', list, 0.25);
    res += testPass(2, '1,0', list, 0.25);
    res += testPass(2, '1,1', list, 0.25);
    res += testPass(3, '0,0,0', list, 0.125);
    res += testPass(3, '0,0,1', list, 0.125);
    res += testPass(3, '0,1,0', list, 0.125);
    res += testPass(3, '0,1,1', list, 0.125);
    res += testPass(3, '1,0,0', list, 0.125);
    res += testPass(3, '1,0,1', list, 0.125);
    res += testPass(3, '1,1,0', list, 0.125);
    res += testPass(3, '1,1,1', list, 0.125);
    for(let i = 0; i < 16; i++) {
        res += testPass(4, binary_gen(4, i), list, 0.0625);
    }
    for(let i = 0; i < 32; i++) {
        res += testPass(5, binary_gen(5, i), list, 0.03125);
    }
    human_opinion += (human_opinion / 50) * mouse_speed;
    mouse_speed = 0;
    if(res < human_opinion && res < 59 && human_opinion < 300) {
        human_opinion = 0;
        return "You are a human.";
    } else if(res > human_opinion && human_opinion < 60) {
        human_opinion = 0;
        return "You are a human.";
    } else if(res > human_opinion && human_opinion > 150) {
        human_opinion = 0;
        return "You are a robot.";
    } else if(res < human_opinion && human_opinion > 250) {
        locked = 1;
        //return "Reload and redo the test, sorry.";
        return genmatheq();
    } else {
        locked = 1;
        return genmatheq();
    }
}

function genmatheq() {    
    if(hellmode) {
        return god_save_you();
    }
    ms = 0;
    let randa = Math.floor(Math.random() * 2);
    let randb = Math.floor(Math.random() * 12) + 3;
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    let randch = alphabet[Math.floor(Math.random() * alphabet.length)]
    let exprr = Math.floor(Math.random() * 4);
    let randc = Math.floor(Math.random() * 22) + 1;
    let randd = Math.floor(Math.random() * 33) + 1;
    let expr_op = "";
    if(exprr === 1) {
        expr_op = "+";
    } else if(exprr === 2) {
        expr_op = "-";
    } else if(exprr === 3) {
        expr_op = "*";
    } else if(exprr === 4) {
        expr_op = "/";
    }

    let final = "Solve this please (enter answer in second box, round down final answer): ";
    final += "`sum_(";
    final += randch;
    final += "=";
    final += randa;
    final += ")";
    final += "^";
    final += randb;
    final += " ";
    final += randd;
    final += expr_op;
    final += randc;
    final += "=";
    final += "?";
    final += "`";
    for(let i = randa; i <= randb; i++) {
        if(exprr === 1) {
            ms += randd + randc;
        } else if(exprr === 2) {
            ms += randd - randc;
        } else if(exprr === 3) {
            ms += randd * randc;
        } else if(exprr === 4) {
            ms += randd / randc;
        }
    }
    ms = Math.floor(ms);
    return final;
    return "Solve this please: `sum_(i=1)^n i^3=((n(n+1))/2)^2`";
}

function god_save_you() {
    let final = "Solve this please (enter answer in second box, round down): ";
    let eqs = [
        "lim_(q->oo) int_0^q t^6 e^-t dt",
        "lim_(q->oo) int_0^q t^4 e^-t dt",
        "int_0^5 x^3 e^-t dt, x = 4",
        "int_0^4 x^5 e^t dt, x = 6",
        "f(x) = sum_(n=1)^9(x-50), f'(4)=?",
    ];
    let res = [
        5040,
        120,
        63,
        416779,
        9,
    ];
    let idx = Math.round(Math.random() * eqs.length);
    final += '`';
    final += eqs[idx];
    final += '`';
    ms = res[idx];
    return final;
}

function binary_gen(len, num) {
    let out = "";
    let n = num;
    let v = '0';
    let r_out = "";
    for(let i = 0; i < len; i++) {
        out += n % 2;
        n = n / 2;
        n = Math.floor(n);
    }
    for(let i = len - 1; i >= 0; i--) {
        r_out += out[i];
        r_out += ",";
    }
    return r_out.substring(0, r_out.length - 1);
}

function sliding(arr, size=2) {
    let result = [];
    for(var i = 0; i < arr.length - size + 1; i++) {
        result[i] = arr.slice(i, i + size);
    }
    return result;
}

function count(arr, size=2){
    let sliding_arr = sliding(arr, size=size);
    let counts = dict(size=size);
    for (var i = sliding_arr.length - 1; i >= 0; i--) {
        let key = sliding_arr[i].join(',');
        if(typeof counts[key] === 'undefined'){
            counts[key] = 1;
        }else{
            counts[key] = counts[key] + 1;
        }
    }
    return counts;
}

function expected(seq, size=2){
    let n_combos = combinations(size=size).length
    return dict(size=size, value=(seq.length - size)/n_combos);
}

function combinations(size=2){
    let options = [[]]
    for (let index = 0; index < size; index++) {
        let zeros = options.map(_ => _.concat([0]));
        let ones = options.map(_ => _.concat([1]));
        options = zeros.concat(ones);
    }
    return options;
}

function dict(size, value=0){
    let combos = combinations(size);
    let result = {};
    for (let index = 0; index < combos.length; index++) {
        result[combos[index]] = 0;
    }
    return result;
}

function betaPDF(x, a, b) {
    return Math.exp(lnBetaPDF(x, a, b));
}
function lnBetaPDF(x, a, b) {
    return ((a-1)*Math.log(x) + (b-1)*Math.log(1-x)) - lnBetaFunc(a,b);
}

function lnBetaFunc(a, b) {
foo = 0.0;

for(i=0; i<a-2; i++) {
    foo += Math.log(a-1-i);
}
for(i=0; i<b-2; i++) {
    foo += Math.log(b-1-i);
}
for(i=0; i<a+b-2; i++) {
    foo -= Math.log(a+b-1-i);
}
return foo;
}

function quantile(depth, bucket, seq, expected){
    let c = count(seq, depth);
    let heads = c[bucket];
    let tails = seq.length - (depth - 1) - heads;
    return 100 - Math.round(jStat.beta.cdf(expected, heads, tails)*100);
}

function testPass(depth, bucket, seq, expected){
    let q = quantile(depth, bucket, seq, expected);
    let p1 = q > 4;
    let p2 = q < 96;
    return p1 && p2;
}