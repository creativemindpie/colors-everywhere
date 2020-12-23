import { ActionType } from "entity/action/IAction";
import { IItemDescription } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

export const WhiteWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadWhiteWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadWhiteWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadWhiteWoodenChest')
}

export const BlackWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlackWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlackWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlackWoodenChest')
}

export const RedWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadRedWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadRedWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadRedWoodenChest')
}

export const YellowWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadYellowWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadYellowWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadYellowWoodenChest')
}

export const BlueWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlueWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlueWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlueWoodenChest')
}

export const OrangeWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadOrangeWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadOrangeWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadOrangeWoodenChest')
}

export const GreenWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadGreenWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadGreenWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadGreenWoodenChest')
}

export const PurpleWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadPurpleWoodenChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadPurpleWoodenChest'),
    placeDownType: Registry<PigmentDye>().get('doodadPurpleWoodenChest')
}