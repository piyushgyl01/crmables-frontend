import Form from "../../components/Form";
import useHandlers from "./hooks/useHandlers";

export default function AddNewLead() {
  const { handleAddLead } = useHandlers();

  return (
    <>
      <Form onSave={handleAddLead} type="add" />
    </>
  );
}
