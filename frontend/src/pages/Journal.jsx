import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import fetchAuth from "../utils/fetch.js";

import EntryForm from "../components/EntryForm";
import Entry from "../components/Entry";

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
    const fetch = {
      endpoint: "journal",
      method: "POST",
      body: JSON.stringify({
        title: titleContent,
        content: entryContent,
        postedBy: journalDataRaw.body.owner,
      }),
    };

    fetchAuth(fetch).then((res) => console.log(res));

    //event.preventDefault();
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
        return <Entry key={entry._id} entry={entry} />;
      })}
    </>
  );
  // TODO: on click on entry, show it
};

export default Journal;
