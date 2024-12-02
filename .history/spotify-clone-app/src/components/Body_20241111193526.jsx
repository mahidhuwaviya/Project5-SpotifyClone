import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";

export default function Body({ headerBackground, navBackground }) {
  // console.log(headerBackground);
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url || "",
          tracks: response.data.tracks.items.map(({ track, added_at }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url || "",
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
            added_at: added_at,
          })),
        };
        // console.log(selectedPlaylist);
        // console.log(response.data);
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      } catch (error) {
        console.log("error in selectedId", error);
      }
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms & 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? 0 : "") + seconds;
  };

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        const currentPlaying = {
          id,
          name,
          artists,
          image,
        };
        dispatch({ type: reducerCases.SET_CURRENTLY_PLAYING, currentPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      }
    } catch (error) {
      console.log("error in currentplaying:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Container
      headerBackground={headerBackground}
      navBackground={navBackground}
    >
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="Selected Playlist" />
            </div>
            <div className="details">
              <span className="type"> PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="playbutton">
            <div className="playgreen">
              <FaPlay />
            </div>
            <div className="options">
              <SlOptions />
            </div>
          </div>
          <div className="list">
            <div className={`header_row ${headerBackground ? "scrolled" : ""}`}>
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>Date Added</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                    added_at,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() => {
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        );
                      }}
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{formatDate(added_at)}</span>
                      </div>
                      {/* <div className="col">{added_at}</div> */}
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    /* margin-bottom: 2rem; */
    padding: 0 2rem;
    padding-top: 5rem;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: rgb(47, 124, 141);
    box-shadow: rgba(255, 255, 255, 0.8) 0 -10px 15px -3px; /* Adjusted shadow */
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px 12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 6rem;
      }
    }
  }
  .playbutton {
    background-color: rgb(34 91 104);

    position: sticky;
    top: 8vh;
    padding: 2rem;
    /* margin: 2rem 2rem; */
    display: flex;
    gap: 3rem;
    align-items: center;
    background-color: ${({ headerBackground }) =>
      headerBackground ? "rgb(34 91 104)" : "none"};
    .playgreen {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;
      width: 4rem;
      border: solid 1px #3be477;
      border-radius: 50%;
      background-color: #3be477;
      svg {
        font-size: 1rem;
      }
    }
    .options {
      color: #dddcdc;
    }
  }
  .list {
    .header_row {
      background-color: rgb(34 91 104);

      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 2fr 0.1fr;
      color: #dddcdc;
      padding: 1rem 0;
      position: sticky;
      top: 21vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#131212" : "none"};
    }
    /* .scrolled {
      background-color: "#265a5cef !important";
    } */
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
