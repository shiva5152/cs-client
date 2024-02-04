import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Combobox, Transition } from "@headlessui/react";
import { softSkillsSuggestions } from "@/data/skills";
interface Props {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}
// { selected, setSelected }: Props
function AutocompleteSoftSkill({ skills, setSkills }: Props) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);

  useEffect(() => {
    const input = query.toLocaleLowerCase();
    const _suggestions = softSkillsSuggestions.filter((obj) =>
      obj.skill.toLowerCase().includes(input)
    );

    setSuggestions(_suggestions);
  }, [query]);
  //   console.log(suggestions);

  const handleSelect = (value: string) => {
    setSelected(value);
    setSkills((prev) => [...prev, value]);
    setQuery("");
  };

  return (
    <div className="nice-select" style={{ border: "none", padding: "0" }}>
      <Combobox value={selected} onChange={handleSelect}>
        <div className="">
          <div className="">
            <Combobox.Input
              className=""
              placeholder="Add Skill"
              displayValue={() => ""}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave=""
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="_my_nice_select_options _my_nice_select_options_extended">
              {suggestions.length === 0 && query !== "" ? (
                <div className=" px-4">Nothing found.</div>
              ) : (
                suggestions.map((person: any) => (
                  <Combobox.Option
                    key={person.skill}
                    className={({ active }) =>
                      `option ${active && "selected focus"}`
                    }
                    value={person.skill}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-normal" : "font-normal"
                          }`}
                        >
                          {person.skill}
                        </span>
                        {selected ? (
                          <span
                            // onClick={() => selected(person)}
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default AutocompleteSoftSkill;
