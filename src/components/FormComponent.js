import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const ParentContainer = styled.div`
  border: 0px solid #fff;
  margin: 0 0 150px 0;
  position: relative;

  @media (max-width: 600px) {
    margin: 0 0 5% 0;
  }
`;

const FormContainer = styled.div`
  min-width: 70%;
  float: left;

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`;

const FormTitle = styled.p`
  font-style: normal;
  font-weight: 500;
  color: white;
`;

const TextArea = styled.input`
  font-size: inherit;
  font-weight: inherit;
  border: 0px solid #fff;
  width: 50%;
  height: 5vh;
  background: #f2f2f2;
  border-radius: 10px;

  @media (max-width: 600px) {
    text-align: center;
    width: 90%;
  }
`;

const FormButton = styled.button`
  border: 0px solid #fff;
  width: 100px;
  height: 50px;
  margin: 1% 0;
  background: #76ffd6;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 500;
`;

const ResetButton = styled.button`
  border: 0px solid #fff;
  width: 100px;
  height: 50px;
  margin: 1% 0;
  background: #ff0a0a;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 500;
`;

const FriendsListContainer = styled.div`
  width: 30%;
  float: left;
  font-size: 0.8em;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const FriendsTitle = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: 500;
  color: white;
`;

const EmailList = styled.ul`
  color: white;
`;

export default function Form() {
  const [providedInput, setProvidedInput] = useState("");
  const [splittedEmails, setSplittedEmails] = useContext(Context);

  function splitEmails(emails) {
    let emailsList = [];
    if (emails.includes(" ")) {
      emailsList = emails.split(" ");
      console.log(emailsList);
      setSplittedEmails((arr) => [...arr, ...emailsList]);
    } else {
      setSplittedEmails((arr) => [...arr, emails]);
    }
    console.log(splittedEmails);
  }

  function submitEmails() {
    console.log(providedInput);
    splitEmails(providedInput);
    setProvidedInput("");
  }

  function resetFriendsList() {
    setSplittedEmails([]);
  }

  return (
    <ParentContainer>
      <FormContainer>
        <FormTitle>Submit an email here</FormTitle>
        <TextArea
          placeholder="Separate Emails with spaces for multiple entries"
          type="textarea"
          name="textValue"
          value={providedInput}
          onChange={(e) => setProvidedInput(e.target.value)}
        />
        <br />
        <FormButton onClick={submitEmails}>Submit</FormButton>
        <ResetButton onClick={resetFriendsList}>Reset</ResetButton>
      </FormContainer>
      <FriendsListContainer>
        {splittedEmails.length > 0 ? (
          <>
            <FriendsTitle>Friends List</FriendsTitle>
            <EmailList>
              {splittedEmails.map((email) => (
                <li key={uuidv4()}>{email}</li>
              ))}
            </EmailList>
          </>
        ) : (
          <FriendsTitle>No Friends Yet...</FriendsTitle>
        )}
      </FriendsListContainer>
      {splittedEmails}
    </ParentContainer>
  );
}
