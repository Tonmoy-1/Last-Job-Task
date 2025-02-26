const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold">Task Manager</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center mt-6 md:mt-0 gap-6">
            <a href="/" className="text-gray-300 hover:text-blue-400">
              Home
            </a>
            <a href="/task" className="text-gray-300 hover:text-blue-400">
              Tasks
            </a>
            <a href="/addTask" className="text-gray-300 hover:text-blue-400">
              Add Task
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400">
              Privacy
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400">
              Cookies
            </a>
          </nav>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Social Media */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-blue-400">
            <i className="fab fa-facebook-f text-lg"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400">
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a
            href="https://github.com/nahidn228/"
            target="_blank"
            className="text-gray-400 hover:text-blue-400"
          >
            <i className="fab fa-github text-lg"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400">
            <i className="fab fa-linkedin-in text-lg"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Task Manager. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
