import AddGroupData from "./types/functions/add_group_data";

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

const fromTemplateGroupToAddGroupData = (
  countryId: number,
  group: {
    [key: string]: any;
  },
  x: number,
  y: number
): AddGroupData => {
  console.log(group.units[0]);
  return {
    countryId,
    groupCategory: group.units[0].desc.category,
    data: {
      name: group.name,
      task: "",
      units: group.units.map((unit: { [key: string]: any }) => {
        return {
          name: unit.desc.displayName,
          type: unit.desc.typeName,
          x: unit.position.p.x,
          y: unit.position.p.y
        };
      })
    }
  };
};

const game_manager = {
  saveGroups: saveGroups,
  getGroups: getGroups,
  getTemplateGroups: getTemplateGroups,
  fromTemplateGroupToAddGroupData: fromTemplateGroupToAddGroupData
};

export default game_manager;
