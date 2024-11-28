import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-black text-white px-12 flex justify-between items-center h-20 shadow-black">
        <div className="flex gap-2 items-center">
          <div className="w-10 aspect-square rounded-md">
            <img src="/assets/estsb.png" />
          </div>
          <h1 className="font-bold text-2xl">EST SB</h1>
        </div>
        <Link to="login">
          <button className="bg-white text-black rounded-md w-24 p-1 font-bold">
            Login
          </button>
        </Link>
      </nav>
      <div className="flex-1 flex flex-col gap-8 items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Welcome to the EST SB Online Platform
        </h1>
        <p className="text-xl text-center px-40">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam sunt
          beatae repellat nisi cumque officia ipsum est expedita facilis porro
          excepturi, obcaecati nesciunt nostrum suscipit illum atque aliquid
          necessitatibus consequuntur!
        </p>
        <Link to="login">
          <button className="bg-black text-white rounded-md px-8 p-2 text-xl">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
