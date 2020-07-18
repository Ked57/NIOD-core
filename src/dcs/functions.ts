import { sendMessage, createMessage } from "../message";
import { Vector3 } from "../utils";

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
};

/**
 * Allows to retrieve informations about groups from a coalition
 * @param coalitionId  The id of the coalition you want to retrieve the groups from. Note: you should use the constants in the COALITIONS object
 * @param groupCategory The category of the group, I'm not sure what it corresponds to
 */
export const getGroups = (coalitionId: number, groupCategory?: number) =>
  executeFunction<GetGroupsPayload, GetGroupsReturn[]>("getGroups", {
    coalitionId,
    groupCategory
  });

export type GetUnitsPayload = {
  groupName: string;
};

export type GetUnitsReturn = {
  ammo: {
    count: number;
    desc: {
      [key: string]: any;
    };
  }[];
  callsign: string;
  desc: { [key: string]: any };
  fuel: number;
  hasRadar: boolean;
  id: number;
  inAir: boolean;
  isActive: boolean;
  life: number;
  life0: number;
  name: string;
  position: Vector3;
  sensors: { [key: string]: any }[];
  type: string;
  velocity: Vector3;
};

/**
 * Allows to retrieve informations about units from a group
 * @param groupName The name of the group you want to retrieve the units from
 */
export const getUnits = (groupName: string) =>
  executeFunction<GetUnitsPayload, GetUnitsReturn[]>("getUnits", { groupName });

/**
 * Allows to execute any function in the lua `niod.function` table
 * @typeParam T  The type of the arguments you want to pass to the function.
 * @typeParam R  The type of the result you expect.
 * @param functionName The name of the function you want to execute
 * @param args The arguments you want to pass to the function
 */
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
