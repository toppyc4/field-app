import React from "react"

export default function UserProfile({ user, admin, editing, setEditing }) {
  // console.log("UserProfile's user prop: ", user)
  function handleSetEdit() {
    setEditing((prevState) => !prevState)
  }
  return (
    <div className='p-10 flex flex-col content-center text-center bg-white'>
      {admin && (
        <button
          className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-solid border-b-4 border-blue-700 hover:border-blue-500 rounded ml-auto'
          onClick={handleSetEdit}
        >
          {editing ? "Hide Form" : "Update Profile"}
        </button>
      )}
      <img
        src={user.photoURL || "/img/question-mark-profile.jpg"}
        className='w-[20%] mx-auto mb-1 max-w-[150px] block rounded-full'
      />
      <p>
        <i>@{user.username}</i>
      </p>

      <h1 className='text-2xl font-bold'>
        {user?.Fname || "Unknown real name"} {user?.Lname || ""}
      </h1>
      <p>
        <strong>Email: </strong>
        {user?.email ||
          "Unknown (please click update profile at top right corner)"}
      </p>
      <p>
        <strong>Location: </strong>
        {user?.address?.province ||
          "Unknown (please click update profile at top right corner)"}
        , {user?.address?.country || ""}
      </p>
    </div>
  )
}
