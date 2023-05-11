let mouse_move = [];
let human_opinion = 0;
let mouse_speed = 0;
let locked = 0;
let ms = 0;
let hellmode = true;
$(document)['ready'](function() {
    $('#ready_button')['click'](function(_0x97b3x7) {
        _0x97b3x7['preventDefault']();
        let _0x97b3x8 = test_captcha($('#inp')['val']());
        $('#result')['text'](_0x97b3x8);
        MathJax['Hub'].Queue(['Typeset', MathJax['Hub'], document['getElementById']('result')])
    });
    $('#ready_button_m')['click'](function(_0x97b3x7) {
        _0x97b3x7['preventDefault']();
        if (ms != 0) {
            let _0x97b3x8 = $('#inpm')['val']();
            if (_0x97b3x8 == ms) {
                $('#result')['text']('You are a human.')
            } else {
                $('#result')['text']('Reload the page and try again (you are a robot).')
            }
        }
    });
    $('#hellmode')['click'](function(_0x97b3x7) {
        _0x97b3x7['preventDefault']();
        hellmode = false
    })
});
onmousemove = function(_0x97b3x7) {
    if (mouse_move['length'] > 1500) {
        mouse_move = mouse_move['slice'](1, mouse_move['length'] - 1);
        mouse_move['push']({
            x: _0x97b3x7['clientX'],
            y: _0x97b3x7['clientY'],
            time: Date['now']()
        })
    } else {
        mouse_move['push']({
            x: _0x97b3x7['clientX'],
            y: _0x97b3x7['clientY'],
            time: Date['now']()
        })
    };
    if (mouse_move['length'] > 2) {
        let _0x97b3x9 = mouse_move['length'] - 1;
        let _0x97b3xa = function(_0x97b3xb, _0x97b3xc, _0x97b3xd, _0x97b3xe) {
            return Math['sqrt']((_0x97b3xd - _0x97b3xb) * (_0x97b3xd - _0x97b3xb) + (_0x97b3xe - _0x97b3xc) * (_0x97b3xe - _0x97b3xc))
        };
        if (_0x97b3xa(mouse_move[_0x97b3x9]['x'], mouse_move[_0x97b3x9]['y'], mouse_move[_0x97b3x9 - 1]['x'], mouse_move[_0x97b3x9 - 1]['y']) > 11) {
            human_opinion += 1;
            mouse_speed += _0x97b3xa(mouse_move[_0x97b3x9]['x'], mouse_move[_0x97b3x9]['y'], mouse_move[_0x97b3x9 - 1]['x'], mouse_move[_0x97b3x9 - 1]['y']) / _0x97b3xa(mouse_move[_0x97b3x9]['time'], mouse_move[_0x97b3x9]['time'], mouse_move[_0x97b3x9 - 1]['time'], mouse_move[_0x97b3x9 - 1]['time'])
        };
        if (_0x97b3xa(mouse_move[_0x97b3x9]['time'], mouse_move[_0x97b3x9]['time'], mouse_move[_0x97b3x9 - 1]['time'], mouse_move[_0x97b3x9 - 1]['time']) < 1) {
            mouse_speed += 0.5
        }
    }
};

