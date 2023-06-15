import { useLoaderData } from "react-router-dom";
import JournalForm from "../components/JournalForm";
import JournalEntry from "../components/JournalEntry";

const Journal = () => {
  const journalDataRaw = useLoaderData();

  return (
    <>
      <h1>Journal!</h1>
      <JournalForm owner={journalDataRaw.body.owner} />
      {journalDataRaw.body.journalEntries.map((entry) => {
        return <JournalEntry key={entry._id} entry={entry} />;
      })}
    </>
  );
  // TODO: on click on entry, show it
};

export default Journal;
