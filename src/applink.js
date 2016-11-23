/*!
 * applink.js
 *
 * Copyright 2016
 * Released under MIT license
 */

(function () {
    'use strict';

    var agent = '',
        hidden,
        visibilityChange,
        delay = 1200,
        clicked = false,
        timeout = null;

    (function () {
        // 初始化agent
        var ua = navigator.userAgent;

        if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            agent = 'ios';
        } else {
            // 忽略WinPhone
            agent = 'android';
        }

        if (!!/\bMicroMessenger\b/i.test(ua) || !!/\bQQ\b/i.test(ua)) {
            agent =  'qq-' + agent;
        }
    }());

    (function initVisibilityProperty() {
        // Set the name of the hidden property and the change event for visibility

        if (document.hidden !== undefined) { // Opera 12.10 and Firefox 18 and later support
            hidden = 'hidden';
            visibilityChange = 'visibilitychange';
        } else if (document.msHidden !== undefined) {
            hidden = 'msHidden';
            visibilityChange = 'msvisibilitychange';
        } else if (document.webkitHidden !== undefined) {
            hidden = 'webkitHidden';
            visibilityChange = 'webkitvisibilitychange';
        }
    }());


    function handleVisibilityChange() {
        if (document[hidden]) {
            // Triggered on blur
            if (!clicked || !timeout) {
                return;
            }

            // Reset everything
            clearInterval(timeout);
            timeout = null;
            clicked = false;
        }
    }


    function handleAndroidBrowsers(href, deeplink) {
        // Android Mobile
        var isAndroidMobile = navigator.userAgent.indexOf('Android') > -1 &&
                navigator.userAgent.indexOf('Mozilla/5.0') > -1 &&
                navigator.userAgent.indexOf('AppleWebKit') > -1,
            // Android Browser (not Chrome)
            regExAppleWebKit = /AppleWebKit\/([\d.]+)/,
            resultAppleWebKitRegEx = regExAppleWebKit.exec(navigator.userAgent),
            appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(resultAppleWebKitRegEx[1])),
            isAndroidBrowser = isAndroidMobile && appleWebKitVersion !== null && appleWebKitVersion > 500;

        if (isAndroidBrowser) {
            return 'intent:' + deeplink.split(':')[1] +
                '#Intent;scheme=' + deeplink.split(':')[0] +
                ';S.browser_fallback_url=' + encodeURI(href);
        }

        return deeplink;
    }


    function open(url) {
        location.href = url;
    }


    function addListener() {
        document.body.addEventListener('click', function (e) {
            // Hijack click event

            var target = e.target,
                deeplink = target.getAttribute('data-deeplink'),
                start;

            if (target.tagName !== 'a' || !deeplink || clicked || timeout) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();

            // Store start time
            start = Date.now();
            clicked = true;

            // Timeout to detect if the link worked
            timeout = setTimeout(function () {
                // Check if any of the values are unset
                if (!clicked || !timeout) {
                    return;
                }

                // Reset things
                clicked = false;
                timeout = null;

                // Has the user left the screen? ABORT!
                if (Date.now() - start >= delay * 2) {
                    return;
                }

                open(target.href);
            }, delay);

            // Go to app
            open(handleAndroidBrowsers(target.href, deeplink));
        }, false);
    }

    function optimize(anchor) {
        if (!anchor) {
            return;
        }

        var href = anchor.getAttribute('data-href-' + agent);

        if (!href) {
            return;
        }

        anchor.href = href;
    }


    window.applink = {

        init: function () {
            var elements = document.getElementsByTagName('a'),
                i;

            for (i = elements.length - 1; i >= 0; i -= 0) {
                optimize(elements[i]);
            }

            addListener();

            if (document[hidden] !== undefined) {
                // Handle page visibility change
                document.addEventListener(visibilityChange, handleVisibilityChange, false);
            }
        },

        optimize: optimize

    };

}());
