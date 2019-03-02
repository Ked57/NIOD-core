let groups: [{ [key: string]: any }] | [] = [];

const saveGroups = (newGroups: [{ [key: string]: any }]) => {
  groups = newGroups;
};

const getGroups = () => {
  return groups;
};

const getTemplateGroups = () => {
  return groups.filter(group => group.name.startsWith("template_"));
};

const game_manager = {
  saveGroups: saveGroups,
  getGroups: getGroups,
  getTemplateGroups: getTemplateGroups
};

export default game_manager;
