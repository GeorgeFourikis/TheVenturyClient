import { useState } from "react";
import { Context } from "./Context";
import Form from "./components/FormComponent";
import FetchJoke from "./components/FetchJokeComponent";
import styled from "styled-components";
import "./App.css";

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  color: #ff03af;
  font-weight: 500;

  @media (max-width: 600px) {
    text-align: center;
    font-size: 1.4em;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  const [splittedEmails, setSplittedEmails] = useState([]);

  return (
    <Context.Provider value={[splittedEmails, setSplittedEmails]}>
      <Wrapper>
        <Title>Jokes Generator</Title>
        <Form />
        <FetchJoke />
      </Wrapper>
    </Context.Provider>
  );
}

export default App;
