import { GetGroupsReturn, GetUnitsReturn } from "./dcs/functions";

export function getGroups(coalitionId: number, groupCategory?: number): GetGroupsReturn;

export function getUnits(groupName: string): Promise<GetUnitsReturn>;

export function initNiod(ownPort?: number, distantPort?: number): Promise<void>;