function test_captcha(_0x97b3x10) {
    let _0x97b3x11 = _0x97b3x10;
    if (_0x97b3x10['length'] < 12) {
        return 'You need to input more than 12 zeros or ones.'
    };
    if (locked) {
        return 'Reload and redo the test, sorry.'
    };
    let _0x97b3x12 = [];
    for (let _0x97b3x13 = 0; _0x97b3x13 < _0x97b3x11['length']; _0x97b3x13++) {
        if (_0x97b3x11[_0x97b3x13] == '0') {
            _0x97b3x12['push'](0)
        } else {
            _0x97b3x12['push'](1)
        }
    };
    let _0x97b3x8 = testPass(2, '0,0', _0x97b3x12, 0.25);
    _0x97b3x8 += testPass(2, '0,1', _0x97b3x12, 0.25);
    _0x97b3x8 += testPass(2, '1,0', _0x97b3x12, 0.25);
    _0x97b3x8 += testPass(2, '1,1', _0x97b3x12, 0.25);
    _0x97b3x8 += testPass(3, '0,0,0', _0x97b3x12, 0.125);
    _0x97b3x8 += testPass(3, '0,0,1', _0x97b3x12, 0.125);
    _0x97b3x8 += testPass(3, '0,1,0', _0x97b3x12, 0.125);
    _0x97b3x8 += testPass(3, '0,1,1', _0x97b3x12, 0.125);
    _0x97b3x8 += testPass(3, '1,0,0', _0x97b3x12, 0.125);
    _0x97b3x8 += testPass(3, '1,0,1', _0x97b3x12, 0.125);
    _0x97b3x8 += testPass(3, '1,1,0', _0x97b3x12, 0.125);
    _0x97b3x8 += testPass(3, '1,1,1', _0x97b3x12, 0.125);
    for (let _0x97b3x13 = 0; _0x97b3x13 < 16; _0x97b3x13++) {
        _0x97b3x8 += testPass(4, binary_gen(4, _0x97b3x13), _0x97b3x12, 0.0625)
    };
    for (let _0x97b3x13 = 0; _0x97b3x13 < 32; _0x97b3x13++) {
        _0x97b3x8 += testPass(5, binary_gen(5, _0x97b3x13), _0x97b3x12, 0.03125)
    };
    human_opinion += (human_opinion / 50) * mouse_speed;
    mouse_speed = 0;
    if (_0x97b3x8 < human_opinion && _0x97b3x8 < 59 && human_opinion < 300) {
        human_opinion = 0;
        return 'You are a human.'
    } else {
        if (_0x97b3x8 > human_opinion && human_opinion < 60) {
            human_opinion = 0;
            return 'You are a human.'
        } else {
            if (_0x97b3x8 > human_opinion && human_opinion > 150) {
                human_opinion = 0;
                return 'You are a robot.'
            } else {
                if (_0x97b3x8 < human_opinion && human_opinion > 250) {
                    locked = 1;
                    return genmatheq()
                } else {
                    locked = 1;
                    return genmatheq()
                }
            }
        }
    }
}

function genmatheq() {
    if (hellmode) {
        return god_save_you()
    };
    ms = 0;
    let _0x97b3x15 = Math['floor'](Math['random']() * 2);
    let _0x97b3x16 = Math['floor'](Math['random']() * 12) + 3;
    const _0x97b3x17 = 'abcdefghijklmnopqrstuvwxyz';
    let _0x97b3x18 = _0x97b3x17[Math['floor'](Math['random']() * _0x97b3x17['length'])];
    let _0x97b3x19 = Math['floor'](Math['random']() * 4);
    let _0x97b3x1a = Math['floor'](Math['random']() * 22) + 1;
    let _0x97b3x1b = Math['floor'](Math['random']() * 33) + 1;
    let _0x97b3x1c = '';
    if (_0x97b3x19 === 1) {
        _0x97b3x1c = '+'
    } else {
        if (_0x97b3x19 === 2) {
            _0x97b3x1c = '-'
        } else {
            if (_0x97b3x19 === 3) {
                _0x97b3x1c = '*'
            } else {
                if (_0x97b3x19 === 4) {
                    _0x97b3x1c = '/'
                }
            }
        }
    };
    let _0x97b3x1d = 'Solve this please (enter answer in second box, round down final answer): ';
    _0x97b3x1d += '`sum_(';
    _0x97b3x1d += _0x97b3x18;
    _0x97b3x1d += '=';
    _0x97b3x1d += _0x97b3x15;
    _0x97b3x1d += ')';
    _0x97b3x1d += '^';
    _0x97b3x1d += _0x97b3x16;
    _0x97b3x1d += ' ';
    _0x97b3x1d += _0x97b3x1b;
    _0x97b3x1d += _0x97b3x1c;
    _0x97b3x1d += _0x97b3x1a;
    _0x97b3x1d += '=';
    _0x97b3x1d += '?';
    _0x97b3x1d += '`';
    for (let _0x97b3x13 = _0x97b3x15; _0x97b3x13 <= _0x97b3x16; _0x97b3x13++) {
        if (_0x97b3x19 === 1) {
            ms += _0x97b3x1b + _0x97b3x1a
        } else {
            if (_0x97b3x19 === 2) {
                ms += _0x97b3x1b - _0x97b3x1a
            } else {
                if (_0x97b3x19 === 3) {
                    ms += _0x97b3x1b * _0x97b3x1a
                } else {
                    if (_0x97b3x19 === 4) {
                        ms += _0x97b3x1b / _0x97b3x1a
                    }
                }
            }
        }
    };
    ms = Math['floor'](ms);
    return _0x97b3x1d;
    return 'Solve this please: `sum_(i=1)^n i^3=((n(n+1))/2)^2`'
}

