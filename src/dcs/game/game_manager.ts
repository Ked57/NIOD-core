let groups: [{ [key: string]: any }] | [] = [];

const saveGroups = (newGroups: [{ [key: string]: any }]) => {
  groups = newGroups;
};

const getGroups = () => {
  return groups;
};

export { saveGroups, getGroups };
