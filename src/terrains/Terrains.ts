import { ActionType } from "entity/action/IAction";
import { IItemDescription } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";
import { ITerrainDescription } from "tile/ITerrain";

// Cobblestone

export const WhiteCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainWhiteCobblestoneFlooring") }
}

export const BlackCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlackCobblestoneFlooring") }
}

export const RedCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainRedCobblestoneFlooring") }
}

export const YellowCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainYellowCobblestoneFlooring") }
}

export const BlueCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlueCobblestoneFlooring") }
}

export const OrangeCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainOrangeCobblestoneFlooring") }
}

export const GreenCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainGreenCobblestoneFlooring") }
}

export const PurpleCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainPurpleCobblestoneFlooring") }
}

export const WhiteCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainWhiteCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainWhiteCobblestoneFlooring')
}

export const BlackCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlackCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlackCobblestoneFlooring')
}

export const RedCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainRedCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainRedCobblestoneFlooring')
}

export const YellowCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainYellowCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainYellowCobblestoneFlooring')
}

export const BlueCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlueCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlueCobblestoneFlooring')
}

export const OrangeCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainOrangeCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainOrangeCobblestoneFlooring')
}

export const GreenCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainGreenCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainGreenCobblestoneFlooring')
}

export const PurpleCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainPurpleCobblestoneFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainPurpleCobblestoneFlooring')
}

// Wooden

export const WhiteWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainWhiteWoodenFlooring") }
}

export const BlackWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlackWoodenFlooring") }
}

export const RedWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainRedWoodenFlooring") }
}

export const YellowWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainYellowWoodenFlooring") }
}

export const BlueWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlueWoodenFlooring") }
}

export const OrangeWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainOrangeWoodenFlooring") }
}

export const GreenWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainGreenWoodenFlooring") }
}

export const PurpleWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainPurpleWoodenFlooring") }
}

export const WhiteWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainWhiteWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainWhiteWoodenFlooring')
}

export const BlackWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlackWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlackWoodenFlooring')
}

export const RedWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainRedWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainRedWoodenFlooring')
}

export const YellowWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainYellowWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainYellowWoodenFlooring')
}

export const BlueWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlueWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlueWoodenFlooring')
}

export const OrangeWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainOrangeWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainOrangeWoodenFlooring')
}

export const GreenWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainGreenWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainGreenWoodenFlooring')
}

export const PurpleWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainPurpleWoodenFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainPurpleWoodenFlooring')
}

// Clay

export const WhiteClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainWhiteClayFlooring") }
}

export const BlackClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlackClayFlooring") }
}

export const RedClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainRedClayFlooring") }
}

export const YellowClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainYellowClayFlooring") }
}

export const BlueClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlueClayFlooring") }
}

export const OrangeClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainOrangeClayFlooring") }
}

export const GreenClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainGreenClayFlooring") }
}

export const PurpleClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainPurpleClayFlooring") }
}

export const WhiteClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainWhiteClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainWhiteClayFlooring')
}

export const BlackClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlackClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlackClayFlooring')
}

export const RedClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainRedClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainRedClayFlooring')
}

export const YellowClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainYellowClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainYellowClayFlooring')
}

export const BlueClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlueClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlueClayFlooring')
}

export const OrangeClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainOrangeClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainOrangeClayFlooring')
}

export const GreenClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainGreenClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainGreenClayFlooring')
}

export const PurpleClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainPurpleClayFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainPurpleClayFlooring')
}

// Ash Cement

export const WhiteAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainWhiteAshCementFlooring") }
}

export const BlackAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlackAshCementFlooring") }
}

export const RedAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainRedAshCementFlooring") }
}

export const YellowAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainYellowAshCementFlooring") }
}

export const BlueAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainBlueAshCementFlooring") }
}

export const OrangeAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainOrangeAshCementFlooring") }
}

export const GreenAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainGreenAshCementFlooring") }
}

export const PurpleAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<PigmentDye>().get("terrainPurpleAshCementFlooring") }
}

export const WhiteAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainWhiteAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainWhiteAshCementFlooring')
}

export const BlackAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlackAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlackAshCementFlooring')
}

export const RedAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainRedAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainRedAshCementFlooring')
}

export const YellowAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainYellowAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainYellowAshCementFlooring')
}

export const BlueAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainBlueAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainBlueAshCementFlooring')
}

export const OrangeAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainOrangeAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainOrangeAshCementFlooring')
}

export const GreenAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainGreenAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainGreenAshCementFlooring')
}

export const PurpleAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<PigmentDye>().get('terrainPurpleAshCementFlooring'),
    terrainType: Registry<PigmentDye>().get('terrainPurpleAshCementFlooring')
}