function god_save_you() {
    let _0x97b3x1d = 'Solve this please (enter answer in second box, round down): ';
    let _0x97b3x1f = ['lim_(q->oo) int_0^q t^6 e^-t dt', 'lim_(q->oo) int_0^q t^4 e^-t dt', 'int_0^5 x^3 e^-t dt, x = 4', 'int_0^4 x^5 e^t dt, x = 6', 'f(x) = sum_(n=1)^9(x-50), f\'(4)=?'];
    let _0x97b3x8 = [5040, 120, 63, 416779, 9];
    let _0x97b3x9 = Math['round'](Math['random']() * _0x97b3x1f['length']);
    _0x97b3x1d += '`';
    _0x97b3x1d += _0x97b3x1f[_0x97b3x9];
    _0x97b3x1d += '`';
    ms = _0x97b3x8[_0x97b3x9];
    return _0x97b3x1d
}

function binary_gen(_0x97b3x21, _0x97b3x22) {
    let _0x97b3x23 = '';
    let _0x97b3x24 = _0x97b3x22;
    let _0x97b3x25 = '0';
    let _0x97b3x26 = '';
    for (let _0x97b3x13 = 0; _0x97b3x13 < _0x97b3x21; _0x97b3x13++) {
        _0x97b3x23 += _0x97b3x24 % 2;
        _0x97b3x24 = _0x97b3x24 / 2;
        _0x97b3x24 = Math['floor'](_0x97b3x24)
    };
    for (let _0x97b3x13 = _0x97b3x21 - 1; _0x97b3x13 >= 0; _0x97b3x13--) {
        _0x97b3x26 += _0x97b3x23[_0x97b3x13];
        _0x97b3x26 += ','
    };
    return _0x97b3x26['substring'](0, _0x97b3x26['length'] - 1)
}

function sliding(_0x97b3x28, _0x97b3x29 = 2) {
    let _0x97b3x2a = [];
    for (var _0x97b3x13 = 0; _0x97b3x13 < _0x97b3x28['length'] - _0x97b3x29 + 1; _0x97b3x13++) {
        _0x97b3x2a[_0x97b3x13] = _0x97b3x28['slice'](_0x97b3x13, _0x97b3x13 + _0x97b3x29)
    };
    return _0x97b3x2a
}

function count(_0x97b3x28, _0x97b3x29 = 2) {
    let _0x97b3x2c = sliding(_0x97b3x28, _0x97b3x29 = _0x97b3x29);
    let _0x97b3x2d = dict(_0x97b3x29 = _0x97b3x29);
    for (var _0x97b3x13 = _0x97b3x2c['length'] - 1; _0x97b3x13 >= 0; _0x97b3x13--) {
        let _0x97b3x2e = _0x97b3x2c[_0x97b3x13]['join'](',');
        if (typeof _0x97b3x2d[_0x97b3x2e] === 'undefined') {
            _0x97b3x2d[_0x97b3x2e] = 1
        } else {
            _0x97b3x2d[_0x97b3x2e] = _0x97b3x2d[_0x97b3x2e] + 1
        }
    };
    return _0x97b3x2d
}

