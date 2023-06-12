import EditSessionForm from '@/components/EditSessionForm/EditSessionForm';
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
      <button
        className="btn capitalize"
        onClick={() => window.edit_session_modal.showModal()}
      >
        Edit Session
      </button>
      <dialog id="edit_session_modal" className="modal">
        <EditSessionForm sessionDetails={sessionData} />
      </dialog>
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
