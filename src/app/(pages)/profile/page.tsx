"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  console.log(session, 'chinh12');
  return (
    <div className="lg:px-38">
      <div className=" pb-4">
        <h2 className="text-2xl font-bold ">Welcome to Homie</h2>
        <p className="text-gray-500 text-lg">
          {session?.user ? `Hello, ${session.user.name}` : "Please login to continue"}
        </p>
      </div></div>
  );
}

export default Profile;