function expected(_0x97b3x30, _0x97b3x29 = 2) {
    let _0x97b3x31 = combinations(_0x97b3x29 = _0x97b3x29)['length'];
    return dict(_0x97b3x29 = _0x97b3x29, value = (_0x97b3x30['length'] - _0x97b3x29) / _0x97b3x31)
}

function combinations(_0x97b3x29 = 2) {
    let _0x97b3x33 = [
        []
    ];
    for (let _0x97b3x34 = 0; _0x97b3x34 < _0x97b3x29; _0x97b3x34++) {
        let _0x97b3x35 = _0x97b3x33['map']((_0x97b3x36) => {
            return _0x97b3x36['concat']([0])
        });
        let _0x97b3x37 = _0x97b3x33['map']((_0x97b3x36) => {
            return _0x97b3x36['concat']([1])
        });
        _0x97b3x33 = _0x97b3x35['concat'](_0x97b3x37)
    };
    return _0x97b3x33
}

function dict(_0x97b3x29, _0x97b3x39 = 0) {
    let _0x97b3x3a = combinations(_0x97b3x29);
    let _0x97b3x2a = {};
    for (let _0x97b3x34 = 0; _0x97b3x34 < _0x97b3x3a['length']; _0x97b3x34++) {
        _0x97b3x2a[_0x97b3x3a[_0x97b3x34]] = 0
    };
    return _0x97b3x2a
}

function betaPDF(_0x97b3x3c, _0x97b3x3d, _0x97b3x3e) {
    return Math['exp'](lnBetaPDF(_0x97b3x3c, _0x97b3x3d, _0x97b3x3e))
}

function lnBetaPDF(_0x97b3x3c, _0x97b3x3d, _0x97b3x3e) {
    return ((_0x97b3x3d - 1) * Math['log'](_0x97b3x3c) + (_0x97b3x3e - 1) * Math['log'](1 - _0x97b3x3c)) - lnBetaFunc(_0x97b3x3d, _0x97b3x3e)
}

function lnBetaFunc(_0x97b3x3d, _0x97b3x3e) {
    foo = 0.0;
    for (i = 0; i < _0x97b3x3d - 2; i++) {
        foo += Math['log'](_0x97b3x3d - 1 - i)
    };
    for (i = 0; i < _0x97b3x3e - 2; i++) {
        foo += Math['log'](_0x97b3x3e - 1 - i)
    };
    for (i = 0; i < _0x97b3x3d + _0x97b3x3e - 2; i++) {
        foo -= Math['log'](_0x97b3x3d + _0x97b3x3e - 1 - i)
    };
    return foo
}

function quantile(_0x97b3x42, _0x97b3x43, _0x97b3x30, expected) {
    let _0x97b3x44 = count(_0x97b3x30, _0x97b3x42);
    let _0x97b3x45 = _0x97b3x44[_0x97b3x43];
    let _0x97b3x46 = _0x97b3x30['length'] - (_0x97b3x42 - 1) - _0x97b3x45;
    return 100 - Math['round'](jStat['beta']['cdf'](expected, _0x97b3x45, _0x97b3x46) * 100)
}

function testPass(_0x97b3x42, _0x97b3x43, _0x97b3x30, expected) {
    let _0x97b3x48 = quantile(_0x97b3x42, _0x97b3x43, _0x97b3x30, expected);
    let _0x97b3x49 = _0x97b3x48 > 4;
    let _0x97b3x4a = _0x97b3x48 < 96;
    return _0x97b3x49 && _0x97b3x4a
}