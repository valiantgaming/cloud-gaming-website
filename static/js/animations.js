
function globalNavDropdowns(t) {
    var e = this;
    this.container = document.querySelector(t), this.root = this.container.querySelector(".navRoot"), this.primaryNav = this.root.querySelector(".navSection.primary"), this.primaryNavItem = this.root.querySelector(".navSection.primary .rootLink:last-child"), this.secondaryNavItem = this.root.querySelector(".navSection.secondary .rootLink:first-child"), this.checkCollision(), window.addEventListener("load", this.checkCollision.bind(this)), window.addEventListener("resize", this.checkCollision.bind(this)), this.container.classList.add("noDropdownTransition"), this.dropdownBackground = this.container.querySelector(".dropdownBackground"), this.dropdownBackgroundAlt = this.container.querySelector(".alternateBackground"), this.dropdownRoot = this.container.querySelector(".dropdownRoot"), this.dropdownContainer = this.container.querySelector(".dropdownContainer"), this.dropdownArrow = this.container.querySelector(".dropdownArrow"), this.dropdownRoots = Strut.queryArray(".hasDropdown", this.root), this.dropdownSections = Strut.queryArray(".dropdownSection", this.container).map(function(t) {
        return {
            el: t,
            name: t.getAttribute("data-dropdown"),
            content: t.querySelector(".dropdownContent")
        }
    });
    var n = window.PointerEvent ? {
        end: "pointerup",
        enter: "pointerenter",
        leave: "pointerleave"
    } : {
        end: "touchend",
        enter: "mouseenter",
        leave: "mouseleave"
    };
    this.keyDownHandler = null, this.dropdownRoots.forEach(function(t, i) {
        t.addEventListener(n.end, function(n) {
            n.preventDefault(), n.stopPropagation(), e.toggleDropdown(t)
        }), t.addEventListener("focusin", function(n) {
            e.stopCloseTimeout(), e.openDropdown(t, {
                keyboardNavigation: !0
            })
        }), t.addEventListener(n.enter, function(n) {
            "touch" != n.pointerType && (e.stopCloseTimeout(), e.openDropdown(t))
        }), t.addEventListener(n.leave, function(t) {
            "touch" != t.pointerType && e.startCloseTimeout()
        })
    }), this.dropdownContainer.addEventListener(n.end, function(t) {
        t.stopPropagation()
    }), this.dropdownContainer.addEventListener(n.enter, function(t) {
        "touch" != t.pointerType && e.stopCloseTimeout()
    }), this.dropdownContainer.addEventListener(n.leave, function(t) {
        "touch" != t.pointerType && e.startCloseTimeout()
    }), document.body.addEventListener(n.end, function(t) {
        Strut.touch.isDragging || e.closeDropdown()
    }), this.container.classList.add("initialized")
}


function globalNavPopup(t) {
    var e = this,
        n = Strut.touch.isSupported ? "touchend" : "click";
    this.activeClass = "globalPopupActive", this.root = document.querySelector(t), this.link = this.root.querySelector(".rootLink"), this.popup = this.root.querySelector(".popup"), this.closeButton = this.root.querySelector(".popupCloseButton"), this.link.addEventListener(n, function(t) {
        t.stopPropagation(), e.togglePopup()
    }), this.popup.addEventListener(n, function(t) {
        t.stopPropagation()
    }), this.popup.addEventListener("transitionend", function(t) {
        if (e.isOpening) {
            e.isOpening = !1;
            var n = e.popup.getBoundingClientRect().top + window.scrollY;
            if (n < 15) {
                var i = 15 - n;
                e.popup.style.transform = "translateY(" + i + "px)"
            }
        }
    }), this.closeButton && this.closeButton.addEventListener(n, function(t) {
        e.closeAllPopups()
    }), document.body.addEventListener(n, function(t) {
        Strut.touch.isDragging || e.closeAllPopups()
    }, !1)
}!

