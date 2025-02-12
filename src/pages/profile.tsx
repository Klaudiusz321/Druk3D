// pages/profile.tsx
import React from "react";
import { GetServerSideProps } from "next";
import { connectDB } from "../database/db";
import User from "../database/User";

interface ProfileProps {
  user: {
    username: string;
    email: string;
  } | null;
}

const ProfilePage = ({ user }: ProfileProps) => {
  return (
    <div>
      {user ? (
        <>
          <h1>Profil użytkownika</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Nie znaleziono użytkownika.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  
  // Przykładowo, pobierz użytkownika na podstawie query lub stałej wartości
  const user = await User.findOne(); // lub np. User.findById(someId)

  return {
    props: {
      user: user ? JSON.parse(JSON.stringify(user)) : null, // konwersja na czysty obiekt JSON
    },
  };
};

export default ProfilePage;
