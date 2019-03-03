// See https://wiki.hoggitworld.com/view/DCS_func_addGroup for more information

type AddGroupData = {
  countryId: number;
  groupCategory: number;
  data: {
    name: string; // string for the group name
    task: string; // string for the master task that will dictate core AI behavior
    units: {
      name: string; // name for the type of object
      type: string; // string for the type of object
      x: number; // number for x coordinate
      y: number; // number for y coordinate
      alt?: number; // number altitude in meters
      alt_type?: string; // string "BARO" or "RADIO" for Above sea level or above ground level
      speed?: number; // number velocity the aircraft will spawn at measured in meters per second
      payload?: { [key: string]: any }; // table of the aircrafts payload including fuel, weapons, and countermeasures
      callsign?: { [key: string]: any } | number; // table/number of the callsign for the unit. NATO countries use a table to define callsigns while the Russian style uses a number
    };
  };
};

export default AddGroupData;
