import React from "react";
import styled from "styled-components";
import theme from "styled-theming";
import { Provider as ReduxProvider } from "react-redux";
import DarkThemeProvider from "./DarkThemeProvider";
import DarkThemeToggle from "./DarkThemeToggle";
import store from "./redux/store";
import "./App.css";

// styled-theming themes
export const backgroundTheme = theme("theme", {
  light: "#fff",
  dark: "#2d2d2d",
});

export const textTheme = theme("theme", {
  light: "#000",
  dark: "#fff",
});

export const switchBgTheme = theme("theme", {
  light: "#fff",
  dark: "#000",
});

export const switchTextTheme = theme("theme", {
  light: "#000",
  dark: "#fff",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  background-color: ${backgroundTheme};
  color: ${textTheme};
`;

const SwitchTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  height: 75px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${switchBgTheme};
  color: ${switchTextTheme};
`;

const App = () => {
  return (
    <ReduxProvider store={store}>
      <DarkThemeProvider>
        <React.Fragment>
          <SwitchTheme>
            <h1>Theme App</h1>
            <DarkThemeToggle />
          </SwitchTheme>
          <Container>
            <h2>Welcome!</h2>
            <h3>Full Stack Web Development</h3>
          </Container>
        </React.Fragment>
      </DarkThemeProvider>
    </ReduxProvider>
  );
};

export default App;
