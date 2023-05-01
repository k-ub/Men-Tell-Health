import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createGroupChat } from "../components/api";
import Form2 from "../components/common/Form2";
import { DeepRequired } from "../components/types";

interface FormData {
  name: string;
}

function isError(obj: any): obj is { message: string } {
  return obj && typeof obj.message === "string";
}

const CreateGroupChat: FC = () => {
  const { register, handleSubmit, formState, setError } = useForm<FormData>();
  const navigate = useNavigate();
  const { isSubmitting } = formState;

  const onSubmit = async (values: FormData) => {
    try {
      await createGroupChat(values);
      navigate("/group-chats");
    } catch (err) {
      if (isError(err)) {
        setError("name", {
          type: "manual",
          message: err.message,
        });
      }
    }
  };

  return (
    <Form2<DeepRequired<FormData>>
      type="Create Group Chat"
      onSubmit={handleSubmit(onSubmit)}
      formLoading={isSubmitting}
      onFinish={() => {
        // Code to redirect the user to the group chat list or the new group chat
      }}
    >
      <input {...register("name", { required: "Please enter a name." })} />
    </Form2>
  );
};

export default CreateGroupChat;
