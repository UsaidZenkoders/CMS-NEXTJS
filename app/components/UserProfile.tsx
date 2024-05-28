import React from 'react';

interface UserProfileProps {
  token: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ token }) => {
  return (
    <>
          {token && (
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                      <a className="justify-between">
                          Profile
                      </a>
                  </li>
                  <li><a>Logout</a></li>
              </ul>
          )}
    </>
  );
}

export default UserProfile;
