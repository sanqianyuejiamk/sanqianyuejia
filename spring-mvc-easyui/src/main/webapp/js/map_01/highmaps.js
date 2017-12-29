/*
 Highmaps JS v6.0.4 (2017-12-15)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (S, J) {
    "object" === typeof module && module.exports ? module.exports = S.document ? J(S) : J : S.Highcharts = J(S)
})("undefined" !== typeof window ? window : this, function (S) {
    var J = function () {
        var a = "undefined" === typeof S ? window : S, z = a.document, A = a.navigator && a.navigator.userAgent || "", y = z && z.createElementNS && !!z.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, h = /(edge|msie|trident)/i.test(A) && !a.opera, d = /Firefox/.test(A), v = d && 4 > parseInt(A.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16,
            !0) : {
            product: "Highmaps",
            version: "6.0.4",
            deg2rad: 2 * Math.PI / 360,
            doc: z,
            hasBidiBug: v,
            hasTouch: z && void 0 !== z.documentElement.ontouchstart,
            isMS: h,
            isWebKit: /AppleWebKit/.test(A),
            isFirefox: d,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: y,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            },
            charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var z = a.charts, A = a.doc, y = a.win;
        a.error = function (h, d) {
            h =
                a.isNumber(h) ? "Highcharts error #" + h + ": www.highcharts.com/errors/" + h : h;
            if (d)throw Error(h);
            y.console && console.log(h)
        };
        a.Fx = function (a, d, v) {
            this.options = d;
            this.elem = a;
            this.prop = v
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], d = this.paths[1], v = [], t = this.now, r = a.length, p;
                if (1 === t)v = this.toD; else if (r === d.length && 1 > t)for (; r--;)p = parseFloat(a[r]), v[r] = isNaN(p) ? d[r] : t * parseFloat(d[r] - p) + p; else v = d;
                this.elem.attr("d", v, null, !0)
            }, update: function () {
                var a = this.elem, d = this.prop, v = this.now, t = this.options.step;
                if (this[d + "Setter"])this[d + "Setter"](); else a.attr ? a.element && a.attr(d, v, null, !0) : a.style[d] = v + this.unit;
                t && t.call(a, v, this)
            }, run: function (h, d, v) {
                var t = this, r = t.options, p = function (a) {
                    return p.stopped ? !1 : t.step(a)
                }, m = y.requestAnimationFrame || function (a) {
                        setTimeout(a, 13)
                    }, f = function () {
                    for (var q = 0; q < a.timers.length; q++)a.timers[q]() || a.timers.splice(q--, 1);
                    a.timers.length && m(f)
                };
                h === d ? (delete r.curAnim[this.prop], r.complete && 0 === a.keys(r.curAnim).length && r.complete.call(this.elem)) : (this.startTime = +new Date,
                    this.start = h, this.end = d, this.unit = v, this.now = this.start, this.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === a.timers.push(p) && m(f))
            }, step: function (h) {
                var d = +new Date, v, t = this.options, r = this.elem, p = t.complete, m = t.duration, f = t.curAnim;
                r.attr && !r.element ? h = !1 : h || d >= m + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), v = f[this.prop] = !0, a.objectEach(f, function (a) {
                    !0 !== a && (v = !1)
                }), v && p && p.call(r), h = !1) : (this.pos = t.easing((d - this.startTime) / m), this.now = this.start + (this.end - this.start) * this.pos,
                    this.update(), h = !0);
                return h
            }, initPath: function (h, d, v) {
                function t(a) {
                    var b, g;
                    for (e = a.length; e--;)b = "M" === a[e] || "L" === a[e], g = /[a-zA-Z]/.test(a[e + 3]), b && g && a.splice(e + 1, 0, a[e + 1], a[e + 2], a[e + 1], a[e + 2])
                }

                function r(a, b) {
                    for (; a.length < g;) {
                        a[0] = b[g - a.length];
                        var f = a.slice(0, c);
                        [].splice.apply(a, [0, 0].concat(f));
                        n && (f = a.slice(a.length - c), [].splice.apply(a, [a.length, 0].concat(f)), e--)
                    }
                    a[0] = "M"
                }

                function p(a, e) {
                    for (var f = (g - a.length) / c; 0 < f && f--;)b = a.slice().splice(a.length / D - c, c * D), b[0] = e[g - c - f * c], l && (b[c - 6] =
                        b[c - 2], b[c - 5] = b[c - 1]), [].splice.apply(a, [a.length / D, 0].concat(b)), n && f--
                }

                d = d || "";
                var m, f = h.startX, q = h.endX, l = -1 < d.indexOf("C"), c = l ? 7 : 3, g, b, e;
                d = d.split(" ");
                v = v.slice();
                var n = h.isArea, D = n ? 2 : 1, I;
                l && (t(d), t(v));
                if (f && q) {
                    for (e = 0; e < f.length; e++)if (f[e] === q[0]) {
                        m = e;
                        break
                    } else if (f[0] === q[q.length - f.length + e]) {
                        m = e;
                        I = !0;
                        break
                    }
                    void 0 === m && (d = [])
                }
                d.length && a.isNumber(m) && (g = v.length + m * D * c, I ? (r(d, v), p(v, d)) : (r(v, d), p(d, v)));
                return [d, v]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(this.prop,
                a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.extend = function (a, d) {
            var h;
            a || (a = {});
            for (h in d)a[h] = d[h];
            return a
        };
        a.merge = function () {
            var h, d = arguments, v, t = {}, r = function (h, m) {
                "object" !== typeof h && (h = {});
                a.objectEach(m, function (f, q) {
                    !a.isObject(f, !0) || a.isClass(f) || a.isDOMElement(f) ? h[q] = m[q] : h[q] = r(h[q] || {}, f)
                });
                return h
            };
            !0 === d[0] && (t = d[1], d = Array.prototype.slice.call(d, 2));
            v = d.length;
            for (h = 0; h < v; h++)t = r(t, d[h]);
            return t
        };
        a.pInt = function (a, d) {
            return parseInt(a, d || 10)
        };
        a.isString =
            function (a) {
                return "string" === typeof a
            };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (h, d) {
            return !!h && "object" === typeof h && (!d || !a.isArray(h))
        };
        a.isDOMElement = function (h) {
            return a.isObject(h) && "number" === typeof h.nodeType
        };
        a.isClass = function (h) {
            var d = h && h.constructor;
            return !(!a.isObject(h, !0) || a.isDOMElement(h) || !d || !d.name || "Object" === d.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a) && Infinity >
                a && -Infinity < a
        };
        a.erase = function (a, d) {
            for (var h = a.length; h--;)if (a[h] === d) {
                a.splice(h, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (h, d, v) {
            var t;
            a.isString(d) ? a.defined(v) ? h.setAttribute(d, v) : h && h.getAttribute && (t = h.getAttribute(d)) : a.defined(d) && a.isObject(d) && a.objectEach(d, function (a, d) {
                h.setAttribute(d, a)
            });
            return t
        };
        a.splat = function (h) {
            return a.isArray(h) ? h : [h]
        };
        a.syncTimeout = function (a, d, v) {
            if (d)return setTimeout(a, d, v);
            a.call(0, v)
        };
        a.pick = function () {
            var a = arguments,
                d, v, t = a.length;
            for (d = 0; d < t; d++)if (v = a[d], void 0 !== v && null !== v)return v
        };
        a.css = function (h, d) {
            a.isMS && !a.svg && d && void 0 !== d.opacity && (d.filter = "alpha(opacity\x3d" + 100 * d.opacity + ")");
            a.extend(h.style, d)
        };
        a.createElement = function (h, d, v, t, r) {
            h = A.createElement(h);
            var p = a.css;
            d && a.extend(h, d);
            r && p(h, {padding: 0, border: "none", margin: 0});
            v && p(h, v);
            t && t.appendChild(h);
            return h
        };
        a.extendClass = function (h, d) {
            var v = function () {
            };
            v.prototype = new h;
            a.extend(v.prototype, d);
            return v
        };
        a.pad = function (a, d, v) {
            return Array((d ||
                    2) + 1 - String(a).length).join(v || 0) + a
        };
        a.relativeLength = function (a, d, v) {
            return /%$/.test(a) ? d * parseFloat(a) / 100 + (v || 0) : parseFloat(a)
        };
        a.wrap = function (a, d, v) {
            var h = a[d];
            a[d] = function () {
                var a = Array.prototype.slice.call(arguments), d = arguments, m = this;
                m.proceed = function () {
                    h.apply(m, arguments.length ? arguments : d)
                };
                a.unshift(h);
                a = v.apply(this, a);
                m.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (h) {
            var d = a.Date;
            return 6E4 * (d.hcGetTimezoneOffset && d.hcGetTimezoneOffset(h) || d.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (h,
                                 d, v) {
            if (!a.defined(d) || isNaN(d))return a.defaultOptions.lang.invalidDate || "";
            h = a.pick(h, "%Y-%m-%d %H:%M:%S");
            var t = a.Date, r = new t(d - a.getTZOffset(d)), p = r[t.hcGetHours](), m = r[t.hcGetDay](), f = r[t.hcGetDate](), q = r[t.hcGetMonth](), l = r[t.hcGetFullYear](), c = a.defaultOptions.lang, g = c.weekdays, b = c.shortWeekdays, e = a.pad, t = a.extend({
                a: b ? b[m] : g[m].substr(0, 3),
                A: g[m],
                d: e(f),
                e: e(f, 2, " "),
                w: m,
                b: c.shortMonths[q],
                B: c.months[q],
                m: e(q + 1),
                y: l.toString().substr(2, 2),
                Y: l,
                H: e(p),
                k: p,
                I: e(p % 12 || 12),
                l: p % 12 || 12,
                M: e(r[t.hcGetMinutes]()),
                p: 12 > p ? "AM" : "PM",
                P: 12 > p ? "am" : "pm",
                S: e(r.getSeconds()),
                L: e(Math.round(d % 1E3), 3)
            }, a.dateFormats);
            a.objectEach(t, function (a, b) {
                for (; -1 !== h.indexOf("%" + b);)h = h.replace("%" + b, "function" === typeof a ? a(d) : a)
            });
            return v ? h.substr(0, 1).toUpperCase() + h.substr(1) : h
        };
        a.formatSingle = function (h, d) {
            var v = /\.([0-9])/, t = a.defaultOptions.lang;
            /f$/.test(h) ? (v = (v = h.match(v)) ? v[1] : -1, null !== d && (d = a.numberFormat(d, v, t.decimalPoint, -1 < h.indexOf(",") ? t.thousandsSep : ""))) : d = a.dateFormat(h, d);
            return d
        };
        a.format = function (h, d) {
            for (var v =
                "{", t = !1, r, p, m, f, q = [], l; h;) {
                v = h.indexOf(v);
                if (-1 === v)break;
                r = h.slice(0, v);
                if (t) {
                    r = r.split(":");
                    p = r.shift().split(".");
                    f = p.length;
                    l = d;
                    for (m = 0; m < f; m++)l && (l = l[p[m]]);
                    r.length && (l = a.formatSingle(r.join(":"), l));
                    q.push(l)
                } else q.push(r);
                h = h.slice(v + 1);
                v = (t = !t) ? "}" : "{"
            }
            q.push(h);
            return q.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (h, d, v, t, r) {
            var p, m = h;
            v = a.pick(v, 1);
            p = h / v;
            d || (d = r ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10],
            !1 === t && (1 === v ? d = a.grep(d, function (a) {
                return 0 === a % 1
            }) : .1 >= v && (d = [1 / v])));
            for (t = 0; t < d.length && !(m = d[t], r && m * v >= h || !r && p <= (d[t] + (d[t + 1] || d[t])) / 2); t++);
            return m = a.correctFloat(m * v, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, d) {
            var h = a.length, t, r;
            for (r = 0; r < h; r++)a[r].safeI = r;
            a.sort(function (a, m) {
                t = d(a, m);
                return 0 === t ? a.safeI - m.safeI : t
            });
            for (r = 0; r < h; r++)delete a[r].safeI
        };
        a.arrayMin = function (a) {
            for (var d = a.length, h = a[0]; d--;)a[d] < h && (h = a[d]);
            return h
        };
        a.arrayMax = function (a) {
            for (var d =
                a.length, h = a[0]; d--;)a[d] > h && (h = a[d]);
            return h
        };
        a.destroyObjectProperties = function (h, d) {
            a.objectEach(h, function (a, t) {
                a && a !== d && a.destroy && a.destroy();
                delete h[t]
            })
        };
        a.discardElement = function (h) {
            var d = a.garbageBin;
            d || (d = a.createElement("div"));
            h && d.appendChild(h);
            d.innerHTML = ""
        };
        a.correctFloat = function (a, d) {
            return parseFloat(a.toPrecision(d || 14))
        };
        a.setAnimation = function (h, d) {
            d.renderer.globalAnimation = a.pick(h, d.options.chart.animation, !0)
        };
        a.animObject = function (h) {
            return a.isObject(h) ? a.merge(h) :
            {duration: h ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (h, d, v, t) {
            h = +h || 0;
            d = +d;
            var r = a.defaultOptions.lang, p = (h.toString().split(".")[1] || "").split("e")[0].length, m, f, q = h.toString().split("e");
            -1 === d ? d = Math.min(p, 20) : a.isNumber(d) ? d && q[1] && 0 > q[1] && (m = d + +q[1], 0 <= m ? (q[0] = (+q[0]).toExponential(m).split("e")[0], d = m) : (q[0] = q[0].split(".")[0] || 0, h = 20 > d ? (q[0] * Math.pow(10, q[1])).toFixed(d) : 0, q[1] = 0)) : d = 2;
            f = (Math.abs(q[1] ?
                q[0] : h) + Math.pow(10, -Math.max(d, p) - 1)).toFixed(d);
            p = String(a.pInt(f));
            m = 3 < p.length ? p.length % 3 : 0;
            v = a.pick(v, r.decimalPoint);
            t = a.pick(t, r.thousandsSep);
            h = (0 > h ? "-" : "") + (m ? p.substr(0, m) + t : "");
            h += p.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + t);
            d && (h += v + f.slice(-d));
            q[1] && 0 !== +h && (h += "e" + q[1]);
            return h
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (h, d, v) {
            if ("width" === d)return Math.min(h.offsetWidth, h.scrollWidth) - a.getStyle(h, "padding-left") - a.getStyle(h, "padding-right");
            if ("height" === d)return Math.min(h.offsetHeight, h.scrollHeight) - a.getStyle(h, "padding-top") - a.getStyle(h, "padding-bottom");
            y.getComputedStyle || a.error(27, !0);
            if (h = y.getComputedStyle(h, void 0))h = h.getPropertyValue(d), a.pick(v, "opacity" !== d) && (h = a.pInt(h));
            return h
        };
        a.inArray = function (h, d) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(d, h)
        };
        a.grep = function (h, d) {
            return (a.filterPolyfill || Array.prototype.filter).call(h, d)
        };
        a.find = Array.prototype.find ? function (a, d) {
            return a.find(d)
        } : function (a,
                      d) {
            var h, t = a.length;
            for (h = 0; h < t; h++)if (d(a[h], h))return a[h]
        };
        a.map = function (a, d) {
            for (var h = [], t = 0, r = a.length; t < r; t++)h[t] = d.call(a[t], a[t], t, a);
            return h
        };
        a.keys = function (h) {
            return (a.keysPolyfill || Object.keys).call(void 0, h)
        };
        a.reduce = function (h, d, v) {
            return (a.reducePolyfill || Array.prototype.reduce).call(h, d, v)
        };
        a.offset = function (a) {
            var d = A.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : {top: 0, left: 0};
            return {
                top: a.top + (y.pageYOffset || d.scrollTop) - (d.clientTop || 0), left: a.left + (y.pageXOffset ||
                d.scrollLeft) - (d.clientLeft || 0)
            }
        };
        a.stop = function (h, d) {
            for (var v = a.timers.length; v--;)a.timers[v].elem !== h || d && d !== a.timers[v].prop || (a.timers[v].stopped = !0)
        };
        a.each = function (h, d, v) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(h, d, v)
        };
        a.objectEach = function (a, d, v) {
            for (var h in a)a.hasOwnProperty(h) && d.call(v, a[h], h, a)
        };
        a.addEvent = function (h, d, v) {
            var t, r, p = h.addEventListener || a.addEventListenerPolyfill;
            h.hcEvents && !Object.prototype.hasOwnProperty.call(h, "hcEvents") && (r = {}, a.objectEach(h.hcEvents,
                function (a, f) {
                    r[f] = a.slice(0)
                }), h.hcEvents = r);
            t = h.hcEvents = h.hcEvents || {};
            p && p.call(h, d, v, !1);
            t[d] || (t[d] = []);
            t[d].push(v);
            return function () {
                a.removeEvent(h, d, v)
            }
        };
        a.removeEvent = function (h, d, v) {
            function t(f, m) {
                var c = h.removeEventListener || a.removeEventListenerPolyfill;
                c && c.call(h, f, m, !1)
            }

            function r() {
                var f, l;
                h.nodeName && (d ? (f = {}, f[d] = !0) : f = m, a.objectEach(f, function (a, g) {
                    if (m[g])for (l = m[g].length; l--;)t(g, m[g][l])
                }))
            }

            var p, m = h.hcEvents, f;
            m && (d ? (p = m[d] || [], v ? (f = a.inArray(v, p), -1 < f && (p.splice(f, 1), m[d] =
                p), t(d, v)) : (r(), m[d] = [])) : (r(), h.hcEvents = {}))
        };
        a.fireEvent = function (h, d, v, t) {
            var r;
            r = h.hcEvents;
            var p, m;
            v = v || {};
            if (A.createEvent && (h.dispatchEvent || h.fireEvent))r = A.createEvent("Events"), r.initEvent(d, !0, !0), a.extend(r, v), h.dispatchEvent ? h.dispatchEvent(r) : h.fireEvent(d, r); else if (r)for (r = r[d] || [], p = r.length, v.target || a.extend(v, {
                preventDefault: function () {
                    v.defaultPrevented = !0
                }, target: h, type: d
            }), d = 0; d < p; d++)(m = r[d]) && !1 === m.call(h, v) && v.preventDefault();
            t && !v.defaultPrevented && t(v)
        };
        a.animate = function (h,
                              d, v) {
            var t, r = "", p, m, f;
            a.isObject(v) || (f = arguments, v = {duration: f[2], easing: f[3], complete: f[4]});
            a.isNumber(v.duration) || (v.duration = 400);
            v.easing = "function" === typeof v.easing ? v.easing : Math[v.easing] || Math.easeInOutSine;
            v.curAnim = a.merge(d);
            a.objectEach(d, function (f, l) {
                a.stop(h, l);
                m = new a.Fx(h, v, l);
                p = null;
                "d" === l ? (m.paths = m.initPath(h, h.d, d.d), m.toD = d.d, t = 0, p = 1) : h.attr ? t = h.attr(l) : (t = parseFloat(a.getStyle(h, l)) || 0, "opacity" !== l && (r = "px"));
                p || (p = f);
                p && p.match && p.match("px") && (p = p.replace(/px/g, ""));
                m.run(t, p, r)
            })
        };
        a.seriesType = function (h, d, v, t, r) {
            var p = a.getOptions(), m = a.seriesTypes;
            p.plotOptions[h] = a.merge(p.plotOptions[d], v);
            m[h] = a.extendClass(m[d] || function () {
                }, t);
            m[h].prototype.type = h;
            r && (m[h].prototype.pointClass = a.extendClass(a.Point, r));
            return m[h]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), d = 0;
            return function () {
                return "highcharts-" + a + "-" + d++
            }
        }();
        y.jQuery && (y.jQuery.fn.highcharts = function () {
            var h = [].slice.call(arguments);
            if (this[0])return h[0] ? (new (a[a.isString(h[0]) ?
                h.shift() : "Chart"])(this[0], h[0], h[1]), this) : z[a.attr(this[0], "data-highcharts-chart")]
        })
    })(J);
    (function (a) {
        var z = a.each, A = a.isNumber, y = a.map, h = a.merge, d = a.pInt;
        a.Color = function (d) {
            if (!(this instanceof a.Color))return new a.Color(d);
            this.init(d)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [d(a[1]), d(a[2]), d(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [d(a[1]), d(a[2]), d(a[3]), 1]
                }
            }], names: {none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000"}, init: function (d) {
                var h, r, p, m;
                if ((this.input = d = this.names[d && d.toLowerCase ? d.toLowerCase() : ""] || d) && d.stops)this.stops = y(d.stops, function (f) {
                    return new a.Color(f[1])
                }); else if (d && d.charAt && "#" === d.charAt() && (h = d.length, d = parseInt(d.substr(1), 16), 7 === h ? r = [(d & 16711680) >> 16, (d & 65280) >> 8, d & 255, 1] : 4 === h && (r = [(d & 3840) >> 4 | (d & 3840) >> 8, (d & 240) >> 4 | d & 240, (d & 15) << 4 | d & 15, 1])), !r)for (p = this.parsers.length; p-- && !r;)m = this.parsers[p], (h = m.regex.exec(d)) && (r = m.parse(h));
                this.rgba = r || []
            }, get: function (a) {
                var d = this.input, r = this.rgba, p;
                this.stops ? (p = h(d), p.stops = [].concat(p.stops), z(this.stops, function (m, f) {
                    p.stops[f] = [p.stops[f][0], m.get(a)]
                })) : p = r && A(r[0]) ? "rgb" === a || !a && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === a ? r[3] : "rgba(" + r.join(",") + ")" : d;
                return p
            }, brighten: function (a) {
                var h, r = this.rgba;
                if (this.stops)z(this.stops, function (d) {
                    d.brighten(a)
                }); else if (A(a) && 0 !== a)for (h = 0; 3 > h; h++)r[h] += d(255 * a), 0 >
                r[h] && (r[h] = 0), 255 < r[h] && (r[h] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }, tweenTo: function (a, d) {
                var h = this.rgba, p = a.rgba;
                p.length && h && h.length ? (a = 1 !== p[3] || 1 !== h[3], d = (a ? "rgba(" : "rgb(") + Math.round(p[0] + (h[0] - p[0]) * (1 - d)) + "," + Math.round(p[1] + (h[1] - p[1]) * (1 - d)) + "," + Math.round(p[2] + (h[2] - p[2]) * (1 - d)) + (a ? "," + (p[3] + (h[3] - p[3]) * (1 - d)) : "") + ")") : d = a.input || "none";
                return d
            }
        };
        a.color = function (d) {
            return new a.Color(d)
        }
    })(J);
    (function (a) {
        function z() {
            var d = a.defaultOptions.global, h =
                t.moment;
            if (d.timezone) {
                if (h)return function (a) {
                    return -h.tz(a, d.timezone).utcOffset()
                };
                a.error(25)
            }
            return d.useUTC && d.getTimezoneOffset
        }

        function A() {
            var d = a.defaultOptions.global, p, m = d.useUTC, f = m ? "getUTC" : "get", q = m ? "setUTC" : "set", l = "Minutes Hours Day Date Month FullYear".split(" "), c = l.concat(["Milliseconds", "Seconds"]);
            a.Date = p = d.Date || t.Date;
            p.hcTimezoneOffset = m && d.timezoneOffset;
            p.hcGetTimezoneOffset = z();
            p.hcHasTimeZone = !(!p.hcTimezoneOffset && !p.hcGetTimezoneOffset);
            p.hcMakeTime = function (a, b, e,
                                     c, f, d) {
                var g;
                m ? (g = p.UTC.apply(0, arguments), g += h(g)) : g = (new p(a, b, v(e, 1), v(c, 0), v(f, 0), v(d, 0))).getTime();
                return g
            };
            for (d = 0; d < l.length; d++)p["hcGet" + l[d]] = f + l[d];
            for (d = 0; d < c.length; d++)p["hcSet" + c[d]] = q + c[d]
        }

        var y = a.color, h = a.getTZOffset, d = a.merge, v = a.pick, t = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {useUTC: !0},
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {theme: {zIndex: 6}, position: {align: "right", x: -10, y: 10}},
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
                itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis"},
                itemHoverStyle: {color: "#000000"},
                itemHiddenStyle: {color: "#cccccc"},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: y("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (h) {
            a.defaultOptions = d(!0, a.defaultOptions, h);
            A();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        A()
    })(J);
    (function (a) {
        var z,
            A, y = a.addEvent, h = a.animate, d = a.attr, v = a.charts, t = a.color, r = a.css, p = a.createElement, m = a.defined, f = a.deg2rad, q = a.destroyObjectProperties, l = a.doc, c = a.each, g = a.extend, b = a.erase, e = a.grep, n = a.hasTouch, D = a.inArray, I = a.isArray, E = a.isFirefox, M = a.isMS, u = a.isObject, C = a.isString, N = a.isWebKit, x = a.merge, F = a.noop, G = a.objectEach, H = a.pick, k = a.pInt, w = a.removeEvent, P = a.stop, K = a.svg, O = a.SVG_NS, L = a.symbolSizes, R = a.win;
        z = a.SVGElement = function () {
            return this
        };
        g(z.prototype, {
            opacity: 1,
            SVG_NS: O,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function (a, b) {
                this.element = "span" === b ? p(b) : l.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (b, k, w) {
                k = a.animObject(H(k, this.renderer.globalAnimation, !0));
                0 !== k.duration ? (w && (k.complete = w), h(this, b, k)) : (this.attr(b, null, w), k.step && k.step.call(this));
                return this
            },
            colorGradient: function (b, k, w) {
                var B = this.renderer, e, g, n, Q, f, d, K, l, L, F, q = [], u;
                b.radialGradient ? g = "radialGradient" : b.linearGradient && (g = "linearGradient");
                g && (n = b[g], f = B.gradients, K = b.stops, F = w.radialReference, I(n) && (b[g] =
                    n = {
                        x1: n[0],
                        y1: n[1],
                        x2: n[2],
                        y2: n[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === g && F && !m(n.gradientUnits) && (Q = n, n = x(n, B.getRadialAttr(F, Q), {gradientUnits: "userSpaceOnUse"})), G(n, function (a, b) {
                    "id" !== b && q.push(b, a)
                }), G(K, function (a) {
                    q.push(a)
                }), q = q.join(","), f[q] ? F = f[q].attr("id") : (n.id = F = a.uniqueKey(), f[q] = d = B.createElement(g).attr(n).add(B.defs), d.radAttr = Q, d.stops = [], c(K, function (b) {
                    0 === b[1].indexOf("rgba") ? (e = a.color(b[1]), l = e.get("rgb"), L = e.get("a")) : (l = b[1], L = 1);
                    b = B.createElement("stop").attr({
                        offset: b[0],
                        "stop-color": l, "stop-opacity": L
                    }).add(d);
                    d.stops.push(b)
                })), u = "url(" + B.url + "#" + F + ")", w.setAttribute(k, u), w.gradient = q, b.toString = function () {
                    return u
                })
            },
            applyTextOutline: function (B) {
                var k = this.element, w, e, g, n, f;
                -1 !== B.indexOf("contrast") && (B = B.replace(/contrast/g, this.renderer.getContrast(k.style.fill)));
                B = B.split(" ");
                e = B[B.length - 1];
                if ((g = B[0]) && "none" !== g && a.svg) {
                    this.fakeTS = !0;
                    B = [].slice.call(k.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    g = g.replace(/(^[\d\.]+)(.*?)$/g, function (a,
                                                                 b, B) {
                        return 2 * b + B
                    });
                    for (f = B.length; f--;)w = B[f], "highcharts-text-outline" === w.getAttribute("class") && b(B, k.removeChild(w));
                    n = k.firstChild;
                    c(B, function (a, b) {
                        0 === b && (a.setAttribute("x", k.getAttribute("x")), b = k.getAttribute("y"), a.setAttribute("y", b || 0), null === b && k.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        d(a, {
                            "class": "highcharts-text-outline",
                            fill: e,
                            stroke: e,
                            "stroke-width": g,
                            "stroke-linejoin": "round"
                        });
                        k.insertBefore(a, n)
                    })
                }
            },
            attr: function (a, b, k, w) {
                var B, e = this.element, g, c = this, n, f;
                "string" === typeof a &&
                void 0 !== b && (B = a, a = {}, a[B] = b);
                "string" === typeof a ? c = (this[a + "Getter"] || this._defaultGetter).call(this, a, e) : (G(a, function (b, B) {
                    n = !1;
                    w || P(this, B);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(B) && (g || (this.symbolAttr(a), g = !0), n = !0);
                    !this.rotation || "x" !== B && "y" !== B || (this.doTransform = !0);
                    n || (f = this[B + "Setter"] || this._defaultSetter, f.call(this, b, B, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(B) && this.updateShadows(B, b, f))
                }, this), this.afterSetters());
                k && k();
                return c
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (a, b, k) {
                for (var B = this.shadows, w = B.length; w--;)k.call(B[w], "height" === a ? Math.max(b - (B[w].cutHeight || 0), 0) : "d" === a ? this.d : b, a, B[w])
            },
            addClass: function (a, b) {
                var B = this.attr("class") || "";
                -1 === B.indexOf(a) && (b || (a = (B + (B ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== D(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function (a) {
                return this.attr("class",
                    (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var b = this;
                c("x y r start end width height innerR anchorX anchorY".split(" "), function (B) {
                    b[B] = H(a[B], b[B])
                });
                b.attr({d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)})
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var B;
                b = b || a.strokeWidth || 0;
                B = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + B;
                a.y = Math.floor(a.y || this.y || 0) + B;
                a.width = Math.floor((a.width ||
                    this.width || 0) - 2 * B);
                a.height = Math.floor((a.height || this.height || 0) - 2 * B);
                m(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function (a) {
                var b = this.styles, B = {}, w = this.element, e, c = "", n, f = !b, x = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && G(a, function (a, k) {
                    a !== b[k] && (B[k] = a, f = !0)
                });
                f && (b && (a = g(b, B)), e = this.textWidth = a && a.width && "auto" !== a.width && "text" === w.nodeName.toLowerCase() && k(a.width), this.styles = a, e && !K && this.renderer.forExport && delete a.width, M && !K ? r(this.element, a) : (n =
                    function (a, b) {
                        return "-" + b.toLowerCase()
                    }, G(a, function (a, b) {
                    -1 === D(b, x) && (c += b.replace(/([A-Z])/g, n) + ":" + a + ";")
                }), c && d(w, "style", c)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, b) {
                var B = this, k = B.element;
                n && "click" === a ? (k.ontouchstart = function (a) {
                    B.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(k, a)
                }, k.onclick = function (a) {
                    (-1 ===
                    R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (B.touchEventFired || 0)) && b.call(k, a)
                }) : k["on" + a] = b;
                return this
            },
            setRadialReference: function (a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({translateX: a, translateY: b})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX ||
                    0, b = this.translateY || 0, k = this.scaleX, w = this.scaleY, e = this.inverted, g = this.rotation, c = this.matrix, n = this.element;
                e && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                m(c) && a.push("matrix(" + c.join(",") + ")");
                e ? a.push("rotate(90) scale(-1,1)") : g && a.push("rotate(" + g + " " + H(this.rotationOriginX, n.getAttribute("x"), 0) + " " + H(this.rotationOriginY, n.getAttribute("y") || 0) + ")");
                (m(k) || m(w)) && a.push("scale(" + H(k, 1) + " " + H(w, 1) + ")");
                a.length && n.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a =
                    this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, k, w) {
                var B, e, g, c, n = {};
                e = this.renderer;
                g = e.alignedObjects;
                var f, x;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = k, !w || C(w))this.alignTo = B = w || "renderer", b(g, this), g.push(this), w = null
                } else a = this.alignOptions, k = this.alignByTranslate, B = this.alignTo;
                w = H(w, e[B], e);
                B = a.align;
                e = a.verticalAlign;
                g = (w.x || 0) + (a.x || 0);
                c = (w.y || 0) + (a.y || 0);
                "right" === B ? f = 1 : "center" === B && (f = 2);
                f && (g += (w.width - (a.width || 0)) / f);
                n[k ? "translateX" : "x"] = Math.round(g);
                "bottom" === e ? x = 1 : "middle" === e && (x = 2);
                x && (c += (w.height - (a.height || 0)) / x);
                n[k ? "translateY" : "y"] = Math.round(c);
                this[this.placed ? "animate" : "attr"](n);
                this.placed = !0;
                this.alignAttr = n;
                return this
            },
            getBBox: function (a, b) {
                var k, B = this.renderer, w, e = this.element, n = this.styles, x, d = this.textStr, Q, K = B.cache, l = B.cacheKeys, L;
                b = H(b, this.rotation);
                w = b * f;
                x = n && n.fontSize;
                m(d) && (L = d.toString(), -1 === L.indexOf("\x3c") && (L = L.replace(/[0-9]/g, "0")), L += ["", b || 0, x, n && n.width, n && n.textOverflow].join());
                L && !a && (k = K[L]);
                if (!k) {
                    if (e.namespaceURI ===
                        this.SVG_NS || B.forExport) {
                        try {
                            (Q = this.fakeTS && function (a) {
                                    c(e.querySelectorAll(".highcharts-text-outline"), function (b) {
                                        b.style.display = a
                                    })
                                }) && Q("none"), k = e.getBBox ? g({}, e.getBBox()) : {
                                width: e.offsetWidth,
                                height: e.offsetHeight
                            }, Q && Q("")
                        } catch (W) {
                        }
                        if (!k || 0 > k.width)k = {width: 0, height: 0}
                    } else k = this.htmlGetBBox();
                    B.isSVG && (a = k.width, B = k.height, n && "11px" === n.fontSize && 17 === Math.round(B) && (k.height = B = 14), b && (k.width = Math.abs(B * Math.sin(w)) + Math.abs(a * Math.cos(w)), k.height = Math.abs(B * Math.cos(w)) + Math.abs(a *
                            Math.sin(w))));
                    if (L && 0 < k.height) {
                        for (; 250 < l.length;)delete K[l.shift()];
                        K[L] || l.push(L);
                        K[L] = k
                    }
                }
                return k
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var b = this;
                b.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        b.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var b = this.renderer, k = this.element, B;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex)B = this.zIndexSetter();
                B || (a ? a.element : b.box).appendChild(k);
                if (this.onAdd)this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function () {
                var a = this, k = a.element || {}, w = a.renderer.isSVG && "SPAN" === k.nodeName && a.parentGroup, e = k.ownerSVGElement;
                k.onclick = k.onmouseout = k.onmouseover = k.onmousemove = k.point = null;
                P(a);
                a.clipPath && e && (c(e.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) {
                    b.getAttribute("clip-path").match(RegExp('[("]#' +
                        a.clipPath.element.id + '[)"]')) && b.removeAttribute("clip-path")
                }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (e = 0; e < a.stops.length; e++)a.stops[e] = a.stops[e].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(k);
                for (a.destroyShadows(); w && w.div && 0 === w.div.childNodes.length;)k = w.parentGroup, a.safeRemoveChild(w.div), delete w.div, w = k;
                a.alignTo && b(a.renderer.alignedObjects, a);
                G(a, function (b, k) {
                    delete a[k]
                });
                return null
            },
            shadow: function (a, b, k) {
                var w = [], e, B, g = this.element, c, n, f, x;
                if (!a)this.destroyShadows(); else if (!this.shadows) {
                    n =
                        H(a.width, 3);
                    f = (a.opacity || .15) / n;
                    x = this.parentInverted ? "(-1,-1)" : "(" + H(a.offsetX, 1) + ", " + H(a.offsetY, 1) + ")";
                    for (e = 1; e <= n; e++)B = g.cloneNode(0), c = 2 * n + 1 - 2 * e, d(B, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": f * e,
                        "stroke-width": c,
                        transform: "translate" + x,
                        fill: "none"
                    }), k && (d(B, "height", Math.max(d(B, "height") - c, 0)), B.cutHeight = c), b ? b.element.appendChild(B) : g.parentNode && g.parentNode.insertBefore(B, g), w.push(B);
                    this.shadows = w
                }
                return this
            },
            destroyShadows: function () {
                c(this.shadows || [], function (a) {
                        this.safeRemoveChild(a)
                    },
                    this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = H(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, k) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (k.setAttribute(b, a), this[b] = a)
            },
            dashstyleSetter: function (a) {
                var b, w = this["stroke-width"];
                "inherit" ===
                w && (w = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;)a[b] = k(a[b]) * w;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start", center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function (a, b, k) {
                this[b] = a;
                k.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = l.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(l.createTextNode(String(H(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, b, k) {
                "string" === typeof a ?
                    k.setAttribute(b, a) : a && this.colorGradient(a, b, k)
            },
            visibilitySetter: function (a, b, k) {
                "inherit" === a ? k.removeAttribute(b) : this[b] !== a && k.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function (a, b) {
                var w = this.renderer, e = this.parentGroup, g = (e || w).element || w.box, c, n = this.element, B, f, w = g === w.box;
                c = this.added;
                var x;
                m(a) && (n.zIndex = a, a = +a, this[b] === a && (c = !1), this[b] = a);
                if (c) {
                    (a = this.zIndex) && e && (e.handleZ = !0);
                    b = g.childNodes;
                    for (x = b.length - 1; 0 <= x && !B; x--)if (e = b[x], c = e.zIndex, f = !m(c), e !== n)if (0 > a && f && !w && !x)g.insertBefore(n,
                        b[x]), B = !0; else if (k(c) <= a || f && (!m(a) || 0 <= a))g.insertBefore(n, b[x + 1] || null), B = !0;
                    B || (g.insertBefore(n, b[w ? 3 : 0] || null), B = !0)
                }
                return B
            },
            _defaultSetter: function (a, b, k) {
                k.setAttribute(b, a)
            }
        });
        z.prototype.yGetter = z.prototype.xGetter;
        z.prototype.translateXSetter = z.prototype.translateYSetter = z.prototype.rotationSetter = z.prototype.verticalAlignSetter = z.prototype.rotationOriginXSetter = z.prototype.rotationOriginYSetter = z.prototype.scaleXSetter = z.prototype.scaleYSetter = z.prototype.matrixSetter = function (a, b) {
            this[b] =
                a;
            this.doTransform = !0
        };
        z.prototype["stroke-widthSetter"] = z.prototype.strokeSetter = function (a, b, k) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (z.prototype.fillSetter.call(this, this.stroke, "stroke", k), k.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (k.removeAttribute("stroke"), this.hasStroke = !1)
        };
        A = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        g(A.prototype, {
            Element: z, SVG_NS: O, init: function (a, b, k, w, e, g) {
                var c;
                w = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(w));
                c = w.element;
                a.appendChild(c);
                d(a, "dir", "ltr");
                -1 === a.innerHTML.indexOf("xmlns") && d(c, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = c;
                this.boxWrapper = w;
                this.alignedObjects = [];
                this.url = (E || N) && l.getElementsByTagName("base").length ? R.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highmaps 6.0.4"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = g;
                this.forExport = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, k, !1);
                var n;
                E && a.getBoundingClientRect && (b = function () {
                    r(a, {left: 0, top: 0});
                    n = a.getBoundingClientRect();
                    r(a, {left: Math.ceil(n.left) - n.left + "px", top: Math.ceil(n.top) - n.top + "px"})
                }, b(), this.unSubPixelFix = y(R, "resize", b))
            }, getStyle: function (a) {
                return this.style = g({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            }, setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }, destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                q(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }, createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            }, draw: F, getRadialAttr: function (a, b) {
                return {cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2]}
            }, getSpanWidth: function (a, b) {
                var k =
                    a.getBBox(!0).width;
                !K && this.forExport && (k = this.measureSpanWidth(b.firstChild.data, a.styles));
                return k
            }, applyEllipsis: function (a, b, k, w) {
                var e = a.rotation, g = k, c, n = 0, f = k.length, x = function (a) {
                    b.removeChild(b.firstChild);
                    a && b.appendChild(l.createTextNode(a))
                }, B;
                a.rotation = 0;
                g = this.getSpanWidth(a, b);
                if (B = g > w) {
                    for (; n <= f;)c = Math.ceil((n + f) / 2), g = k.substring(0, c) + "\u2026", x(g), g = this.getSpanWidth(a, b), n === f ? n = f + 1 : g > w ? f = c - 1 : n = c;
                    0 === f && x("")
                }
                a.rotation = e;
                return B
            }, escapes: {
                "\x26": "\x26amp;", "\x3c": "\x26lt;",
                "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;"
            }, buildText: function (a) {
                var b = a.element, w = this, g = w.forExport, n = H(a.textStr, "").toString(), f = -1 !== n.indexOf("\x3c"), x = b.childNodes, B, m, L, q, F = d(b, "x"), u = a.styles, h = a.textWidth, E = u && u.lineHeight, C = u && u.textOutline, D = u && "ellipsis" === u.textOverflow, p = u && "nowrap" === u.whiteSpace, P = u && u.fontSize, I, R, v = x.length, u = h && !a.added && this.box, M = function (a) {
                    var e;
                    e = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : P || w.style.fontSize || 12;
                    return E ? k(E) : w.fontMetrics(e,
                        a.getAttribute("style") ? a : b).h
                }, t = function (a) {
                    G(w.escapes, function (b, k) {
                        a = a.replace(new RegExp(b, "g"), k)
                    });
                    return a
                };
                I = [n, D, p, E, C, P, h].join();
                if (I !== a.textCache) {
                    for (a.textCache = I; v--;)b.removeChild(x[v]);
                    f || C || D || h || -1 !== n.indexOf(" ") ? (B = /<.*class="([^"]+)".*>/, m = /<.*style="([^"]+)".*>/, L = /<.*href="([^"]+)".*>/, u && u.appendChild(b), n = f ? n.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
                        "\x3c/span\x3e").split(/<br.*?>/g) : [n], n = e(n, function (a) {
                        return "" !== a
                    }), c(n, function (k, e) {
                        var n, f = 0;
                        k = k.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        n = k.split("|||");
                        c(n, function (k) {
                            if ("" !== k || 1 === n.length) {
                                var c = {}, x = l.createElementNS(w.SVG_NS, "tspan"), u, G;
                                B.test(k) && (u = k.match(B)[1], d(x, "class", u));
                                m.test(k) && (G = k.match(m)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), d(x, "style", G));

                                k = t(k.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== k) {
                                    x.appendChild(l.createTextNode(k));
                                    f ? c.dx = 0 : e && null !== F && (c.x = F);
                                    d(x, c);
                                    b.appendChild(x);
                                    !f && R && (!K && g && r(x, {display: "block"}), d(x, "dy", M(x)));
                                    if (h) {
                                        c = k.replace(/([^\^])-/g, "$1- ").split(" ");
                                        u = 1 < n.length || e || 1 < c.length && !p;
                                        var E = [], C, P = M(x), Q = a.rotation;
                                        for (D && (q = w.applyEllipsis(a, x, k, h)); !D && u && (c.length || E.length);)a.rotation = 0, C = w.getSpanWidth(a, x), k = C > h, void 0 === q && (q = k),
                                            k && 1 !== c.length ? (x.removeChild(x.firstChild), E.unshift(c.pop())) : (c = E, E = [], c.length && !p && (x = l.createElementNS(O, "tspan"), d(x, {
                                                dy: P,
                                                x: F
                                            }), G && d(x, "style", G), b.appendChild(x)), C > h && (h = C)), c.length && x.appendChild(l.createTextNode(c.join(" ").replace(/- /g, "-")));
                                        a.rotation = Q
                                    }
                                    f++
                                }
                            }
                        });
                        R = R || b.childNodes.length
                    }), q && a.attr("title", a.textStr), u && u.removeChild(b), C && a.applyTextOutline && a.applyTextOutline(C)) : b.appendChild(l.createTextNode(t(n)))
                }
            }, getContrast: function (a) {
                a = t(a).rgba;
                return 510 < a[0] + a[1] + a[2] ?
                    "#000000" : "#FFFFFF"
            }, button: function (a, b, k, w, e, c, n, f, d) {
                var B = this.label(a, b, k, d, null, null, null, null, "button"), K = 0;
                B.attr(x({padding: 8, r: 2}, e));
                var m, L, l, q;
                e = x({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
                }, e);
                m = e.style;
                delete e.style;
                c = x(e, {fill: "#e6e6e6"}, c);
                L = c.style;
                delete c.style;
                n = x(e, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, n);
                l = n.style;
                delete n.style;
                f = x(e, {style: {color: "#cccccc"}}, f);
                q = f.style;
                delete f.style;
                y(B.element, M ? "mouseover" : "mouseenter", function () {
                    3 !== K && B.setState(1)
                });
                y(B.element, M ? "mouseout" : "mouseleave", function () {
                    3 !== K && B.setState(K)
                });
                B.setState = function (a) {
                    1 !== a && (B.state = K = a);
                    B.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    B.attr([e, c, n, f][a || 0]).css([m, L, l, q][a || 0])
                };
                B.attr(e).css(g({cursor: "default"}, m));
                return B.on("click", function (a) {
                    3 !== K && w.call(B, a)
                })
            }, crispLine: function (a, b) {
                a[1] ===
                a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            }, path: function (a) {
                var b = {fill: "none"};
                I(a) ? b.d = a : u(a) && g(b, a);
                return this.createElement("path").attr(b)
            }, circle: function (a, b, k) {
                a = u(a) ? a : {x: a, y: b, r: k};
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a, b, k) {
                    k.setAttribute("c" + b, a)
                };
                return b.attr(a)
            }, arc: function (a, b, k, w, e, g) {
                u(a) ? (w = a, b = w.y, k = w.r, a = w.x) : w = {innerR: w, start: e, end: g};
                a = this.symbol("arc", a, b, k, k, w);
                a.r = k;
                return a
            }, rect: function (a,
                               b, k, w, e, g) {
                e = u(a) ? a.r : e;
                var c = this.createElement("rect");
                a = u(a) ? a : void 0 === a ? {} : {x: a, y: b, width: Math.max(k, 0), height: Math.max(w, 0)};
                void 0 !== g && (a.strokeWidth = g, a = c.crisp(a));
                a.fill = "none";
                e && (a.r = e);
                c.rSetter = function (a, b, k) {
                    d(k, {rx: a, ry: a})
                };
                return c.attr(a)
            }, setSize: function (a, b, k) {
                var w = this.alignedObjects, e = w.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({width: a, height: b}, {
                    step: function () {
                        this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                    }, duration: H(k, !0) ?
                        void 0 : 0
                }); e--;)w[e].align()
            }, g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({"class": "highcharts-" + a}) : b
            }, image: function (a, b, k, w, e) {
                var c = {preserveAspectRatio: "none"};
                1 < arguments.length && g(c, {x: b, y: k, width: w, height: e});
                c = this.createElement("image").attr(c);
                c.element.setAttributeNS ? c.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : c.element.setAttribute("hc-svg-href", a);
                return c
            }, symbol: function (a, b, k, w, e, n) {
                var x = this, f, d = /^url\((.*?)\)$/, K = d.test(a), B = !K && (this.symbols[a] ?
                        a : "circle"), q = B && this.symbols[B], F = m(b) && q && q.call(this.symbols, Math.round(b), Math.round(k), w, e, n), u, h;
                q ? (f = this.path(F), f.attr("fill", "none"), g(f, {
                    symbolName: B,
                    x: b,
                    y: k,
                    width: w,
                    height: e
                }), n && g(f, n)) : K && (u = a.match(d)[1], f = this.image(u), f.imgwidth = H(L[u] && L[u].width, n && n.width), f.imgheight = H(L[u] && L[u].height, n && n.height), h = function () {
                    f.attr({width: f.width, height: f.height})
                }, c(["width", "height"], function (a) {
                    f[a + "Setter"] = function (a, b) {
                        var k = {}, w = this["img" + b], e = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        m(w) && (this.element && this.element.setAttribute(b, w), this.alignByTranslate || (k[e] = ((this[b] || 0) - w) / 2, this.attr(k)))
                    }
                }), m(b) && f.attr({
                    x: b,
                    y: k
                }), f.isImg = !0, m(f.imgwidth) && m(f.imgheight) ? h() : (f.attr({width: 0, height: 0}), p("img", {
                    onload: function () {
                        var a = v[x.chartIndex];
                        0 === this.width && (r(this, {position: "absolute", top: "-999em"}), l.body.appendChild(this));
                        L[u] = {width: this.width, height: this.height};
                        f.imgwidth = this.width;
                        f.imgheight = this.height;
                        f.element && h();
                        this.parentNode && this.parentNode.removeChild(this);
                        x.imgCount--;
                        if (!x.imgCount && a && a.onload)a.onload()
                    }, src: u
                }), this.imgCount++));
                return f
            }, symbols: {
                circle: function (a, b, k, w) {
                    return this.arc(a + k / 2, b + w / 2, k / 2, w / 2, {start: 0, end: 2 * Math.PI, open: !1})
                }, square: function (a, b, k, w) {
                    return ["M", a, b, "L", a + k, b, a + k, b + w, a, b + w, "Z"]
                }, triangle: function (a, b, k, w) {
                    return ["M", a + k / 2, b, "L", a + k, b + w, a, b + w, "Z"]
                }, "triangle-down": function (a, b, k, w) {
                    return ["M", a, b, "L", a + k, b, a + k / 2, b + w, "Z"]
                }, diamond: function (a, b, k, w) {
                    return ["M", a + k / 2, b, "L", a + k, b + w / 2, a + k / 2, b + w, a, b + w / 2, "Z"]
                }, arc: function (a,
                                  b, k, w, e) {
                    var g = e.start, c = e.r || k, n = e.r || w || k, f = e.end - .001;
                    k = e.innerR;
                    w = H(e.open, .001 > Math.abs(e.end - e.start - 2 * Math.PI));
                    var x = Math.cos(g), d = Math.sin(g), K = Math.cos(f), f = Math.sin(f);
                    e = .001 > e.end - g - Math.PI ? 0 : 1;
                    c = ["M", a + c * x, b + n * d, "A", c, n, 0, e, 1, a + c * K, b + n * f];
                    m(k) && c.push(w ? "M" : "L", a + k * K, b + k * f, "A", k, k, 0, e, 0, a + k * x, b + k * d);
                    c.push(w ? "" : "Z");
                    return c
                }, callout: function (a, b, k, w, e) {
                    var g = Math.min(e && e.r || 0, k, w), c = g + 6, n = e && e.anchorX;
                    e = e && e.anchorY;
                    var f;
                    f = ["M", a + g, b, "L", a + k - g, b, "C", a + k, b, a + k, b, a + k, b + g, "L", a + k, b + w -
                    g, "C", a + k, b + w, a + k, b + w, a + k - g, b + w, "L", a + g, b + w, "C", a, b + w, a, b + w, a, b + w - g, "L", a, b + g, "C", a, b, a, b, a + g, b];
                    n && n > k ? e > b + c && e < b + w - c ? f.splice(13, 3, "L", a + k, e - 6, a + k + 6, e, a + k, e + 6, a + k, b + w - g) : f.splice(13, 3, "L", a + k, w / 2, n, e, a + k, w / 2, a + k, b + w - g) : n && 0 > n ? e > b + c && e < b + w - c ? f.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + g) : f.splice(33, 3, "L", a, w / 2, n, e, a, w / 2, a, b + g) : e && e > w && n > a + c && n < a + k - c ? f.splice(23, 3, "L", n + 6, b + w, n, b + w + 6, n - 6, b + w, a + g, b + w) : e && 0 > e && n > a + c && n < a + k - c && f.splice(3, 3, "L", n - 6, b, n, b - 6, n + 6, b, k - g, b);
                    return f
                }
            }, clipRect: function (b, k, w,
                                   e) {
                var g = a.uniqueKey(), c = this.createElement("clipPath").attr({id: g}).add(this.defs);
                b = this.rect(b, k, w, e, 0).add(c);
                b.id = g;
                b.clipPath = c;
                b.count = 0;
                return b
            }, text: function (a, b, k, w) {
                var e = {};
                if (w && (this.allowHTML || !this.forExport))return this.html(a, b, k);
                e.x = Math.round(b || 0);
                k && (e.y = Math.round(k));
                if (a || 0 === a)e.text = a;
                a = this.createElement("text").attr(e);
                w || (a.xSetter = function (a, b, k) {
                    var w = k.getElementsByTagName("tspan"), e, g = k.getAttribute(b), c;
                    for (c = 0; c < w.length; c++)e = w[c], e.getAttribute(b) === g && e.setAttribute(b,
                        a);
                    k.setAttribute(b, a)
                });
                return a
            }, fontMetrics: function (a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? k(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: b, b: Math.round(.8 * b), f: a}
            }, rotCorr: function (a, b, k) {
                var w = a;
                b && k && (w = Math.max(w * Math.cos(b * f), 4));
                return {x: -a / 3 * Math.sin(b * f), y: w}
            }, label: function (b, k, e, n, f, d, K, L, l) {
                var q = this, u = q.g("button" !== l && "label"), F = u.text = q.text("", 0, 0, K).attr({zIndex: 1}),
                    h, G, E = 0, C = 3, B = 0, D, P, p, r, I, H = {}, O, R, v = /^url\((.*?)\)$/.test(n), M = v, t, Q, N, T;
                l && u.addClass("highcharts-" + l);
                M = v;
                t = function () {
                    return (O || 0) % 2 / 2
                };
                Q = function () {
                    var a = F.element.style, b = {};
                    G = (void 0 === D || void 0 === P || I) && m(F.textStr) && F.getBBox();
                    u.width = (D || G.width || 0) + 2 * C + B;
                    u.height = (P || G.height || 0) + 2 * C;
                    R = C + q.fontMetrics(a && a.fontSize, F).b;
                    M && (h || (u.box = h = q.symbols[n] || v ? q.symbol(n) : q.rect(), h.addClass(("button" === l ? "" : "highcharts-label-box") + (l ? " highcharts-" + l + "-box" : "")), h.add(u), a = t(), b.x = a, b.y = (L ? -R :
                            0) + a), b.width = Math.round(u.width), b.height = Math.round(u.height), h.attr(g(b, H)), H = {})
                };
                N = function () {
                    var a = B + C, b;
                    b = L ? 0 : R;
                    m(D) && G && ("center" === I || "right" === I) && (a += {center: .5, right: 1}[I] * (D - G.width));
                    if (a !== F.x || b !== F.y)F.attr("x", a), void 0 !== b && F.attr("y", b);
                    F.x = a;
                    F.y = b
                };
                T = function (a, b) {
                    h ? h.attr(a, b) : H[a] = b
                };
                u.onAdd = function () {
                    F.add(u);
                    u.attr({text: b || 0 === b ? b : "", x: k, y: e});
                    h && m(f) && u.attr({anchorX: f, anchorY: d})
                };
                u.widthSetter = function (b) {
                    D = a.isNumber(b) ? b : null
                };
                u.heightSetter = function (a) {
                    P = a
                };
                u["text-alignSetter"] =
                    function (a) {
                        I = a
                    };
                u.paddingSetter = function (a) {
                    m(a) && a !== C && (C = u.padding = a, N())
                };
                u.paddingLeftSetter = function (a) {
                    m(a) && a !== B && (B = a, N())
                };
                u.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== E && (E = a, G && u.attr({x: p}))
                };
                u.textSetter = function (a) {
                    void 0 !== a && F.textSetter(a);
                    Q();
                    N()
                };
                u["stroke-widthSetter"] = function (a, b) {
                    a && (M = !0);
                    O = this["stroke-width"] = a;
                    T(b, a)
                };
                u.strokeSetter = u.fillSetter = u.rSetter = function (a, b) {
                    "r" !== b && ("fill" === b && a && (M = !0), u[b] = a);
                    T(b, a)
                };
                u.anchorXSetter = function (a, b) {
                    f = u.anchorX =
                        a;
                    T(b, Math.round(a) - t() - p)
                };
                u.anchorYSetter = function (a, b) {
                    d = u.anchorY = a;
                    T(b, a - r)
                };
                u.xSetter = function (a) {
                    u.x = a;
                    E && (a -= E * ((D || G.width) + 2 * C));
                    p = Math.round(a);
                    u.attr("translateX", p)
                };
                u.ySetter = function (a) {
                    r = u.y = Math.round(a);
                    u.attr("translateY", r)
                };
                var U = u.css;
                return g(u, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = x(a);
                            c(u.textProps, function (k) {
                                void 0 !== a[k] && (b[k] = a[k], delete a[k])
                            });
                            F.css(b)
                        }
                        return U.call(u, a)
                    }, getBBox: function () {
                        return {width: G.width + 2 * C, height: G.height + 2 * C, x: G.x - C, y: G.y - C}
                    }, shadow: function (a) {
                        a &&
                        (Q(), h && h.shadow(a));
                        return u
                    }, destroy: function () {
                        w(u.element, "mouseenter");
                        w(u.element, "mouseleave");
                        F && (F = F.destroy());
                        h && (h = h.destroy());
                        z.prototype.destroy.call(u);
                        u = q = Q = N = T = null
                    }
                })
            }
        });
        a.Renderer = A
    })(J);
    (function (a) {
        var z = a.attr, A = a.createElement, y = a.css, h = a.defined, d = a.each, v = a.extend, t = a.isFirefox, r = a.isMS, p = a.isWebKit, m = a.pick, f = a.pInt, q = a.SVGRenderer, l = a.win, c = a.wrap;
        v(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width)delete a.width, this.textWidth =
                    b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = v(this.styles, a);
                y(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, b = this.element, e = this.translateX || 0, c = this.translateY || 0, m = this.x || 0, l = this.y || 0, q = this.textAlign || "left", r = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[q], u = this.styles;
                    y(b, {marginLeft: e, marginTop: c});
                    this.shadows && d(this.shadows, function (a) {
                        y(a, {marginLeft: e + 1, marginTop: c + 1})
                    });
                    this.inverted && d(b.childNodes, function (e) {
                        a.invertChild(e, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var C = this.rotation, v = f(this.textWidth), x = u && u.whiteSpace, F = [C, q, b.innerHTML, this.textWidth, this.textAlign].join();
                        F !== this.cTT && (u = a.fontMetrics(b.style.fontSize).b, h(C) && this.setSpanRotation(C, r, u), y(b, {
                            width: "",
                            whiteSpace: x || "nowrap"
                        }), b.offsetWidth > v && /[ \-]/.test(b.textContent || b.innerText) && y(b, {
                            width: v +
                            "px", display: "block", whiteSpace: x || "normal"
                        }), this.getSpanCorrection(b.offsetWidth, u, r, C, q));
                        y(b, {left: m + (this.xCorr || 0) + "px", top: l + (this.yCorr || 0) + "px"});
                        p && (u = b.offsetHeight);
                        this.cTT = F
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, b, e) {
                var c = {}, g = this.renderer.getTransformKey();
                c[g] = c.transform = "rotate(" + a + "deg)";
                c[g + (t ? "Origin" : "-origin")] = c.transformOrigin = 100 * b + "% " + e + "px";
                y(this.element, c)
            }, getSpanCorrection: function (a, b, e) {
                this.xCorr = -a * e;
                this.yCorr = -b
            }
        });
        v(q.prototype, {
            getTransformKey: function () {
                return r && !/Edge/.test(l.navigator.userAgent) ? "-ms-transform" : p ? "-webkit-transform" : t ? "MozTransform" : l.opera ? "-o-transform" : ""
            }, html: function (a, b, e) {
                var g = this.createElement("span"), f = g.element, l = g.renderer, q = l.isSVG, h = function (a, b) {
                    d(["opacity", "visibility"], function (e) {
                        c(a, e + "Setter", function (a, e, g, c) {
                            a.call(this, e, g, c);
                            b[g] = e
                        })
                    })
                };
                g.textSetter = function (a) {
                    a !== f.innerHTML && delete this.bBox;
                    this.textStr = a;
                    f.innerHTML = m(a, "");
                    g.htmlUpdateTransform()
                };
                q && h(g, g.element.style);
                g.xSetter = g.ySetter = g.alignSetter =
                    g.rotationSetter = function (a, b) {
                        "align" === b && (b = "textAlign");
                        g[b] = a;
                        g.htmlUpdateTransform()
                    };
                g.attr({text: a, x: Math.round(b), y: Math.round(e)}).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                f.style.whiteSpace = "nowrap";
                g.css = g.htmlCss;
                q && (g.add = function (a) {
                    var b, e = l.box.parentNode, c = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;)c.push(a), a = a.parentGroup;
                            d(c.reverse(), function (a) {
                                function n(b, k) {
                                    a[k] = b;
                                    r ? f[l.getTransformKey()] = "translate(" + (a.x || a.translateX) +
                                        "px," + (a.y || a.translateY) + "px)" : "translateX" === k ? f.left = b + "px" : f.top = b + "px";
                                    a.doTransform = !0
                                }

                                var f, k = z(a.element, "class");
                                k && (k = {className: k});
                                b = a.div = a.div || A("div", k, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, b || e);
                                f = b.style;
                                v(a, {
                                    classSetter: function (a) {
                                        return function (b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(b), on: function () {
                                        c[0].div && g.on.apply({element: c[0].div},
                                            arguments);
                                        return a
                                    }, translateXSetter: n, translateYSetter: n
                                });
                                h(a, f)
                            })
                        }
                    } else b = e;
                    b.appendChild(f);
                    g.added = !0;
                    g.alignOnAdd && g.htmlUpdateTransform();
                    return g
                });
                return g
            }
        })
    })(J);
    (function (a) {
        var z = a.correctFloat, A = a.defined, y = a.destroyObjectProperties, h = a.isNumber, d = a.merge, v = a.pick, t = a.deg2rad;
        a.Tick = function (a, d, m, f) {
            this.axis = a;
            this.pos = d;
            this.type = m || "";
            this.isNewLabel = this.isNew = !0;
            m || f || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, h = a.options, m = a.chart, f = a.categories, q =
                    a.names, l = this.pos, c = h.labels, g = a.tickPositions, b = l === g[0], e = l === g[g.length - 1], q = f ? v(f[l], q[l], l) : l, f = this.label, g = g.info, n;
                a.isDatetimeAxis && g && (n = h.dateTimeLabelFormats[g.higherRanks[l] || g.unitName]);
                this.isFirst = b;
                this.isLast = e;
                h = a.labelFormatter.call({
                    axis: a,
                    chart: m,
                    isFirst: b,
                    isLast: e,
                    dateTimeLabelFormat: n,
                    value: a.isLog ? z(a.lin2log(q)) : q,
                    pos: l
                });
                A(f) ? f && f.attr({text: h}) : (this.labelLength = (this.label = f = A(h) && c.enabled ? m.renderer.text(h, 0, 0, c.useHTML).css(d(c.style)).add(a.labelGroup) : null) && f.getBBox().width,
                    this.rotation = 0)
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var d = this.axis, m = d.options.labels, f = a.x, q = d.chart.chartWidth, l = d.chart.spacing, c = v(d.labelLeft, Math.min(d.pos, l[3])), l = v(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, q - l[1])), g = this.label, b = this.rotation, e = {
                    left: 0,
                    center: .5,
                    right: 1
                }[d.labelAlign || g.attr("align")], n = g.getBBox().width, h = d.getSlotWidth(), r = h, E = 1, M, u = {};
                if (b || !1 === m.overflow)0 > b && f - e * n < c ?
                    M = Math.round(f / Math.cos(b * t) - c) : 0 < b && f + e * n > l && (M = Math.round((q - f) / Math.cos(b * t))); else if (q = f + (1 - e) * n, f - e * n < c ? r = a.x + r * (1 - e) - c : q > l && (r = l - a.x + r * e, E = -1), r = Math.min(h, r), r < h && "center" === d.labelAlign && (a.x += E * (h - r - e * (h - Math.min(n, r)))), n > r || d.autoRotation && (g.styles || {}).width)M = r;
                M && (u.width = M, (m.style || {}).textOverflow || (u.textOverflow = "ellipsis"), g.css(u))
            }, getPosition: function (a, d, m, f) {
                var q = this.axis, l = q.chart, c = f && l.oldChartHeight || l.chartHeight;
                return {
                    x: a ? q.translate(d + m, null, null, f) + q.transB : q.left +
                    q.offset + (q.opposite ? (f && l.oldChartWidth || l.chartWidth) - q.right - q.left : 0),
                    y: a ? c - q.bottom + q.offset - (q.opposite ? q.height : 0) : c - q.translate(d + m, null, null, f) - q.transB
                }
            }, getLabelPosition: function (a, d, m, f, q, l, c, g) {
                var b = this.axis, e = b.transA, n = b.reversed, h = b.staggerLines, r = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, E = q.y, p = f || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1);
                A(E) || (E = 0 === b.side ? m.rotation ? -8 : -m.getBBox().height : 2 === b.side ? r.y + 8 : Math.cos(m.rotation * t) * (r.y - m.getBBox(!1, 0).height / 2));
                a = a +
                    q.x + p + r.x - (l && f ? l * e * (n ? -1 : 1) : 0);
                d = d + E - (l && !f ? l * e * (n ? 1 : -1) : 0);
                h && (m = c / (g || 1) % h, b.opposite && (m = h - m - 1), d += b.labelOffset / h * m);
                return {x: a, y: Math.round(d)}
            }, getMarkPath: function (a, d, m, f, q, l) {
                return l.crispLine(["M", a, d, "L", a + (q ? 0 : -m), d + (q ? m : 0)], f)
            }, renderGridLine: function (a, d, m) {
                var f = this.axis, q = f.options, l = this.gridLine, c = {}, g = this.pos, b = this.type, e = f.tickmarkOffset, n = f.chart.renderer, h = b ? b + "Grid" : "grid", r = q[h + "LineWidth"], E = q[h + "LineColor"], q = q[h + "LineDashStyle"];
                l || (c.stroke = E, c["stroke-width"] = r, q &&
                (c.dashstyle = q), b || (c.zIndex = 1), a && (c.opacity = 0), this.gridLine = l = n.path().attr(c).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(f.gridGroup));
                if (!a && l && (a = f.getPlotLinePath(g + e, l.strokeWidth() * m, a, !0)))l[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: d
                })
            }, renderMark: function (a, d, m) {
                var f = this.axis, h = f.options, l = f.chart.renderer, c = this.type, g = c ? c + "Tick" : "tick", b = f.tickSize(g), e = this.mark, n = !e, D = a.x;
                a = a.y;
                var p = v(h[g + "Width"], !c && f.isXAxis ? 1 : 0), h = h[g + "Color"];
                b && (f.opposite && (b[0] = -b[0]), n && (this.mark =
                    e = l.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(f.axisGroup), e.attr({
                    stroke: h,
                    "stroke-width": p
                })), e[n ? "attr" : "animate"]({
                    d: this.getMarkPath(D, a, b[0], e.strokeWidth() * m, f.horiz, l),
                    opacity: d
                }))
            }, renderLabel: function (a, d, m, f) {
                var q = this.axis, l = q.horiz, c = q.options, g = this.label, b = c.labels, e = b.step, q = q.tickmarkOffset, n = !0, D = a.x;
                a = a.y;
                g && h(D) && (g.xy = a = this.getLabelPosition(D, a, g, l, b, q, f, e), this.isFirst && !this.isLast && !v(c.showFirstLabel, 1) || this.isLast && !this.isFirst && !v(c.showLastLabel, 1) ? n = !1 :
                !l || b.step || b.rotation || d || 0 === m || this.handleOverflow(a), e && f % e && (n = !1), n && h(a.y) ? (a.opacity = m, g[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (g.attr("y", -9999), this.isNewLabel = !0))
            }, render: function (a, d, m) {
                var f = this.axis, h = f.horiz, l = this.getPosition(h, this.pos, f.tickmarkOffset, d), c = l.x, g = l.y, f = h && c === f.pos + f.len || !h && g === f.pos ? -1 : 1;
                m = v(m, 1);
                this.isActive = !0;
                this.renderGridLine(d, m, f);
                this.renderMark(l, m, f);
                this.renderLabel(l, d, m, a);
                this.isNew = !1
            }, destroy: function () {
                y(this, this.axis)
            }
        }
    })(J);
    var V = function (a) {
        var z = a.addEvent, A = a.animObject, y = a.arrayMax, h = a.arrayMin, d = a.color, v = a.correctFloat, t = a.defaultOptions, r = a.defined, p = a.deg2rad, m = a.destroyObjectProperties, f = a.each, q = a.extend, l = a.fireEvent, c = a.format, g = a.getMagnitude, b = a.grep, e = a.inArray, n = a.isArray, D = a.isNumber, I = a.isString, E = a.merge, M = a.normalizeTickInterval, u = a.objectEach, C = a.pick, N = a.removeEvent, x = a.splat, F = a.syncTimeout, G = a.Tick, H = function () {
            this.init.apply(this, arguments)
        };
        a.extend(H.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {enabled: !0, style: {color: "#666666", cursor: "default", fontSize: "11px"}, x: 0},
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {align: "middle", style: {color: "#666666"}},
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    allowOverlap: !1, enabled: !1, formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }, style: {fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast"}
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            init: function (a, b) {
                var k = b.isX, w = this;
                w.chart = a;
                w.horiz = a.inverted && !w.isZAxis ? !k : k;
                w.isXAxis = k;
                w.coll = w.coll || (k ? "xAxis" : "yAxis");
                w.opposite = b.opposite;
                w.side = b.side || (w.horiz ? w.opposite ? 0 : 2 : w.opposite ? 1 : 3);
                w.setOptions(b);
                var g = this.options, c = g.type;
                w.labelFormatter = g.labels.formatter ||
                    w.defaultLabelFormatter;
                w.userOptions = b;
                w.minPixelPadding = 0;
                w.reversed = g.reversed;
                w.visible = !1 !== g.visible;
                w.zoomEnabled = !1 !== g.zoomEnabled;
                w.hasNames = "category" === c || !0 === g.categories;
                w.categories = g.categories || w.hasNames;
                w.names = w.names || [];
                w.plotLinesAndBandsGroups = {};
                w.isLog = "logarithmic" === c;
                w.isDatetimeAxis = "datetime" === c;
                w.positiveValuesOnly = w.isLog && !w.allowNegativeLog;
                w.isLinked = r(g.linkedTo);
                w.ticks = {};
                w.labelEdge = [];
                w.minorTicks = {};
                w.plotLinesAndBands = [];
                w.alternateBands = {};
                w.len = 0;
                w.minRange =
                    w.userMinRange = g.minRange || g.maxZoom;
                w.range = g.range;
                w.offset = g.offset || 0;
                w.stacks = {};
                w.oldStacks = {};
                w.stacksTouched = 0;
                w.max = null;
                w.min = null;
                w.crosshair = C(g.crosshair, x(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);
                b = w.options.events;
                -1 === e(w, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, w) : a.axes.push(w), a[w.coll].push(w));
                w.series = w.series || [];
                a.inverted && !w.isZAxis && k && void 0 === w.reversed && (w.reversed = !0);
                u(b, function (a, b) {
                    z(w, b, a)
                });
                w.lin2log = g.linearToLogConverter || w.lin2log;
                w.isLog && (w.val2lin = w.log2lin,
                    w.lin2val = w.lin2log)
            },
            setOptions: function (a) {
                this.options = E(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], E(t[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var b = this.axis, w = this.value, e = b.categories, g = this.dateTimeLabelFormat, n = t.lang, f = n.numericSymbols, n = n.numericSymbolMagnitude || 1E3, x = f && f.length, d, u = b.options.labels.format, b = b.isLog ? Math.abs(w) :
                    b.tickInterval;
                if (u)d = c(u, this); else if (e)d = w; else if (g)d = a.dateFormat(g, w); else if (x && 1E3 <= b)for (; x-- && void 0 === d;)e = Math.pow(n, x + 1), b >= e && 0 === 10 * w % e && null !== f[x] && 0 !== w && (d = a.numberFormat(w / e, -1) + f[x]);
                void 0 === d && (d = 1E4 <= Math.abs(w) ? a.numberFormat(w, -1) : a.numberFormat(w, -1, void 0, ""));
                return d
            },
            getSeriesExtremes: function () {
                var a = this, w = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                f(a.series, function (k) {
                    if (k.visible || !w.options.chart.ignoreHiddenSeries) {
                        var e = k.options, g = e.threshold, c;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= g && (g = null);
                        if (a.isXAxis)e = k.xData, e.length && (k = h(e), c = y(e), D(k) || k instanceof Date || (e = b(e, D), k = h(e)), a.dataMin = Math.min(C(a.dataMin, e[0], k), k), a.dataMax = Math.max(C(a.dataMax, e[0], c), c)); else if (k.getExtremes(), c = k.dataMax, k = k.dataMin, r(k) && r(c) && (a.dataMin = Math.min(C(a.dataMin, k), k), a.dataMax = Math.max(C(a.dataMax, c), c)), r(g) && (a.threshold = g), !e.softThreshold || a.positiveValuesOnly)a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, e, g, c, n) {
                var k = this.linkedParent || this, w = 1, f = 0, x = g ? k.oldTransA : k.transA;
                g = g ? k.oldMin : k.min;
                var d = k.minPixelPadding;
                c = (k.isOrdinal || k.isBroken || k.isLog && c) && k.lin2val;
                x || (x = k.transA);
                e && (w *= -1, f = k.len);
                k.reversed && (w *= -1, f -= w * (k.sector || k.len));
                b ? (a = (a * w + f - d) / x + g, c && (a = k.lin2val(a))) : (c && (a = k.val2lin(a)), a = D(g) ? w * (a - g) * x + f + w * d + (D(n) ? x * n : 0) : void 0);
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a -
                    (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, e, g, c) {
                var k = this.chart, w = this.left, n = this.top, f, x, d = e && k.oldChartHeight || k.chartHeight, u = e && k.oldChartWidth || k.chartWidth, m;
                f = this.transB;
                var l = function (a, b, k) {
                    if (a < b || a > k)g ? a = Math.min(Math.max(b, a), k) : m = !0;
                    return a
                };
                c = C(c, this.translate(a, null, null, e));
                a = e = Math.round(c + f);
                f = x = Math.round(d - c - f);
                D(c) ? this.horiz ? (f = n, x = d - this.bottom, a = e = l(a, w, w + this.width)) : (a = w, e = u - this.right, f = x = l(f, n, n + this.height)) : (m = !0, g = !1);
                return m && !g ? null :
                    k.renderer.crispLine(["M", a, f, "L", e, x], b || 1)
            },
            getLinearTickPositions: function (a, b, e) {
                var k, w = v(Math.floor(b / a) * a);
                e = v(Math.ceil(e / a) * a);
                var g = [], c;
                v(w + a) === w && (c = 20);
                if (this.single)return [b];
                for (b = w; b <= e;) {
                    g.push(b);
                    b = v(b + a, c);
                    if (b === k)break;
                    k = b
                }
                return g
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? C(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this, b = a.options, e = a.tickPositions, g = a.minorTickInterval,
                    c = [], n = a.pointRangePadding || 0, x = a.min - n, n = a.max + n, d = n - x;
                if (d && d / g < a.len / 3)if (a.isLog)f(this.paddedTicks, function (b, k, w) {
                    k && c.push.apply(c, a.getLogTickPositions(g, w[k - 1], w[k], !0))
                }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval())c = c.concat(a.getTimeTicks(a.normalizeTimeTickInterval(g), x, n, b.startOfWeek)); else for (b = x + (e[0] - x) % g; b <= n && b !== c[0]; b += g)c.push(b);
                0 !== c.length && a.trimTicks(c);
                return c
            },
            adjustForMinRange: function () {
                var a = this.options, b = this.min, e = this.max, g, c, n, x, d, u, m, l;
                this.isXAxis &&
                void 0 === this.minRange && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null : (f(this.series, function (a) {
                    u = a.xData;
                    for (x = m = a.xIncrement ? 1 : u.length - 1; 0 < x; x--)if (d = u[x] - u[x - 1], void 0 === n || d < n)n = d
                }), this.minRange = Math.min(5 * n, this.dataMax - this.dataMin)));
                e - b < this.minRange && (c = this.dataMax - this.dataMin >= this.minRange, l = this.minRange, g = (l - e + b) / 2, g = [b - g, C(a.min, b - g)], c && (g[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = y(g), e = [b + l, C(a.max, b + l)], c && (e[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
                    e = h(e), e - b < l && (g[0] = e - l, g[1] = C(a.min, e - l), b = y(g)));
                this.min = b;
                this.max = e
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : f(this.series, function (b) {
                    var k = b.closestPointRange, e = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && r(k) && e && (a = r(a) ? Math.min(a, k) : k)
                });
                return a
            },
            nameToX: function (a) {
                var b = n(this.categories), k = b ? this.categories : this.names, g = a.options.x, c;
                a.series.requireSorting = !1;
                r(g) || (g = !1 === this.options.uniqueNames ? a.series.autoIncrement() : e(a.name, k));
                -1 === g ? b ||
                (c = k.length) : c = g;
                void 0 !== c && (this.names[c] = a.name);
                return c
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, f(this.series || [], function (b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData)b.processData(), b.generatePoints();
                    f(b.points, function (k, e) {
                        var w;
                        k.options && (w = a.nameToX(k), void 0 !== w && w !== k.x && (k.x = w, b.xData[e] = w))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this, k = b.max - b.min, e = b.axisPointRange || 0, g, c = 0, n = 0, x = b.linkedParent, d = !!b.categories,
                    u = b.transA, l = b.isXAxis;
                if (l || d || e)g = b.getClosest(), x ? (c = x.minPointOffset, n = x.pointRangePadding) : f(b.series, function (a) {
                    var k = d ? 1 : l ? C(a.options.pointRange, g, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    e = Math.max(e, k);
                    b.single || (c = Math.max(c, I(a) ? 0 : k / 2), n = Math.max(n, "on" === a ? 0 : k))
                }), x = b.ordinalSlope && g ? b.ordinalSlope / g : 1, b.minPointOffset = c *= x, b.pointRangePadding = n *= x, b.pointRange = Math.min(e, k), l && (b.closestPointRange = g);
                a && (b.oldTransA = u);
                b.translationSlope = b.transA = u = b.options.staticScale || b.len /
                    (k + n || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = u * c
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (b) {
                var k = this, e = k.chart, c = k.options, n = k.isLog, x = k.log2lin, d = k.isDatetimeAxis, u = k.isXAxis, m = k.isLinked, h = c.maxPadding, q = c.minPadding, F = c.tickInterval, G = c.tickPixelInterval, E = k.categories, p = k.threshold, H = k.softThreshold, I, t, N, y;
                d || E || m || this.getTickAmount();
                N = C(k.userMin, c.min);
                y = C(k.userMax, c.max);
                m ? (k.linkedParent = e[k.coll][c.linkedTo], e = k.linkedParent.getExtremes(),
                    k.min = C(e.min, e.dataMin), k.max = C(e.max, e.dataMax), c.type !== k.linkedParent.options.type && a.error(11, 1)) : (!H && r(p) && (k.dataMin >= p ? (I = p, q = 0) : k.dataMax <= p && (t = p, h = 0)), k.min = C(N, I, k.dataMin), k.max = C(y, t, k.dataMax));
                n && (k.positiveValuesOnly && !b && 0 >= Math.min(k.min, C(k.dataMin, k.min)) && a.error(10, 1), k.min = v(x(k.min), 15), k.max = v(x(k.max), 15));
                k.range && r(k.max) && (k.userMin = k.min = N = Math.max(k.dataMin, k.minFromRange()), k.userMax = y = k.max, k.range = null);
                l(k, "foundExtremes");
                k.beforePadding && k.beforePadding();
                k.adjustForMinRange();
                !(E || k.axisPointRange || k.usePercentage || m) && r(k.min) && r(k.max) && (x = k.max - k.min) && (!r(N) && q && (k.min -= x * q), !r(y) && h && (k.max += x * h));
                D(c.softMin) && !D(k.userMin) && (k.min = Math.min(k.min, c.softMin));
                D(c.softMax) && !D(k.userMax) && (k.max = Math.max(k.max, c.softMax));
                D(c.floor) && (k.min = Math.max(k.min, c.floor));
                D(c.ceiling) && (k.max = Math.min(k.max, c.ceiling));
                H && r(k.dataMin) && (p = p || 0, !r(N) && k.min < p && k.dataMin >= p ? k.min = p : !r(y) && k.max > p && k.dataMax <= p && (k.max = p));
                k.tickInterval = k.min === k.max || void 0 === k.min || void 0 ===
                k.max ? 1 : m && !F && G === k.linkedParent.options.tickPixelInterval ? F = k.linkedParent.tickInterval : C(F, this.tickAmount ? (k.max - k.min) / Math.max(this.tickAmount - 1, 1) : void 0, E ? 1 : (k.max - k.min) * G / Math.max(k.len, G));
                u && !b && f(k.series, function (a) {
                    a.processData(k.min !== k.oldMin || k.max !== k.oldMax)
                });
                k.setAxisTranslation(!0);
                k.beforeSetTickPositions && k.beforeSetTickPositions();
                k.postProcessTickInterval && (k.tickInterval = k.postProcessTickInterval(k.tickInterval));
                k.pointRange && !F && (k.tickInterval = Math.max(k.pointRange,
                    k.tickInterval));
                b = C(c.minTickInterval, k.isDatetimeAxis && k.closestPointRange);
                !F && k.tickInterval < b && (k.tickInterval = b);
                d || n || F || (k.tickInterval = M(k.tickInterval, null, g(k.tickInterval), C(c.allowDecimals, !(.5 < k.tickInterval && 5 > k.tickInterval && 1E3 < k.max && 9999 > k.max)), !!this.tickAmount));
                this.tickAmount || (k.tickInterval = k.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options, b, e = a.tickPositions;
                b = this.getMinorTickInterval();
                var c = a.tickPositioner, g = a.startOnTick, n = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && r(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = e && e.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange,
                    !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, c && (c = c.apply(this, [this.min, this.max]))) && (this.tickPositions = b = c);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, g, n);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), e || c || this.adjustTickAmount())
            },
            trimTicks: function (a, b, e) {
                var k = a[0], c = a[a.length - 1], g =
                    this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== k)this.min = k; else for (; this.min - g > a[0];)a.shift();
                    if (e)this.max = c; else for (; this.max + g < a[a.length - 1];)a.pop();
                    0 === a.length && r(k) && !this.options.tickPositions && a.push((c + k) / 2)
                }
            },
            alignToOthers: function () {
                var a = {}, b, e = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || this.isLog || f(this.chart[this.coll], function (k) {
                    var e = k.options, e = [k.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    k.series.length && (a[e] ? b = !0 : a[e] =
                        1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount, e = a.tickPixelInterval;
                !r(a.tickInterval) && this.len < e && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / e) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval, b = this.tickPositions, e = this.tickAmount, c = this.finalTickAmt, g = b && b.length, n = C(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (g < e) {
                        for (; b.length <
                               e;)b.length % 2 || this.min === n ? b.push(v(b[b.length - 1] + a)) : b.unshift(v(b[0] - a));
                        this.transA *= (g - 1) / (e - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else g > e && (this.tickInterval *= 2, this.setTickPositions());
                    if (r(c)) {
                        for (a = e = b.length; a--;)(3 === c && 1 === a % 2 || 2 >= c && 0 < a && a < e - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                f(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty ||
                        b.xAxis.isDirty)a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, e, c, g) {
                var k = this, n = k.chart;
                e = C(e, !0);
                f(k.series,
                    function (a) {
                        delete a.kdTree
                    });
                g = q(g, {min: a, max: b});
                l(k, "setExtremes", g, function () {
                    k.userMin = a;
                    k.userMax = b;
                    k.eventArgs = g;
                    e && n.redraw(c)
                })
            },
            zoom: function (a, b) {
                var k = this.dataMin, e = this.dataMax, c = this.options, g = Math.min(k, C(c.min, k)), c = Math.max(e, C(c.max, e));
                if (a !== this.min || b !== this.max)this.allowZoomOutside || (r(k) && (a < g && (a = g), a > c && (a = c)), r(e) && (b < g && (b = g), b > c && (b = c))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                return !0
            },
            setAxisSize: function () {
                var b = this.chart,
                    e = this.options, c = e.offsets || [0, 0, 0, 0], g = this.horiz, n = this.width = Math.round(a.relativeLength(C(e.width, b.plotWidth - c[3] + c[1]), b.plotWidth)), f = this.height = Math.round(a.relativeLength(C(e.height, b.plotHeight - c[0] + c[2]), b.plotHeight)), x = this.top = Math.round(a.relativeLength(C(e.top, b.plotTop + c[0]), b.plotHeight, b.plotTop)), e = this.left = Math.round(a.relativeLength(C(e.left, b.plotLeft + c[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - f - x;
                this.right = b.chartWidth - n - e;
                this.len = Math.max(g ? n : f, 0);
                this.pos =
                    g ? e : x
            },
            getExtremes: function () {
                var a = this.isLog, b = this.lin2log;
                return {
                    min: a ? v(b(this.min)) : this.min,
                    max: a ? v(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog, k = this.lin2log, e = b ? k(this.min) : this.min, b = b ? k(this.max) : this.max;
                null === a ? a = e : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (C(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options, k = b[a + "Length"], e = C(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && k)return "inside" === b[a + "Position"] && (k = -k), [k, e]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, e = this.tickInterval, c = e, g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) /
                    e), n, x = a.rotation, d = this.labelMetrics(), u, l = Number.MAX_VALUE, m, h = function (a) {
                    a /= g || 1;
                    a = 1 < a ? Math.ceil(a) : 1;
                    return a * e
                };
                b ? (m = !a.staggerLines && !a.step && (r(x) ? [x] : g < C(a.autoRotationLimit, 80) && a.autoRotation)) && f(m, function (a) {
                    var b;
                    if (a === x || a && -90 <= a && 90 >= a)u = h(Math.abs(d.h / Math.sin(p * a))), b = u + Math.abs(a / 360), b < l && (l = b, n = a, c = u)
                }) : a.step || (c = h(d.h));
                this.autoRotation = m;
                this.labelRotation = C(n, x);
                return c
            },
            getSlotWidth: function () {
                var a = this.chart, b = this.horiz, e = this.options.labels, c = Math.max(this.tickPositions.length -
                    (this.categories ? 0 : 1), 1), g = a.margin[3];
                return b && 2 > (e.step || 0) && !e.rotation && (this.staggerLines || 1) * this.len / c || !b && (e.style && parseInt(e.style.width, 10) || g && g - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, e = this.tickPositions, c = this.ticks, g = this.options.labels, n = this.horiz, x = this.getSlotWidth(), d = Math.max(1, Math.round(x - 2 * (g.padding || 5))), u = {}, l = this.labelMetrics(), m = g.style && g.style.textOverflow, h, q = 0, F, G;
                I(g.rotation) || (u.rotation = g.rotation || 0);
                f(e, function (a) {
                    (a =
                        c[a]) && a.labelLength > q && (q = a.labelLength)
                });
                this.maxLabelLength = q;
                if (this.autoRotation)q > d && q > l.h ? u.rotation = this.labelRotation : this.labelRotation = 0; else if (x && (h = {width: d + "px"}, !m))for (h.textOverflow = "clip", F = e.length; !n && F--;)if (G = e[F], d = c[G].label)d.styles && "ellipsis" === d.styles.textOverflow ? d.css({textOverflow: "clip"}) : c[G].labelLength > x && d.css({width: x + "px"}), d.getBBox().height > this.len / e.length - (l.h - l.f) && (d.specCss = {textOverflow: "ellipsis"});
                u.rotation && (h = {
                    width: (q > .5 * a.chartHeight ? .33 * a.chartHeight :
                        a.chartHeight) + "px"
                }, m || (h.textOverflow = "ellipsis"));
                if (this.labelAlign = g.align || this.autoLabelAlign(this.labelRotation))u.align = this.labelAlign;
                f(e, function (a) {
                    var b = (a = c[a]) && a.label;
                    b && (b.attr(u), h && b.css(E(h, b.specCss)), delete b.specCss, a.rotation = u.rotation)
                });
                this.tickRotCorr = b.rotCorr(l.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || r(this.min) && r(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function (a) {
                var b = this.chart.renderer,
                    e = this.horiz, k = this.opposite, c = this.options.title, g;
                this.axisTitle || ((g = c.textAlign) || (g = (e ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: k ? "right" : "left",
                    middle: "center",
                    high: k ? "left" : "right"
                })[c.align]), this.axisTitle = b.text(c.text, 0, 0, c.useHTML).attr({
                    zIndex: 7,
                    rotation: c.rotation || 0,
                    align: g
                }).addClass("highcharts-axis-title").css(c.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                c.style.width || this.isRadial || this.axisTitle.css({width: this.len});
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b =
                    this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new G(this, a)
            },
            getOffset: function () {
                var a = this, b = a.chart, e = b.renderer, c = a.options, g = a.tickPositions, n = a.ticks, x = a.horiz, d = a.side, l = b.inverted && !a.isZAxis ? [1, 0, 3, 2][d] : d, m, h, q = 0, F, G = 0, E = c.title, D = c.labels, p = 0, H = b.axisOffset, b = b.clipOffset, I = [-1, 1, 1, -1][d], v = c.className, t = a.axisParent, M = this.tickSize("tick");
                m = a.hasData();
                a.showAxis = h = m || C(c.showEmpty, !0);
                a.staggerLines = a.horiz && D.staggerLines;
                a.axisGroup || (a.gridGroup = e.g("grid").attr({zIndex: c.gridZIndex || 1}).addClass("highcharts-" +
                    this.coll.toLowerCase() + "-grid " + (v || "")).add(t), a.axisGroup = e.g("axis").attr({zIndex: c.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (v || "")).add(t), a.labelGroup = e.g("axis-labels").attr({zIndex: D.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (v || "")).add(t));
                m || a.isLinked ? (f(g, function (b, e) {
                    a.generateTick(b, e)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === d || 2 === d || {
                        1: "left",
                        3: "right"
                    }[d] === a.labelAlign, C(D.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) &&
                f(g, function (a) {
                    p = Math.max(n[a].getLabelSize(), p)
                }), a.staggerLines && (p *= a.staggerLines), a.labelOffset = p * (a.opposite ? -1 : 1)) : u(n, function (a, b) {
                    a.destroy();
                    delete n[b]
                });
                E && E.text && !1 !== E.enabled && (a.addTitle(h), h && !1 !== E.reserveSpace && (a.titleOffset = q = a.axisTitle.getBBox()[x ? "height" : "width"], F = E.offset, G = r(F) ? 0 : C(E.margin, x ? 5 : 10)));
                a.renderLine();
                a.offset = I * C(c.offset, H[d]);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                e = 0 === d ? -a.labelMetrics().h : 2 === d ? a.tickRotCorr.y : 0;
                G = Math.abs(p) + G;
                p && (G = G - e + I * (x ? C(D.y,
                        a.tickRotCorr.y + 8 * I) : D.x));
                a.axisTitleMargin = C(F, G);
                H[d] = Math.max(H[d], a.axisTitleMargin + q + I * a.offset, G, m && g.length && M ? M[0] + I * a.offset : 0);
                c = c.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[l] = Math.max(b[l], c)
            },
            getLinePath: function (a) {
                var b = this.chart, e = this.opposite, k = this.offset, c = this.horiz, g = this.left + (e ? this.width : 0) + k, k = b.chartHeight - this.bottom - (e ? this.height : 0) + k;
                e && (a *= -1);
                return b.renderer.crispLine(["M", c ? this.left : g, c ? k : this.top, "L", c ? b.chartWidth - this.right : g, c ? k : b.chartHeight - this.bottom],
                    a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, e = this.top, c = this.len, g = this.options.title, n = a ? b : e, f = this.opposite, x = this.offset, d = g.x || 0, u = g.y || 0, l = this.axisTitle, m = this.chart.renderer.fontMetrics(g.style && g.style.fontSize, l), l = Math.max(l.getBBox(null, 0).height -
                    m.h - 1, 0), c = {
                    low: n + (a ? 0 : c),
                    middle: n + c / 2,
                    high: n + (a ? c : 0)
                }[g.align], b = (a ? e + this.height : b) + (a ? 1 : -1) * (f ? -1 : 1) * this.axisTitleMargin + [-l, l, m.f, -l][this.side];
                return {
                    x: a ? c + d : b + (f ? this.width : 0) + x + d,
                    y: a ? b + u - (f ? this.height : 0) + x : c + u
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && D(this.oldMin), e = this.minorTicks;
                e[a] || (e[a] = new G(this, a, "minor"));
                b && e[a].isNew && e[a].render(null, !0);
                e[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var e = this.isLinked, c = this.ticks, g = this.chart.hasRendered && D(this.oldMin);
                if (!e || a >= this.min && a <= this.max)c[a] || (c[a] = new G(this, a)), g && c[a].isNew && c[a].render(b, !0, .1), c[a].render(b)
            },
            render: function () {
                var b = this, e = b.chart, c = b.options, g = b.isLog, n = b.lin2log, x = b.isLinked, d = b.tickPositions, l = b.axisTitle, m = b.ticks, h = b.minorTicks, q = b.alternateBands, E = c.stackLabels, C = c.alternateGridColor, p = b.tickmarkOffset, H = b.axisLine, r = b.showAxis, I = A(e.renderer.globalAnimation), v, t;
                b.labelEdge.length = 0;
                b.overlap = !1;
                f([m, h, q], function (a) {
                    u(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || x)b.minorTickInterval && !b.categories && f(b.getMinorTickPositions(), function (a) {
                    b.renderMinorTick(a)
                }), d.length && (f(d, function (a, e) {
                    b.renderTick(a, e)
                }), p && (0 === b.min || b.single) && (m[-1] || (m[-1] = new G(b, -1, null, !0)), m[-1].render(-1))), C && f(d, function (c, k) {
                    t = void 0 !== d[k + 1] ? d[k + 1] + p : b.max - p;
                    0 === k % 2 && c < b.max && t <= b.max + (e.polar ? -p : p) && (q[c] || (q[c] = new a.PlotLineOrBand(b)), v = c + p, q[c].options = {
                        from: g ? n(v) : v,
                        to: g ? n(t) : t,
                        color: C
                    }, q[c].render(), q[c].isActive = !0)
                }), b._addedPlotLB || (f((c.plotLines || []).concat(c.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }),
                    b._addedPlotLB = !0);
                f([m, h, q], function (a) {
                    var b, c = [], g = I.duration;
                    u(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, c.push(b))
                    });
                    F(function () {
                        for (b = c.length; b--;)a[c[b]] && !a[c[b]].isActive && (a[c[b]].destroy(), delete a[c[b]])
                    }, a !== q && e.hasRendered && g ? g : 0)
                });
                H && (H[H.isPlaced ? "animate" : "attr"]({d: this.getLinePath(H.strokeWidth())}), H.isPlaced = !0, H[r ? "show" : "hide"](!0));
                l && r && (c = b.getTitlePosition(), D(c.y) ? (l[l.isNew ? "attr" : "animate"](c), l.isNew = !1) : (l.attr("y", -9999), l.isNew = !0));
                E && E.enabled &&
                b.renderStackTotals();
                b.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), f(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                f(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this, c = b.stacks, g = b.plotLinesAndBands, k;
                a || N(b);
                u(c, function (a, b) {
                    m(a);
                    c[b] = null
                });
                f([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    m(a)
                });
                if (g)for (a = g.length; a--;)g[a].destroy();
                f("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
                    function (a) {
                        b[a] && (b[a] = b[a].destroy())
                    });
                for (k in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[k] = b.plotLinesAndBandsGroups[k].destroy();
                u(b, function (a, c) {
                    -1 === e(c, b.keepProps) && delete b[c]
                })
            },
            drawCrosshair: function (a, b) {
                var e, c = this.crosshair, g = C(c.snap, !0), k, n = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (r(b) || !g) ? (g ? r(b) && (k = this.isXAxis ? b.plotX : this.len - b.plotY) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), r(k) && (e = this.getPlotLinePath(b && (this.isXAxis ?
                            b.x : C(b.stackY, b.y)), null, null, null, k) || null), r(e) ? (b = this.categories && !this.isRadial, n || (this.cross = n = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + c.className).attr({zIndex: C(c.zIndex, 2)}).add(), n.attr({
                    stroke: c.color || (b ? d("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": C(c.width, 1)
                }).css({"pointer-events": "none"}), c.dashStyle && n.attr({dashstyle: c.dashStyle})), n.show().attr({d: e}), b && !c.width && n.attr({"stroke-width": this.transA}),
                    this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = H
    }(J);
    (function (a) {
        var z = a.Axis, A = a.getMagnitude, y = a.map, h = a.normalizeTickInterval, d = a.pick;
        z.prototype.getLogTickPositions = function (a, t, r, p) {
            var m = this.options, f = this.len, q = this.lin2log, l = this.log2lin, c = [];
            p || (this._minorAutoInterval = null);
            if (.5 <= a)a = Math.round(a), c = this.getLinearTickPositions(a, t, r); else if (.08 <= a)for (var f = Math.floor(t), g, b, e, n, D, m = .3 < a ? [1, 2, 4] : .15 <
            a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < r + 1 && !D; f++)for (b = m.length, g = 0; g < b && !D; g++)e = l(q(f) * m[g]), e > t && (!p || n <= r) && void 0 !== n && c.push(n), n > r && (D = !0), n = e; else t = q(t), r = q(r), a = p ? this.getMinorTickInterval() : m.tickInterval, a = d("auto" === a ? null : a, this._minorAutoInterval, m.tickPixelInterval / (p ? 5 : 1) * (r - t) / ((p ? f / this.tickPositions.length : f) || 1)), a = h(a, null, A(a)), c = y(this.getLinearTickPositions(a, t, r), l), p || (this._minorAutoInterval = a / 5);
            p || (this.tickInterval = a);
            return c
        };
        z.prototype.log2lin = function (a) {
            return Math.log(a) /
                Math.LN10
        };
        z.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(J);
    (function (a, z) {
        var A = a.arrayMax, y = a.arrayMin, h = a.defined, d = a.destroyObjectProperties, v = a.each, t = a.erase, r = a.merge, p = a.pick;
        a.PlotLineOrBand = function (a, f) {
            this.axis = a;
            f && (this.options = f, this.id = f.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var d = this, f = d.axis, q = f.horiz, l = d.options, c = l.label, g = d.label, b = l.to, e = l.from, n = l.value, D = h(e) && h(b), I = h(n), E = d.svgElem, t = !E, u = [], C = l.color, v = p(l.zIndex, 0), x = l.events, u = {
                    "class": "highcharts-plot-" +
                    (D ? "band " : "line ") + (l.className || "")
                }, F = {}, G = f.chart.renderer, H = D ? "bands" : "lines", k = f.log2lin;
                f.isLog && (e = k(e), b = k(b), n = k(n));
                I ? (u = {
                    stroke: C,
                    "stroke-width": l.width
                }, l.dashStyle && (u.dashstyle = l.dashStyle)) : D && (C && (u.fill = C), l.borderWidth && (u.stroke = l.borderColor, u["stroke-width"] = l.borderWidth));
                F.zIndex = v;
                H += "-" + v;
                (C = f.plotLinesAndBandsGroups[H]) || (f.plotLinesAndBandsGroups[H] = C = G.g("plot-" + H).attr(F).add());
                t && (d.svgElem = E = G.path().attr(u).add(C));
                if (I)u = f.getPlotLinePath(n, E.strokeWidth()); else if (D)u =
                    f.getPlotBandPath(e, b, l); else return;
                t && u && u.length ? (E.attr({d: u}), x && a.objectEach(x, function (a, b) {
                    E.on(b, function (a) {
                        x[b].apply(d, [a])
                    })
                })) : E && (u ? (E.show(), E.animate({d: u})) : (E.hide(), g && (d.label = g = g.destroy())));
                c && h(c.text) && u && u.length && 0 < f.width && 0 < f.height && !u.flat ? (c = r({
                    align: q && D && "center",
                    x: q ? !D && 4 : 10,
                    verticalAlign: !q && D && "middle",
                    y: q ? D ? 16 : 10 : D ? 6 : -4,
                    rotation: q && !D && 90
                }, c), this.renderLabel(c, u, D, v)) : g && g.hide();
                return d
            }, renderLabel: function (a, f, d, l) {
                var c = this.label, g = this.axis.chart.renderer;
                c || (c = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "")
                }, c.zIndex = l, this.label = c = g.text(a.text, 0, 0, a.useHTML).attr(c).add(), c.css(a.style));
                l = f.xBounds || [f[1], f[4], d ? f[6] : f[1]];
                f = f.yBounds || [f[2], f[5], d ? f[7] : f[2]];
                d = y(l);
                g = y(f);
                c.align(a, !1, {x: d, y: g, width: A(l) - d, height: A(f) - g});
                c.show()
            }, destroy: function () {
                t(this.axis.plotLinesAndBands, this);
                delete this.axis;
                d(this)
            }
        };
        a.extend(z.prototype, {
            getPlotBandPath: function (a, f) {
                var d = this.getPlotLinePath(f,
                    null, null, !0), l = this.getPlotLinePath(a, null, null, !0), c = [], g = this.horiz, b = 1, e;
                a = a < this.min && f < this.min || a > this.max && f > this.max;
                if (l && d)for (a && (e = l.toString() === d.toString(), b = 0), a = 0; a < l.length; a += 6)g && d[a + 1] === l[a + 1] ? (d[a + 1] += b, d[a + 4] += b) : g || d[a + 2] !== l[a + 2] || (d[a + 2] += b, d[a + 5] += b), c.push("M", l[a + 1], l[a + 2], "L", l[a + 4], l[a + 5], d[a + 4], d[a + 5], d[a + 1], d[a + 2], "z"), c.flat = e;
                return c
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a,
                    "plotLines")
            }, addPlotBandOrLine: function (d, f) {
                var h = (new a.PlotLineOrBand(this, d)).render(), l = this.userOptions;
                h && (f && (l[f] = l[f] || [], l[f].push(d)), this.plotLinesAndBands.push(h));
                return h
            }, removePlotBandOrLine: function (a) {
                for (var f = this.plotLinesAndBands, d = this.options, l = this.userOptions, c = f.length; c--;)f[c].id === a && f[c].destroy();
                v([d.plotLines || [], l.plotLines || [], d.plotBands || [], l.plotBands || []], function (g) {
                    for (c = g.length; c--;)g[c].id === a && t(g, g[c])
                })
            }, removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(J, V);
    (function (a) {
        var z = a.dateFormat, A = a.each, y = a.extend, h = a.format, d = a.isNumber, v = a.map, t = a.merge, r = a.pick, p = a.splat, m = a.syncTimeout, f = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, f) {
                this.chart = a;
                this.options = f;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = f.split && !a.inverted;
                this.shared = f.shared || this.split
            }, cleanSplit: function (a) {
                A(this.chart.series, function (f) {
                    var c =
                        f && f.tt;
                    c && (!c.isActive || a ? f.tt = c.destroy() : c.isActive = !1)
                })
            }, getLabel: function () {
                var a = this.chart.renderer, f = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, f.shape || "callout", null, null, f.useHTML, null, "tooltip").attr({
                    padding: f.padding,
                    r: f.borderRadius
                }), this.label.attr({
                    fill: f.backgroundColor,
                    "stroke-width": f.borderWidth
                }).css(f.style).shadow(f.shadow)), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                t(!0, this.chart.options.tooltip.userOptions,
                    a);
                this.init(this.chart, t(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            }, move: function (a, f, c, g) {
                var b = this, e = b.now, n = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - e.x) || 1 < Math.abs(f - e.y)), d = b.followPointer || 1 < b.len;
                y(e, {
                    x: n ? (2 * e.x + a) / 3 : a,
                    y: n ? (e.y + f) / 2 : f,
                    anchorX: d ? void 0 : n ? (2 * e.anchorX + c) / 3 : c,
                    anchorY: d ? void 0 : n ?
                    (e.anchorY + g) / 2 : g
                });
                b.getLabel().attr(e);
                n && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    b && b.move(a, f, c, g)
                }, 32))
            }, hide: function (a) {
                var f = this;
                clearTimeout(this.hideTimer);
                a = r(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = m(function () {
                    f.getLabel()[a ? "fadeOut" : "hide"]();
                    f.isHidden = !0
                }, a))
            }, getAnchor: function (a, f) {
                var c, g = this.chart, b = g.inverted, e = g.plotTop, n = g.plotLeft, d = 0, h = 0, l, m;
                a = p(a);
                c = a[0].tooltipPos;
                this.followPointer && f && (void 0 === f.chartX && (f =
                    g.pointer.normalize(f)), c = [f.chartX - g.plotLeft, f.chartY - e]);
                c || (A(a, function (a) {
                    l = a.series.yAxis;
                    m = a.series.xAxis;
                    d += a.plotX + (!b && m ? m.left - n : 0);
                    h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && l ? l.top - e : 0)
                }), d /= a.length, h /= a.length, c = [b ? g.plotWidth - h : d, this.shared && !b && 1 < a.length && f ? f.chartY - e : b ? g.plotHeight - d : h]);
                return v(c, Math.round)
            }, getPosition: function (a, f, c) {
                var g = this.chart, b = this.distance, e = {}, n = g.inverted && c.h || 0, d, h = ["y", g.chartHeight, f, c.plotY + g.plotTop, g.plotTop, g.plotTop + g.plotHeight],
                    l = ["x", g.chartWidth, a, c.plotX + g.plotLeft, g.plotLeft, g.plotLeft + g.plotWidth], m = !this.followPointer && r(c.ttBelow, !g.inverted === !!c.negative), u = function (a, c, g, k, f, d) {
                        var x = g < k - b, w = k + b + g < c, h = k - b - g;
                        k += b;
                        if (m && w)e[a] = k; else if (!m && x)e[a] = h; else if (x)e[a] = Math.min(d - g, 0 > h - n ? h : h - n); else if (w)e[a] = Math.max(f, k + n + g > c ? k : k + n); else return !1
                    }, q = function (a, c, g, k) {
                        var n;
                        k < b || k > c - b ? n = !1 : e[a] = k < g / 2 ? 1 : k > c - g / 2 ? c - g - 2 : k - g / 2;
                        return n
                    }, p = function (a) {
                        var b = h;
                        h = l;
                        l = b;
                        d = a
                    }, x = function () {
                        !1 !== u.apply(0, h) ? !1 !== q.apply(0, l) ||
                        d || (p(!0), x()) : d ? e.x = e.y = 0 : (p(!0), x())
                    };
                (g.inverted || 1 < this.len) && p();
                x();
                return e
            }, defaultFormatter: function (a) {
                var f = this.points || p(this), c;
                c = [a.tooltipFooterHeaderFormatter(f[0])];
                c = c.concat(a.bodyFormatter(f));
                c.push(a.tooltipFooterHeaderFormatter(f[0], !0));
                return c
            }, refresh: function (a, f) {
                var c, g = this.options, b, e = a, n, d = {}, h = [];
                c = g.formatter || this.defaultFormatter;
                var d = this.shared, l;
                g.enabled && (clearTimeout(this.hideTimer), this.followPointer = p(e)[0].series.tooltipOptions.followPointer, n = this.getAnchor(e,
                    f), f = n[0], b = n[1], !d || e.series && e.series.noSharedTooltip ? d = e.getLabelConfig() : (A(e, function (a) {
                    a.setState("hover");
                    h.push(a.getLabelConfig())
                }), d = {
                    x: e[0].category,
                    y: e[0].y
                }, d.points = h, e = e[0]), this.len = h.length, d = c.call(d, this), l = e.series, this.distance = r(l.tooltipOptions.distance, 16), !1 === d ? this.hide() : (c = this.getLabel(), this.isHidden && c.attr({opacity: 1}).show(), this.split ? this.renderSplit(d, p(a)) : (g.style.width || c.css({width: this.chart.spacingBox.width}), c.attr({text: d && d.join ? d.join("") : d}), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" +
                    r(e.colorIndex, l.colorIndex)), c.attr({stroke: g.borderColor || e.color || l.color || "#666666"}), this.updatePosition({
                    plotX: f,
                    plotY: b,
                    negative: e.negative,
                    ttBelow: e.ttBelow,
                    h: n[2] || 0
                })), this.isHidden = !1))
            }, renderSplit: function (f, d) {
                var c = this, g = [], b = this.chart, e = b.renderer, n = !0, h = this.options, l = 0, m = this.getLabel();
                a.isString(f) && (f = [!1, f]);
                A(f.slice(0, d.length + 1), function (a, f) {
                    if (!1 !== a) {
                        f = d[f - 1] || {isHeader: !0, plotX: d[0].plotX};
                        var u = f.series || c, q = u.tt, x = f.series || {}, F = "highcharts-color-" + r(f.colorIndex,
                                x.colorIndex, "none");
                        q || (u.tt = q = e.label(null, null, null, "callout", null, null, h.useHTML).addClass("highcharts-tooltip-box " + F).attr({
                            padding: h.padding,
                            r: h.borderRadius,
                            fill: h.backgroundColor,
                            stroke: h.borderColor || f.color || x.color || "#333333",
                            "stroke-width": h.borderWidth
                        }).add(m));
                        q.isActive = !0;
                        q.attr({text: a});
                        q.css(h.style).shadow(h.shadow);
                        a = q.getBBox();
                        x = a.width + q.strokeWidth();
                        f.isHeader ? (l = a.height, x = Math.max(0, Math.min(f.plotX + b.plotLeft - x / 2, b.chartWidth - x))) : x = f.plotX + b.plotLeft - r(h.distance, 16) -
                            x;
                        0 > x && (n = !1);
                        a = (f.series && f.series.yAxis && f.series.yAxis.pos) + (f.plotY || 0);
                        a -= b.plotTop;
                        g.push({
                            target: f.isHeader ? b.plotHeight + l : a,
                            rank: f.isHeader ? 1 : 0,
                            size: u.tt.getBBox().height + 1,
                            point: f,
                            x: x,
                            tt: q
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(g, b.plotHeight + l);
                A(g, function (a) {
                    var e = a.point, c = e.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: n || e.isHeader ? a.x : e.plotX + b.plotLeft + r(h.distance, 16),
                        y: a.pos + b.plotTop,
                        anchorX: e.isHeader ? e.plotX + b.plotLeft : e.plotX + c.xAxis.pos,
                        anchorY: e.isHeader ? a.pos +
                        b.plotTop - 15 : e.plotY + c.yAxis.pos
                    })
                })
            }, updatePosition: function (a) {
                var f = this.chart, c = this.getLabel(), c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
                this.move(Math.round(c.x), Math.round(c.y || 0), a.plotX + f.plotLeft, a.plotY + f.plotTop)
            }, getDateFormat: function (a, d, c, g) {
                var b = z("%m-%d %H:%M:%S.%L", d), e, n, h = {
                    millisecond: 15,
                    second: 12,
                    minute: 9,
                    hour: 6,
                    day: 3
                }, l = "millisecond";
                for (n in f) {
                    if (a === f.week && +z("%w", d) === c && "00:00:00.000" === b.substr(6)) {
                        n = "week";
                        break
                    }
                    if (f[n] > a) {
                        n = l;
                        break
                    }
                    if (h[n] &&
                        b.substr(h[n]) !== "01-01 00:00:00.000".substr(h[n]))break;
                    "week" !== n && (l = n)
                }
                n && (e = g[n]);
                return e
            }, getXDateFormat: function (a, f, c) {
                f = f.dateTimeLabelFormats;
                var g = c && c.closestPointRange;
                return (g ? this.getDateFormat(g, a.x, c.options.startOfWeek, f) : f.day) || f.year
            }, tooltipFooterHeaderFormatter: function (a, f) {
                f = f ? "footer" : "header";
                var c = a.series, g = c.tooltipOptions, b = g.xDateFormat, e = c.xAxis, n = e && "datetime" === e.options.type && d(a.key), l = g[f + "Format"];
                n && !b && (b = this.getXDateFormat(a, g, e));
                n && b && A(a.point && a.point.tooltipDateKeys ||
                    ["key"], function (a) {
                    l = l.replace("{point." + a + "}", "{point." + a + ":" + b + "}")
                });
                return h(l, {point: a, series: c})
            }, bodyFormatter: function (a) {
                return v(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.attr, y = a.charts, h = a.color, d = a.css, v = a.defined, t = a.each, r = a.extend, p = a.find, m = a.fireEvent, f = a.isObject, q = a.offset, l = a.pick, c = a.splat, g = a.Tooltip;
        a.Pointer = function (a, e) {
            this.init(a, e)
        };
        a.Pointer.prototype = {
            init: function (a, e) {
                this.options = e;
                this.chart = a;
                this.runChartClick = e.chart.events && !!e.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                g && (a.tooltip = new g(a, e.tooltip), this.followTouchMove = l(e.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function (a) {
                var b = this.chart, c = b.options.chart, g = c.zoomType || "", b = b.inverted;
                /touch/.test(a.type) && (g = l(c.pinchType, g));
                this.zoomX = a = /x/.test(g);
                this.zoomY = g = /y/.test(g);
                this.zoomHor =
                    a && !b || g && b;
                this.zoomVert = g && !b || a && b;
                this.hasZoom = a || g
            }, normalize: function (a, e) {
                var b;
                b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                e || (this.chartPosition = e = q(this.chart.container));
                return r(a, {chartX: Math.round(b.pageX - e.left), chartY: Math.round(b.pageY - e.top)})
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                t(this.chart.axes, function (e) {
                    b[e.isXAxis ? "xAxis" : "yAxis"].push({axis: e, value: e.toValue(a[e.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, findNearestKDPoint: function (a,
                                             e, c) {
                var b;
                t(a, function (a) {
                    var g = !(a.noSharedTooltip && e) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(c, g);
                    if ((g = f(a, !0)) && !(g = !f(b, !0)))var g = b.distX - a.distX, n = b.dist - a.dist, d = (a.series.group && a.series.group.zIndex) - (b.series.group && b.series.group.zIndex), g = 0 < (0 !== g && e ? g : 0 !== n ? n : 0 !== d ? d : b.series.index > a.series.index ? -1 : 1);
                    g && (b = a)
                });
                return b
            }, getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;)b = a.point, a = a.parentNode;
                return b
            }, getChartCoordinatesFromPoint: function (a, e) {
                var b =
                    a.series, c = b.xAxis, b = b.yAxis, g = l(a.clientX, a.plotX);
                if (c && b)return e ? {chartX: c.len + c.pos - g, chartY: b.len + b.pos - a.plotY} : {
                    chartX: g + c.pos,
                    chartY: a.plotY + b.pos
                }
            }, getHoverData: function (b, e, c, g, d, h, m) {
                var n, q = [], E = m && m.isBoosting;
                g = !(!g || !b);
                m = e && !e.stickyTracking ? [e] : a.grep(c, function (a) {
                    return a.visible && !(!d && a.directTouch) && l(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                e = (n = g ? b : this.findNearestKDPoint(m, d, h)) && n.series;
                n && (d && !e.noSharedTooltip ? (m = a.grep(c, function (a) {
                    return a.visible && !(!d &&
                        a.directTouch) && l(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), t(m, function (a) {
                    var b = p(a.points, function (a) {
                        return a.x === n.x && !a.isNull
                    });
                    f(b) && (E && (b = a.getPoint(b)), q.push(b))
                })) : q.push(n));
                return {hoverPoint: n, hoverSeries: e, hoverPoints: q}
            }, runPointActions: function (b, e) {
                var c = this.chart, g = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0, f = g ? g.shared : !1, d = e || c.hoverPoint, h = d && d.series || c.hoverSeries, h = this.getHoverData(d, h, c.series, !!e || h && h.directTouch && this.isDirectTouch, f, b, {isBoosting: c.isBoosting}),
                    u, d = h.hoverPoint;
                u = h.hoverPoints;
                e = (h = h.hoverSeries) && h.tooltipOptions.followPointer;
                f = f && h && !h.noSharedTooltip;
                if (d && (d !== c.hoverPoint || g && g.isHidden)) {
                    t(c.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, u) && b.setState()
                    });
                    t(u || [], function (a) {
                        a.setState("hover")
                    });
                    if (c.hoverSeries !== h)h.onMouseOver();
                    c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
                    if (!d.series)return;
                    d.firePointEvent("mouseOver");
                    c.hoverPoints = u;
                    c.hoverPoint = d;
                    g && g.refresh(f ? u : d, b)
                } else e && g && !g.isHidden && (d = g.getAnchor([{}],
                    b), g.updatePosition({plotX: d[0], plotY: d[1]}));
                this.unDocMouseMove || (this.unDocMouseMove = z(c.container.ownerDocument, "mousemove", function (b) {
                    var e = y[a.hoverChartIndex];
                    if (e)e.pointer.onDocumentMouseMove(b)
                }));
                t(c.axes, function (e) {
                    var c = l(e.crosshair.snap, !0), g = c ? a.find(u, function (a) {
                        return a.series[e.coll] === e
                    }) : void 0;
                    g || !c ? e.drawCrosshair(b, g) : e.hideCrosshair()
                })
            }, reset: function (a, e) {
                var b = this.chart, g = b.hoverSeries, f = b.hoverPoint, d = b.hoverPoints, h = b.tooltip, l = h && h.shared ? d : f;
                a && l && t(c(l), function (b) {
                    b.series.isCartesian &&
                    void 0 === b.plotX && (a = !1)
                });
                if (a)h && l && (h.refresh(l), f && (f.setState(f.state, !0), t(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, f)
                }))); else {
                    if (f)f.onMouseOut();
                    d && t(d, function (a) {
                        a.setState()
                    });
                    if (g)g.onMouseOut();
                    h && h.hide(e);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    t(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            }, scaleGroups: function (a, e) {
                var b = this.chart, c;
                t(b.series, function (g) {
                    c = a || g.getPlotBox();
                    g.xAxis && g.xAxis.zoomEnabled &&
                    g.group && (g.group.attr(c), g.markerGroup && (g.markerGroup.attr(c), g.markerGroup.clip(e ? b.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(c))
                });
                b.clipRect.attr(e || b.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, c = b.options.chart, g = a.chartX, f = a.chartY, d = this.zoomHor, l = this.zoomVert, u = b.plotLeft, m = b.plotTop, q = b.plotWidth, x = b.plotHeight, F, G = this.selectionMarker,
                    p = this.mouseDownX, k = this.mouseDownY, w = c.panKey && a[c.panKey + "Key"];
                G && G.touch || (g < u ? g = u : g > u + q && (g = u + q), f < m ? f = m : f > m + x && (f = m + x), this.hasDragged = Math.sqrt(Math.pow(p - g, 2) + Math.pow(k - f, 2)), 10 < this.hasDragged && (F = b.isInsidePlot(p - u, k - m), b.hasCartesianSeries && (this.zoomX || this.zoomY) && F && !w && !G && (this.selectionMarker = G = b.renderer.rect(u, m, d ? 1 : q, l ? 1 : x, 0).attr({
                    fill: c.selectionMarkerFill || h("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), G && d && (g -= p, G.attr({
                    width: Math.abs(g),
                    x: (0 < g ? 0 : g) + p
                })), G && l && (g = f - k, G.attr({
                    height: Math.abs(g),
                    y: (0 < g ? 0 : g) + k
                })), F && !G && c.panning && b.pan(a, c.panning)))
            }, drop: function (a) {
                var b = this, c = this.chart, g = this.hasPinched;
                if (this.selectionMarker) {
                    var f = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, h = this.selectionMarker, l = h.attr ? h.attr("x") : h.x, u = h.attr ? h.attr("y") : h.y, q = h.attr ? h.attr("width") : h.width, p = h.attr ? h.attr("height") : h.height, x;
                    if (this.hasDragged || g)t(c.axes, function (c) {
                        if (c.zoomEnabled && v(c.min) && (g || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                            var e =
                                c.horiz, d = "touchend" === a.type ? c.minPixelPadding : 0, k = c.toValue((e ? l : u) + d), e = c.toValue((e ? l + q : u + p) - d);
                            f[c.coll].push({axis: c, min: Math.min(k, e), max: Math.max(k, e)});
                            x = !0
                        }
                    }), x && m(c, "selection", f, function (a) {
                        c.zoom(r(a, g ? {animation: !1} : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    g && this.scaleGroups()
                }
                c && (d(c.container, {cursor: c._cursor}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                2 !== a.button && (a =
                    this.normalize(a), this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            }, onDocumentMouseUp: function (b) {
                y[a.hoverChartIndex] && y[a.hoverChartIndex].pointer.drop(b)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (b) {
                var c = y[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(),
                    c.pointer.chartPosition = null)
            }, onContainerMouseMove: function (b) {
                var c = this.chart;
                v(a.hoverChartIndex) && y[a.hoverChartIndex] && y[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            }, inClass: function (a, c) {
                for (var b; a;) {
                    if (b = A(a, "class")) {
                        if (-1 !== b.indexOf(c))return !0;
                        if (-1 !== b.indexOf("highcharts-container"))return !1
                    }
                    a =
                        a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker")))b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart, c = b.hoverPoint, g = b.plotLeft, f = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (m(c.series, "click", r(a, {point: c})),
                b.hoverPoint && c.firePointEvent("click", a)) : (r(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - g, a.chartY - f) && m(b, "click", a)))
            }, setDOMEvents: function () {
                var b = this, c = b.chart.container, g = c.ownerDocument;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = z(c, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = z(g, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = z(g, "touchend", b.onDocumentTouchEnd)))
            }, destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) {
                    b[c] = null
                })
            }
        }
    })(J);
    (function (a) {
        var z = a.charts, A = a.each, y = a.extend, h = a.map, d = a.noop, v = a.pick;
        y(a.Pointer.prototype, {
            pinchTranslate: function (a, d, h, m, f, q) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, h, m, f, q);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, h, m, f, q)
            }, pinchTranslateDirection: function (a, d, h, m, f, q, l, c) {
                var g = this.chart, b = a ? "x" : "y", e = a ? "X" : "Y", n = "chart" + e, p = a ? "width" : "height", r = g["plot" + (a ? "Left" : "Top")], E, t, u = c || 1, C = g.inverted, v = g.bounds[a ? "h" : "v"],
                    x = 1 === d.length, F = d[0][n], G = h[0][n], H = !x && d[1][n], k = !x && h[1][n], w;
                h = function () {
                    !x && 20 < Math.abs(F - H) && (u = c || Math.abs(G - k) / Math.abs(F - H));
                    t = (r - G) / u + F;
                    E = g["plot" + (a ? "Width" : "Height")] / u
                };
                h();
                d = t;
                d < v.min ? (d = v.min, w = !0) : d + E > v.max && (d = v.max - E, w = !0);
                w ? (G -= .8 * (G - l[b][0]), x || (k -= .8 * (k - l[b][1])), h()) : l[b] = [G, k];
                C || (q[b] = t - r, q[p] = E);
                q = C ? 1 / u : u;
                f[p] = E;
                f[b] = d;
                m[C ? a ? "scaleY" : "scaleX" : "scale" + e] = u;
                m["translate" + e] = q * r + (G - q * F)
            }, pinch: function (a) {
                var r = this, p = r.chart, m = r.pinchDown, f = a.touches, q = f.length, l = r.lastValidTouch,
                    c = r.hasZoom, g = r.selectionMarker, b = {}, e = 1 === q && (r.inClass(a.target, "highcharts-tracker") && p.runTrackerClick || r.runChartClick), n = {};
                1 < q && (r.initiated = !0);
                c && r.initiated && !e && a.preventDefault();
                h(f, function (a) {
                    return r.normalize(a)
                });
                "touchstart" === a.type ? (A(f, function (a, b) {
                    m[b] = {chartX: a.chartX, chartY: a.chartY}
                }), l.x = [m[0].chartX, m[1] && m[1].chartX], l.y = [m[0].chartY, m[1] && m[1].chartY], A(p.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = p.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, g = a.toPixels(v(a.options.min,
                            a.dataMin)), e = a.toPixels(v(a.options.max, a.dataMax)), f = Math.max(g, e);
                        b.min = Math.min(a.pos, Math.min(g, e) - c);
                        b.max = Math.max(a.pos + a.len, f + c)
                    }
                }), r.res = !0) : r.followTouchMove && 1 === q ? this.runPointActions(r.normalize(a)) : m.length && (g || (r.selectionMarker = g = y({
                    destroy: d,
                    touch: !0
                }, p.plotBox)), r.pinchTranslate(m, f, b, g, n, l), r.hasPinched = c, r.scaleGroups(b, n), r.res && (r.res = !1, this.reset(!1, 0)))
            }, touch: function (d, h) {
                var p = this.chart, m, f;
                if (p.index !== a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget: !0});
                a.hoverChartIndex = p.index;
                1 === d.touches.length ? (d = this.normalize(d), (f = p.isInsidePlot(d.chartX - p.plotLeft, d.chartY - p.plotTop)) && !p.openMenu ? (h && this.runPointActions(d), "touchmove" === d.type && (h = this.pinchDown, m = h[0] ? 4 <= Math.sqrt(Math.pow(h[0].chartX - d.chartX, 2) + Math.pow(h[0].chartY - d.chartY, 2)) : !1), v(m, !0) && this.pinch(d)) : h && this.reset()) : 2 === d.touches.length && this.pinch(d)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (d) {
                z[a.hoverChartIndex] &&
                z[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.charts, y = a.css, h = a.doc, d = a.extend, v = a.noop, t = a.Pointer, r = a.removeEvent, p = a.win, m = a.wrap;
        if (!a.hasTouch && (p.PointerEvent || p.MSPointerEvent)) {
            var f = {}, q = !!p.PointerEvent, l = function () {
                var c = [];
                c.item = function (a) {
                    return this[a]
                };
                a.objectEach(f, function (a) {
                    c.push({pageX: a.pageX, pageY: a.pageY, target: a.target})
                });
                return c
            }, c = function (c, b, e, f) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !A[a.hoverChartIndex] ||
                (f(c), f = A[a.hoverChartIndex].pointer, f[b]({
                    type: e,
                    target: c.currentTarget,
                    preventDefault: v,
                    touches: l()
                }))
            };
            d(t.prototype, {
                onContainerPointerDown: function (a) {
                    c(a, "onContainerTouchStart", "touchstart", function (a) {
                        f[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    c(a, "onContainerTouchMove", "touchmove", function (a) {
                        f[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                        f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) {
                    c(a,
                        "onDocumentTouchEnd", "touchend", function (a) {
                            delete f[a.pointerId]
                        })
                }, batchMSEvents: function (a) {
                    a(this.chart.container, q ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, q ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(h, q ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            m(t.prototype, "init", function (a, b, c) {
                a.call(this, b, c);
                this.hasZoom && y(b.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            m(t.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(z)
            });
            m(t.prototype, "destroy", function (a) {
                this.batchMSEvents(r);
                a.call(this)
            })
        }
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.css, y = a.discardElement, h = a.defined, d = a.each, v = a.isFirefox, t = a.marginNames, r = a.merge, p = a.pick, m = a.setAnimation, f = a.stableSort, q = a.win, l = a.wrap;
        a.Legend = function (a, g) {
            this.init(a, g)
        };
        a.Legend.prototype = {
            init: function (a, g) {
                this.chart = a;
                this.setOptions(g);
                g.enabled && (this.render(), z(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function (a) {
                var c = p(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = r(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = p(a.symbolWidth, 16);
                this.pages = []
            }, update: function (a, g) {
                var b = this.chart;
                this.setOptions(r(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                p(g, !0) && b.redraw()
            }, colorizeItem: function (a, g) {
                a.legendGroup[g ? "removeClass" :
                    "addClass"]("highcharts-legend-item-hidden");
                var b = this.options, c = a.legendItem, f = a.legendLine, d = a.legendSymbol, h = this.itemHiddenStyle.color, b = g ? b.itemStyle.color : h, l = g ? a.color || h : h, m = a.options && a.options.marker, u = {fill: l};
                c && c.css({fill: b, color: b});
                f && f.attr({stroke: l});
                d && (m && d.isMarker && (u = a.pointAttribs(), g || (u.stroke = u.fill = h)), d.attr(u))
            }, positionItem: function (a) {
                var c = this.options, b = c.symbolPadding, c = !c.rtl, e = a._legendItemPos, f = e[0], e = e[1], d = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ?
                    f : this.legendWidth - f - 2 * b - 4, e);
                d && (d.x = f, d.y = e)
            }, destroyItem: function (a) {
                var c = a.checkbox;
                d(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                c && y(a.checkbox)
            }, destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                d(this.getAllItems(), function (c) {
                    d(["legendItem", "legendGroup"], a, c)
                });
                d("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            }, positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr,
                    g, b = this.clipHeight || this.legendHeight, e = this.titleHeight;
                a && (g = a.translateY, d(this.allItems, function (c) {
                    var f = c.checkbox, d;
                    f && (d = g + e + f.y + (this.scrollOffset || 0) + 3, A(f, {
                        left: a.translateX + c.checkboxOffset + f.x - 20 + "px",
                        top: d + "px",
                        display: d > g - 6 && d < g + b - 6 ? "" : "none"
                    }))
                }, this))
            }, renderTitle: function () {
                var a = this.options, g = this.padding, b = a.title, e = 0;
                b.text && (this.title || (this.title = this.chart.renderer.label(b.text, g - 3, g - 4, null, null, null, a.useHTML, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group)),
                    a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: e}));
                this.titleHeight = e
            }, setText: function (c) {
                var g = this.options;
                c.legendItem.attr({text: g.labelFormat ? a.format(g.labelFormat, c) : g.labelFormatter.call(c)})
            }, renderItem: function (a) {
                var c = this.chart, b = c.renderer, e = this.options, f = "horizontal" === e.layout, d = this.symbolWidth, h = e.symbolPadding, l = this.itemStyle, m = this.itemHiddenStyle, u = this.padding, q = f ? p(e.itemDistance, 20) : 0, v = !e.rtl, x = e.width, F = e.itemMarginBottom ||
                    0, G = this.itemMarginTop, H = a.legendItem, k = !a.series, w = !k && a.series.drawLegendSymbol ? a.series : a, t = w.options, K = this.createCheckboxForItem && t && t.showCheckbox, t = d + h + q + (K ? 20 : 0), O = e.useHTML, L = a.options.className;
                H || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + w.type + "-series highcharts-color-" + a.colorIndex + (L ? " " + L : "") + (k ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = H = b.text("", v ? d + h : -h, this.baseline || 0, O).css(r(a.visible ? l : m)).attr({
                    align: v ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (d = l.fontSize, this.fontMetrics = b.fontMetrics(d, H), this.baseline = this.fontMetrics.f + 3 + G, H.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, w.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, H, O), K && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                l.width || H.css({width: (e.itemWidth || e.width || c.spacingBox.width) - t});
                this.setText(a);
                b = H.getBBox();
                l = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width +
                    t;
                this.itemHeight = b = Math.round(a.legendItemHeight || b.height || this.symbolHeight);
                f && this.itemX - u + l > (x || c.spacingBox.width - 2 * u - e.x) && (this.itemX = u, this.itemY += G + this.lastLineHeight + F, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, l);
                this.lastItemY = G + this.itemY + F;
                this.lastLineHeight = Math.max(b, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                f ? this.itemX += l : (this.itemY += G + b + F, this.lastLineHeight = b);
                this.offsetWidth = x || Math.max((f ? this.itemX - u - (a.checkbox ? 0 : q) : l) + u, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                d(this.chart.series, function (c) {
                    var b = c && c.options;
                    c && p(b.showInLegend, h(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                return a
            }, getAlignment: function () {
                var a = this.options;
                return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            }, adjustMargins: function (a, g) {
                var b = this.chart, c = this.options, f = this.getAlignment();
                f && d([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e, d) {
                    e.test(f) && !h(a[d]) && (b[t[d]] = Math.max(b[t[d]], b.legend[(d + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][d] * c[d % 2 ? "x" : "y"] + p(c.margin, 12) + g[d] + (0 === d ? b.titleOffset + b.options.title.margin : 0)))
                })
            }, render: function () {
                var a = this, g = a.chart, b = g.renderer, e = a.group, n, h, l, m, q = a.box, u = a.options, p = a.padding;
                a.itemX = p;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                e || (a.group = e = b.g("legend").attr({zIndex: 7}).add(), a.contentGroup = b.g().attr({zIndex: 1}).add(e), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                n = a.getAllItems();
                f(n, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                u.reversed && n.reverse();
                a.allItems = n;
                a.display = h = !!n.length;
                a.lastLineHeight = 0;
                d(n, function (b) {
                    a.renderItem(b)
                });
                l = (u.width || a.offsetWidth) + p;
                m = a.lastItemY + a.lastLineHeight + a.titleHeight;
                m = a.handleOverflow(m);
                m += p;
                q || (a.box = q = b.rect().addClass("highcharts-legend-box").attr({r: u.borderRadius}).add(e), q.isNew = !0);
                q.attr({
                    stroke: u.borderColor, "stroke-width": u.borderWidth || 0, fill: u.backgroundColor ||
                    "none"
                }).shadow(u.shadow);
                0 < l && 0 < m && (q[q.isNew ? "attr" : "animate"](q.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: l,
                    height: m
                }, q.strokeWidth())), q.isNew = !1);
                q[h ? "show" : "hide"]();
                a.legendWidth = l;
                a.legendHeight = m;
                d(n, function (b) {
                    a.positionItem(b)
                });
                h && (b = g.spacingBox, /(lth|ct|rth)/.test(a.getAlignment()) && (b = r(b, {y: b.y + g.titleOffset + g.options.title.margin})), e.align(r(u, {
                    width: l,
                    height: m
                }), !0, b));
                g.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var c = this, b = this.chart, e = b.renderer, f = this.options, h =
                    f.y, l = this.padding, b = b.spacingBox.height + ("top" === f.verticalAlign ? -h : h) - l, h = f.maxHeight, m, q = this.clipRect, u = f.navigation, C = p(u.animation, !0), r = u.arrowSize || 12, x = this.nav, F = this.pages, G, H = this.allItems, k = function (a) {
                    "number" === typeof a ? q.attr({height: a}) : q && (c.clipRect = q.destroy(), c.contentGroup.clip());
                    c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + l + "px,9999px," + (l + a) + "px,0)" : "auto")
                };
                "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (b /= 2);
                h && (b = Math.min(b, h));
                F.length =
                    0;
                a > b && !1 !== u.enabled ? (this.clipHeight = m = Math.max(b - 20 - this.titleHeight - l, 0), this.currentPage = p(this.currentPage, 1), this.fullHeight = a, d(H, function (a, b) {
                    var c = a._legendItemPos[1], e = Math.round(a.legendItem.getBBox().height), g = F.length;
                    if (!g || c - F[g - 1] > m && (G || c) !== F[g - 1])F.push(G || c), g++;
                    a.pageIx = g - 1;
                    G && (H[b - 1].pageIx = g - 1);
                    b === H.length - 1 && c + e - F[g - 1] > m && (F.push(c), a.pageIx = g);
                    c !== G && (G = c)
                }), q || (q = c.clipRect = e.clipRect(0, l, 9999, 0), c.contentGroup.clip(q)), k(m), x || (this.nav = x = e.g().attr({zIndex: 1}).add(this.group),
                    this.up = e.symbol("triangle", 0, 0, r, r).on("click", function () {
                        c.scroll(-1, C)
                    }).add(x), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation").css(u.style).add(x), this.down = e.symbol("triangle-down", 0, 0, r, r).on("click", function () {
                    c.scroll(1, C)
                }).add(x)), c.scroll(0), a = b) : x && (k(), this.nav = x.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, g) {
                var b = this.pages, c = b.length;
                a = this.currentPage + a;
                var f = this.clipHeight, d = this.options.navigation, h = this.pager,
                    l = this.padding;
                a > c && (a = c);
                0 < a && (void 0 !== g && m(g, this.chart), this.nav.attr({
                    translateX: l,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), h.attr({text: a + "/" + c}), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({fill: 1 === a ? d.inactiveColor : d.activeColor}).css({cursor: 1 === a ? "default" : "pointer"}), this.down.attr({
                    fill: a ===
                    c ? d.inactiveColor : d.activeColor
                }).css({cursor: a === c ? "default" : "pointer"}), this.scrollOffset = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, g) {
                var b = a.symbolHeight, c = a.options.squareSymbol;
                g.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, c ? b : a.symbolWidth, b, p(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(g.legendGroup)
            },
            drawLineMarker: function (a) {
                var c = this.options, b = c.marker, e = a.symbolWidth, f = a.symbolHeight, d = f / 2, h = this.chart.renderer, l = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var m;
                m = {"stroke-width": c.lineWidth || 0};
                c.dashStyle && (m.dashstyle = c.dashStyle);
                this.legendLine = h.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(m).add(l);
                b && !1 !== b.enabled && (c = Math.min(p(b.radius, d), d), 0 === this.symbol.indexOf("url") && (b = r(b, {
                    width: f,
                    height: f
                }), c = 0), this.legendSymbol = b = h.symbol(this.symbol, e /
                    2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(l), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(q.navigator.userAgent) || v) && l(a.Legend.prototype, "positionItem", function (a, g) {
            var b = this, c = function () {
                g._legendItemPos && a.call(b, g)
            };
            c();
            setTimeout(c)
        })
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.animate, y = a.animObject, h = a.attr, d = a.doc, v = a.Axis, t = a.createElement, r = a.defaultOptions, p = a.discardElement, m = a.charts, f = a.css, q = a.defined, l = a.each, c = a.extend, g = a.find, b = a.fireEvent, e = a.grep, n = a.isNumber, D = a.isObject, I =
            a.isString, E = a.Legend, M = a.marginNames, u = a.merge, C = a.objectEach, N = a.Pointer, x = a.pick, F = a.pInt, G = a.removeEvent, H = a.seriesTypes, k = a.splat, w = a.svg, P = a.syncTimeout, K = a.win, O = a.Chart = function () {
            this.getArgs.apply(this, arguments)
        };
        a.chart = function (a, b, c) {
            return new O(a, b, c)
        };
        c(O.prototype, {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (I(a[0]) || a[0].nodeName)this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, c) {
                var e, g, f = b.series, k = b.plotOptions || {};
                b.series = null;
                e = u(r, b);
                for (g in e.plotOptions)e.plotOptions[g].tooltip =
                    k[g] && u(k[g].tooltip) || void 0;
                e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                e.series = b.series = f;
                this.userOptions = b;
                b = e.chart;
                g = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {h: {}, v: {}};
                this.labelCollectors = [];
                this.callback = c;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var d = this;
                d.index = m.length;
                m.push(d);
                a.chartCount++;
                g && C(g, function (a, b) {
                    z(d, b, a)
                });
                d.xAxis = [];
                d.yAxis = [];
                d.pointCount = d.colorCounter = d.symbolCounter =
                    0;
                d.firstRender()
            }, initSeries: function (b) {
                var c = this.options.chart;
                (c = H[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            }, orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++)b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1))
            }, isInsidePlot: function (a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (e) {
                var g = this.axes, f = this.series, d = this.pointer, k = this.legend, x = this.isDirtyLegend,
                    h, n, w = this.hasCartesianSeries, m = this.isDirtyBox, u, q = this.renderer, F = q.isHidden(), G = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(e, this);
                F && this.temporaryDisplay();
                this.layOutTitles();
                for (e = f.length; e--;)if (u = f[e], u.options.stacking && (h = !0, u.isDirty)) {
                    n = !0;
                    break
                }
                if (n)for (e = f.length; e--;)u = f[e], u.options.stacking && (u.isDirty = !0);
                l(f, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), x = !0);
                    a.isDirtyData && b(a, "updatedData")
                });
                x && k.options.enabled &&
                (k.render(), this.isDirtyLegend = !1);
                h && this.getStacks();
                w && l(g, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                w && (l(g, function (a) {
                    a.isDirty && (m = !0)
                }), l(g, function (a) {
                    var e = a.min + "," + a.max;
                    a.extKey !== e && (a.extKey = e, G.push(function () {
                        b(a, "afterSetExtremes", c(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (m || h) && a.redraw()
                }));
                m && this.drawChartBox();
                b(this, "predraw");
                l(f, function (a) {
                    (m || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                d && d.reset(!0);
                q.draw();
                b(this, "redraw");
                b(this,
                    "render");
                F && this.temporaryDisplay(!0);
                l(G, function (a) {
                    a.call()
                })
            }, get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }

                var c, e = this.series, f;
                c = g(this.axes, b) || g(this.series, b);
                for (f = 0; !c && f < e.length; f++)c = g(e[f].points || [], b);
                return c
            }, getAxes: function () {
                var a = this, b = this.options, c = b.xAxis = k(b.xAxis || {}), b = b.yAxis = k(b.yAxis || {});
                l(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                l(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                l(c, function (b) {
                    new v(a, b)
                })
            }, getSelectedPoints: function () {
                var a =
                    [];
                l(this.series, function (b) {
                    a = a.concat(e(b.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return e(this.series, function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, c) {
                var e = this, g = e.options, f;
                f = g.title = u({style: {color: "#333333", fontSize: g.isStock ? "16px" : "18px"}}, g.title, a);
                g = g.subtitle = u({style: {color: "#666666"}}, g.subtitle, b);
                l([["title", a, f], ["subtitle", b, g]], function (a, b) {
                    var c = a[0], g = e[c], f = a[1];
                    a = a[2];
                    g && f && (e[c] = g = g.destroy());
                    a && !g && (e[c] = e.renderer.text(a.text,
                        0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), e[c].update = function (a) {
                        e.setTitle(!b && a, b && a)
                    }, e[c].css(a.style))
                });
                e.layOutTitles(c)
            }, layOutTitles: function (a) {
                var b = 0, e, g = this.renderer, f = this.spacingBox;
                l(["title", "subtitle"], function (a) {
                    var e = this[a], d = this.options[a];
                    a = "title" === a ? -3 : d.verticalAlign ? 0 : b + 2;
                    var k;
                    e && (k = d.style.fontSize, k = g.fontMetrics(k, e).b, e.css({width: (d.width || f.width + d.widthAdjust) + "px"}).align(c({y: a + k}, d), !1, "spacingBox"), d.floating ||
                    d.verticalAlign || (b = Math.ceil(b + e.getBBox(d.useHTML).height)))
                }, this);
                e = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && e && (this.isDirtyBox = e, this.hasRendered && x(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var b = this.options.chart, c = b.width, b = b.height, e = this.renderTo;
                q(c) || (this.containerWidth = a.getStyle(e, "width"));
                q(b) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b,
                        this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            }, temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)for (; c && c.style;)c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (d.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode; else for (; c && c.style;) {
                    d.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, d.body.appendChild(c));
                    if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached)c.hcOrigStyle = {
                        display: c.style.display,
                        height: c.style.height,
                        overflow: c.style.overflow
                    },
                        b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                    c = c.parentNode;
                    if (c === d.body)break
                }
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, e = this.options, g = e.chart, f, k;
                b = this.renderTo;
                var x = a.uniqueKey(), l;
                b || (this.renderTo = b = g.renderTo);
                I(b) && (this.renderTo = b = d.getElementById(b));
                b || a.error(13, !0);
                f = F(h(b, "data-highcharts-chart"));
                n(f) && m[f] &&
                m[f].hasRendered && m[f].destroy();
                h(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                g.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                f = this.chartWidth;
                k = this.chartHeight;
                l = c({
                    position: "relative",
                    overflow: "hidden",
                    width: f + "px",
                    height: k + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, g.style);
                this.container = b = t("div", {id: x}, l, b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[g.renderer] || a.Renderer)(b, f, k, null, g.forExport,
                    e.exporting && e.exporting.allowHTML);
                this.setClassName(g.className);
                this.renderer.setStyle(g.style);
                this.renderer.chartIndex = this.index
            }, getMargins: function (a) {
                var b = this.spacing, c = this.margin, e = this.titleOffset;
                this.resetMargins();
                e && !q(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.adjustPlotArea &&
                this.adjustPlotArea();
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin;
                a.hasCartesianSeries && l(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                l(M, function (e, g) {
                    q(c[g]) || (a[e] += b[g])
                });
                a.setChartSize()
            }, reflow: function (b) {
                var c = this, e = c.options.chart, g = c.renderTo, f = q(e.width) && q(e.height), k = e.width || a.getStyle(g, "width"), e = e.height || a.getStyle(g, "height"), g = b ? b.target : K;
                if (!f && !c.isPrinting && k && e && (g === K || g === d)) {
                    if (k !== c.containerWidth || e !== c.containerHeight)clearTimeout(c.reflowTimeout),
                        c.reflowTimeout = P(function () {
                            c.container && c.setSize(void 0, void 0, !1)
                        }, b ? 100 : 0);
                    c.containerWidth = k;
                    c.containerHeight = e
                }
            }, initReflow: function () {
                var a = this, b;
                b = z(K, "resize", function (b) {
                    a.reflow(b)
                });
                z(a, "destroy", b)
            }, setSize: function (c, e, g) {
                var k = this, d = k.renderer;
                k.isResizing += 1;
                a.setAnimation(g, k);
                k.oldChartHeight = k.chartHeight;
                k.oldChartWidth = k.chartWidth;
                void 0 !== c && (k.options.chart.width = c);
                void 0 !== e && (k.options.chart.height = e);
                k.getChartSize();
                c = d.globalAnimation;
                (c ? A : f)(k.container, {
                    width: k.chartWidth +
                    "px", height: k.chartHeight + "px"
                }, c);
                k.setChartSize(!0);
                d.setSize(k.chartWidth, k.chartHeight, g);
                l(k.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                k.isDirtyLegend = !0;
                k.isDirtyBox = !0;
                k.layOutTitles();
                k.getMargins();
                k.redraw(g);
                k.oldChartHeight = null;
                b(k, "resize");
                P(function () {
                    k && b(k, "endResize", null, function () {
                        --k.isResizing
                    })
                }, y(c).duration)
            }, setChartSize: function (a) {
                var b = this.inverted, c = this.renderer, e = this.chartWidth, g = this.chartHeight, f = this.options.chart, k = this.spacing, d = this.clipOffset, x, h, n, w;
                this.plotLeft =
                    x = Math.round(this.plotLeft);
                this.plotTop = h = Math.round(this.plotTop);
                this.plotWidth = n = Math.max(0, Math.round(e - x - this.marginRight));
                this.plotHeight = w = Math.max(0, Math.round(g - h - this.marginBottom));
                this.plotSizeX = b ? w : n;
                this.plotSizeY = b ? n : w;
                this.plotBorderWidth = f.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {x: k[3], y: k[0], width: e - k[3] - k[1], height: g - k[0] - k[2]};
                this.plotBox = c.plotBox = {x: x, y: h, width: n, height: w};
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(e, d[3]) / 2);
                c = Math.ceil(Math.max(e,
                        d[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(e, d[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, d[2]) / 2 - c))
                };
                a || l(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                l(["margin", "spacing"], function (c) {
                    var e = b[c], g = D(e) ? e : [e, e, e, e];
                    l(["Top", "Right", "Bottom", "Left"], function (e, f) {
                        a[c][f] = x(b[c + e], g[f])
                    })
                });
                l(M, function (b, c) {
                    a[b] = x(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset =
                    [0, 0, 0, 0]
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, c = this.chartWidth, e = this.chartHeight, g = this.chartBackground, f = this.plotBackground, k = this.plotBorder, d, x = this.plotBGImage, h = a.backgroundColor, n = a.plotBackgroundColor, l = a.plotBackgroundImage, w, m = this.plotLeft, u = this.plotTop, q = this.plotWidth, F = this.plotHeight, G = this.plotBox, p = this.clipRect, C = this.clipBox, H = "animate";
                g || (this.chartBackground = g = b.rect().addClass("highcharts-background").add(), H = "attr");
                d = a.borderWidth || 0;
                w = d + (a.shadow ?
                        8 : 0);
                h = {fill: h || "none"};
                if (d || g["stroke-width"])h.stroke = a.borderColor, h["stroke-width"] = d;
                g.attr(h).shadow(a.shadow);
                g[H]({x: w / 2, y: w / 2, width: c - w - d % 2, height: e - w - d % 2, r: a.borderRadius});
                H = "animate";
                f || (H = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add());
                f[H](G);
                f.attr({fill: n || "none"}).shadow(a.plotShadow);
                l && (x ? x.animate(G) : this.plotBGImage = b.image(l, m, u, q, F).add());
                p ? p.animate({width: C.width, height: C.height}) : this.clipRect = b.clipRect(C);
                H = "animate";
                k || (H = "attr", this.plotBorder =
                    k = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                k.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
                k[H](k.crisp({x: m, y: u, width: q, height: F}, -k.strokeWidth()));
                this.isDirtyBox = !1
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, c, e = a.options.series, g, f;
                l(["inverted", "angular", "polar"], function (k) {
                    c = H[b.type || b.defaultSeriesType];
                    f = b[k] || c && c.prototype[k];
                    for (g = e && e.length; !f && g--;)(c = H[e[g].type]) && c.prototype[k] && (f = !0);
                    a[k] = f
                })
            }, linkSeries: function () {
                var a =
                    this, b = a.series;
                l(b, function (a) {
                    a.linkedSeries.length = 0
                });
                l(b, function (b) {
                    var c = b.options.linkedTo;
                    I(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = x(b.options.visible, c.options.visible, b.visible))
                })
            }, renderSeries: function () {
                l(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            }, renderLabels: function () {
                var a = this, b = a.options.labels;
                b.items && l(b.items, function (e) {
                    var g = c(b.style, e.style), f = F(g.left) + a.plotLeft, k = F(g.top) +
                        a.plotTop + 12;
                    delete g.left;
                    delete g.top;
                    a.renderer.text(e.html, f, k).attr({zIndex: 2}).css(g).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, c = this.options, e, g, f;
                this.setTitle();
                this.legend = new E(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                l(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                g = 1.1 < c / this.plotWidth;
                f = 1.05 < e / this.plotHeight;
                if (g || f)l(a, function (a) {
                    (a.horiz && g || !a.horiz &&
                    f) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && l(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                console.log("addCredits..");
            }, destroy: function () {
                var c = this, e = c.axes, g = c.series, f = c.container, k, d = f && f.parentNode;
                b(c, "destroy");
                c.renderer.forExport ? a.erase(m, c) : m[c.index] = void 0;
                a.chartCount--;
                c.renderTo.removeAttribute("data-highcharts-chart");
                G(c);
                for (k = e.length; k--;)e[k] = e[k].destroy();
                this.scroller && this.scroller.destroy &&
                this.scroller.destroy();
                for (k = g.length; k--;)g[k] = g[k].destroy();
                l("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var b = c[a];
                    b && b.destroy && (c[a] = b.destroy())
                });
                f && (f.innerHTML = "", G(f), d && p(f));
                C(c, function (a, b) {
                    delete c[b]
                })
            }, isReadyToRender: function () {
                var a = this;
                return w || K != K.top || "complete" === d.readyState ? !0 : (d.attachEvent("onreadystatechange", function () {
                    d.detachEvent("onreadystatechange",
                        a.firstRender);
                    "complete" === d.readyState && a.firstRender()
                }), !1)
            }, firstRender: function () {
                var a = this, c = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    b(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    l(c.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    b(a, "beforeRender");
                    N && (a.pointer = new N(a, c));
                    a.render();
                    if (!a.renderer.imgCount && a.onload)a.onload();
                    a.temporaryDisplay(!0)
                }
            }, onload: function () {
                l([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index &&
                    a.apply(this, [this])
                }, this);
                b(this, "load");
                b(this, "render");
                q(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(J);
    (function (a) {
        var z, A = a.each, y = a.extend, h = a.erase, d = a.fireEvent, v = a.format, t = a.isArray, r = a.isNumber, p = a.pick, m = a.removeEvent;
        a.Point = z = function () {
        };
        a.Point.prototype = {
            init: function (a, d, h) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, h);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter],
                    d = d.length, h = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : h = a.colorIndex;
                this.colorIndex = p(this.colorIndex, h);
                a.chart.pointCount++;
                return this
            }, applyOptions: function (a, d) {
                var f = this.series, c = f.options.pointValKey || f.pointValKey;
                a = z.prototype.optionsToObject.call(this, a);
                y(this, a);
                this.options = this.options ? y(this.options, a) : a;
                a.group && delete this.group;
                c && (this.y = this[c]);
                this.isNull = p(this.isValid && !this.isValid(), null === this.x || !r(this.y, !0));
                this.selected && (this.state =
                    "select");
                "name" in this && void 0 === d && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
                void 0 === this.x && f && (this.x = void 0 === d ? f.autoIncrement(this) : d);
                return this
            }, optionsToObject: function (a) {
                var f = {}, d = this.series, c = d.options.keys, g = c || d.pointArrayMap || ["y"], b = g.length, e = 0, h = 0;
                if (r(a) || null === a)f[g[0]] = a; else if (t(a))for (!c && a.length > b && (d = typeof a[0], "string" === d ? f.name = a[0] : "number" === d && (f.x = a[0]), e++); h < b;)c && void 0 === a[e] || (f[g[h]] = a[e]), e++, h++; else"object" === typeof a && (f = a, a.dataLabels &&
                (d._hasPointLabels = !0), a.marker && (d._hasPointMarkers = !0));
                return f
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            }, getZone: function () {
                var a = this.series,
                    d = a.zones, a = a.zoneAxis || "y", h = 0, c;
                for (c = d[h]; this[a] >= c.value;)c = d[++h];
                c && c.color && !this.options.color && (this.color = c.color);
                return c
            }, destroy: function () {
                var a = this.series.chart, d = a.hoverPoints, l;
                a.pointCount--;
                d && (this.setState(), h(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint)this.onMouseOut();
                if (this.graphic || this.dataLabel)m(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (l in this)this[l] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel",
                    "dataLabelUpper", "connector", "shadowGroup"], d, h = 6; h--;)d = a[h], this[d] && (this[d] = this[d].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var d = this.series, f = d.tooltipOptions, c = p(f.valueDecimals, ""), g = f.valuePrefix || "", b = f.valueSuffix || "";
                A(d.pointArrayMap || ["y"], function (e) {
                    e = "{point." +
                        e;
                    if (g || b)a = a.replace(e + "}", g + e + "}" + b);
                    a = a.replace(e + "}", e + ":,." + c + "f}")
                });
                return v(a, {point: this, series: this.series})
            }, firePointEvent: function (a, h, m) {
                var c = this, g = this.series.options;
                (g.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && g.allowPointSelect && (m = function (a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                d(this, a, h, m)
            }, visible: !0
        }
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.animObject, y = a.arrayMax, h = a.arrayMin, d = a.correctFloat,
            v = a.Date, t = a.defaultOptions, r = a.defaultPlotOptions, p = a.defined, m = a.each, f = a.erase, q = a.extend, l = a.fireEvent, c = a.grep, g = a.isArray, b = a.isNumber, e = a.isString, n = a.merge, D = a.objectEach, I = a.pick, E = a.removeEvent, M = a.splat, u = a.SVGElement, C = a.syncTimeout, N = a.win;
        a.Series = a.seriesType("line", null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {duration: 1E3},
                events: {},
                marker: {
                    lineWidth: 0, lineColor: "#ffffff", radius: 4, states: {
                        hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1}, select: {
                            fillColor: "#cccccc",
                            lineColor: "#000000", lineWidth: 2
                        }
                    }
                },
                point: {events: {}},
                dataLabels: {
                    align: "center",
                    formatter: function () {
                        return null === this.y ? "" : a.numberFormat(this.y, -1)
                    },
                    style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    hover: {animation: {duration: 50}, lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}},
                    select: {marker: {}}
                },
                stickyTracking: !0,
                turboThreshold: 1E3,
                findNearestPointBy: "x"
            },
            {
                isCartesian: !0,
                pointClass: a.Point,
                sorted: !0,
                requireSorting: !0,
                directTouch: !1,
                axisTypes: ["xAxis", "yAxis"],
                colorCounter: 0,
                parallelArrays: ["x", "y"],
                coll: "series",
                init: function (a, b) {
                    var c = this, e, g = a.series, d;
                    c.chart = a;
                    c.options = b = c.setOptions(b);
                    c.linkedSeries = [];
                    c.bindAxes();
                    q(c, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
                    e = b.events;
                    D(e, function (a, b) {
                        z(c, b, a)
                    });
                    if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)a.runTrackerClick = !0;
                    c.getColor();
                    c.getSymbol();
                    m(c.parallelArrays, function (a) {
                        c[a + "Data"] = []
                    });
                    c.setData(b.data, !1);
                    c.isCartesian && (a.hasCartesianSeries = !0);
                    g.length && (d = g[g.length - 1]);
                    c._i = I(d && d._i, -1) + 1;
                    a.orderSeries(this.insert(g))
                },
                insert: function (a) {
                    var c = this.options.index, e;
                    if (b(c)) {
                        for (e = a.length; e--;)if (c >= I(a[e].options.index, a[e]._i)) {
                            a.splice(e + 1, 0, this);
                            break
                        }
                        -1 === e && a.unshift(this);
                        e += 1
                    } else a.push(this);
                    return I(e, a.length - 1)
                },
                bindAxes: function () {
                    var b = this, c = b.options, e = b.chart, g;
                    m(b.axisTypes || [], function (d) {
                        m(e[d],
                            function (a) {
                                g = a.options;
                                if (c[d] === g.index || void 0 !== c[d] && c[d] === g.id || void 0 === c[d] && 0 === g.index)b.insert(a.series), b[d] = a, a.isDirty = !0
                            });
                        b[d] || b.optionalAxis === d || a.error(18, !0)
                    })
                },
                updateParallelArrays: function (a, c) {
                    var e = a.series, g = arguments, d = b(c) ? function (b) {
                        var g = "y" === b && e.toYData ? e.toYData(a) : a[b];
                        e[b + "Data"][c] = g
                    } : function (a) {
                        Array.prototype[c].apply(e[a + "Data"], Array.prototype.slice.call(g, 2))
                    };
                    m(e.parallelArrays, d)
                },
                autoIncrement: function () {
                    var b = this.options, c = this.xIncrement, e, g = b.pointIntervalUnit,
                        d = 0, c = I(c, b.pointStart, 0);
                    this.pointInterval = e = I(this.pointInterval, b.pointInterval, 1);
                    g && (b = new v(c), "day" === g ? b = +b[v.hcSetDate](b[v.hcGetDate]() + e) : "month" === g ? b = +b[v.hcSetMonth](b[v.hcGetMonth]() + e) : "year" === g && (b = +b[v.hcSetFullYear](b[v.hcGetFullYear]() + e)), v.hcHasTimeZone && (d = a.getTZOffset(b) - a.getTZOffset(c)), e = b - c + d);
                    this.xIncrement = c + e;
                    return c
                },
                setOptions: function (a) {
                    var b = this.chart, c = b.options, e = c.plotOptions, g = (b.userOptions || {}).plotOptions || {}, d = e[this.type];
                    this.userOptions = a;
                    b = n(d,
                        e.series, a);
                    this.tooltipOptions = n(t.tooltip, t.plotOptions.series && t.plotOptions.series.tooltip, t.plotOptions[this.type].tooltip, c.tooltip.userOptions, e.series && e.series.tooltip, e[this.type].tooltip, a.tooltip);
                    this.stickyTracking = I(a.stickyTracking, g[this.type] && g[this.type].stickyTracking, g.series && g.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                    null === d.marker && delete b.marker;
                    this.zoneAxis = b.zoneAxis;
                    a = this.zones = (b.zones || []).slice();
                    !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                        value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                        className: "highcharts-negative",
                        color: b.negativeColor,
                        fillColor: b.negativeFillColor
                    });
                    a.length && p(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
                    return b
                },
                getCyclic: function (a, b, c) {
                    var e, g = this.chart, d = this.userOptions, f = a + "Index", h = a + "Counter", n = c ? c.length : I(g.options.chart[a + "Count"], g[a + "Count"]);
                    b || (e = I(d[f], d["_" + f]), p(e) || (g.series.length || (g[h] = 0), d["_" + f] = e = g[h] % n, g[h] += 1),
                    c && (b = c[e]));
                    void 0 !== e && (this[f] = e);
                    this[a] = b
                },
                getColor: function () {
                    this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || r[this.type].color, this.chart.options.colors)
                },
                getSymbol: function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
                setData: function (c, d, f, h) {
                    var k = this, n = k.points, x = n && n.length || 0, l, u = k.options, q = k.chart, p = null, F = k.xAxis, C = u.turboThreshold, G = this.xData, r =
                        this.yData, E = (l = k.pointArrayMap) && l.length;
                    c = c || [];
                    l = c.length;
                    d = I(d, !0);
                    if (!1 !== h && l && x === l && !k.cropped && !k.hasGroupedData && k.visible)m(c, function (a, b) {
                        n[b].update && a !== u.data[b] && n[b].update(a, !1, null, !1)
                    }); else {
                        k.xIncrement = null;
                        k.colorCounter = 0;
                        m(this.parallelArrays, function (a) {
                            k[a + "Data"].length = 0
                        });
                        if (C && l > C) {
                            for (f = 0; null === p && f < l;)p = c[f], f++;
                            if (b(p))for (f = 0; f < l; f++)G[f] = this.autoIncrement(), r[f] = c[f]; else if (g(p))if (E)for (f = 0; f < l; f++)p = c[f], G[f] = p[0], r[f] = p.slice(1, E + 1); else for (f = 0; f < l; f++)p =
                                c[f], G[f] = p[0], r[f] = p[1]; else a.error(12)
                        } else for (f = 0; f < l; f++)void 0 !== c[f] && (p = {series: k}, k.pointClass.prototype.applyOptions.apply(p, [c[f]]), k.updateParallelArrays(p, f));
                        r && e(r[0]) && a.error(14, !0);
                        k.data = [];
                        k.options.data = k.userOptions.data = c;
                        for (f = x; f--;)n[f] && n[f].destroy && n[f].destroy();
                        F && (F.minRange = F.userMinRange);
                        k.isDirty = q.isDirtyBox = !0;
                        k.isDirtyData = !!n;
                        f = !1
                    }
                    "point" === u.legendType && (this.processData(), this.generatePoints());
                    d && q.redraw(f)
                },
                processData: function (b) {
                    var c = this.xData, e = this.yData,
                        g = c.length, d;
                    d = 0;
                    var f, h, n = this.xAxis, x, m = this.options;
                    x = m.cropThreshold;
                    var l = this.getExtremesFromAll || m.getExtremesFromAll, u = this.isCartesian, m = n && n.val2lin, q = n && n.isLog, p = this.requireSorting, C, r;
                    if (u && !this.isDirty && !n.isDirty && !this.yAxis.isDirty && !b)return !1;
                    n && (b = n.getExtremes(), C = b.min, r = b.max);
                    if (u && this.sorted && !l && (!x || g > x || this.forceCrop))if (c[g - 1] < C || c[0] > r)c = [], e = []; else if (c[0] < C || c[g - 1] > r)d = this.cropData(this.xData, this.yData, C, r), c = d.xData, e = d.yData, d = d.start, f = !0;
                    for (x = c.length ||
                        1; --x;)g = q ? m(c[x]) - m(c[x - 1]) : c[x] - c[x - 1], 0 < g && (void 0 === h || g < h) ? h = g : 0 > g && p && (a.error(15), p = !1);
                    this.cropped = f;
                    this.cropStart = d;
                    this.processedXData = c;
                    this.processedYData = e;
                    this.closestPointRange = h
                },
                cropData: function (a, b, c, e) {
                    var g = a.length, d = 0, f = g, h = I(this.cropShoulder, 1), n;
                    for (n = 0; n < g; n++)if (a[n] >= c) {
                        d = Math.max(0, n - h);
                        break
                    }
                    for (c = n; c < g; c++)if (a[c] > e) {
                        f = c + h;
                        break
                    }
                    return {xData: a.slice(d, f), yData: b.slice(d, f), start: d, end: f}
                },
                generatePoints: function () {
                    var a = this.options, b = a.data, c = this.data, e, g = this.processedXData,
                        d = this.processedYData, f = this.pointClass, h = g.length, n = this.cropStart || 0, m, l = this.hasGroupedData, a = a.keys, u, p = [], q;
                    c || l || (c = [], c.length = b.length, c = this.data = c);
                    a && l && (this.options.keys = !1);
                    for (q = 0; q < h; q++)m = n + q, l ? (u = (new f).init(this, [g[q]].concat(M(d[q]))), u.dataGroup = this.groupMap[q]) : (u = c[m]) || void 0 === b[m] || (c[m] = u = (new f).init(this, b[m], g[q])), u && (u.index = m, p[q] = u);
                    this.options.keys = a;
                    if (c && (h !== (e = c.length) || l))for (q = 0; q < e; q++)q !== n || l || (q += h), c[q] && (c[q].destroyElements(), c[q].plotX = void 0);
                    this.data = c;
                    this.points = p
                },
                getExtremes: function (a) {
                    var c = this.yAxis, e = this.processedXData, d, f = [], n = 0;
                    d = this.xAxis.getExtremes();
                    var x = d.min, m = d.max, l, u, q, p;
                    a = a || this.stackedYData || this.processedYData || [];
                    d = a.length;
                    for (p = 0; p < d; p++)if (u = e[p], q = a[p], l = (b(q, !0) || g(q)) && (!c.positiveValuesOnly || q.length || 0 < q), u = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (e[p + 1] || u) >= x && (e[p - 1] || u) <= m, l && u)if (l = q.length)for (; l--;)"number" === typeof q[l] && (f[n++] = q[l]); else f[n++] = q;
                    this.dataMin =
                        h(f);
                    this.dataMax = y(f)
                },
                translate: function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var a = this.options, c = a.stacking, e = this.xAxis, g = e.categories, f = this.yAxis, h = this.points, n = h.length, m = !!this.modifyValue, l = a.pointPlacement, u = "between" === l || b(l), q = a.threshold, C = a.startFromThreshold ? q : 0, r, E, v, t, M = Number.MAX_VALUE;
                    "between" === l && (l = .5);
                    b(l) && (l *= I(a.pointRange || e.pointRange));
                    for (a = 0; a < n; a++) {
                        var D = h[a], N = D.x, y = D.y;
                        E = D.low;
                        var z = c && f.stacks[(this.negStacks && y < (C ? 0 : q) ? "-" : "") + this.stackKey],
                            A;
                        f.positiveValuesOnly && null !== y && 0 >= y && (D.isNull = !0);
                        D.plotX = r = d(Math.min(Math.max(-1E5, e.translate(N, 0, 0, 0, 1, l, "flags" === this.type)), 1E5));
                        c && this.visible && !D.isNull && z && z[N] && (t = this.getStackIndicator(t, N, this.index), A = z[N], y = A.points[t.key], E = y[0], y = y[1], E === C && t.key === z[N].base && (E = I(q, f.min)), f.positiveValuesOnly && 0 >= E && (E = null), D.total = D.stackTotal = A.total, D.percentage = A.total && D.y / A.total * 100, D.stackY = y, A.setOffset(this.pointXOffset || 0, this.barW || 0));
                        D.yBottom = p(E) ? f.translate(E, 0, 1, 0, 1) :
                            null;
                        m && (y = this.modifyValue(y, D));
                        D.plotY = E = "number" === typeof y && Infinity !== y ? Math.min(Math.max(-1E5, f.translate(y, 0, 1, 0, 1)), 1E5) : void 0;
                        D.isInside = void 0 !== E && 0 <= E && E <= f.len && 0 <= r && r <= e.len;
                        D.clientX = u ? d(e.translate(N, 0, 0, 0, 1, l)) : r;
                        D.negative = D.y < (q || 0);
                        D.category = g && void 0 !== g[D.x] ? g[D.x] : D.x;
                        D.isNull || (void 0 !== v && (M = Math.min(M, Math.abs(r - v))), v = r);
                        D.zone = this.zones.length && D.getZone()
                    }
                    this.closestPointRangePx = M
                },
                getValidPoints: function (a, b) {
                    var e = this.chart;
                    return c(a || this.points || [], function (a) {
                        return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !a.isNull
                    })
                },
                setClip: function (a) {
                    var b = this.chart, c = this.options, e = b.renderer, g = b.inverted, d = this.clipBox, f = d || b.clipBox, h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, c.xAxis, c.yAxis].join(), n = b[h], x = b[h + "m"];
                    n || (a && (f.width = 0, g && (f.x = b.plotSizeX), b[h + "m"] = x = e.clipRect(g ? b.plotSizeX + 99 : -99, g ? -b.plotLeft : -b.plotTop, 99, g ? b.chartWidth : b.chartHeight)), b[h] = n = e.clipRect(f), n.count = {length: 0});
                    a && !n.count[this.index] && (n.count[this.index] = !0, n.count.length += 1);
                    !1 !== c.clip && (this.group.clip(a || d ? n : b.clipRect), this.markerGroup.clip(x), this.sharedClipKey = h);
                    a || (n.count[this.index] && (delete n.count[this.index], --n.count.length), 0 === n.count.length && h && b[h] && (d || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
                },
                animate: function (a) {
                    var b = this.chart, c = A(this.options.animation), e;
                    a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
                        width: b.plotSizeX,
                        x: 0
                    }, c), b[e + "m"] && b[e + "m"].animate({width: b.plotSizeX + 99, x: 0}, c), this.animate =
                        null)
                },
                afterAnimate: function () {
                    this.setClip();
                    l(this, "afterAnimate");
                    this.finishedAnimating = !0
                },
                drawPoints: function () {
                    var a = this.points, b = this.chart, c, e, g, d, f = this.options.marker, h, n, m, l = this[this.specialGroup] || this.markerGroup, u, q = I(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * f.radius);
                    if (!1 !== f.enabled || this._hasPointMarkers)for (c = 0; c < a.length; c++)e = a[c], d = e.graphic, h = e.marker || {}, n = !!e.marker, g = q && void 0 === h.enabled || h.enabled, m = e.isInside, g && !e.isNull ? (g = I(h.symbol, this.symbol),
                        e.hasImage = 0 === g.indexOf("url"), u = this.markerAttribs(e, e.selected && "select"), d ? d[m ? "show" : "hide"](!0).animate(u) : m && (0 < u.width || e.hasImage) && (e.graphic = d = b.renderer.symbol(g, u.x, u.y, u.width, u.height, n ? h : f).add(l)), d && d.attr(this.pointAttribs(e, e.selected && "select")), d && d.addClass(e.getClassName(), !0)) : d && (e.graphic = d.destroy())
                },
                markerAttribs: function (a, b) {
                    var c = this.options.marker, e = a.marker || {}, g = I(e.radius, c.radius);
                    b && (c = c.states[b], b = e.states && e.states[b], g = I(b && b.radius, c && c.radius, g + (c && c.radiusPlus ||
                        0)));
                    a.hasImage && (g = 0);
                    a = {x: Math.floor(a.plotX) - g, y: a.plotY - g};
                    g && (a.width = a.height = 2 * g);
                    return a
                },
                pointAttribs: function (a, b) {
                    var c = this.options.marker, e = a && a.options, g = e && e.marker || {}, d = this.color, f = e && e.color, h = a && a.color, e = I(g.lineWidth, c.lineWidth);
                    a = a && a.zone && a.zone.color;
                    d = f || a || h || d;
                    a = g.fillColor || c.fillColor || d;
                    d = g.lineColor || c.lineColor || d;
                    b && (c = c.states[b], b = g.states && g.states[b] || {}, e = I(b.lineWidth, c.lineWidth, e + I(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, d = b.lineColor ||
                        c.lineColor || d);
                    return {stroke: d, "stroke-width": e, fill: a}
                },
                destroy: function () {
                    var a = this, b = a.chart, c = /AppleWebKit\/533/.test(N.navigator.userAgent), e, g, d = a.data || [], h, n;
                    l(a, "destroy");
                    E(a);
                    m(a.axisTypes || [], function (b) {
                        (n = a[b]) && n.series && (f(n.series, a), n.isDirty = n.forceRedraw = !0)
                    });
                    a.legendItem && a.chart.legend.destroyItem(a);
                    for (g = d.length; g--;)(h = d[g]) && h.destroy && h.destroy();
                    a.points = null;
                    clearTimeout(a.animationTimeout);
                    D(a, function (a, b) {
                        a instanceof u && !a.survive && (e = c && "group" === b ? "hide" : "destroy",
                            a[e]())
                    });
                    b.hoverSeries === a && (b.hoverSeries = null);
                    f(b.series, a);
                    b.orderSeries();
                    D(a, function (b, c) {
                        delete a[c]
                    })
                },
                getGraphPath: function (a, b, c) {
                    var e = this, g = e.options, d = g.step, f, h = [], n = [], l;
                    a = a || e.points;
                    (f = a.reversed) && a.reverse();
                    (d = {right: 1, center: 2}[d] || d && 3) && f && (d = 4 - d);
                    !g.connectNulls || b || c || (a = this.getValidPoints(a));
                    m(a, function (f, k) {
                        var m = f.plotX, u = f.plotY, x = a[k - 1];
                        (f.leftCliff || x && x.rightCliff) && !c && (l = !0);
                        f.isNull && !p(b) && 0 < k ? l = !g.connectNulls : f.isNull && !b ? l = !0 : (0 === k || l ? k = ["M", f.plotX, f.plotY] :
                            e.getPointSpline ? k = e.getPointSpline(a, f, k) : d ? (k = 1 === d ? ["L", x.plotX, u] : 2 === d ? ["L", (x.plotX + m) / 2, x.plotY, "L", (x.plotX + m) / 2, u] : ["L", m, x.plotY], k.push("L", m, u)) : k = ["L", m, u], n.push(f.x), d && n.push(f.x), h.push.apply(h, k), l = !1)
                    });
                    h.xMap = n;
                    return e.graphPath = h
                },
                drawGraph: function () {
                    var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this), e = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
                    m(this.zones, function (c, g) {
                        e.push(["zone-graph-" + g, "highcharts-graph highcharts-zone-graph-" +
                        g + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                    });
                    m(e, function (e, g) {
                        var d = e[0], f = a[d];
                        f ? (f.endX = a.preventGraphAnimation ? null : c.xMap, f.animate({d: c})) : c.length && (a[d] = a.chart.renderer.path(c).addClass(e[1]).attr({zIndex: 1}).add(a.group), f = {
                            stroke: e[2],
                            "stroke-width": b.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, e[3] ? f.dashstyle = e[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[d].attr(f).shadow(2 > g && b.shadow));
                        f && (f.startX = c.xMap, f.isArea = c.isArea)
                    })
                },
                applyZones: function () {
                    var a = this, b = this.chart, c = b.renderer, e = this.zones, g, d, f = this.clips || [], h, n = this.graph, l = this.area, u = Math.max(b.chartWidth, b.chartHeight), q = this[(this.zoneAxis || "y") + "Axis"], p, C, r = b.inverted, E, v, t, D, M = !1;
                    e.length && (n || l) && q && void 0 !== q.min && (C = q.reversed, E = q.horiz, n && n.hide(), l && l.hide(), p = q.getExtremes(), m(e, function (e, k) {
                        g = C ? E ? b.plotWidth : 0 : E ? 0 : q.toPixels(p.min);
                        g = Math.min(Math.max(I(d, g), 0), u);
                        d = Math.min(Math.max(Math.round(q.toPixels(I(e.value, p.max), !0)), 0), u);
                        M && (g = d = q.toPixels(p.max));
                        v = Math.abs(g - d);
                        t = Math.min(g, d);
                        D = Math.max(g, d);
                        q.isXAxis ? (h = {
                            x: r ? D : t,
                            y: 0,
                            width: v,
                            height: u
                        }, E || (h.x = b.plotHeight - h.x)) : (h = {
                            x: 0,
                            y: r ? D : t,
                            width: u,
                            height: v
                        }, E && (h.y = b.plotWidth - h.y));
                        r && c.isVML && (h = q.isXAxis ? {
                            x: 0,
                            y: C ? t : D,
                            height: h.width,
                            width: b.chartWidth
                        } : {x: h.y - b.plotLeft - b.spacingBox.x, y: 0, width: h.height, height: b.chartHeight});
                        f[k] ? f[k].animate(h) : (f[k] = c.clipRect(h), n && a["zone-graph-" + k].clip(f[k]), l && a["zone-area-" + k].clip(f[k]));
                        M = e.value > p.max
                    }), this.clips = f)
                },
                invertGroups: function (a) {
                    function b() {
                        m(["group",
                            "markerGroup"], function (b) {
                            c[b] && (e.renderer.isVML && c[b].attr({
                                width: c.yAxis.len,
                                height: c.xAxis.len
                            }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                        })
                    }

                    var c = this, e = c.chart, g;
                    c.xAxis && (g = z(e, "resize", b), z(c, "destroy", g), b(a), c.invertGroups = b)
                },
                plotGroup: function (a, b, c, e, g) {
                    var d = this[a], f = !d;
                    f && (this[a] = d = this.chart.renderer.g().attr({zIndex: e || .1}).add(g));
                    d.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (p(this.colorIndex) ? "highcharts-color-" +
                        this.colorIndex + " " : "") + (this.options.className || "") + (d.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                    d.attr({visibility: c})[f ? "attr" : "animate"](this.getPlotBox());
                    return d
                },
                getPlotBox: function () {
                    var a = this.chart, b = this.xAxis, c = this.yAxis;
                    a.inverted && (b = c, c = this.xAxis);
                    return {
                        translateX: b ? b.left : a.plotLeft,
                        translateY: c ? c.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                render: function () {
                    var a = this, b = a.chart, c, e = a.options, g = !!a.animate && b.renderer.isSVG && A(e.animation).duration, d = a.visible ? "inherit" :
                        "hidden", f = e.zIndex, h = a.hasRendered, n = b.seriesGroup, l = b.inverted;
                    c = a.plotGroup("group", "series", d, f, n);
                    a.markerGroup = a.plotGroup("markerGroup", "markers", d, f, n);
                    g && a.animate(!0);
                    c.inverted = a.isCartesian ? l : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.drawDataLabels && a.drawDataLabels();
                    a.visible && a.drawPoints();
                    a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                    a.invertGroups(l);
                    !1 === e.clip || a.sharedClipKey || h || c.clip(b.clipRect);
                    g && a.animate();
                    h || (a.animationTimeout = C(function () {
                            a.afterAnimate()
                        },
                        g));
                    a.isDirty = !1;
                    a.hasRendered = !0
                },
                redraw: function () {
                    var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, e = this.xAxis, g = this.yAxis;
                    c && (a.inverted && c.attr({
                        width: a.plotWidth,
                        height: a.plotHeight
                    }), c.animate({translateX: I(e && e.left, a.plotLeft), translateY: I(g && g.top, a.plotTop)}));
                    this.translate();
                    this.render();
                    b && delete this.kdTree
                },
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function (a, b) {
                    var c = this.xAxis, e = this.yAxis, g = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: g ? c.len - a.chartY +
                        c.pos : a.chartX - c.pos, plotY: g ? e.len - a.chartX + e.pos : a.chartY - e.pos
                    }, b)
                },
                buildKDTree: function () {
                    function a(c, e, g) {
                        var d, f;
                        if (f = c && c.length)return d = b.kdAxisArray[e % g], c.sort(function (a, b) {
                            return a[d] - b[d]
                        }), f = Math.floor(f / 2), {
                            point: c[f],
                            left: a(c.slice(0, f), e + 1, g),
                            right: a(c.slice(f + 1), e + 1, g)
                        }
                    }

                    this.buildingKdTree = !0;
                    var b = this, c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete b.kdTree;
                    C(function () {
                        b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                        b.buildingKdTree = !1
                    }, b.options.kdNow ? 0 : 1)
                },
                searchKDTree: function (a, b) {
                    function c(a, b, k, h) {
                        var n = b.point, l = e.kdAxisArray[k % h], m, u, q = n;
                        u = p(a[g]) && p(n[g]) ? Math.pow(a[g] - n[g], 2) : null;
                        m = p(a[d]) && p(n[d]) ? Math.pow(a[d] - n[d], 2) : null;
                        m = (u || 0) + (m || 0);
                        n.dist = p(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                        n.distX = p(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                        l = a[l] - n[l];
                        m = 0 > l ? "left" : "right";
                        u = 0 > l ? "right" : "left";
                        b[m] && (m = c(a, b[m], k + 1, h), q = m[f] < q[f] ? m : n);
                        b[u] && Math.sqrt(l * l) < q[f] && (a = c(a, b[u], k + 1, h), q = a[f] < q[f] ? a : q);
                        return q
                    }

                    var e = this, g = this.kdAxisArray[0], d = this.kdAxisArray[1],
                        f = b ? "distX" : "dist";
                    b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree();
                    if (this.kdTree)return c(a, this.kdTree, b, b)
                }
            })
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.animate, y = a.Axis, h = a.createElement, d = a.css, v = a.defined, t = a.each, r = a.erase, p = a.extend, m = a.fireEvent, f = a.inArray, q = a.isNumber, l = a.isObject, c = a.isArray, g = a.merge, b = a.objectEach, e = a.pick, n = a.Point, D = a.Series, I = a.seriesTypes, E = a.setAnimation, M = a.splat;
        p(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var g,
                    d = this;
                a && (b = e(b, !0), m(d, "addSeries", {options: a}, function () {
                    g = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    b && d.redraw(c)
                }));
                return g
            },
            addAxis: function (a, b, c, d) {
                var f = b ? "xAxis" : "yAxis", h = this.options;
                a = g(a, {index: this[f].length, isX: b});
                b = new y(this, a);
                h[f] = M(h[f] || {});
                h[f].push(a);
                e(c, !0) && this.redraw(d);
                return b
            },
            showLoading: function (a) {
                var b = this, c = b.options, e = b.loadingDiv, g = c.loading, f = function () {
                    e && d(e, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                };
                e || (b.loadingDiv = e = h("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = h("span", {className: "highcharts-loading-inner"}, null, e), z(b, "redraw", f));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                d(e, p(g.style, {zIndex: 10}));
                d(b.loadingSpan, g.labelStyle);
                b.loadingShown || (d(e, {
                    opacity: 0,
                    display: ""
                }), A(e, {opacity: g.style.opacity || .5}, {duration: g.showDuration || 0}));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function () {
                var a = this.options, b =
                    this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", A(b, {opacity: 0}, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        d(b, {display: "none"})
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
            update: function (a, c, d) {
                var h = this, n = {
                    credits: "addCredits",
                    title: "setTitle",
                    subtitle: "setSubtitle"
                }, l = a.chart, m, k, u = [];
                if (l) {
                    g(!0, h.options.chart, l);
                    "className" in l && h.setClassName(l.className);
                    if ("inverted" in l || "polar" in l)h.propFromSeries(), m = !0;
                    "alignTicks" in l && (m = !0);
                    b(l, function (a, b) {
                        -1 !== f("chart." + b, h.propsRequireUpdateSeries) && (k = !0);
                        -1 !== f(b, h.propsRequireDirtyBox) && (h.isDirtyBox = !0)
                    });
                    "style" in l && h.renderer.setStyle(l.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && g(!0,
                    this.options.plotOptions, a.plotOptions);
                b(a, function (a, b) {
                    if (h[b] && "function" === typeof h[b].update)h[b].update(a, !1); else if ("function" === typeof h[n[b]])h[n[b]](a);
                    "chart" !== b && -1 !== f(b, h.propsRequireUpdateSeries) && (k = !0)
                });
                t("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && (t(M(a[b]), function (a, c) {
                        (c = v(a.id) && h.get(a.id) || h[b][c]) && c.coll === b && (c.update(a, !1), d && (c.touched = !0));
                        if (!c && d)if ("series" === b)h.addSeries(a, !1).touched = !0; else if ("xAxis" === b || "yAxis" === b)h.addAxis(a,
                            "xAxis" === b, !1).touched = !0
                    }), d && t(h[b], function (a) {
                        a.touched ? delete a.touched : u.push(a)
                    }))
                });
                t(u, function (a) {
                    a.remove(!1)
                });
                m && t(h.axes, function (a) {
                    a.update({}, !1)
                });
                k && t(h.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && g(!0, h.options.loading, a.loading);
                m = l && l.width;
                l = l && l.height;
                q(m) && m !== h.chartWidth || q(l) && l !== h.chartHeight ? h.setSize(m, l) : e(c, !0) && h.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        p(n.prototype, {
            update: function (a, b, c, g) {
                function d() {
                    f.applyOptions(a);
                    null === f.y && k &&
                    (f.graphic = k.destroy());
                    l(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (f.graphic = k.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()), f.connector && (f.connector = f.connector.destroy()));
                    n = f.index;
                    h.updateParallelArrays(f, n);
                    u.data[n] = l(u.data[n], !0) || l(a, !0) ? f.options : a;
                    h.isDirty = h.isDirtyData = !0;
                    !h.fixedBox && h.hasCartesianSeries && (m.isDirtyBox = !0);
                    "point" === u.legendType && (m.isDirtyLegend = !0);
                    b && m.redraw(c)
                }

                var f = this, h = f.series, k = f.graphic, n, m = h.chart, u = h.options;
                b = e(b, !0);
                !1 === g ? d() : f.firePointEvent("update", {options: a}, d)
            }, remove: function (a, b) {
                this.series.removePoint(f(this, this.series.data), a, b)
            }
        });
        p(D.prototype, {
            addPoint: function (a, b, c, g) {
                var d = this.options, f = this.data, h = this.chart, k = this.xAxis, k = k && k.hasNames && k.names, n = d.data, l, m, u = this.xData, q, p;
                b = e(b, !0);
                l = {series: this};
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                p = l.x;
                q = u.length;
                if (this.requireSorting && p < u[q - 1])for (m = !0; q && u[q - 1] > p;)q--;
                this.updateParallelArrays(l, "splice", q, 0, 0);
                this.updateParallelArrays(l,
                    q);
                k && l.name && (k[p] = l.name);
                n.splice(q, 0, a);
                m && (this.data.splice(q, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(l, "shift"), n.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && h.redraw(g)
            }, removePoint: function (a, b, c) {
                var g = this, d = g.data, f = d[a], h = g.points, k = g.chart, n = function () {
                    h && h.length === d.length && h.splice(a, 1);
                    d.splice(a, 1);
                    g.options.data.splice(a, 1);
                    g.updateParallelArrays(f || {series: g}, "splice",
                        a, 1);
                    f && f.destroy();
                    g.isDirty = !0;
                    g.isDirtyData = !0;
                    b && k.redraw()
                };
                E(c, k);
                b = e(b, !0);
                f ? f.firePointEvent("remove", null, n) : n()
            }, remove: function (a, b, c) {
                function g() {
                    d.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    e(a, !0) && f.redraw(b)
                }

                var d = this, f = d.chart;
                !1 !== c ? m(d, "remove", null, g) : g()
            }, update: function (a, b) {
                var c = this, f = c.chart, d = c.userOptions, h = c.oldType || c.type, n = a.type || d.type || f.options.chart.type, k = I[h].prototype, l, m = ["group", "markerGroup", "dataLabelsGroup"], u = ["navigatorSeries", "baseSeries"],
                    q = c.finishedAnimating && {animation: !1};
                if (Object.keys && "data" === Object.keys(a).toString())return this.setData(a.data, b);
                u = m.concat(u);
                t(u, function (a) {
                    u[a] = c[a];
                    delete c[a]
                });
                a = g(d, q, {index: c.index, pointStart: c.xData[0]}, {data: c.options.data}, a);
                c.remove(!1, null, !1);
                for (l in k)c[l] = void 0;
                p(c, I[n || h].prototype);
                t(u, function (a) {
                    c[a] = u[a]
                });
                c.init(f, a);
                a.zIndex !== d.zIndex && t(m, function (b) {
                    c[b] && c[b].attr({zIndex: a.zIndex})
                });
                c.oldType = h;
                f.linkSeries();
                e(b, !0) && f.redraw(!1)
            }
        });
        p(y.prototype, {
            update: function (a,
                              b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = g(this.userOptions, a);
                this.destroy(!0);
                this.init(c, p(a, {events: void 0}));
                c.isDirtyBox = !0;
                e(b, !0) && c.redraw()
            }, remove: function (a) {
                for (var b = this.chart, g = this.coll, f = this.series, d = f.length; d--;)f[d] && f[d].remove(!1);
                r(b.axes, this);
                r(b[g], this);
                c(b.options[g]) ? b.options[g].splice(this.options.index, 1) : delete b.options[g];
                t(b[g], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                e(a, !0) && b.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a},
                    b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(J);
    (function (a) {
        var z = a.animObject, A = a.color, y = a.each, h = a.extend, d = a.isNumber, v = a.merge, t = a.pick, r = a.Series, p = a.seriesType, m = a.svg;
        p("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {hover: {halo: !1, brightness: .1}, select: {color: "#cccccc", borderColor: "#000000"}},
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                r.prototype.init.apply(this, arguments);
                var a = this, d = a.chart;
                d.hasRendered && y(d.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this, d = a.options, h = a.xAxis, c = a.yAxis, g = h.reversed, b, e = {}, n = 0;
                !1 === d.grouping ? n = 1 : y(a.chart.series, function (g) {
                    var d = g.options, f = g.yAxis, h;
                    g.type !== a.type || !g.visible &&
                    a.chart.options.chart.ignoreHiddenSeries || c.len !== f.len || c.pos !== f.pos || (d.stacking ? (b = g.stackKey, void 0 === e[b] && (e[b] = n++), h = e[b]) : !1 !== d.grouping && (h = n++), g.columnIndex = h)
                });
                var m = Math.min(Math.abs(h.transA) * (h.ordinalSlope || d.pointRange || h.closestPointRange || h.tickInterval || 1), h.len), p = m * d.groupPadding, r = (m - 2 * p) / (n || 1), d = Math.min(d.maxPointWidth || h.len, t(d.pointWidth, r * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (r - d) / 2 + (p + ((a.columnIndex || 0) + (g ? 1 : 0)) * r - m / 2) * (g ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, d, h, c) {
                var g = this.chart, b = this.borderWidth, e = -(b % 2 ? .5 : 0), b = b % 2 ? .5 : 1;
                g.inverted && g.renderer.isVML && (b += 1);
                this.options.crisp && (h = Math.round(a + h) + e, a = Math.round(a) + e, h -= a);
                c = Math.round(d + c) + b;
                e = .5 >= Math.abs(d) && .5 < c;
                d = Math.round(d) + b;
                c -= d;
                e && c && (--d, c += 1);
                return {x: a, y: d, width: h, height: c}
            },
            translate: function () {
                var a = this, d = a.chart, h = a.options, c = a.dense = 2 > a.closestPointRange * a.xAxis.transA, c = a.borderWidth = t(h.borderWidth, c ? 0 : 1), g = a.yAxis, b = h.threshold, e = a.translatedThreshold = g.getThreshold(b),
                    n = t(h.minPointLength, 5), m = a.getColumnMetrics(), p = m.width, E = a.barW = Math.max(p, 1 + 2 * c), v = a.pointXOffset = m.offset;
                d.inverted && (e -= .5);
                h.pointPadding && (E = Math.ceil(E));
                r.prototype.translate.apply(a);
                y(a.points, function (c) {
                    var f = t(c.yBottom, e), h = 999 + Math.abs(f), h = Math.min(Math.max(-h, c.plotY), g.len + h), m = c.plotX + v, l = E, u = Math.min(h, f), q, k = Math.max(h, f) - u;
                    n && Math.abs(k) < n && (k = n, q = !g.reversed && !c.negative || g.reversed && c.negative, c.y === b && a.dataMax <= b && g.min < b && (q = !q), u = Math.abs(u - e) > n ? f - n : e - (q ? n : 0));
                    c.barX =
                        m;
                    c.pointWidth = p;
                    c.tooltipPos = d.inverted ? [g.len + g.pos - d.plotLeft - h, a.xAxis.len - m - l / 2, k] : [m + l / 2, h + g.pos - d.plotTop, k];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [m, e, l, 0] : [m, u, l, k])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, d) {
                var f = this.options, c, g = this.pointAttrToOptions || {};
                c = g.stroke || "borderColor";
                var b = g["stroke-width"] || "borderWidth",
                    e = a && a.color || this.color, h = a && a[c] || f[c] || this.color || e, m = a && a[b] || f[b] || this[b] || 0, g = f.dashStyle;
                a && this.zones.length && (e = a.getZone(), e = a.options.color || e && e.color || this.color);
                d && (a = v(f.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, e = a.color || void 0 !== d && A(e).brighten(a.brightness).get() || e, h = a[c] || h, m = a[b] || m, g = a.dashStyle || g);
                c = {fill: e, stroke: h, "stroke-width": m};
                g && (c.dashstyle = g);
                return c
            },
            drawPoints: function () {
                var a = this, h = this.chart, m = a.options, c = h.renderer, g = m.animationLimit ||
                    250, b;
                y(a.points, function (e) {
                    var f = e.graphic;
                    if (d(e.plotY) && null !== e.y) {
                        b = e.shapeArgs;
                        if (f)f[h.pointCount < g ? "animate" : "attr"](v(b)); else e.graphic = f = c[e.shapeType](b).add(e.group || a.group);
                        m.borderRadius && f.attr({r: m.borderRadius});
                        f.attr(a.pointAttribs(e, e.selected && "select")).shadow(m.shadow, null, m.stacking && !m.borderRadius);
                        f.addClass(e.getClassName(), !0)
                    } else f && (e.graphic = f.destroy())
                })
            },
            animate: function (a) {
                var d = this, f = this.yAxis, c = d.options, g = this.chart.inverted, b = {}, e = g ? "translateX" : "translateY",
                    n;
                m && (a ? (b.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(c.threshold))), g ? b.translateX = a - f.len : b.translateY = a, d.group.attr(b)) : (n = d.group.attr(e), d.group.animate({scaleY: 1}, h(z(d.options.animation), {
                    step: function (a, c) {
                        b[e] = n + c.pos * (f.pos - n);
                        d.group.attr(b)
                    }
                })), d.animate = null))
            },
            remove: function () {
                var a = this, d = a.chart;
                d.hasRendered && y(d.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                r.prototype.remove.apply(a, arguments)
            }
        })
    })(J);
    (function (a) {
        var z = a.Series;
        a = a.seriesType;
        a("scatter",
            "line", {
                lineWidth: 0,
                findNearestPointBy: "xy",
                marker: {enabled: !0},
                tooltip: {
                    headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                    pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
                }
            }, {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function () {
                    this.options.lineWidth &&
                    z.prototype.drawGraph.call(this)
                }
            })
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.arrayMax, y = a.defined, h = a.each, d = a.extend, v = a.format, t = a.map, r = a.merge, p = a.noop, m = a.pick, f = a.relativeLength, q = a.Series, l = a.seriesTypes, c = a.stableSort;
        a.distribute = function (a, b) {
            function e(a, b) {
                return a.target - b.target
            }

            var g, d = !0, f = a, l = [], p;
            p = 0;
            for (g = a.length; g--;)p += a[g].size;
            if (p > b) {
                c(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = g = 0; p <= b;)p += a[g].size, g++;
                l = a.splice(g - 1, a.length)
            }
            c(a, e);
            for (a = t(a, function (a) {
                return {
                    size: a.size,
                    targets: [a.target], align: m(a.align, .5)
                }
            }); d;) {
                for (g = a.length; g--;)d = a[g], p = (Math.min.apply(0, d.targets) + Math.max.apply(0, d.targets)) / 2, d.pos = Math.min(Math.max(0, p - d.size * d.align), b - d.size);
                g = a.length;
                for (d = !1; g--;)0 < g && a[g - 1].pos + a[g - 1].size > a[g].pos && (a[g - 1].size += a[g].size, a[g - 1].targets = a[g - 1].targets.concat(a[g].targets), a[g - 1].align = .5, a[g - 1].pos + a[g - 1].size > b && (a[g - 1].pos = b - a[g - 1].size), a.splice(g, 1), d = !0)
            }
            g = 0;
            h(a, function (a) {
                var b = 0;
                h(a.targets, function () {
                    f[g].pos = a.pos + b;
                    b += f[g].size;
                    g++
                })
            });
            f.push.apply(f, l);
            c(f, e)
        };
        q.prototype.drawDataLabels = function () {
            function c(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }

            var b = this, e = b.options, d = e.dataLabels, f = b.points, l, p, q = b.hasRendered || 0, u, t, A = m(d.defer, !!e.animation), x = b.chart.renderer;
            if (d.enabled || b._hasPointLabels)b.dlProcessOptions && b.dlProcessOptions(d), t = b.plotGroup("dataLabelsGroup",
                "data-labels", A && !q ? "hidden" : "visible", d.zIndex || 6), A && (t.attr({opacity: +q}), q || z(b, "afterAnimate", function () {
                b.visible && t.show(!0);
                t[e.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })), p = d, h(f, function (g) {
                var f, h = g.dataLabel, k, n, q = g.connector, E = !h, C;
                l = g.dlOptions || g.options && g.options.dataLabels;
                (f = m(l && l.enabled, p.enabled) && !g.isNull) && (f = !0 === c(g, l || d));
                f && (d = r(p, l), k = g.getLabelConfig(), C = d[g.formatPrefix + "Format"] || d.format, u = y(C) ? v(C, k) : (d[g.formatPrefix + "Formatter"] || d.formatter).call(k,
                    d), C = d.style, k = d.rotation, C.color = m(d.color, C.color, b.color, "#000000"), "contrast" === C.color && (g.contrastColor = x.getContrast(g.color || b.color), C.color = d.inside || 0 > m(g.labelDistance, d.distance) || e.stacking ? g.contrastColor : "#000000"), e.cursor && (C.cursor = e.cursor), n = {
                    fill: d.backgroundColor,
                    stroke: d.borderColor,
                    "stroke-width": d.borderWidth,
                    r: d.borderRadius || 0,
                    rotation: k,
                    padding: d.padding,
                    zIndex: 1
                }, a.objectEach(n, function (a, b) {
                    void 0 === a && delete n[b]
                }));
                !h || f && y(u) ? f && y(u) && (h ? n.text = u : (h = g.dataLabel = k ?
                    x.text(u, 0, -9999).addClass("highcharts-data-label") : x.label(u, 0, -9999, d.shape, null, null, d.useHTML, null, "data-label"), h.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (d.className || "") + (d.useHTML ? "highcharts-tracker" : ""))), h.attr(n), h.css(C).shadow(d.shadow), h.added || h.add(t), b.alignDataLabel(g, h, d, null, E)) : (g.dataLabel = h = h.destroy(), q && (g.connector = q.destroy()))
            })
        };
        q.prototype.alignDataLabel = function (a, b, c, f, h) {
            var e = this.chart, g = e.inverted, n = m(a.dlBox && a.dlBox.centerX, a.plotX, -9999), l =
                m(a.plotY, -9999), p = b.getBBox(), q, r = c.rotation, v = c.align, t = this.visible && (a.series.forceDL || e.isInsidePlot(n, Math.round(l), g) || f && e.isInsidePlot(n, g ? f.x + 1 : f.y + f.height - 1, g)), D = "justify" === m(c.overflow, "justify");
            if (t && (q = c.style.fontSize, q = e.renderer.fontMetrics(q, b).b, f = d({
                    x: g ? this.yAxis.len - l : n,
                    y: Math.round(g ? this.xAxis.len - n : l),
                    width: 0,
                    height: 0
                }, f), d(c, {width: p.width, height: p.height}), r ? (D = !1, n = e.renderer.rotCorr(q, r), n = {
                    x: f.x + c.x + f.width / 2 + n.x, y: f.y + c.y + {top: 0, middle: .5, bottom: 1}[c.verticalAlign] *
                    f.height
                }, b[h ? "attr" : "animate"](n).attr({align: v}), l = (r + 720) % 360, l = 180 < l && 360 > l, "left" === v ? n.y -= l ? p.height : 0 : "center" === v ? (n.x -= p.width / 2, n.y -= p.height / 2) : "right" === v && (n.x -= p.width, n.y -= l ? 0 : p.height)) : (b.align(c, null, f), n = b.alignAttr), D ? a.isLabelJustified = this.justifyDataLabel(b, c, n, p, f, h) : m(c.crop, !0) && (t = e.isInsidePlot(n.x, n.y) && e.isInsidePlot(n.x + p.width, n.y + p.height)), c.shape && !r))b[h ? "attr" : "animate"]({
                anchorX: g ? e.plotWidth - a.plotY : a.plotX,
                anchorY: g ? e.plotHeight - a.plotX : a.plotY
            });
            t || (b.attr({y: -9999}),
                b.placed = !1)
        };
        q.prototype.justifyDataLabel = function (a, b, c, d, f, h) {
            var e = this.chart, g = b.align, n = b.verticalAlign, m, l, p = a.box ? 0 : a.padding || 0;
            m = c.x + p;
            0 > m && ("right" === g ? b.align = "left" : b.x = -m, l = !0);
            m = c.x + d.width - p;
            m > e.plotWidth && ("left" === g ? b.align = "right" : b.x = e.plotWidth - m, l = !0);
            m = c.y + p;
            0 > m && ("bottom" === n ? b.verticalAlign = "top" : b.y = -m, l = !0);
            m = c.y + d.height - p;
            m > e.plotHeight && ("top" === n ? b.verticalAlign = "bottom" : b.y = e.plotHeight - m, l = !0);
            l && (a.placed = !h, a.align(b, null, f));
            return l
        };
        l.pie && (l.pie.prototype.drawDataLabels =
            function () {
                var c = this, b = c.data, e, d = c.chart, f = c.options.dataLabels, l = m(f.connectorPadding, 10), p = m(f.connectorWidth, 1), r = d.plotWidth, u = d.plotHeight, v, t = c.center, x = t[2] / 2, F = t[1], z, H, k, w, P = [[], []], K, O, L, J, B = [0, 0, 0, 0];
                c.visible && (f.enabled || c._hasPointLabels) && (h(b, function (a) {
                    a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), a.dataLabel.shortened = !1)
                }), q.prototype.drawDataLabels.apply(c), h(b, function (a) {
                    a.dataLabel && a.visible && (P[a.half].push(a),
                        a.dataLabel._pos = null)
                }), h(P, function (b, g) {
                    var n, p, q = b.length, v = [], E;
                    if (q)for (c.sortByAngle(b, g - .5), 0 < c.maxLabelDistance && (n = Math.max(0, F - x - c.maxLabelDistance), p = Math.min(F + x + c.maxLabelDistance, d.plotHeight), h(b, function (a) {
                        0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, F - x - a.labelDistance), a.bottom = Math.min(F + x + a.labelDistance, d.plotHeight), E = a.dataLabel.getBBox().height || 21, a.positionsIndex = v.push({
                                target: a.labelPos[1] - a.top + E / 2,
                                size: E,
                                rank: a.y
                            }) - 1)
                    }), a.distribute(v, p + E - n)), J = 0; J < q; J++)e = b[J],
                        p = e.positionsIndex, k = e.labelPos, z = e.dataLabel, L = !1 === e.visible ? "hidden" : "inherit", O = n = k[1], v && y(v[p]) && (void 0 === v[p].pos ? L = "hidden" : (w = v[p].size, O = e.top + v[p].pos)), delete e.positionIndex, K = f.justify ? t[0] + (g ? -1 : 1) * (x + e.labelDistance) : c.getX(O < e.top + 2 || O > e.bottom - 2 ? n : O, g, e), z._attr = {
                        visibility: L,
                        align: k[6]
                    }, z._pos = {
                        x: K + f.x + ({left: l, right: -l}[k[6]] || 0),
                        y: O + f.y - 10
                    }, k.x = K, k.y = O, m(f.crop, !0) && (H = z.getBBox().width, n = null, K - H < l ? (n = Math.round(H - K + l), B[3] = Math.max(n, B[3])) : K + H > r - l && (n = Math.round(K + H - r + l),
                        B[1] = Math.max(n, B[1])), 0 > O - w / 2 ? B[0] = Math.max(Math.round(-O + w / 2), B[0]) : O + w / 2 > u && (B[2] = Math.max(Math.round(O + w / 2 - u), B[2])), z.sideOverflow = n)
                }), 0 === A(B) || this.verifyDataLabelOverflow(B)) && (this.placeDataLabels(), p && h(this.points, function (a) {
                    var b;
                    v = a.connector;
                    if ((z = a.dataLabel) && z._pos && a.visible && 0 < a.labelDistance) {
                        L = z._attr.visibility;
                        if (b = !v)a.connector = v = d.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(c.dataLabelsGroup), v.attr({
                            "stroke-width": p,
                            stroke: f.connectorColor || a.color || "#666666"
                        });
                        v[b ? "attr" : "animate"]({d: c.connectorPath(a.labelPos)});
                        v.attr("visibility", L)
                    } else v && (a.connector = v.destroy())
                }))
            }, l.pie.prototype.connectorPath = function (a) {
            var b = a.x, c = a.y;
            return m(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, l.pie.prototype.placeDataLabels = function () {
            h(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width + "px",
                    textOverflow: "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -9999}))
            }, this)
        }, l.pie.prototype.alignDataLabel = p, l.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center, c = this.options, d = c.center, g = c.minSize || 80, h, m = null !== c.size;
            m || (null !== d[0] ? h = Math.max(b[2] - Math.max(a[1], a[3]), g) : (h = Math.max(b[2] - a[1] - a[3], g),
                b[0] += (a[3] - a[1]) / 2), null !== d[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0], a[2])), g) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2), h < b[2] ? (b[2] = h, b[3] = Math.min(f(c.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : m = !0);
            return m
        });
        l.column && (l.column.prototype.alignDataLabel = function (a, b, c, d, f) {
            var e = this.chart.inverted, g = a.series, h = a.dlBox || a.shapeArgs, n = m(a.below, a.plotY > m(this.translatedThreshold, g.yAxis.len)), l = m(c.inside, !!this.options.stacking);
            h && (d = r(h), 0 > d.y && (d.height += d.y, d.y = 0), h = d.y + d.height - g.yAxis.len, 0 < h && (d.height -= h), e && (d = {
                x: g.yAxis.len - d.y - d.height,
                y: g.xAxis.len - d.x - d.width,
                width: d.height,
                height: d.width
            }), l || (e ? (d.x += n ? 0 : d.width, d.width = 0) : (d.y += n ? d.height : 0, d.height = 0)));
            c.align = m(c.align, !e || l ? "center" : n ? "right" : "left");
            c.verticalAlign = m(c.verticalAlign, e || l ? "middle" : n ? "top" : "bottom");
            q.prototype.alignDataLabel.call(this, a, b, c, d, f);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({color: a.contrastColor})
        })
    })(J);
    (function (a) {
        var z =
            a.Chart, A = a.each, y = a.objectEach, h = a.pick;
        a = a.addEvent;
        a(z.prototype, "render", function () {
            var a = [];
            A(this.labelCollectors || [], function (d) {
                a = a.concat(d())
            });
            A(this.yAxis || [], function (d) {
                d.options.stackLabels && !d.options.stackLabels.allowOverlap && y(d.stacks, function (d) {
                    y(d, function (d) {
                        a.push(d.label)
                    })
                })
            });
            A(this.series || [], function (d) {
                var v = d.options.dataLabels, r = d.dataLabelCollections || ["dataLabel"];
                (v.enabled || d._hasPointLabels) && !v.allowOverlap && d.visible && A(r, function (p) {
                    A(d.points, function (d) {
                        d[p] &&
                        (d[p].labelrank = h(d.labelrank, d.shapeArgs && d.shapeArgs.height), a.push(d[p]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        z.prototype.hideOverlappingLabels = function (a) {
            var d = a.length, h, r, p, m, f, q, l, c, g, b = function (a, b, c, d, g, f, h, m) {
                return !(g > a + c || g + h < a || f > b + d || f + m < b)
            };
            for (r = 0; r < d; r++)if (h = a[r])h.oldOpacity = h.opacity, h.newOpacity = 1, h.width || (p = h.getBBox(), h.width = p.width, h.height = p.height);
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (r = 0; r < d; r++)for (p = a[r], h = r + 1; h < d; ++h)if (m = a[h], p && m &&
                p !== m && p.placed && m.placed && 0 !== p.newOpacity && 0 !== m.newOpacity && (f = p.alignAttr, q = m.alignAttr, l = p.parentGroup, c = m.parentGroup, g = 2 * (p.box ? 0 : p.padding || 0), f = b(f.x + l.translateX, f.y + l.translateY, p.width - g, p.height - g, q.x + c.translateX, q.y + c.translateY, m.width - g, m.height - g)))(p.labelrank < m.labelrank ? p : m).newOpacity = 0;
            A(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(J);
    (function (a) {
        var z = a.addEvent, A = a.Chart, y = a.createElement, h = a.css, d = a.defaultOptions, v = a.defaultPlotOptions, t = a.each, r = a.extend, p = a.fireEvent, m = a.hasTouch, f = a.inArray, q = a.isObject, l = a.Legend, c = a.merge, g = a.pick, b = a.Point, e = a.Series, n = a.seriesTypes, D = a.svg, I;
        I = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, b = a.chart.pointer, c = function (a) {
                    var c = b.getPointFromEvent(a);
                    void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                };
                t(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel &&
                    (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (t(a.trackerGroups, function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (m)a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(h).css({cursor: a.options.cursor})
                    }
                }), a._hasTracking = !0)
            }, drawTrackerGraph: function () {
                var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, g = a.chart, f = g.pointer, h = g.renderer, n = g.options.tooltip.snap,
                    k = a.tracker, l, p = function () {
                        if (g.hoverSeries !== a)a.onMouseOver()
                    }, q = "rgba(192,192,192," + (D ? .0001 : .002) + ")";
                if (e && !c)for (l = e + 1; l--;)"M" === d[l] && d.splice(l + 1, 0, d[l + 1] - n, d[l + 2], "L"), (l && "M" === d[l] || l === e) && d.splice(l, 0, "L", d[l - 2] + n, d[l - 1]);
                k ? k.attr({d: d}) : a.graph && (a.tracker = h.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: q,
                    fill: c ? q : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * n),
                    zIndex: 2
                }).add(a.group), t([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover",
                        p).on("mouseout", function (a) {
                        f.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({cursor: b.cursor});
                    if (m)a.on("touchstart", p)
                }))
            }
        };
        n.column && (n.column.prototype.drawTracker = I.drawTrackerPoint);
        n.pie && (n.pie.prototype.drawTracker = I.drawTrackerPoint);
        n.scatter && (n.scatter.prototype.drawTracker = I.drawTrackerPoint);
        r(l.prototype, {
            setItemEvents: function (a, d, e) {
                var g = this, f = g.chart.renderer.boxWrapper, h = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active";
                (e ? d : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    f.addClass(h);
                    d.css(g.options.itemHoverStyle)
                }).on("mouseout", function () {
                    d.css(c(a.visible ? g.itemStyle : g.itemHiddenStyle));
                    f.removeClass(h);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    f.removeClass(h);
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : p(a, "legendItemClick", b, c)
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox = y("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                z(a.checkbox, "click", function (b) {
                    p(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
        });
        d.legend.itemStyle.cursor = "pointer";
        r(A.prototype, {
            showResetZoom: function () {
                var a = this, b = d.lang, c = a.options.chart.resetZoomButton, e = c.theme, g = e.states, f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, e, g && g.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position,
                    !1, f)
            }, zoomOut: function () {
                var a = this;
                p(a, "selection", {resetSelection: !0}, function () {
                    a.zoom()
                })
            }, zoom: function (a) {
                var b, c = this.pointer, d = !1, e;
                !a || a.resetSelection ? (t(this.axes, function (a) {
                    b = a.zoom()
                }), c.initiated = !1) : t(a.xAxis.concat(a.yAxis), function (a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                e = this.resetZoomButton;
                d && !e ? this.showResetZoom() : !d && q(e) && (this.resetZoomButton = e.destroy());
                b && this.redraw(g(this.options.chart.animation, a && a.animation, 100 >
                    this.pointCount))
            }, pan: function (a, b) {
                var c = this, d = c.hoverPoints, e;
                d && t(d, function (a) {
                    a.setState()
                });
                t("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, g = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", f = c[d], h = (b.pointRange || 0) / 2, n = b.getExtremes(), m = b.toValue(f - g, !0) + h, l = b.toValue(f + b.len - g, !0) - h, p = l < m, f = p ? l : m, m = p ? m : l, l = Math.min(n.dataMin, h ? n.min : b.toValue(b.toPixels(n.min) - b.minPixelPadding)), h = Math.max(n.dataMax, h ? n.max : b.toValue(b.toPixels(n.max) + b.minPixelPadding)),
                        p = l - f;
                    0 < p && (m += p, f = l);
                    p = m - h;
                    0 < p && (m = h, f -= p);
                    b.series.length && f !== n.min && m !== n.max && (b.setExtremes(f, m, !1, !1, {trigger: "pan"}), e = !0);
                    c[d] = g
                });
                e && c.redraw(!1);
                h(c.container, {cursor: "move"})
            }
        });
        r(b.prototype, {
            select: function (a, b) {
                var c = this, d = c.series, e = d.chart;
                a = g(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    c.selected = c.options.selected = a;
                    d.options.data[f(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || t(e.getSelectedPoints(), function (a) {
                        a.selected && a !== c && (a.selected =
                            a.options.selected = !1, d.options.data[f(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a) {
                var b = this.series.chart, c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            }, onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                t(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this, d = c(b.series.options.point,
                        b.options).events;
                    b.events = d;
                    a.objectEach(d, function (a, c) {
                        z(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            }, setState: function (a, b) {
                var c = Math.floor(this.plotX), d = this.plotY, e = this.series, f = e.options.states[a] || {}, h = v[e.type].marker && e.options.marker, n = h && !1 === h.enabled, m = h && h.states && h.states[a] || {}, k = !1 === m.enabled, l = e.stateMarkerGraphic, p = this.marker || {}, q = e.chart, t = e.halo, E, D = h && e.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === f.enabled || a && (k || n && !1 === m.enabled) || a && p.states &&
                    p.states[a] && !1 === p.states[a].enabled)) {
                    D && (E = e.markerAttribs(this, a));
                    if (this.graphic)this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(e.pointAttribs(this, a), g(q.options.chart.animation, f.animation)), E && this.graphic.animate(E, g(q.options.chart.animation, m.animation, h.animation)), l && l.hide(); else {
                        if (a && m) {
                            h = p.symbol || e.symbol;
                            l && l.currentSymbol !== h && (l = l.destroy());
                            if (l)l[b ? "animate" : "attr"]({x: E.x, y: E.y}); else h &&
                            (e.stateMarkerGraphic = l = q.renderer.symbol(h, E.x, E.y, E.width, E.height).add(e.markerGroup), l.currentSymbol = h);
                            l && l.attr(e.pointAttribs(this, a))
                        }
                        l && (l[a && q.isInsidePlot(c, d, q.inverted) ? "show" : "hide"](), l.element.point = this)
                    }
                    (c = f.halo) && c.size ? (t || (e.halo = t = q.renderer.path().add((this.graphic || l).parentGroup)), t[b ? "animate" : "attr"]({d: this.haloPath(c.size)}), t.attr({"class": "highcharts-halo highcharts-color-" + g(this.colorIndex, e.colorIndex)}), t.point = this, t.attr(r({
                        fill: this.color || e.color, "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : t && t.point && t.point.haloPath && t.animate({d: t.point.haloPath(0)});
                    this.state = a
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        r(e.prototype, {
            onMouseOver: function () {
                var a = this.chart, b = a.hoverSeries;
                if (b && b !== this)b.onMouseOut();
                this.options.events.mouseOver && p(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d)d.onMouseOut();
                this && a.events.mouseOut && p(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this, c = b.options, d = b.graph, e = c.states, f = c.lineWidth, c = 0;
                a = a || "";
                if (b.state !== a && (t([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus ||
                        0)), d && !d.dashstyle))for (f = {"stroke-width": f}, d.animate(f, g(b.chart.options.chart.animation, e[a] && e[a].animation)); b["zone-graph-" + c];)b["zone-graph-" + c].attr(f), c += 1
            }, setVisible: function (a, b) {
                var c = this, d = c.chart, e = c.legendItem, g, f = d.options.chart.ignoreHiddenSeries, h = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
                t(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a])c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) ===
                    c)c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && t(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                t(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                f && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                p(c, g)
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                p(this, a ? "select" : "unselect")
            }, drawTracker: I.drawTrackerGraph
        })
    })(J);
    (function (a) {
        var z =
            a.Chart, A = a.each, y = a.inArray, h = a.isArray, d = a.isObject, v = a.pick, t = a.splat;
        z.prototype.setResponsive = function (d) {
            var h = this.options.responsive, m = [], f = this.currentResponsive;
            h && h.rules && A(h.rules, function (f) {
                void 0 === f._id && (f._id = a.uniqueKey());
                this.matchResponsiveRule(f, m, d)
            }, this);
            var q = a.merge.apply(0, a.map(m, function (d) {
                return a.find(h.rules, function (a) {
                    return a._id === d
                }).chartOptions
            })), m = m.toString() || void 0;
            m !== (f && f.ruleIds) && (f && this.update(f.undoOptions, d), m ? (this.currentResponsive = {
                ruleIds: m,
                mergedOptions: q, undoOptions: this.currentOptions(q)
            }, this.update(q, d)) : this.currentResponsive = void 0)
        };
        z.prototype.matchResponsiveRule = function (a, d) {
            var h = a.condition;
            (h.callback || function () {
                return this.chartWidth <= v(h.maxWidth, Number.MAX_VALUE) && this.chartHeight <= v(h.maxHeight, Number.MAX_VALUE) && this.chartWidth >= v(h.minWidth, 0) && this.chartHeight >= v(h.minHeight, 0)
            }).call(this) && d.push(a._id)
        };
        z.prototype.currentOptions = function (r) {
            function p(f, m, l, c) {
                var g;
                a.objectEach(f, function (a, e) {
                    if (!c && -1 < y(e,
                            ["series", "xAxis", "yAxis"]))for (a = t(a), l[e] = [], g = 0; g < a.length; g++)m[e][g] && (l[e][g] = {}, p(a[g], m[e][g], l[e][g], c + 1)); else d(a) ? (l[e] = h(a) ? [] : {}, p(a, m[e] || {}, l[e], c + 1)) : l[e] = m[e] || null
                })
            }

            var m = {};
            p(r, this.options, m, 0);
            return m
        }
    })(J);
    (function (a) {
        var z = a.Axis, A = a.each, y = a.pick;
        a = a.wrap;
        a(z.prototype, "getSeriesExtremes", function (a) {
            var d = this.isXAxis, h, t, r = [], p;
            d && A(this.series, function (a, d) {
                a.useMapGeometry && (r[d] = a.xData, a.xData = [])
            });
            a.call(this);
            d && (h = y(this.dataMin, Number.MAX_VALUE), t = y(this.dataMax,
                -Number.MAX_VALUE), A(this.series, function (a, d) {
                a.useMapGeometry && (h = Math.min(h, y(a.minX, h)), t = Math.max(t, y(a.maxX, t)), a.xData = r[d], p = !0)
            }), p && (this.dataMin = h, this.dataMax = t))
        });
        a(z.prototype, "setAxisTranslation", function (a) {
            var d = this.chart, h = d.plotWidth / d.plotHeight, d = d.xAxis[0], t;
            a.call(this);
            "yAxis" === this.coll && void 0 !== d.transA && A(this.series, function (a) {
                a.preserveAspectRatio && (t = !0)
            });
            if (t && (this.transA = d.transA = Math.min(this.transA, d.transA), a = h / ((d.max - d.min) / (this.max - this.min)), a = 1 > a ? this :
                    d, h = (a.max - a.min) * a.transA, a.pixelPadding = a.len - h, a.minPixelPadding = a.pixelPadding / 2, h = a.fixTo)) {
                h = h[1] - a.toValue(h[0], !0);
                h *= a.transA;
                if (Math.abs(h) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax)h = 0;
                a.minPixelPadding -= h
            }
        });
        a(z.prototype, "render", function (a) {
            a.call(this);
            this.fixTo = null
        })
    })(J);
    (function (a) {
        var z = a.Axis, A = a.Chart, y = a.color, h, d = a.each, v = a.extend, t = a.isNumber, r = a.Legend, p = a.LegendSymbolMixin, m = a.noop, f = a.merge, q = a.pick, l = a.wrap;
        a.ColorAxis || (h = a.ColorAxis = function () {
            this.init.apply(this,
                arguments)
        }, v(h.prototype, z.prototype), v(h.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {animation: {duration: 50}, width: .01, color: "#999999"},
                labels: {overflow: "justify", rotation: 0},
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(z.prototype.keepProps),
            init: function (a, d) {
                var b =
                    "vertical" !== a.options.legend.layout, c;
                this.coll = "colorAxis";
                c = f(this.defaultColorAxisOptions, {side: b ? 2 : 1, reversed: !b}, d, {
                    opposite: !b,
                    showEmpty: !1,
                    title: null,
                    visible: a.options.legend.enabled
                });
                z.prototype.init.call(this, a, c);
                d.dataClasses && this.initDataClasses(d);
                this.initStops();
                this.horiz = b;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            initDataClasses: function (a) {
                var c = this.chart, b, e = 0, h = c.options.chart.colorCount, l = this.options, m = a.dataClasses.length;
                this.dataClasses = b = [];
                this.legendItems =
                    [];
                d(a.dataClasses, function (a, d) {
                    a = f(a);
                    b.push(a);
                    a.color || ("category" === l.dataClassColor ? (d = c.options.colors, h = d.length, a.color = d[e], a.colorIndex = e, e++, e === h && (e = 0)) : a.color = y(l.minColor).tweenTo(y(l.maxColor), 2 > m ? .5 : d / (m - 1)))
                })
            },
            setTickPositions: function () {
                if (!this.dataClasses)return z.prototype.setTickPositions.call(this)
            },
            initStops: function () {
                this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
                d(this.stops, function (a) {
                    a.color = y(a[1])
                })
            },
            setOptions: function (a) {
                z.prototype.setOptions.call(this,
                    a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function () {
                var a = this.legendSymbol, d = this.chart, b = d.options.legend || {}, e, f;
                a ? (this.left = b = a.attr("x"), this.top = e = a.attr("y"), this.width = f = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - b - f, this.bottom = d.chartHeight - e - a, this.len = this.horiz ? f : a, this.pos = this.horiz ? b : e) : this.len = (this.horiz ? b.symbolWidth : b.symbolHeight) || this.defaultLegendLength
            },
            normalizedValue: function (a) {
                this.isLog && (a = this.val2lin(a));
                return 1 - (this.max -
                    a) / (this.max - this.min || 1)
            },
            toColor: function (a, d) {
                var b = this.stops, c, g, f = this.dataClasses, h, l;
                if (f)for (l = f.length; l--;) {
                    if (h = f[l], c = h.from, b = h.to, (void 0 === c || a >= c) && (void 0 === b || a <= b)) {
                        g = h.color;
                        d && (d.dataClass = l, d.colorIndex = h.colorIndex);
                        break
                    }
                } else {
                    a = this.normalizedValue(a);
                    for (l = b.length; l-- && !(a > b[l][0]););
                    c = b[l] || b[l + 1];
                    b = b[l + 1] || c;
                    a = 1 - (b[0] - a) / (b[0] - c[0] || 1);
                    g = c.color.tweenTo(b.color, a)
                }
                return g
            },
            getOffset: function () {
                var a = this.legendGroup, d = this.chart.axisOffset[this.side];
                a && (this.axisParent =
                    a, z.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            },
            setLegendColor: function () {
                var a, d = this.reversed;
                a = d ? 1 : 0;
                d = d ? 0 : 1;
                a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a];
                this.legendColor = {linearGradient: {x1: a[0], y1: a[1], x2: a[2], y2: a[3]}, stops: this.stops}
            },
            drawLegendSymbol: function (a, d) {
                var b = a.padding, c = a.options, g = this.horiz, f = q(c.symbolWidth, g ? this.defaultLegendLength : 12), h = q(c.symbolHeight, g ? 12 : this.defaultLegendLength), l = q(c.labelPadding,
                    g ? 16 : 30), c = q(c.itemDistance, 10);
                this.setLegendColor();
                d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, h).attr({zIndex: 1}).add(d.legendGroup);
                this.legendItemWidth = f + b + (g ? c : l);
                this.legendItemHeight = h + b + (g ? l : 0)
            },
            setState: function (a) {
                d(this.series, function (c) {
                    c.setState(a)
                })
            },
            visible: !0,
            setVisible: m,
            getSeriesExtremes: function () {
                var a = this.series, d = a.length;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; d--;)void 0 !== a[d].valueMin && (this.dataMin = Math.min(this.dataMin, a[d].valueMin), this.dataMax =
                    Math.max(this.dataMax, a[d].valueMax))
            },
            drawCrosshair: function (a, d) {
                var b = d && d.plotX, c = d && d.plotY, g, f = this.pos, h = this.len;
                d && (g = this.toPixels(d[d.series.colorKey]), g < f ? g = f - 2 : g > f + h && (g = f + h + 2), d.plotX = g, d.plotY = this.len - g, z.prototype.drawCrosshair.call(this, a, d), d.plotX = b, d.plotY = c, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.cross.attr({fill: this.crosshair.color})))
            },
            getPlotLinePath: function (a,
                                       d, b, e, f) {
                return t(f) ? this.horiz ? ["M", f - 4, this.top - 6, "L", f + 4, this.top - 6, f, this.top, "Z"] : ["M", this.left, f, "L", this.left - 6, f + 6, this.left - 6, f - 6, "Z"] : z.prototype.getPlotLinePath.call(this, a, d, b, e)
            },
            update: function (a, g) {
                var b = this.chart, c = b.legend;
                d(this.series, function (a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && c.allItems && (d(c.allItems, function (a) {
                    a.isDataClass && a.legendGroup && a.legendGroup.destroy()
                }), b.isDirtyLegend = !0);
                b.options[this.coll] = f(this.userOptions, a);
                z.prototype.update.call(this, a, g);
                this.legendItem &&
                (this.setLegendColor(), c.colorizeItem(this, !0))
            },
            remove: function () {
                this.legendItem && this.chart.legend.destroyItem(this);
                z.prototype.remove.call(this)
            },
            getDataClassLegendSymbols: function () {
                var c = this, g = this.chart, b = this.legendItems, e = g.options.legend, f = e.valueDecimals, h = e.valueSuffix || "", l;
                b.length || d(this.dataClasses, function (e, n) {
                    var q = !0, r = e.from, t = e.to;
                    l = "";
                    void 0 === r ? l = "\x3c " : void 0 === t && (l = "\x3e ");
                    void 0 !== r && (l += a.numberFormat(r, f) + h);
                    void 0 !== r && void 0 !== t && (l += " - ");
                    void 0 !== t && (l += a.numberFormat(t,
                            f) + h);
                    b.push(v({
                        chart: g,
                        name: l,
                        options: {},
                        drawLegendSymbol: p.drawRectangle,
                        visible: !0,
                        setState: m,
                        isDataClass: !0,
                        setVisible: function () {
                            q = this.visible = !q;
                            d(c.series, function (a) {
                                d(a.points, function (a) {
                                    a.dataClass === n && a.setVisible(q)
                                })
                            });
                            g.legend.colorizeItem(this, q)
                        }
                    }, e))
                });
                return b
            },
            name: ""
        }), d(["fill", "stroke"], function (c) {
            a.Fx.prototype[c + "Setter"] = function () {
                this.elem.attr(c, y(this.start).tweenTo(y(this.end), this.pos), null, !0)
            }
        }), l(A.prototype, "getAxes", function (a) {
            var c = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            c && new h(this, c)
        }), l(r.prototype, "getAllItems", function (a) {
            var c = [], b = this.chart.colorAxis[0];
            b && b.options && (b.options.showInLegend && (b.options.dataClasses ? c = c.concat(b.getDataClassLegendSymbols()) : c.push(b)), d(b.series, function (a) {
                a.options.showInLegend = !1
            }));
            return c.concat(a.call(this))
        }), l(r.prototype, "colorizeItem", function (a, d, b) {
            a.call(this, d, b);
            b && d.legendColor && d.legendSymbol.attr({fill: d.legendColor})
        }), l(r.prototype, "update", function (a) {
            a.apply(this, [].slice.call(arguments,
                1));
            this.chart.colorAxis[0] && this.chart.colorAxis[0].update({}, arguments[2])
        }))
    })(J);
    (function (a) {
        var z = a.defined, A = a.each, y = a.noop, h = a.seriesTypes;
        a.colorPointMixin = {
            isValid: function () {
                return null !== this.value && Infinity !== this.value && -Infinity !== this.value
            }, setVisible: function (a) {
                var d = this, h = a ? "show" : "hide";
                A(["graphic", "dataLabel"], function (a) {
                    if (d[a])d[a][h]()
                })
            }, setState: function (d) {
                a.Point.prototype.setState.call(this, d);
                this.graphic && this.graphic.attr({zIndex: "hover" === d ? 1 : 0})
            }
        };
        a.colorSeriesMixin =
        {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: y,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: h.column.prototype.pointAttribs,
            translateColors: function () {
                var a = this, h = this.options.nullColor, t = this.colorAxis, r = this.colorKey;
                A(this.data, function (d) {
                    var m = d[r];
                    if (m = d.options.color || (d.isNull ? h : t && void 0 !== m ? t.toColor(m, d) : d.color || a.color))d.color = m
                })
            },
            colorAttribs: function (a) {
                var d =
                {};
                z(a.color) && (d[this.colorProp || "fill"] = a.color);
                return d
            }
        }
    })(J);
    (function (a) {
        function z(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }

        function A(a) {
            this.init(a)
        }

        var y = a.addEvent, h = a.Chart, d = a.doc, v = a.each, t = a.extend, r = a.merge, p = a.pick, m = a.wrap;
        A.prototype.init = function (a) {
            this.chart = a;
            a.mapNavButtons = []
        };
        A.prototype.update = function (d) {
            var f = this.chart, h = f.options.mapNavigation, c, g, b, e, m, v = function (a) {
                this.handler.call(f, a);
                z(a)
            }, A = f.mapNavButtons;
            d && (h = f.options.mapNavigation = r(f.options.mapNavigation, d));
            for (; A.length;)A.pop().destroy();
            p(h.enableButtons, h.enabled) && !f.renderer.forExport && a.objectEach(h.buttons, function (a, d) {
                c = r(h.buttonOptions, a);
                g = c.theme;
                g.style = r(c.theme.style, c.style);
                e = (b = g.states) && b.hover;
                m = b && b.select;
                a = f.renderer.button(c.text, 0, 0, v, g, e, m, 0, "zoomIn" === d ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                    width: c.width,
                    height: c.height,
                    title: f.options.lang[d],
                    padding: c.padding,
                    zIndex: 5
                }).add();
                a.handler = c.onclick;
                a.align(t(c, {width: a.width, height: 2 * a.height}), null, c.alignTo);
                y(a.element, "dblclick", z);
                A.push(a)
            });
            this.updateEvents(h)
        };
        A.prototype.updateEvents = function (a) {
            var f = this.chart;
            p(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || y(f.container, "dblclick", function (a) {
                    f.pointer.onContainerDblClick(a)
                }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            p(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel ||
                y(f.container, void 0 === d.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (a) {
                    f.pointer.onContainerMouseWheel(a);
                    z(a);
                    return !1
                }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        t(h.prototype, {
            fitToBox: function (a, d) {
                v([["x", "width"], ["y", "height"]], function (f) {
                    var c = f[0];
                    f = f[1];
                    a[c] + a[f] > d[c] + d[f] && (a[f] > d[f] ? (a[f] = d[f], a[c] = d[c]) : a[c] = d[c] + d[f] - a[f]);
                    a[f] > d[f] && (a[f] = d[f]);
                    a[c] < d[c] && (a[c] = d[c])
                });
                return a
            }, mapZoom: function (a, d, h, c, g) {
                var b = this.xAxis[0], e = b.max - b.min, f =
                    p(d, b.min + e / 2), m = e * a, e = this.yAxis[0], l = e.max - e.min, q = p(h, e.min + l / 2), l = l * a, f = this.fitToBox({
                    x: f - m * (c ? (c - b.pos) / b.len : .5),
                    y: q - l * (g ? (g - e.pos) / e.len : .5),
                    width: m,
                    height: l
                }, {
                    x: b.dataMin,
                    y: e.dataMin,
                    width: b.dataMax - b.dataMin,
                    height: e.dataMax - e.dataMin
                }), m = f.x <= b.dataMin && f.width >= b.dataMax - b.dataMin && f.y <= e.dataMin && f.height >= e.dataMax - e.dataMin;
                c && (b.fixTo = [c - b.pos, d]);
                g && (e.fixTo = [g - e.pos, h]);
                void 0 === a || m ? (b.setExtremes(void 0, void 0, !1), e.setExtremes(void 0, void 0, !1)) : (b.setExtremes(f.x, f.x + f.width,
                    !1), e.setExtremes(f.y, f.y + f.height, !1));
                this.redraw()
            }
        });
        m(h.prototype, "render", function (a) {
            this.mapNavigation = new A(this);
            this.mapNavigation.update();
            a.call(this)
        })
    })(J);
    (function (a) {
        var z = a.extend, A = a.pick, y = a.Pointer;
        a = a.wrap;
        z(y.prototype, {
            onContainerDblClick: function (a) {
                var d = this.chart;
                a = this.normalize(a);
                d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") && d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) &&
                d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }, onContainerMouseWheel: function (a) {
                var d = this.chart, h;
                a = this.normalize(a);
                h = a.detail || -(a.wheelDelta / 120);
                d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, h), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        });
        a(y.prototype, "zoomOption", function (a) {
            var d = this.chart.options.mapNavigation;
            A(d.enableTouchZoom, d.enabled) &&
            (this.chart.options.chart.pinchType = "xy");
            a.apply(this, [].slice.call(arguments, 1))
        });
        a(y.prototype, "pinchTranslate", function (a, d, v, t, r, p, m) {
            a.call(this, d, v, t, r, p, m);
            "map" === this.chart.options.chart.type && this.hasZoom && (a = t.scaleX > t.scaleY, this.pinchTranslateDirection(!a, d, v, t, r, p, m, a ? t.scaleX : t.scaleY))
        })
    })(J);
    (function (a) {
        var z = a.colorPointMixin, A = a.each, y = a.extend, h = a.isNumber, d = a.map, v = a.merge, t = a.noop, r = a.pick, p = a.isArray, m = a.Point, f = a.Series, q = a.seriesType, l = a.seriesTypes, c = a.splat, g = void 0 !==
            a.doc.documentElement.style.vectorEffect;
        q("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
            },
            turboThreshold: 0,
            tooltip: {followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"},
            states: {normal: {animation: !0}, hover: {halo: null, brightness: .2}, select: {color: "#cccccc"}}
        }, v(a.colorSeriesMixin,
            {
                type: "map",
                getExtremesFromAll: !0,
                useMapGeometry: !0,
                forceDL: !0,
                searchPoint: t,
                directTouch: !0,
                preserveAspectRatio: !0,
                pointArrayMap: ["value"],
                getBox: function (b) {
                    var c = Number.MAX_VALUE, d = -c, f = c, g = -c, m = c, l = c, p = this.xAxis, q = this.yAxis, t;
                    A(b || [], function (b) {
                        if (b.path) {
                            "string" === typeof b.path && (b.path = a.splitPath(b.path));
                            var e = b.path || [], n = e.length, p = !1, k = -c, q = c, u = -c, v = c, x = b.properties;
                            if (!b._foundBox) {
                                for (; n--;)h(e[n]) && (p ? (k = Math.max(k, e[n]), q = Math.min(q, e[n])) : (u = Math.max(u, e[n]), v = Math.min(v, e[n])),
                                    p = !p);
                                b._midX = q + (k - q) * r(b.middleX, x && x["hc-middle-x"], .5);
                                b._midY = v + (u - v) * r(b.middleY, x && x["hc-middle-y"], .5);
                                b._maxX = k;
                                b._minX = q;
                                b._maxY = u;
                                b._minY = v;
                                b.labelrank = r(b.labelrank, (k - q) * (u - v));
                                b._foundBox = !0
                            }
                            d = Math.max(d, b._maxX);
                            f = Math.min(f, b._minX);
                            g = Math.max(g, b._maxY);
                            m = Math.min(m, b._minY);
                            l = Math.min(b._maxX - b._minX, b._maxY - b._minY, l);
                            t = !0
                        }
                    });
                    t && (this.minY = Math.min(m, r(this.minY, c)), this.maxY = Math.max(g, r(this.maxY, -c)), this.minX = Math.min(f, r(this.minX, c)), this.maxX = Math.max(d, r(this.maxX, -c)), p &&
                    void 0 === p.options.minRange && (p.minRange = Math.min(5 * l, (this.maxX - this.minX) / 5, p.minRange || c)), q && void 0 === q.options.minRange && (q.minRange = Math.min(5 * l, (this.maxY - this.minY) / 5, q.minRange || c)))
                },
                getExtremes: function () {
                    f.prototype.getExtremes.call(this, this.valueData);
                    this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                    this.valueMin = this.dataMin;
                    this.valueMax = this.dataMax;
                    this.dataMin = this.minY;
                    this.dataMax = this.maxY
                },
                translatePath: function (a) {
                    var b = !1, c = this.xAxis, d = this.yAxis,
                        f = c.min, g = c.transA, c = c.minPixelPadding, m = d.min, l = d.transA, d = d.minPixelPadding, p, q = [];
                    if (a)for (p = a.length; p--;)h(a[p]) ? (q[p] = b ? (a[p] - f) * g + c : (a[p] - m) * l + d, b = !b) : q[p] = a[p];
                    return q
                },
                setData: function (b, e, g, m) {
                    var l = this.options, n = this.chart.options.chart, q = n && n.map, r = l.mapData, t = l.joinBy, y = null === t, x = l.keys || this.pointArrayMap, z = [], D = {}, H = this.chart.mapTransforms;
                    !r && q && (r = "string" === typeof q ? a.maps[q] : q);
                    y && (t = "_i");
                    t = this.joinBy = c(t);
                    t[1] || (t[1] = t[0]);
                    b && A(b, function (a, c) {
                        var d = 0;
                        if (h(a))b[c] = {value: a};
                        else if (p(a)) {
                            b[c] = {};
                            !l.keys && a.length > x.length && "string" === typeof a[0] && (b[c]["hc-key"] = a[0], ++d);
                            for (var e = 0; e < x.length; ++e, ++d)x[e] && (b[c][x[e]] = a[d])
                        }
                        y && (b[c]._i = c)
                    });
                    this.getBox(b);
                    (this.chart.mapTransforms = H = n && n.mapTransforms || r && r["hc-transform"] || H) && a.objectEach(H, function (a) {
                        a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
                    });
                    if (r) {
                        "FeatureCollection" === r.type && (this.mapTitle = r.title, r = a.geojson(r, this.type, this));
                        this.mapData = r;
                        this.mapMap = {};
                        for (H = 0; H < r.length; H++)n =
                            r[H], q = n.properties, n._i = H, t[0] && q && q[t[0]] && (n[t[0]] = q[t[0]]), D[n[t[0]]] = n;
                        this.mapMap = D;
                        b && t[1] && A(b, function (a) {
                            D[a[t[1]]] && z.push(D[a[t[1]]])
                        });
                        l.allAreas ? (this.getBox(r), b = b || [], t[1] && A(b, function (a) {
                            z.push(a[t[1]])
                        }), z = "|" + d(z, function (a) {
                                return a && a[t[0]]
                            }).join("|") + "|", A(r, function (a) {
                            t[0] && -1 !== z.indexOf("|" + a[t[0]] + "|") || (b.push(v(a, {value: null})), m = !1)
                        })) : this.getBox(z)
                    }
                    f.prototype.setData.call(this, b, e, g, m)
                },
                drawGraph: t,
                drawDataLabels: t,
                doFullTranslate: function () {
                    return this.isDirtyData ||
                        this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
                },
                translate: function () {
                    var a = this, c = a.xAxis, d = a.yAxis, f = a.doFullTranslate();
                    a.generatePoints();
                    A(a.data, function (b) {
                        b.plotX = c.toPixels(b._midX, !0);
                        b.plotY = d.toPixels(b._midY, !0);
                        f && (b.shapeType = "path", b.shapeArgs = {d: a.translatePath(b.path)})
                    });
                    a.translateColors()
                },
                pointAttribs: function (a, c) {
                    a = l.column.prototype.pointAttribs.call(this, a, c);
                    g ? a["vector-effect"] = "non-scaling-stroke" : a["stroke-width"] = "inherit";
                    return a
                },
                drawPoints: function () {
                    var a =
                        this, c = a.xAxis, d = a.yAxis, f = a.group, h = a.chart, m = h.renderer, p, q, r, t, v = this.baseTrans, y, z, H, k, w;
                    a.transformGroup || (a.transformGroup = m.g().attr({
                        scaleX: 1,
                        scaleY: 1
                    }).add(f), a.transformGroup.survive = !0);
                    a.doFullTranslate() ? (h.hasRendered && A(a.points, function (b) {
                        b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                    }), a.group = a.transformGroup, l.column.prototype.drawPoints.apply(a), a.group = f, A(a.points, function (a) {
                        a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()),
                        a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                    }), this.baseTrans = {
                        originX: c.min - c.minPixelPadding / c.transA,
                        originY: d.min - d.minPixelPadding / d.transA + (d.reversed ? 0 : d.len / d.transA),
                        transAX: c.transA,
                        transAY: d.transA
                    }, this.transformGroup.animate({
                        translateX: 0,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1
                    })) : (p = c.transA / v.transAX, q = d.transA / v.transAY, r = c.toPixels(v.originX, !0), t = d.toPixels(v.originY, !0), .99 < p && 1.01 > p && .99 < q && 1.01 > q && (q = p = 1, r = Math.round(r),
                        t = Math.round(t)), y = this.transformGroup, h.renderer.globalAnimation ? (z = y.attr("translateX"), H = y.attr("translateY"), k = y.attr("scaleX"), w = y.attr("scaleY"), y.attr({animator: 0}).animate({animator: 1}, {
                        step: function (a, b) {
                            y.attr({
                                translateX: z + (r - z) * b.pos,
                                translateY: H + (t - H) * b.pos,
                                scaleX: k + (p - k) * b.pos,
                                scaleY: w + (q - w) * b.pos
                            })
                        }
                    })) : y.attr({translateX: r, translateY: t, scaleX: p, scaleY: q}));
                    g || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] /
                        (p || 1));
                    this.drawMapDataLabels()
                },
                drawMapDataLabels: function () {
                    f.prototype.drawDataLabels.call(this);
                    this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
                },
                render: function () {
                    var a = this, c = f.prototype.render;
                    a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () {
                        c.call(a)
                    }) : c.call(a)
                },
                animate: function (a) {
                    var b = this.options.animation, c = this.group, d = this.xAxis, f = this.yAxis, g = d.pos, h = f.pos;
                    this.chart.renderer.isSVG && (!0 === b && (b = {duration: 1E3}), a ? c.attr({
                        translateX: g + d.len / 2, translateY: h +
                        f.len / 2, scaleX: .001, scaleY: .001
                    }) : (c.animate({translateX: g, translateY: h, scaleX: 1, scaleY: 1}, b), this.animate = null))
                },
                animateDrilldown: function (a) {
                    var b = this.chart.plotBox, c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], d = c.bBox, f = this.chart.options.drilldown.animation;
                    a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                        scaleX: a,
                        scaleY: a,
                        translateX: d.x,
                        translateY: d.y
                    }, A(this.points, function (a) {
                        a.graphic && a.graphic.attr(c.shapeArgs).animate({
                            scaleX: 1, scaleY: 1, translateX: 0,
                            translateY: 0
                        }, f)
                    }), this.animate = null)
                },
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
                animateDrillupFrom: function (a) {
                    l.column.prototype.animateDrillupFrom.call(this, a)
                },
                animateDrillupTo: function (a) {
                    l.column.prototype.animateDrillupTo.call(this, a)
                }
            }), y({
            applyOptions: function (a, c) {
                a = m.prototype.applyOptions.call(this, a, c);
                c = this.series;
                var b = c.joinBy;
                c.mapData && ((b = void 0 !== a[b[1]] && c.mapMap[a[b[1]]]) ? (c.xyFromShape && (a.x = b._midX, a.y = b._midY), y(a, b)) : a.value = a.value || null);
                return a
            }, onMouseOver: function (a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction)m.prototype.onMouseOver.call(this, a); else this.series.onMouseOut(a)
            }, zoomTo: function () {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, z))
    })(J);
    (function (a) {
        var z = a.seriesType, A = a.seriesTypes;
        z("mapline", "map", {lineWidth: 1, fillColor: "none"}, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"},
            pointAttribs: function (a,
                                    h) {
                a = A.map.prototype.pointAttribs.call(this, a, h);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: A.line.prototype.drawLegendSymbol
        })
    })(J);
    (function (a) {
        var z = a.merge, A = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", {
            dataLabels: {
                enabled: !0, formatter: function () {
                    return this.point.name
                }, crop: !1, defer: !1, overflow: !1, style: {color: "#000000"}
            }
        }, {type: "mappoint", forceDL: !0}, {
            applyOptions: function (a, h) {
                a = void 0 !== a.lat && void 0 !== a.lon ? z(a, this.series.chart.fromLatLonToPoint(a)) : a;
                return A.prototype.applyOptions.call(this,
                    a, h)
            }
        })
    })(J);
    (function (a) {
        var z = a.arrayMax, A = a.arrayMin, y = a.Axis, h = a.color, d = a.each, v = a.isNumber, t = a.noop, r = a.pick, p = a.pInt, m = a.Point, f = a.Series, q = a.seriesType, l = a.seriesTypes;
        q("bubble", "scatter", {
            dataLabels: {
                formatter: function () {
                    return this.point.z
                }, inside: !0, verticalAlign: "middle"
            },
            marker: {lineColor: null, lineWidth: 1, radius: null, states: {hover: {radiusPlus: 0}}, symbol: "circle"},
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {hover: {halo: {size: 5}}},
            tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            pointAttribs: function (a, d) {
                var b = r(this.options.marker.fillOpacity, .5);
                a = f.prototype.pointAttribs.call(this, a, d);
                1 !== b && (a.fill = h(a.fill).setOpacity(b).get("rgba"));
                return a
            },
            getRadii: function (a, d, b, e) {
                var c, f, g, h = this.zData, m = [], l = this.options, p = "width" !== l.sizeBy, q = l.zThreshold, r = d - a;
                f = 0;
                for (c =
                         h.length; f < c; f++)g = h[f], l.sizeByAbsoluteValue && null !== g && (g = Math.abs(g - q), d = Math.max(d - q, Math.abs(a - q)), a = 0), null === g ? g = null : g < a ? g = b / 2 - 1 : (g = 0 < r ? (g - a) / r : .5, p && 0 <= g && (g = Math.sqrt(g)), g = Math.ceil(b + g * (e - b)) / 2), m.push(g);
                this.radii = m
            },
            animate: function (a) {
                var c = this.options.animation;
                a || (d(this.points, function (a) {
                    var b = a.graphic, d;
                    b && b.width && (d = {x: b.x, y: b.y, width: b.width, height: b.height}, b.attr({
                        x: a.plotX,
                        y: a.plotY,
                        width: 1,
                        height: 1
                    }), b.animate(d, c))
                }), this.animate = null)
            },
            translate: function () {
                var c, d =
                    this.data, b, e, f = this.radii;
                l.scatter.prototype.translate.call(this);
                for (c = d.length; c--;)b = d[c], e = f ? f[c] : 0, v(e) && e >= this.minPxSize / 2 ? (b.marker = a.extend(b.marker, {
                    radius: e,
                    width: 2 * e,
                    height: 2 * e
                }), b.dlBox = {
                    x: b.plotX - e,
                    y: b.plotY - e,
                    width: 2 * e,
                    height: 2 * e
                }) : b.shapeArgs = b.plotY = b.dlBox = void 0
            },
            alignDataLabel: l.column.prototype.alignDataLabel,
            buildKDTree: t,
            applyZones: t
        }, {
            haloPath: function (a) {
                return m.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
            }, ttBelow: !1
        });
        y.prototype.beforePadding =
            function () {
                var a = this, f = this.len, b = this.chart, e = 0, h = f, m = this.isXAxis, l = m ? "xData" : "yData", q = this.min, t = {}, u = Math.min(b.plotWidth, b.plotHeight), y = Number.MAX_VALUE, J = -Number.MAX_VALUE, x = this.max - q, F = f / x, G = [];
                d(this.series, function (c) {
                    var e = c.options;
                    !c.bubblePadding || !c.visible && b.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, G.push(c), m && (d(["minSize", "maxSize"], function (a) {
                        var b = e[a], c = /%$/.test(b), b = p(b);
                        t[a] = c ? u * b / 100 : b
                    }), c.minPxSize = t.minSize, c.maxPxSize = Math.max(t.maxSize, t.minSize),
                        c = c.zData, c.length && (y = r(e.zMin, Math.min(y, Math.max(A(c), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE))), J = r(e.zMax, Math.max(J, z(c))))))
                });
                d(G, function (b) {
                    var c = b[l], d = c.length, f;
                    m && b.getRadii(y, J, b.minPxSize, b.maxPxSize);
                    if (0 < x)for (; d--;)v(c[d]) && a.dataMin <= c[d] && c[d] <= a.dataMax && (f = b.radii[d], e = Math.min((c[d] - q) * F - f, e), h = Math.max((c[d] - q) * F + f, h))
                });
                G.length && 0 < x && !this.isLog && (h -= f, F *= (f + e - h) / f, d([["min", "userMin", e], ["max", "userMax", h]], function (b) {
                    void 0 === r(a.options[b[0]], a[b[1]]) &&
                    (a[b[0]] += b[2] / F)
                }))
            }
    })(J);
    (function (a) {
        var z = a.merge, A = a.Point, y = a.seriesType, h = a.seriesTypes;
        h.bubble && y("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {pointFormat: "{point.name}: {point.z}"}
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: h.map.prototype.getMapData,
            getBox: h.map.prototype.getBox,
            setData: h.map.prototype.setData
        }, {
            applyOptions: function (a, v) {
                return a && void 0 !== a.lat && void 0 !== a.lon ? A.prototype.applyOptions.call(this, z(a, this.series.chart.fromLatLonToPoint(a)), v) :
                    h.map.prototype.pointClass.prototype.applyOptions.call(this, a, v)
            }, isValid: function () {
                return "number" === typeof this.z
            }, ttBelow: !1
        })
    })(J);
    (function (a) {
        var z = a.colorPointMixin, A = a.each, y = a.merge, h = a.noop, d = a.pick, v = a.Series, t = a.seriesType, r = a.seriesTypes;
        t("heatmap", "scatter", {
            animation: !1, borderWidth: 0, nullColor: "#f7f7f7", dataLabels: {
                formatter: function () {
                    return this.point.value
                }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
            }, marker: null, pointRange: null, tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},
            states: {normal: {animation: !0}, hover: {halo: !1, brightness: .2}}
        }, y(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function () {
                var a;
                r.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = d(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function () {
                var a = this.options, h = this.xAxis, f = this.yAxis, q = a.pointPadding || 0, l = function (a, d, b) {
                    return Math.min(Math.max(d, a), b)
                };
                this.generatePoints();
                A(this.points, function (c) {
                    var g = (a.colsize || 1) / 2, b = (a.rowsize || 1) / 2, e = l(Math.round(h.len - h.translate(c.x - g, 0, 1, 0, 1)), -h.len, 2 * h.len), g = l(Math.round(h.len - h.translate(c.x + g, 0, 1, 0, 1)), -h.len, 2 * h.len), m = l(Math.round(f.translate(c.y - b, 0, 1, 0, 1)), -f.len, 2 * f.len), b = l(Math.round(f.translate(c.y + b, 0, 1, 0, 1)), -f.len, 2 * f.len), p = d(c.pointPadding, q);
                    c.plotX = c.clientX = (e + g) / 2;
                    c.plotY = (m + b) / 2;
                    c.shapeType = "rect";
                    c.shapeArgs = {
                        x: Math.min(e, g) + p,
                        y: Math.min(m, b) + p,
                        width: Math.abs(g - e) - 2 * p,
                        height: Math.abs(b - m) - 2 * p
                    }
                });
                this.translateColors()
            },
            drawPoints: function () {
                r.column.prototype.drawPoints.call(this);
                A(this.points, function (a) {
                    a.graphic.attr(this.colorAttribs(a))
                }, this)
            },
            animate: h,
            getBox: h,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: r.column.prototype.alignDataLabel,
            getExtremes: function () {
                v.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                v.prototype.getExtremes.call(this)
            }
        }), a.extend({
            haloPath: function (a) {
                if (!a)return [];
                var d = this.shapeArgs;
                return ["M", d.x - a,
                    d.y - a, "L", d.x - a, d.y + d.height + a, d.x + d.width + a, d.y + d.height + a, d.x + d.width + a, d.y - a, "Z"]
            }
        }, z))
    })(J);
    (function (a) {
        function z(a, d) {
            var f, h, l, c = !1, g = a.x, b = a.y;
            a = 0;
            for (f = d.length - 1; a < d.length; f = a++)h = d[a][1] > b, l = d[f][1] > b, h !== l && g < (d[f][0] - d[a][0]) * (b - d[a][1]) / (d[f][1] - d[a][1]) + d[a][0] && (c = !c);
            return c
        }

        var A = a.Chart, y = a.each, h = a.extend, d = a.format, v = a.merge, t = a.win, r = a.wrap;
        A.prototype.transformFromLatLon = function (d, h) {
            if (void 0 === t.proj4)return a.error(21), {x: 0, y: null};
            d = t.proj4(h.crs, [d.lon, d.lat]);
            var f =
                h.cosAngle || h.rotation && Math.cos(h.rotation), m = h.sinAngle || h.rotation && Math.sin(h.rotation);
            d = h.rotation ? [d[0] * f + d[1] * m, -d[0] * m + d[1] * f] : d;
            return {
                x: ((d[0] - (h.xoffset || 0)) * (h.scale || 1) + (h.xpan || 0)) * (h.jsonres || 1) + (h.jsonmarginX || 0),
                y: (((h.yoffset || 0) - d[1]) * (h.scale || 1) + (h.ypan || 0)) * (h.jsonres || 1) - (h.jsonmarginY || 0)
            }
        };
        A.prototype.transformToLatLon = function (d, h) {
            if (void 0 === t.proj4)a.error(21); else {
                d = {
                    x: ((d.x - (h.jsonmarginX || 0)) / (h.jsonres || 1) - (h.xpan || 0)) / (h.scale || 1) + (h.xoffset || 0),
                    y: ((-d.y - (h.jsonmarginY ||
                    0)) / (h.jsonres || 1) + (h.ypan || 0)) / (h.scale || 1) + (h.yoffset || 0)
                };
                var f = h.cosAngle || h.rotation && Math.cos(h.rotation), m = h.sinAngle || h.rotation && Math.sin(h.rotation);
                h = t.proj4(h.crs, "WGS84", h.rotation ? {x: d.x * f + d.y * -m, y: d.x * m + d.y * f} : d);
                return {lat: h.y, lon: h.x}
            }
        };
        A.prototype.fromPointToLatLon = function (d) {
            var h = this.mapTransforms, f;
            if (h) {
                for (f in h)if (h.hasOwnProperty(f) && h[f].hitZone && z({
                        x: d.x,
                        y: -d.y
                    }, h[f].hitZone.coordinates[0]))return this.transformToLatLon(d, h[f]);
                return this.transformToLatLon(d, h["default"])
            }
            a.error(22)
        };
        A.prototype.fromLatLonToPoint = function (d) {
            var h = this.mapTransforms, f, q;
            if (!h)return a.error(22), {x: 0, y: null};
            for (f in h)if (h.hasOwnProperty(f) && h[f].hitZone && (q = this.transformFromLatLon(d, h[f]), z({
                    x: q.x,
                    y: -q.y
                }, h[f].hitZone.coordinates[0])))return q;
            return this.transformFromLatLon(d, h["default"])
        };
        a.geojson = function (a, m, f) {
            var q = [], l = [], c = function (a) {
                var b, c = a.length;
                l.push("M");
                for (b = 0; b < c; b++)1 === b && l.push("L"), l.push(a[b][0], -a[b][1])
            };
            m = m || "map";
            y(a.features, function (a) {
                var b = a.geometry, d = b.type,
                    b = b.coordinates;
                a = a.properties;
                var f;
                l = [];
                "map" === m || "mapbubble" === m ? ("Polygon" === d ? (y(b, c), l.push("Z")) : "MultiPolygon" === d && (y(b, function (a) {
                    y(a, c)
                }), l.push("Z")), l.length && (f = {path: l})) : "mapline" === m ? ("LineString" === d ? c(b) : "MultiLineString" === d && y(b, c), l.length && (f = {path: l})) : "mappoint" === m && "Point" === d && (f = {
                    x: b[0],
                    y: -b[1]
                });
                f && q.push(h(f, {name: a.name || a.NAME, properties: a}))
            });
            f && a.copyrightShort && (f.chart.mapCredits = d(f.chart.options.credits.mapText, {geojson: a}), f.chart.mapCreditsFull = d(f.chart.options.credits.mapTextFull,
                {geojson: a}));
            return q
        };
    })(J);
    (function (a) {
        function z(a, d, h, c, g, b, e, m) {
            return ["M", a + g, d, "L", a + h - b, d, "C", a + h - b / 2, d, a + h, d + b / 2, a + h, d + b, "L", a + h, d + c - e, "C", a + h, d + c - e / 2, a + h - e / 2, d + c, a + h - e, d + c, "L", a + m, d + c, "C", a + m / 2, d + c, a, d + c - m / 2, a, d + c - m, "L", a, d + g, "C", a, d + g / 2, a + g / 2, d, a + g, d, "Z"]
        }

        var A = a.Chart, y = a.defaultOptions,
            h = a.each, d = a.extend, v = a.merge, t = a.pick, r = a.Renderer, p = a.SVGRenderer, m = a.VMLRenderer;
        d(y.lang, {zoomIn: "Zoom in", zoomOut: "Zoom out"});
        y.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {fontSize: "15px", fontWeight: "bold"},
                theme: {"stroke-width": 1, "text-align": "center"}
            }, buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(.5)
                    }, text: "+", y: 0
                }, zoomOut: {
                    onclick: function () {
                        this.mapZoom(2)
                    }, text: "-", y: 28
                }
            }, mouseWheelSensitivity: 1.1
        };
        a.splitPath =
            function (a) {
                var d;
                a = a.replace(/([A-Za-z])/g, " $1 ");
                a = a.replace(/^\s*/, "").replace(/\s*$/, "");
                a = a.split(/[ ,]+/);
                for (d = 0; d < a.length; d++)/[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
                return a
            };
        a.maps = {};
        p.prototype.symbols.topbutton = function (a, d, h, c, g) {
            return z(a - 1, d - 1, h, c, g.r, g.r, 0, 0)
        };
        p.prototype.symbols.bottombutton = function (a, d, h, c, g) {
            return z(a - 1, d - 1, h, c, 0, 0, g.r, g.r)
        };
        r === m && h(["topbutton", "bottombutton"], function (a) {
            m.prototype.symbols[a] = p.prototype.symbols[a]
        });
        a.Map = a.mapChart = function (d,
                                       h, l) {
            var c = "string" === typeof d || d.nodeName, f = arguments[c ? 1 : 0], b = {
                endOnTick: !1,
                visible: !1,
                minPadding: 0,
                maxPadding: 0,
                startOnTick: !1
            }, e, m = a.getOptions().credits;
            e = f.series;
            f.series = null;
            f = v({
                chart: {panning: "xy", type: "map"},
                credits: {
                    mapText: t(m.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),
                    mapTextFull: t(m.mapTextFull, "{geojson.copyright}")
                },
                tooltip: {followTouchMove: !1},
                xAxis: b,
                yAxis: v(b, {reversed: !0})
            }, f, {chart: {inverted: !1, alignTicks: !1}});
            f.series = e;
            return c ? new A(d, f, l) : new A(f, h)
        }
    })(J);
    return J
});
