import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/user.context";

const ProfilePage = () => {
  const { loggedInUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !loggedInUser) {
      navigate("/");
    }
  }, [isLoading, loggedInUser, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {loggedInUser.fullName}!
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Email: {loggedInUser.email}
      </p>
    </div>
  );
};

export default ProfilePage;
