import { sendMessage, createMessage } from "../message";

export type GetGroupsPayload = {
  coalitionId: number;
  groupCategory?: number;
};
export type GetGroupsReturn = {
  category: number;
  coalition: number;
  name: string;
  id: number;
  initialSize: number;
  size: number;
}[];
export const getGroups = (coalitionId: number, groupCategory?: number) =>
  executeFunction<GetGroupsPayload, GetGroupsReturn>("getGroups", {
    coalitionId,
    groupCategory
  });

export type GetUnitsPayload = {
  groupName: string;
};
export type GetUnitsReturn = {};

export const getUnits = (groupName: string) =>
  executeFunction<GetUnitsPayload, GetUnitsReturn>("getUnits", { groupName });

export const executeFunction = <T, R>(functionName: string, args: T) =>
  new Promise<R>((resolve, reject) =>
    sendMessage(
      createMessage<R>(
        "function",
        {
          functionName,
          args
        },
        result => resolve(result)
      )
    )
  );
