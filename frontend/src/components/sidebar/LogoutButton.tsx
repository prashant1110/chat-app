import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <div className="mt-auto flex justify-between items-center">
      <LogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout} />
      <div>
        <ul className="menu menu-horizontal">
          <li  onClick={() => navigate("/")}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </li>
          <li onClick={() => navigate("/?update")}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default LogoutButton;
