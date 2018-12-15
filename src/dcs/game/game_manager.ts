let groups: [{ [key: string]: any }] | [] = [];

const saveGroups = (newGroups: [{ [key: string]: any }]) => {
  groups = newGroups;
};

const getGroups = () => {
  return groups;
};

const game_manager = {
  saveGroups: saveGroups,
  getGroups: getGroups
};

export default game_manager;
