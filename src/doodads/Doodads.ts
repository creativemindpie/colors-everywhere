import { ActionType } from "entity/action/IAction";
import { IItemDescription } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

// Wooden Chests

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


// Copper Chests

export const WhiteCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadWhiteCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadWhiteCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadWhiteCopperChest')
}

export const BlackCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlackCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlackCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlackCopperChest')
}

export const RedCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadRedCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadRedCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadRedCopperChest')
}

export const YellowCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadYellowCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadYellowCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadYellowCopperChest')
}

export const BlueCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlueCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlueCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlueCopperChest')
}

export const OrangeCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadOrangeCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadOrangeCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadOrangeCopperChest')
}

export const GreenCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadGreenCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadGreenCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadGreenCopperChest')
}

export const PurpleCopperChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [7,11],
    weight: 7,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadPurpleCopperChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadPurpleCopperChest'),
    placeDownType: Registry<PigmentDye>().get('doodadPurpleCopperChest')
}


// Wrought Iron Chests

export const WhiteWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadWhiteWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadWhiteWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadWhiteWroughtIronChest')
}

export const BlackWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlackWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlackWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlackWroughtIronChest')
}

export const RedWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadRedWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadRedWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadRedWroughtIronChest')
}

export const YellowWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadYellowWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadYellowWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadYellowWroughtIronChest')
}

export const BlueWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlueWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlueWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlueWroughtIronChest')
}

export const OrangeWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadOrangeWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadOrangeWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadOrangeWroughtIronChest')
}

export const GreenWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadGreenWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadGreenWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadGreenWroughtIronChest')
}

export const PurpleWroughtIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadPurpleWroughtIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadPurpleWroughtIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadPurpleWroughtIronChest')
}


// Iron Chests

export const WhiteIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadWhiteIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadWhiteIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadWhiteIronChest')
}

export const BlackIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlackIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlackIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlackIronChest')
}

export const RedIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadRedIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadRedIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadRedIronChest')
}

export const YellowIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadYellowIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadYellowIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadYellowIronChest')
}

export const BlueIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlueIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlueIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadBlueIronChest')
}

export const OrangeIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadOrangeIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadOrangeIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadOrangeIronChest')
}

export const GreenIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadGreenIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadGreenIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadGreenIronChest')
}

export const PurpleIronChestDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadPurpleIronChest')},
    doodadContainer: Registry<PigmentDye>().get('doodadPurpleIronChest'),
    placeDownType: Registry<PigmentDye>().get('doodadPurpleIronChest')
}

// Stone Wall

export const WhiteStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadWhiteStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadWhiteStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadWhiteStoneWall')
}

export const BlackStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlackStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlackStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadBlackStoneWall')
}

export const RedStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadRedStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadRedStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadRedStoneWall')
}

export const YellowStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadYellowStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadYellowStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadYellowStoneWall')
}

export const BlueStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadBlueStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadBlueStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadBlueStoneWall')
}

export const OrangeStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadOrangeStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadOrangeStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadOrangeStoneWall')
}

export const GreenStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadGreenStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadGreenStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadGreenStoneWall')
}

export const PurpleStoneWallDescription: IItemDescription = {
    use: [ActionType.Build],
    weightRange: [15,20],
    weight: 15,
    onUse: { [ActionType.Build] : Registry<PigmentDye>().get('doodadPurpleStoneWall')},
    doodadContainer: Registry<PigmentDye>().get('doodadPurpleStoneWall'),
    placeDownType: Registry<PigmentDye>().get('doodadPurpleStoneWall')
}
