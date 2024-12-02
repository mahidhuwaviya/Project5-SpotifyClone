import React from "react";
import styled from "styled-components";
// import { IoLibrary } from "react-icons/io5";
// import { MdHomeFilled, MdSearch } from "react-icons/md";
import { VscLibrary } from "react-icons/vsc";

import Playlists from "./Playlists";

export default function SideBar() {
  return (
    <Container>
      <div className="topLinks">
        {/* <div className="Logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
            alt="Spotify"
          />
        </div> */}
        <ul>
          <li>
            <VscLibrary />
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: #131212e4;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .topLinks {
    display: flex;
    flex-direction: column;
    /* .Logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    } */
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      margin-top: 6vh;
      li {
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
        svg {
          height: 3rem;
          width: 3rem;
          padding: 0.6rem;
          color: #c2baba;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          border: transparent solid 1px;
          /* background-color: #282828; */
          border-radius: 30%;
          &:hover {
            color: white;
          }
        }
      }
    }
  }
`;
