import { useLoaderData } from "react-router-dom";
import JournalForm from "../components/JournalForm";

const Journal = () => {
  const journalDataRaw = useLoaderData();

  return (
    <>
      <h1>Journal!</h1>
      <JournalForm owner={journalDataRaw.body.owner} />
      {journalDataRaw.body.journalEntries.map((entry) => {
        return <li key={entry._id}>{entry.title}</li>;
      })}
    </>
  );
  // TODO: on click on entry, show it
};

export default Journal;
