import {ThemeProvider} from "styled-components";
import {defaultTheme} from "./styles/themes/default.ts";
import {GlobalStyle} from "./styles/globals.ts";


export function App() {

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <h1>Hello world</h1>
        </ThemeProvider>
    )
}
