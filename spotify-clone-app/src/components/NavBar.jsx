import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/stateProvider";
import { GoHomeFill } from "react-icons/go";

export default function NavBar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  return (
    <Container navBackground={navBackground}>
      <div className="logo">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White-300x300.png"
          alt="Spotify"
        />
      </div>
      <div className="home">
        <GoHomeFill />
      </div>
      <div className="searchBar">
        <FaSearch />
        <input type="text" placeholder="What do you want to [lay?" />
      </div>
      <div className="avatar">
        <a href="/">
          <CgProfile />
          {userInfo && <span>{userInfo.userName}</span>}
        </a>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  height: 10vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: black;
  gap: 1rem;
  /* background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"}; */
  .logo {
    margin: 1rem 0;
    img {
      max-inline-size: 15%;
      block-size: auto;
    }
  }
  .home {
    svg {
      font-size: 3rem;
      padding: 0.6rem;
      color: #c2baba;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      border: #282828 solid 1px;
      background-color: #282828;
      border-radius: 60%;
      &:hover {
        color: white;
      }
    }
  }
  .searchBar {
    background-color: #282828;
    width: 30%;
    padding: 0.6rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #c2baba;

    input {
      background-color: #282828;
      border: none;

      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
