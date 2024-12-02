import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";

export default function SpotiFy() {
  const bodyRef = useRef();
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = () => {
    // console.log(bodyRef.current.scrollTop);
    bodyRef.current.scrollTop >= 20
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 370
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [token, dispatch]);

  return (
    <Container>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="spotifyBody">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <div className="bodyContants">
            <Body
              headerBackground={headerBackground}
              navBackground={navBackground}
            />
          </div>
        </div>
      </div>
      <div className="spotifyFooter">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 2vh 85vh 13vh;
  .spotifyBody {
    display: grid;
    grid-template-columns: 6vw 94vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(0, 0, 0);
    .sideBar {
    }
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &.show-scrollbar {
        overflow: auto;
      }
      &::-webkit-scrollbar {
        visibility: hidden;
      }
      &:hover {
        &::-webkit-scrollbar {
          visibility: visible;
          width: 0.9rem;
          &-thumb {
            background-color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
  }
`;
