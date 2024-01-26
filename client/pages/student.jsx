import { getSession, signOut } from "next-auth/react";
import connectDB from "../lib/connectDB";
import Users from "../lib/userSchema";
import { useState } from "react";
import axios from "axios";

function User({ user, bio }) {
  //   console.log(user);

  const [value, changeValue] = useState("");

  async function updateBio() {
    const { data } = await axios.post(
      "/api/updateBio",
      { profileId: user.profileId, bio: value },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log("Bio Updated to: " + data.bio);

    location.reload();
  }
  return (
    <div>
      <h4>User session:</h4>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div>bio: {bio}</div>
      <div>Address: {user.address}</div>
      <br />
      <input
        onChange={(e) => changeValue(e.target.value)}
        value={value}
      ></input>
      <button onClick={() => updateBio()}>Update Bio</button>
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  await connectDB();

  const userM = await Users.findOne({ address: session?.user.address }).lean();

  if (!userM) {
    userM.bio = userM.bio.toString();
  }
  return {
    props: { user: session.user, bio: userM.bio },
  };
}

export default User;
