import { initDCSModule } from "./dcs/main";
import { execute } from "./dcs/game/game_functions";
import { addTrigger } from "./dcs/game/trigger_functions";
import { getGroupInfo } from "./dcs/store/store_group_info";

const initNiod = (): Promise<any> => {
  return initDCSModule();
};

export { initNiod, execute, addTrigger, getGroupInfo };
