import {
  databaseID,
  databases,
  sessionCollectionID,
} from '../../../utils/appwrite';

export default function SessionPage({ sessionID, sessionData }) {
  console.log({ sessionID });
  console.log({ sessionData });
  return (
    <>
      <h1>{sessionData.name}</h1>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { sessionID } = params;

  const sessionData = await databases.getDocument(
    databaseID,
    sessionCollectionID,
    sessionID
  );

  return {
    props: {
      sessionID,
      sessionData,
    },
  };
};
