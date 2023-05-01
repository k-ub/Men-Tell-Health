import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UpdateUserFormProps {
  user: User;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user }) => {
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [avatar, setAvatar] = useState<string>(user.avatar);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/users/${user._id}`, {
        name,
        email,
        avatar,
      });

      console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Avatar:
        <input type="text" value={avatar} onChange={handleAvatarChange} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

UpdateUserForm.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  export default UpdateUserForm;
