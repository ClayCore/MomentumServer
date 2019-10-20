import React from 'react';
import ReactDOM from 'react-dom';
import App, { isMobile, isSubpage } from './App';
import * as serviceWorker from './serviceWorker';

(function() {
    /// GLOBAL TUNABLES

    // Dynamic styles we're linking based on the document
    const master_css = 'css/master.css';
    const mobile_css = 'css/mobile/master.css';

    /// UTILITY FUNCTIONS
    function $(what) {
        return document.querySelector(what);
    }

    function _(what) {
        return document.querySelectorAll(what);
    }

    function loadFile(path) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            // Okay and ready to be downloaded
            if (this.readyState === 4 && this.status === 200) {
                return this.responseText;
            }
        };
    }

    // For dynamic page load times, with a bit of padding
    function onReady(callback) {
        let interval_id = window.setInterval(function() {
            if ($('body') !== undefined) {
                window.clearInterval(interval_id);
                callback.call(this);
            }
        }, 1000);
    }

    // For appending styles to the page
    function linkStyle(style) {
        // First, create a dummy link element
        let link = document.createElement('link');

        // Assign it the properties of the stylesheet we're linking
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = style;

        // Finally, add it to the <head> section of the document
        document.head.appendChild(link);
    }

    /// MAIN INITIALIZATION
    function init() {
        // Wait for DOM to finish loading
        document.addEventListener('DOMContentLoaded', function() {
            let main_root = '../'.repeat(1);
            let sub_root = '../'.repeat(2);

            if (isMobile()) {
                if (isSubpage()) {
                    // mobile and subpage
                    linkStyle(sub_root + mobile_css);
                } else {
                    // mobile and main page
                    linkStyle(main_root + mobile_css);

                    // Only add the loader to the index page
                    onReady(function() {
                        $('body').classList.add('loaded');
                        $('body').classList.add('changed');
                    });
                }
            } else {
                if (isSubpage()) {
                    // not mobile, subpage
                    linkStyle(sub_root + master_css);
                } else {
                    // not mobile and not a subpage
                    linkStyle(main_root + master_css);

                    // Only add the loader to the index page
                    onReady(function() {
                        $('body').classList.add('loaded');
                        $('body').classList.add('changed');
                    });
                }
            }

            // Render the app
            ReactDOM.render(<App />, $('#root'));
            serviceWorker.unregister();
        });
    }

    init();
})();
