function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }

            body {
                font-family: 'Open Sans', sans-serif;
            }

            /* App fit Height */ 
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */ 

            /* ===== Scrollbar CSS ===== */
            /* Firefox */
            * {
                scrollbar-width: auto;
                scrollbar-color: #d6d6d6 #292929;
            }

            /* Chrome, Edge, and Safari */
            *::-webkit-scrollbar {
                width: 13px;
            }

            *::-webkit-scrollbar-track {
                background: #292929;
                border-radius: 5px;
            }

            *::-webkit-scrollbar-thumb {
                background-color: #d6d6d6;
                border-radius: 5px;
                border: 2px solid #292929;
            }
        `}</style>
    )
}

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp