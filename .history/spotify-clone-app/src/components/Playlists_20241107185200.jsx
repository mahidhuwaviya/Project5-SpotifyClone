import React, { useEffect } from "react";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";
import styled from "styled-components";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlayListData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlist = items.map(({ name, id, images }) => {
        const image = images[2].url;
        return { name, id, image };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlist });
    };
    getPlayListData();
  }, [token, dispatch]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <Container>
      <ul>
        {playlists.map(({ name, id, image }) => {
          return (
            <li
              key={id}
              onClick={() => {
                changeCurrentPlaylist(id);
              }}
            >
              <img src={image} alt="album image" />
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 75vh;
    max-height: 100%;
    overflow: auto;
    transition: 0.3s ease-in-out;

    &:hover {
      &::-webkit-scrollbar {
        visibility: visible;
        width: 0.9rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    &::-webkit-scrollbar {
      visibility: hidden;
    }

    li {
      align-items: center;
      justify-content: center;
      display: flex;
      /* margin: 0.2rem 0.1rem;
      padding: 1rem 0; */
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
      img {
        height: 3rem;
        width: 3rem;
        border: solid 1px black;
        border-radius: 10%;
      }
    }
  }
`;
