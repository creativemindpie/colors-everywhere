import { ActionType } from "game/entity/action/IAction";
import { IItemDescription } from "game/item/IItem";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "src/ColorsEverywhere";
import { ITerrainDescription } from "game/tile/ITerrain";

// Cobblestone

export const WhiteCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainWhiteCobblestoneFlooring") }
}

export const BlackCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlackCobblestoneFlooring") }
}

export const RedCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainRedCobblestoneFlooring") }
}

export const YellowCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainYellowCobblestoneFlooring") }
}

export const BlueCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlueCobblestoneFlooring") }
}

export const OrangeCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainOrangeCobblestoneFlooring") }
}

export const GreenCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainGreenCobblestoneFlooring") }
}

export const PurpleCobblestoneFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainPurpleCobblestoneFlooring") }
}

export const WhiteCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainWhiteCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainWhiteCobblestoneFlooring')
}

export const BlackCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlackCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlackCobblestoneFlooring')
}

export const RedCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainRedCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainRedCobblestoneFlooring')
}

export const YellowCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainYellowCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainYellowCobblestoneFlooring')
}

export const BlueCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlueCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlueCobblestoneFlooring')
}

export const OrangeCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainOrangeCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainOrangeCobblestoneFlooring')
}

export const GreenCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainGreenCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainGreenCobblestoneFlooring')
}

export const PurpleCobblestoneFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainPurpleCobblestoneFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainPurpleCobblestoneFlooring')
}

// Wooden

export const WhiteWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainWhiteWoodenFlooring") }
}

export const BlackWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlackWoodenFlooring") }
}

export const RedWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainRedWoodenFlooring") }
}

export const YellowWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainYellowWoodenFlooring") }
}

export const BlueWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlueWoodenFlooring") }
}

export const OrangeWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainOrangeWoodenFlooring") }
}

export const GreenWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainGreenWoodenFlooring") }
}

export const PurpleWoodenFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainPurpleWoodenFlooring") }
}

export const WhiteWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainWhiteWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainWhiteWoodenFlooring')
}

export const BlackWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlackWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlackWoodenFlooring')
}

export const RedWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainRedWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainRedWoodenFlooring')
}

export const YellowWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainYellowWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainYellowWoodenFlooring')
}

export const BlueWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlueWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlueWoodenFlooring')
}

export const OrangeWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainOrangeWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainOrangeWoodenFlooring')
}

export const GreenWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainGreenWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainGreenWoodenFlooring')
}

export const PurpleWoodenFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainPurpleWoodenFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainPurpleWoodenFlooring')
}

// Clay

export const WhiteClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainWhiteClayFlooring") }
}

export const BlackClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlackClayFlooring") }
}

export const RedClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainRedClayFlooring") }
}

export const YellowClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainYellowClayFlooring") }
}

export const BlueClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlueClayFlooring") }
}

export const OrangeClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainOrangeClayFlooring") }
}

export const GreenClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainGreenClayFlooring") }
}

export const PurpleClayFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainPurpleClayFlooring") }
}

export const WhiteClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainWhiteClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainWhiteClayFlooring')
}

export const BlackClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlackClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlackClayFlooring')
}

export const RedClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainRedClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainRedClayFlooring')
}

export const YellowClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainYellowClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainYellowClayFlooring')
}

export const BlueClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlueClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlueClayFlooring')
}

export const OrangeClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainOrangeClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainOrangeClayFlooring')
}

export const GreenClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainGreenClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainGreenClayFlooring')
}

export const PurpleClayFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainPurpleClayFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainPurpleClayFlooring')
}

// Ash Cement

export const WhiteAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainWhiteAshCementFlooring") }
}

export const BlackAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlackAshCementFlooring") }
}

export const RedAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainRedAshCementFlooring") }
}

export const YellowAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainYellowAshCementFlooring") }
}

export const BlueAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainBlueAshCementFlooring") }
}

export const OrangeAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainOrangeAshCementFlooring") }
}

export const GreenAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainGreenAshCementFlooring") }
}

export const PurpleAshCementFlooringDescription: IItemDescription = {
    use: [ActionType.SetDown],
    onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>().get("terrainPurpleAshCementFlooring") }
}

export const WhiteAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainWhiteAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainWhiteAshCementFlooring')
}

export const BlackAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlackAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlackAshCementFlooring')
}

export const RedAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainRedAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainRedAshCementFlooring')
}

export const YellowAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainYellowAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainYellowAshCementFlooring')
}

export const BlueAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainBlueAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainBlueAshCementFlooring')
}

export const OrangeAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainOrangeAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainOrangeAshCementFlooring')
}

export const GreenAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainGreenAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainGreenAshCementFlooring')
}

export const PurpleAshCementFlooringTerrainDescription: ITerrainDescription = {
    passable: true,
    baseTerrain: Registry<ColorsEverywhere>().get('terrainPurpleAshCementFlooring'),
    terrainType: Registry<ColorsEverywhere>().get('terrainPurpleAshCementFlooring')
}