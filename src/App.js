import { SearchIcon } from "@heroicons/react/solid";

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-[#485563] to-[#29323c]">
      <div className="flex items-center justify-center space-x-5 py-5 ">
        <input type="text" placeholder="Search" />
        <SearchIcon className="w-10 h-6 bg-blue-600 rounded-full" />
      </div>
    </div>
  );
}

export default App;
