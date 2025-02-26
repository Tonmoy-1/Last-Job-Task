import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="hero-content text-center w-11/12 mx-auto">
        <div className="w-11/12">
          <div className="flex justify-center py-5"></div>
          <h1 className="text-5xl font-bold drop-shadow-lg">
            TaskFlow - Smart Task Management
          </h1>
          <p className="py-6 text-lg opacity-90">
            Organize, Track, and Complete Tasks with Ease 🚀
          </p>
          <Link
            to="/tasks"
            className="btn bg-white text-gray-800 hover:bg-gray-200 transition-all shadow-md px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
