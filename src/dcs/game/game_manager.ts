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

const fromTemplateGroupToAddGroupData = (group: {
  [key: string]: any;
}): AddGroupData => {
  return {
    name: group.name,
    task: "",
    units: group.units.map((unit: { [key: string]: any }) => {
      return {
        name: "unit",
        type: unit.desc._origin,
        x: 0.0, // hardcoded for now
        y: 0.0
      };
    })
  };
};

const game_manager = {
  saveGroups: saveGroups,
  getGroups: getGroups,
  getTemplateGroups: getTemplateGroups,
  fromTemplateGroupToAddGroupData: fromTemplateGroupToAddGroupData
};

export default game_manager;
