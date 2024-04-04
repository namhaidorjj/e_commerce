/** @format */

export const SearchUsBar = () => {
  return (
    <div className="">
      <div className="absolute w-full h-1/2 bg-black opacity-70 bottom-0"></div>
      <div className="absolute bg-white h-1/2 w-full top-0 flex flex-col">
        <div className="flex justify-end items-center w-full pb-5 border-b border-gray-300">
          <div className="flex items-center justify-between gap-2  w-[700px] h-11 pl-3 pr-3 border-black border mt-6 rounded-md bg-blue-50">
            <img className="w-4 h-4" src="assets/icons/search.svg" alt="" />
            <input
              className="w-full h-full outline-0 bg-blue-50"
              type="text"
              placeholder="Shop New This Spring"
            />
          </div>
          <button className="w-1/3 flex justify-center pt-8">
            <img className="w-3 h-3" src="assets/icons/close.svg" alt="" />
          </button>
        </div>
        <div className="flex h-full">
          <div className="w-1/2 border-r border-gray-300"></div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};
