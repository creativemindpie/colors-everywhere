import { ActionType } from "entity/action/IAction";
import { IItemDescription } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

export const RedWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadRedWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadRedWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadRedWoodenChest')
}

export const GreenWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadGreenWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadGreenWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadGreenWoodenChest')
}