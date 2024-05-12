import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css"



export default function SignUp() {

  type UserType = {
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string
  }

  const [User, SetUser] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
  });

  const [records, setRecords] = useState<UserType[]>([]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const name = e.target.name;
    const value = e.target.value;
    SetUser({ ...User, [name]: value})
  }

  const SubmitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newRecord = { ...User, id: `${new Date().getTime()}`}
    setRecords([...records, newRecord])
    console.log(newRecord);
  }

  /* const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    navigate('/store');
  } */

  return (
   <>
    <h2>Sign Up</h2>
    <form action="" className="signUp-form">
      <div className="input-container">
        <label htmlFor="">First Name</label>
        <input type="text" name="FirstName" value={User.FirstName} onChange={handleChange} /></div>
      <div className="input-container">
        <label htmlFor="">Last Name</label>
        <input type="text" name="LastName" value={User.LastName} onChange={handleChange} /></div>
      <div className="input-container">
        <label htmlFor="">Email</label>
        <input type="email" name="Email" value={User.Email} onChange={handleChange} /></div>
      <div className="input-container">
        <label htmlFor="">Password</label>
        <input type="Password" name="Password" value={User.Password} onChange={handleChange} /></div>
      <button onClick={SubmitHandler}>Submit</button>
    </form>
   </>
  )
}