import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import API_URL from "../utils/urls.js";

import EntryForm from "../components/EntryForm";
import JournalEntry from "../components/JournalEntry";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");

const Journal = () => {
  const journalDataRaw = useLoaderData();

  const [entryContent, setEntryContent] = useState("");
  const [titleContent, setTitleContent] = useState("");

  const handleNewText = (event) => {
    setEntryContent(event.target.value);
  };
  const handleNewTitle = (event) => {
    setTitleContent(event.target.value);
  };

  const handleFormSubmit = () => {
    //event.preventDefault();

    fetch(`${API_URL}/journal/`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: entryContent,
        title: titleContent,
        postedBy: journalDataRaw.body.owner,
      }),
    });
  };

  return (
    <>
      <h1>Journal!</h1>
      <EntryForm
        value={entryContent}
        onChange={handleNewText}
        onSubmit={handleFormSubmit}
        titleValue={titleContent}
        titleOnChange={handleNewTitle}
      />
      {journalDataRaw.body.journalEntries.map((entry) => {
        return <JournalEntry key={entry._id} entry={entry} />;
      })}
    </>
  );
  // TODO: on click on entry, show it
};

export default Journal;
