import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            StoreFlow
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Your Profile
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Manage your account information.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="flex flex-col items-center gap-4 border-b border-neutral-800 pb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-medium text-black">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-center">
              <h2 className="text-xl font-medium text-white">{user?.name}</h2>

              <p className="mt-1 text-sm text-neutral-500">{user?.email}</p>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="text-sm font-medium text-white">
              Account Information
            </h3>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Name
                </p>

                <p className="mt-1 text-sm text-neutral-300">{user?.name}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Email
                </p>

                <p className="mt-1 text-sm text-neutral-300">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
