import { Search } from "lucide-react";
import { useState } from "react";
import useConversations from "../../hooks/useConversations";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import Theme from "./Theme";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations } = useConversations();
  const { setSelectedConversation } = useConversation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    const consversation = conversations?.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (consversation) {
      setSelectedConversation(consversation);
      setSearch("");
    } else {
      toast.error("No such user exists");
    }
  };

  return (
    <div className="flex justify-between gap-4">
    <form className="flex items-center gap-2 w-full" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search…"
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  "
      >
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
    <Theme/>
    </div>
  );
};
export default SearchInput;
