import React from "react";

const Header = () => {
  return (
    <>
      <div className="bg-[#4C3397] py-5 px-2">
        <div className="mx-auto max-w-6xl w-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              className="w-10"
              src="https://temsool.com/demo/deliveritta/wp-content/uploads/2022/01/icon-map.png"
              alt="logo"
            />
            <h1 className="text-yellow-400 text-4xl font-semibold">
              .Deliveritta
            </h1>
          </div>
          <div className="hidden lg:block">
            <ul className="flex items-center space-x-8 font-bold text-xl text-white">
              <li className="cursor-pointer hover:text-yellow-400 duration-200 ease-in-out">
                Home
              </li>
              <li className="cursor-pointer hover:text-yellow-400 duration-200 ease-in-out">
                About us
              </li>
              <li className="cursor-pointer hover:text-yellow-400 duration-200 ease-in-out">
                Blog / News
              </li>
              <li className="cursor-pointer hover:text-yellow-400 duration-200 ease-in-out">
                Pages
              </li>
            </ul>
          </div>
          <div className="flex space-x-6">
            <button className="border-2 border-yellow-400 bg-yellow-400 text-black font-bold w-12 h-12 lg:px-6 lg:py-2 lg:w-auto lg:h-auto rounded-3xl hover:bg-[#4C3397] duration-200 ease-in-out hover:text-yellow-400 flex justify-center items-center">
              <span className="hidden lg:block">Contact us</span>{" "}
              <span className="lg:hidden">
                <i className="fa-regular fa-paper-plane text-xl -ml-1"></i>
              </span>
            </button>
            <button className="lg:hidden border-2 border-yellow-400 bg-yellow-400 text-black font-bold w-12 h-12 rounded-3xl hover:bg-[#4C3397] duration-200 ease-in-out hover:text-yellow-400 flex justify-center items-center">
            <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
