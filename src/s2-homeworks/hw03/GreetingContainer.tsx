import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Greeting from "./Greeting";
import { UserType } from "./HW3";


type GreetingContainerPropsType = {
  users: UserType[];
  addUserCallback: (name: string) => void;
};

export const pureAddUser = (
  name: string,
  setError: (error: string) => void,
  setName: (name: string) => void,
  addUserCallback: (name: string) => void
) => {
  name === "" ? setError("Name is required") : addUserCallback(name);
  setName("");
};

export const pureOnBlur = (name:string, setError: (error: string) => void) => {
	if(name === ""){
		setError("Name is required")
	}
};

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>,addUser: () => void) => {
	if(e.key === "Enter") {
		addUser()
	}
};

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
  users,
  addUserCallback,
}) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>(""); 

  const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);

    error && setError("");
  };
  const addUser = () => {
    name.trim()
      ? pureAddUser(name, setError, setName, addUserCallback)
      : setError("Name is required")
    };

  const onBlur = () => {
    pureOnBlur(name, setError);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    pureOnEnter(e, addUser);
  };

  const totalUsers = users.length;
  const lastUserName = users.at(-1)?.name;

  return (
    <Greeting
      name={name}
      setNameCallback={setNameCallback}
      addUser={addUser}
      onBlur={onBlur}
      onEnter={onEnter}
      error={error}
      totalUsers={totalUsers}
      lastUserName={lastUserName}
    />
  );
};

export default GreetingContainer;
