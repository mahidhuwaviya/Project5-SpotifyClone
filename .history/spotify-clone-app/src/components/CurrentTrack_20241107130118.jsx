import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data != "") {
          const { item } = response.data;
          const currentPlaying = {
            id: item.id,
            name: item.name,
            artist: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url || "",
          };

          dispatch({
            type: reducerCases.SET_CURRENTLY_PLAYING,
            currentPlaying,
          });
        }
      } catch (error) {
        console.error("Error fetching the current track:", error);
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);

  useEffect(() => {}, []);
  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentlyplaying" />
          </div>
          <div className="track__info">
            <h4>{currentPlaying.name}</h4>
            <h6>{currentPlaying.artist.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      h4 {
        color: white;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