function() {
    var t, e, n = "cookie_banner_ack";

    function i(e) {
        var i, o;
        i = new Date, o = n + "=ack", i.setYear(i.getFullYear() + 10), o += ";expires=" + i.toGMTString(), o += ";domain=" + document.domain, document.cookie = o, t.classList.add("dismissed")
    }

}(), window.$ && window.$.ajaxPrefilter && $(function() {
        var t;
        return t = function() {
            var t, e;
            return (t = $("form input[name=csrf-token]")).length > 0 ? t.attr("value") : (e = $("meta[name=csrf-token]")).length > 0 ? e.attr("content") : ""
        }, $.ajaxPrefilter(function(e, n, i) {
            var o;
            return o = t(), i.setRequestHeader("x-stripe-csrf-token", o)
        })
    }), window.Strut = {
        random: function(t, e) {
            return Math.random() * (e - t) + t
        },
        arrayRandom: function(t) {
            return t[Math.floor(Math.random() * t.length)]
        },
        interpolate: function(t, e, n) {
            return t * (1 - n) + e * n
        },
        rangePosition: function(t, e, n) {
            return (n - t) / (e - t)
        },
        clamp: function(t, e, n) {
            return Math.max(Math.min(t, n), e)
        },
        queryArray: function(t, e) {
            return e || (e = document.body), Array.prototype.slice.call(e.querySelectorAll(t))
        },
        ready: function(t) {
            "loading" !== document.readyState ? t() : document.addEventListener("DOMContentLoaded", t)
        },
        debounce: function(t, e) {
            let n;
            return function() {
                clearTimeout(n), n = setTimeout(function() {
                    return t.apply(this, arguments)
                }, e)
            }
        },
        throttle: function(t, e, n) {
            var i = n || this,
                o = null,
                a = null,
                r = function() {
                    t.apply(i, a), o = null
                };
            return function() {
                o || (a = arguments, o = setTimeout(r, e))
            }
        }
    }, Strut.isRetina = window.devicePixelRatio > 1.3, Strut.mobileViewportWidth = 670, Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth, window.addEventListener("resize", function() {
        Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth
    }), Strut.touch = {
        isSupported: "ontouchstart" in window || navigator.maxTouchPoints,
        isDragging: !1
    }, document.addEventListener("DOMContentLoaded", function() {
        document.body.addEventListener("touchmove", function() {
            Strut.touch.isDragging = !0
        }), document.body.addEventListener("touchstart", function() {
            Strut.touch.isDragging = !1
        })
    }), Strut.load = {
        images: function(t, e) {
            "string" == typeof t && (t = [t]);
            var n = -t.length;
            t.forEach(function(t) {
                var i = new Image;
                i.src = t, i.onload = function() {
                    0 === ++n && e && e()
                }
            })
        },
        css: function(t, e) {
            var n = document.createElement("link"),
                i = (window.readConfig("strut_files") || {})[t];
            if (!i) throw new Error('CSS file "' + t + '" not found in strut_files config');
            n.href = i, n.rel = "stylesheet", document.head.appendChild(n), e && (n.onload = e)
        },
        js: function(t, e) {
            var n = document.createElement("script"),
                i = (window.readConfig("strut_files") || {})[t];
            if (!i) throw new Error('Javascript file "' + t + '" not found in strut_files config');
            n.src = i, n.async = !1, document.head.appendChild(n), e && (n.onload = e)
        }
    }, Strut.supports = {
        es6: !!window.Symbol && !!window.Symbol.species,
        pointerEvents: function() {
            var t = document.createElement("a").style;
            return t.cssText = "pointer-events:auto", "auto" === t.pointerEvents
        }(),
        positionSticky: Boolean(window.CSS && CSS.supports("(position: -webkit-sticky) or (position: sticky)")),
        masks: !/MSIE|Trident|Edge/i.test(navigator.userAgent)
    }, globalNavDropdowns.prototype.checkCollision = function() {
        if (!Strut.isMobileViewport)
            if (1 == this.compact) {
                var t = document.body.clientWidth,
                    e = this.primaryNav.getBoundingClientRect();
                e.left + e.width / 2 > t / 2 && (this.container.classList.remove("compact"), this.compact = !1)
            } else {
                var n = this.primaryNavItem.getBoundingClientRect(),
                    i = this.secondaryNavItem.getBoundingClientRect();
                n.right > i.left && (this.container.classList.add("compact"), this.compact = !0)
            }
    }, globalNavDropdowns.prototype.registerArrowKeyNavigation = function(t, e) {
        var n = this;
        null !== this.keyDownHandler && this.unregisterArrowKeyNavigation();
        var i = [].slice.call(e.querySelectorAll("a")),
            o = 0;
        i[o].focus(), this.keyDownHandler = function(e) {
            9 === e.keyCode ? (t.focus(), n.startCloseTimeout()) : 38 === e.keyCode ? (e.preventDefault(), --o < 0 && (o += i.length), i[o].focus()) : 40 === e.keyCode && (e.preventDefault(), ++o >= i.length && (o -= i.length), i[o].focus())
        }, this.container.addEventListener("keydown", this.keyDownHandler)
    }, globalNavDropdowns.prototype.unregisterArrowKeyNavigation = function() {
        this.container.removeEventListener("keydown", this.keyDownHandler), this.keyDownHandler = null
    }, globalNavDropdowns.prototype.openDropdown = function(t, e) {
        var n = this;
        if (this.activeDropdown !== t) {
            this.container.classList.add("overlayActive"), this.container.classList.add("dropdownActive"), this.activeDropdown = t, this.activeDropdown.setAttribute("aria-expanded", "true"), this.dropdownRoots.forEach(function(t, e) {
                t.classList.remove("active")
            }), t.classList.add("active");
            var i, o, a, r = t.getAttribute("data-dropdown"),
                s = "left";
            this.dropdownSections.forEach(function(c) {
                c.el.classList.remove("active"), c.el.classList.remove("left"), c.el.classList.remove("right"), c.name == r ? (c.el.setAttribute("aria-hidden", "false"), c.el.classList.add("active"), s = "right", i = c.content.offsetWidth, o = c.content.offsetHeight, c.content.getAttribute("data-fixed") ? c.content.setAttribute("data-fixed", !0) : (c.content.style.width = i + "px", c.content.style.height = o + "px"), a = c.content, e && e.keyboardNavigation && n.registerArrowKeyNavigation(t, c.el)) : (c.el.classList.add(s), c.el.setAttribute("aria-hidden", "true"))
            });
            var c = i / 380,
                d = o / 400,
                l = t.getBoundingClientRect(),
                u = l.left + l.width / 2 - i / 2;
            u = Math.round(Math.max(u, 10)), clearTimeout(this.disableTransitionTimeout), this.enableTransitionTimeout = setTimeout(function() {
                n.container.classList.remove("noDropdownTransition")
            }, 50), this.dropdownBackground.style.transform = "translateX(" + u + "px) scaleX(" + c + ") scaleY(" + d + ")", this.dropdownContainer.style.transform = "translateX(" + u + "px)", this.dropdownContainer.style.width = i + "px", this.dropdownContainer.style.height = o + "px";
            var w = Math.round(l.left + l.width / 2);
            this.dropdownArrow.style.transform = "translateX(" + w + "px) rotate(45deg)";
            var p = a.children[0].offsetHeight / d;
            this.dropdownBackgroundAlt.style.transform = "translateY(" + p + "px)", window.siteAnalytics && window.siteAnalytics.trackGlobalNavDropdownOpen && window.siteAnalytics.trackGlobalNavDropdownOpen(r)
        }
    }, globalNavDropdowns.prototype.closeDropdown = function() {
        var t = this;
        this.activeDropdown && (this.dropdownRoots.forEach(function(t, e) {
            t.classList.remove("active")
        }), this.dropdownContainer.querySelector('[aria-hidden="false"]').setAttribute("aria-hidden", "true"), clearTimeout(this.enableTransitionTimeout), this.disableTransitionTimeout = setTimeout(function() {
            t.container.classList.add("noDropdownTransition")
        }, 50), this.container.classList.remove("overlayActive"), this.container.classList.remove("dropdownActive"), this.activeDropdown.setAttribute("aria-expanded", "false"), this.activeDropdown = void 0, this.unregisterArrowKeyNavigation())
    }, globalNavDropdowns.prototype.toggleDropdown = function(t) {
        this.activeDropdown === t ? this.closeDropdown() : this.openDropdown(t)
    }, globalNavDropdowns.prototype.startCloseTimeout = function() {
        var t = this;
        t.closeDropdownTimeout = setTimeout(function() {
            t.closeDropdown()
        }, 50)
    }, globalNavDropdowns.prototype.stopCloseTimeout = function() {
        clearTimeout(this.closeDropdownTimeout)
    }, globalNavPopup.prototype.togglePopup = function() {
        var t = this.root.classList.contains(this.activeClass);
        this.closeAllPopups(!0), t || (this.root.classList.add(this.activeClass), this.isOpening = !0)
    }, globalNavPopup.prototype.closeAllPopups = function(t) {
        for (var e = document.getElementsByClassName(this.activeClass), n = 0; n < e.length; n++) e[n].querySelector(".popup").style.transform = null, e[n].classList.remove(this.activeClass)
    }, Strut.supports.pointerEvents || Strut.load.css("v3/shared/navigation_ie10.css"), Strut.ready(function() {
        new globalNavDropdowns(".globalNav"), new globalNavPopup(".globalNav .navSection.mobile"), new globalNavPopup(".globalFooterNav .select.country"), new globalNavPopup(".globalFooterNav .select.language"), document.body.addEventListener("keydown", function(t) {
            9 == t.keyCode && document.body.classList.add("keyboard-navigation")
        }), document.body.addEventListener("click", function(t) {
            document.body.classList.remove("keyboard-navigation")
        })
    }),
    function() {
        "use strict";
        window.siteAnalytics = window.siteAnalytics || {}, window.siteAnalyticsUtil = window.siteAnalyticsUtil || {};
        var t, e = !1,
            n = "SITE_ANALYTICS_DEBUG",
            i = [],
            o = 250,
            a = o,
            r = 1.3;

        function s() {
            var t = [].slice.call(arguments);
            w() && console.log.apply(console, t)
        }

        function c() {
            return null || {}
        }

        function d() {
            return c().generalAnalyticsConfig || {}
        }

        function l() {
            return c().siteSpecificAnalyticsConfig || {}
        }

        function u() {
            return l().gtmConfig || {}
        }

        function w() {
            return !!window[n]
        }

        function p(t, e) {
            m("action", t, e)
        }

        function f(t, e) {
            m("actionOnce", t, e)
        }

        function g(t, e) {
            m("modal", t, e)
        }

        function y(t, e) {
            m("viewed", t, e)
        }

        function m(t, e, n) {
            window.Analytics ? h(t, e, n) : function(t, e, n) {
                i.push([t, e, n]), b(), s("enqueue", t, e, n)
            }(t, e, n)
        }

        function h(t, e, n) {
            A();
            var i = function(t) {
                var e = d();
                return Object.keys(t || {}).forEach(function(n) {
                    e[n] = t[n]
                }), e
            }(n);
            window.Analytics[t](e, i), s("emit", t, e, i)
        }

        function v() {
            var t, e, n = u();
            t = n, e = {}, Object.keys(t).forEach(function(n) {
                var i = t[n];
                e[n] = i || void 0
            }), n = e, window.dataLayer = window.dataLayer || [], window.dataLayer.push(n)
        }

        function A() {
            e || (window.Analytics.configure(d()), e = !0, s("Sent config data"))
        }

        function b() {
            t || (t = setTimeout(k, a), a *= r)
        }

        function k() {
            t = null, window.Analytics ? (s("Flushing event queue"), A(), i.forEach(function(t) {
                h.apply(this, t)
            }), a = o) : (b(), s("Ready timer waiting " + a + "ms"))
        }

        function C(t) {
            if (!window.ga) return window.siteAnalyticsUtil.enqueuedCalls = window.siteAnalyticsUtil.enqueuedCalls || [], void window.siteAnalyticsUtil.enqueuedCalls.push({
                fnName: "sendToGoogleAnalytics",
                args: [t]
            });
            window.ga.apply(this, t), s("ga", t)
        }

        function L(t) {
            window.dataLayer.push(t), s("dataLayer", t)
        }

        function S() {
            window.ga && window.siteAnalyticsUtil.generalAnalyticsConfig ? window.siteAnalyticsUtil.enqueuedCalls && (window.siteAnalyticsUtil.enqueuedCalls.forEach(function(t) {
                var e = window.siteAnalyticsUtil[t.fnName];
                e ? e.apply(window.siteAnalyticsUtil, t.args) : setTimeout(function() {
                    throw Error("siteAnalyticsUtil has no fn " + t.fnName)
                })
            }), window.siteAnalyticsUtil.enqueuedCalls = []) : setTimeout(S, 100)
        }
        window.siteAnalyticsUtil.analyticsConfigData || (v(), b(), window.siteAnalyticsUtil.debugActive = w, window.siteAnalyticsUtil.emitAction = p, window.siteAnalyticsUtil.emitActionOnce = f, window.siteAnalyticsUtil.emitModal = g, window.siteAnalyticsUtil.emitViewed = y, window.siteAnalyticsUtil.siteAnalyticsConfig = l, window.siteAnalyticsUtil.siteGtmConfigData = u, window.siteAnalyticsUtil.sendToGoogleAnalytics = C, window.siteAnalyticsUtil.sendToDataLayer = L, window.siteAnalyticsUtil.generalAnalyticsConfig = d, S())
    }(),
    function() {
        var t = "data-analytics-action",
            e = "data-analytics-source",
            n = "data-analytics-modal",
            i = "data-analytics-ga";

        function o(e) {
            return e && e.getAttribute ? e.getAttribute(t) || e.getAttribute(n) ? e : e.parentNode && "BODY" !== e.tagName ? o(e.parentNode) : null : (setTimeout(function() {
                window.Raven && window.Raven.captureMessage("Tried to findAnalyticsAttributes on something without .getAttribute (old code)", {
                    extra: {
                        el: e
                    }
                })
            }, 2e3), null)
        }

        function a(t) {
            return !!o(t)
        }

        function r(a) {
            var r = function(a) {
                var r = o(a),
                    s = {};
                return r.getAttribute(t) && (s.action = r.getAttribute(t)), r.getAttribute(n) && (s.modal = r.getAttribute(n)), r.getAttribute(e) && (s.params = {
                    source: r.getAttribute(e)
                }), r.getAttribute(i) && (s.googleAnalyticsParams = JSON.parse(r.getAttribute(i))), r.getAttribute(e) && -1 !== r.getAttribute(e).indexOf("cta") && (s.trackCta = !0), s
            }(a);
            r.modal && window.siteAnalyticsUtil.emitModal(r.modal, r.params), r.action && window.siteAnalyticsUtil.emitAction(r.action, r.params), r.googleAnalyticsParams && window.siteAnalyticsUtil.sendToGoogleAnalytics(r.googleAnalyticsParams), r.trackCta && s(a)
        }

        function s(n) {
            var i = n.getAttribute(t) + "_" + n.getAttribute(e);
            window.siteAnalyticsUtil.sendToDataLayer({
                event: "cta-button-click",
                "cta-type": i,
                "click-url": n.href
            })
        }
        window.siteAnalytics.hasAnalyticsAttributes = a, window.siteAnalytics.trackByAttributes = r, window.siteAnalytics.trackCtaClick = s
    }(),
    function() {
        function t(t) {
            if (t.currentTarget.hasAttribute("data-language")) {
                var e = t.currentTarget.getAttribute("data-language");
                window.siteAnalytics.trackLanguageChange(e)
            }
        }

        function e(t) {
            if (t.currentTarget.hasAttribute("data-country")) {
                var e = t.currentTarget.getAttribute("data-country");
                window.siteAnalytics.trackCountryChange(e)
            }
        }
        document.addEventListener("DOMContentLoaded", function() {
            [].slice.call(document.querySelectorAll(".languagePicker a[data-language]")).forEach(function(e) {
                e.addEventListener("click", t)
            }), [].slice.call(document.querySelectorAll(".countryPicker a[data-country]")).forEach(function(t) {
                t.addEventListener("click", e)
            })
        })
    }(),

    function() {

    }(),
    function(t, e, n, i, o) {
        t[i] = t[i] || [], t[i].push({
            "gtm.start": (new Date).getTime(),
            event: "gtm.js"
        });
        var a = e.getElementsByTagName(n)[0],
            r = e.createElement(n);
        r.async = !0, r.src = "https://www.googletagmanager.com/gtm.js?id=", a.parentNode.insertBefore(r, a)
    }(window, document, "script", "dataLayer"),
    function() {
        var t = "radar_icosahedron",
            e = "radar_fraud_chart",
            n = "home_page_notebook",
            i = "connect_routing_diagram",
            o = "billing_infra_diagram",
            a = "billing_node_open",
            r = "billing_interactive_invoice_section",
            s = "query_category",
            c = "pricing_slider",
            d = {},
            l = {},
            u = {},
            w = {},
            p = {};

        function f() {
            window.siteAnalyticsUtil.emitActionOnce(t)
        }

        function g() {
            window.siteAnalyticsUtil.emitActionOnce(e)
        }

        function y(t) {
            var e = t.innerText.trim().toLowerCase();
            d[e] || (d[e] = !0, window.siteAnalyticsUtil.emitAction(n, {
                text: e
            }))
        }

        function m(t) {
            var e = t.innerText.trim().toLowerCase();
            l[e] || (d[e] = !0, window.siteAnalyticsUtil.emitAction(i, {
                text: e
            }))
        }

        function h(t) {
            var e = t.innerText.trim().toLowerCase();
            u[e] || (u[e] = !0, window.siteAnalyticsUtil.emitAction(o, {
                text: e
            }))
        }

        function v(t, e) {
            var n = t.dataset.nodeType,
                i = t.dataset.nodeDescription,
                o = t.querySelector(".infra-node__meta").textContent.trim().toLowerCase(),
                r = e + "-" + n + "-" + o;
            w[r] || (w[r] = !0, window.siteAnalyticsUtil.emitAction(a, {
                infra_selectedPlan: e,
                infra_node_type: n,
                infra_node_meta: o,
                infra_node_description: i
            }))
        }

        function A(t) {
            var e = t.dataset.target;
            p[e] || (p[e] = !0, window.siteAnalyticsUtil.emitAction(r, {
                section: e
            }))
        }

        function b(t) {
            window.siteAnalyticsUtil.emitAction(s, {
                category: t
            })
        }

        function k(t) {
            window.siteAnalyticsUtil.emitAction(s, {
                query: t
            })
        }

        function C() {
            window.siteAnalyticsUtil.emitActionOnce(c)
        }

        function L() {
            window.siteAnalyticsUtil.sendToDataLayer({
                event: "virtual-pageview",
                url: document.location.href,
                title: document.title
            })
        }

        function S(t) {
            window.siteAnalyticsUtil.sendToDataLayer({
                event: "site-language-change",
                language: t
            })
        }

        function E(t) {
            window.siteAnalyticsUtil.sendToDataLayer({
                event: "site-country-change",
                country: t
            })
        }

        function D() {
            window.siteAnalyticsUtil.sendToGoogleAnalytics(["send", "event", "Click", "Try Demo", "demo"])
        }
        window.siteAnalytics.trackBillingInfraDiagramPricingPlan = h, window.siteAnalytics.trackBillingInfraDiagramNode = v, window.siteAnalytics.trackBillingInteractiveInvoice = A, window.siteAnalytics.trackConnectExpressDemoCta = D, window.siteAnalytics.trackConnectRoutingDiagram = m, window.siteAnalytics.trackCountryChange = E, window.siteAnalytics.trackDocsPageView = L, window.siteAnalytics.trackHomePageNotebook = y, window.siteAnalytics.trackLanguageChange = S, window.siteAnalytics.trackRadarIcosahedron = f, window.siteAnalytics.trackRadarFraudChart = g, window.siteAnalytics.trackSigmaQueryCategory = b, window.siteAnalytics.trackSigmaQueryExample = k, window.siteAnalytics.trackSigmaPricingSlider = C
    }(),
    function() {
        var t = "inline_link",
            e = "button",
            n = "pdf_link";

        function i(i) {
            var o, a = function(i) {
                    var o = i.className.toLowerCase(),
                        a = i.getAttribute("href");
                    return /\.pdf$|\.pdf#|\.pdf\?/i.test(i.href) ? n : -1 !== o.indexOf("button") || "#" === a ? e : t
                }(i),
                r = {
                    text: (o = i.innerText, o.trim().replace(/\s+/g, " "))
                };
            window.siteAnalyticsUtil.emitAction(a, r)
        }

        function o(t) {
            if (window.siteAnalytics.hasAnalyticsAttributes(t.target)) window.siteAnalytics.trackByAttributes(t.target);
            else {
                var e = function t(e) {
                    return "A" === e.tagName ? e : e.parentNode ? t(e.parentNode) : null
                }(t.target);
                e && function(t) {
                    return !!t.getAttribute("href")
                }(e) && i(e)
            }
        }
        document.addEventListener("click", o)
    }(),
    function() {
        function t() {
            if (function() {
                    if (!document.documentElement.id) return !1;
                    return !!window.siteAnalyticsUtil.siteAnalyticsConfig().trackPageViewed
                }()) {
                var t = window.siteAnalyticsUtil.generalAnalyticsConfig(),
                    e = document.documentElement.id;
                window.siteAnalyticsUtil.emitViewed(e, t)
            }
        }
        window.siteAnalytics.pageLoadTracking || (window.siteAnalytics.pageLoadTracking = {
            trackPageView: t
        }, window.addEventListener("load", t))
    }(),
    function() {
        var t = "video_expand",
            e = "video_end",
            n = "video_play";

        function i(e) {
            return r(t, e)
        }

        function o(t) {
            return r(n, t)
        }

        function a(t) {
            return r(e, t)
        }

        function r(t, e) {
            var n, i, o = e;
            "string" != typeof e && (n = function(t) {
                return t.currentSrc || t.getAttribute("src") || t.querySelector("source").getAttribute("src")
            }(e), o = (i = n.slice(n.lastIndexOf("/") + 1)).slice(0, i.lastIndexOf("."))), window.siteAnalyticsUtil.emitAction(t, {
                video: o
            })
        }

        function s(t) {
            "VIDEO" === t.target.tagName && o(t.target)
        }

        function c(t) {
            "VIDEO" === t.target.tagName && a(t.target)
        }
        document.addEventListener("play", s, !0), document.addEventListener("ended", c, !0), window.siteAnalytics.trackVideoExpand = i, window.siteAnalytics.trackVideoPlay = o, window.siteAnalytics.trackVideoEnd = a
    }();
