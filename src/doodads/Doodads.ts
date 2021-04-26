import { ActionType } from "game/entity/action/IAction";
import { IItemDescription } from "game/item/IItem";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "src/ColorsEverywhere";

// Wooden Chests

export const WhiteWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadWhiteWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadWhiteWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadWhiteWoodenChest')
}

export const BlackWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlackWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlackWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlackWoodenChest')
}

export const RedWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadRedWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadRedWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadRedWoodenChest')
}

export const YellowWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadYellowWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadYellowWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadYellowWoodenChest')
}

export const BlueWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlueWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlueWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlueWoodenChest')
}

export const OrangeWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadOrangeWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadOrangeWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadOrangeWoodenChest')
}

export const GreenWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadGreenWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadGreenWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadGreenWoodenChest')
}

export const PurpleWoodenChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [10,11],
    weight: 10,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadPurpleWoodenChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadPurpleWoodenChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadPurpleWoodenChest')
}


// Copper Chests

export const WhiteCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadWhiteCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadWhiteCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadWhiteCopperChest')
}

export const BlackCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlackCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlackCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlackCopperChest')
}

export const RedCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadRedCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadRedCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadRedCopperChest')
}

export const YellowCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadYellowCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadYellowCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadYellowCopperChest')
}

export const BlueCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlueCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlueCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlueCopperChest')
}

export const OrangeCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadOrangeCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadOrangeCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadOrangeCopperChest')
}

export const GreenCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadGreenCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadGreenCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadGreenCopperChest')
}

export const PurpleCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadPurpleCopperChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadPurpleCopperChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadPurpleCopperChest')
}


// Wrought Iron Chests

export const WhiteWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadWhiteWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadWhiteWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadWhiteWroughtIronChest')
}

export const BlackWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlackWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlackWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlackWroughtIronChest')
}

export const RedWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadRedWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadRedWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadRedWroughtIronChest')
}

export const YellowWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadYellowWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadYellowWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadYellowWroughtIronChest')
}

export const BlueWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlueWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlueWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlueWroughtIronChest')
}

export const OrangeWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadOrangeWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadOrangeWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadOrangeWroughtIronChest')
}

export const GreenWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadGreenWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadGreenWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadGreenWroughtIronChest')
}

export const PurpleWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadPurpleWroughtIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadPurpleWroughtIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadPurpleWroughtIronChest')
}


// Iron Chests

export const WhiteIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadWhiteIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadWhiteIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadWhiteIronChest')
}

export const BlackIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlackIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlackIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlackIronChest')
}

export const RedIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadRedIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadRedIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadRedIronChest')
}

export const YellowIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadYellowIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadYellowIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadYellowIronChest')
}

export const BlueIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlueIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadBlueIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadBlueIronChest')
}

export const OrangeIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadOrangeIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadOrangeIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadOrangeIronChest')
}

export const GreenIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadGreenIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadGreenIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadGreenIronChest')
}

export const PurpleIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadPurpleIronChest')},
    doodadContainer: Registry<ColorsEverywhere>().get('doodadPurpleIronChest'),
    placeDownType: Registry<ColorsEverywhere>().get('doodadPurpleIronChest')
}
