import React, { useEffect } from "react";
// import styled from "styled-components";
import Login from "./components/Login";
import { useStateProvider } from "./utils/stateProvider";
import { reducerCases } from "./utils/constants";
import SpotiFy from "./components/SpotiFy";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);

  return <div>{token ? <SpotiFy /> : <Login />}</div>;
}

// const Container = styled.div``;
