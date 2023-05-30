import { useLoaderData } from "react-router-dom";
import JournalForm from "../components/JournalForm";

const Journal = () => {
  const journalDataRaw = useLoaderData();
  console.log(journalDataRaw);
  const journalData = journalDataRaw.body.journalEntries;

  return (
    <>
      <h1>Journal!</h1>
      <JournalForm owner={journalDataRaw.body.owner} />
      {journalData.map((entry) => {
        return <li key={entry._id}>{entry.title}</li>;
      })}
    </>
  );
};

export default Journal;
