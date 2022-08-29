import axios from "axios";
import { useState } from "react";

export default function Login(props: {
  setUser: React.Dispatch<React.SetStateAction<{}>>;
  user: any;
}) {
  const [error, setError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleValidation = (data: any) => {
    if (username === "Bret") props.setUser(data);
    if (data.username !== username) {
      setError(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    setError(false);
    e.preventDefault();
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1" //mock data of user:{username:"Bret", name: "Leanne Graham"}
      );
      handleValidation(data.data);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <form className="flex flex-col gap-1 justify-center items-center text-black m-2">
      <input
        className="border border-blue-700 p-2 rounded-lg"
        type="text"
        placeholder="username"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border border-blue-700  p-2 rounded-lg"
        type="password"
        placeholder="password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="border border-blue-700 bg-blue-500 p-2 px-10 rounded-lg text-white font-extrabold"
        disabled={username && password ? false : true}
        style={{ opacity: username && password ? 1 : 0.5 }}
        onClick={(e) => handleClick(e)}
      >
        {loading ? "wait" : "login"}
      </button>
      <span
        style={{ display: error ? "flex" : "none" }}
        className="text-red-500"
      >
        error{" "}
      </span>
    </form>
  );
}
