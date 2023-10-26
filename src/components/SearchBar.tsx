import { IconSearch } from "@tabler/icons-react";
import { Autocomplete } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCommunityNames, setAllCommunityNames] = useState<string[]>([]);
  const [autoCompleteData, setAutoCompleteData] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      removeFocus();
      if (searchTerm.trim().length < 1) return;

      router.push(`/search?query=${searchTerm}`);
    }
  };

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const removeFocus = () => searchBarRef.current?.blur();

  return (
    <div className='flex w-96 items-center justify-center overflow-visible'>
      {/* <Autocomplete
        ref={searchBarRef}
        icon={<IconSearch />}
        className='w-full'
        radius='xl'
        classNames={{ input: "rounded-full" }}
        placeholder='Search...'
        // nothingFound='No results.'
        limit={8}
        data={autoCompleteData}
        value={searchTerm}
        onItemSubmit={(item) => router.push(`/search?query=${item.value}`)}
        onKeyDown={(event) => handleKeyPress(event)}
        onChange={(newSearchTerm) => onSearchTermChanged(newSearchTerm)}
        hoverOnSearchChange
        onDropdownClose={() => removeFocus()}
      /> */}
    </div>
  );
}

export default SearchBar;
