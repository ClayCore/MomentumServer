import React, { Component } from 'react';

class MobileCheck extends Component {
    componentDidMount = () => {
        const script = document.createElement('script');

        script.src = '//cdn.jsdelivr.net/github-cards/latest/widget.js';
        script.async = true;

        document.body.appendChild(script);
    };

    render() {
        return (
            <main>
                <div id="mobile">
                    <header>

                    </header>
                    <article>

                    </article>
                    <footer>

                    </footer>
                </div>
                <div id="desktop">
                    <aside>

                    </aside>
                    <header>

                    </header>
                </div>
            </main>
        );
    }
}

export default MobileCheck;
