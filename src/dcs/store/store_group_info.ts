import GroupInfo from "../game/types/callback/group_info";

const groupInfo: GroupInfo = {
  type: "groupInfo",
  callbackId: "groupInfo",
  data: {}
};

const storeGroupInfo = (groupInfoData: GroupInfo) =>
  Object.assign(groupInfo, groupInfoData);

const getGroupInfo = (): GroupInfo => groupInfo;

export { storeGroupInfo, getGroupInfo };
