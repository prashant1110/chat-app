import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useUpdate from "../../hooks/useUpdate";

const Setting = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    password: "",
    newPassword: "",
  });

  const { authUser } = useAuth();
  const { loading, update } = useUpdate();

  useEffect(() => {
    if (!authUser) return;

    setInputs({ ...inputs, fullname: authUser.fullname });
  }, []);

  const hnadleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.fullname && !inputs.password && !inputs.newPassword) return;

    update(authUser?.id,inputs.fullname, inputs.password, inputs.newPassword);

    setInputs({ ...inputs, password: "", newPassword: "" });
  };

  return (
    <div className="w-full flex flex-col">
      <form className="w-9/12 p-4" onSubmit={hnadleUpdate}>
        <div>
          <label className="label p-2 ">
            <span className="text-base label-text text-white">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full input input-bordered h-10"
            value={inputs.fullname}
            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text text-white">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text text-white">
              New Password
            </span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
            value={inputs.newPassword}
            onChange={(e) =>
              setInputs({ ...inputs, newPassword: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn mt-3">
          Update
        </button>
      </form>
    </div>
  );
};

export default Setting;
