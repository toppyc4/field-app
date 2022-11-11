import React from "react"

export default function UserProfile({ user }) {
  // console.log("UserProfile's user prop: ", user)
  return (
    <div className='p-10 flex flex-col content-center text-center bg-white'>
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
