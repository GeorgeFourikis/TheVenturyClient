import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";

const ParentContainer = styled.div`
  border: 0px solid #fff;
`;

const JokeBox = styled.div`
  float: left;
  box-sizing: border-box;
  width: 100%;
  min-height: 20%;
  padding: 1% 0 1% 0;
  border: 0px solid #f2f2f2;
  background: #f2f2f2;
  color: black;
  box-sizing: content-box;
  border-radius: 10px;
`;

const JokeTitle = styled.p`
  /* margin-top: 15%; */
  float: left;
  text-align: center;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  color: white;
`;

const JokeContent = styled.p`
  text-align: center;
  font-size: 0.8em;
`;

const JokeButton = styled.button`
  float: left;
  border: 0px solid #fff;
  width: 100%;
  height: 10%;
  font-size: 1.1em;
  font-weight: 500;
  background: #76ffd6;
  border-radius: 10px;
`;

export default function FetchJoke() {
  const [joke, setJoke] = useState();
  const [splittedEmails] = useContext(Context);

  function sendToMyFriends() {
    let payload = JSON.stringify({
      data: { emails: splittedEmails, joke },
    });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch("http://127.0.0.1:8080/api", requestOptions)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  }

  async function fetchData() {
    try {
      fetch("http://api.icndb.com/jokes/random")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setJoke(data.value.joke);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log("Error connecting to the API...");
    }
  }

  useEffect(() => {
    fetchData();
  }, [splittedEmails]);

  return (
    <ParentContainer>
      <JokeTitle>Here is a random Joke for you!</JokeTitle>
      <JokeButton onClick={fetchData}>Get Another Joke</JokeButton>
      <JokeBox>
        <JokeContent>{joke}</JokeContent>
      </JokeBox>
      <JokeButton onClick={sendToMyFriends}>Send that to my Friends</JokeButton>
    </ParentContainer>
  );
}
