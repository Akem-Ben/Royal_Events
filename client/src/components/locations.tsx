import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface Props {
  placeholder: string;
  text: string;
  h: string;
}

const Locations = (props: Props) => {
  interface Location {
    name: string;
    code: string;
  }
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const locations: Location[] = [
    { name: "Aba", code: "AB" },
    { name: "Abeokuta", code: "ABK" },
    { name: "Abuja", code: "ABJ" },
    { name: "Awka", code: "AWK" },
    { name: "Benin", code: "BEN" },
    { name: "Enugu", code: "ENU" },
    { name: "Ibadan", code: "IB" },
    { name: "Lagos", code: "LAG" },
    { name: "Owerri", code: "OW" },
    { name: "Port Harcourt", code: "PH" },
  ];
  return (
    <div className="self-stretch rounded-[5px] justify-between items-center inline-flex">
      <Dropdown
        value={selectedLocation}
        onChange={(e: DropdownChangeEvent) => setSelectedLocation(e.value)}
        options={locations}
        optionLabel="name"
        placeholder={props.placeholder}
        className={`${props.text} bg-gray-200 font-normal font-['Product Sans'] w-full md:w-14rem`}
      />
    </div>
  );
};

export default Locations;
