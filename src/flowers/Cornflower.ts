import { GrowingStage } from "doodad/IDoodad";
import { ActionType } from "entity/action/IAction";
import { SkillType } from "entity/IHuman";
import { BiomeType } from "game/IBiome";
import { WorldZ } from "game/WorldZ";
import { ItemType, ItemTypeGroup } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import { TerrainType } from "tile/ITerrain";
import PigmentDye from "../PigmentDye";

export const CornflowerDescription = {
    use: [ActionType.Eat],
    weight: 0.2,
    groups: [ItemTypeGroup.Medicinal]
}

export const CornflowerSeedsDescription = {
    use: [ActionType.Plant, ActionType.Eat],
    weight: 0.1,
    onUse:  { [ActionType.Plant] : Registry<PigmentDye>().get('doodadCornflower') },
    groups: [ItemTypeGroup.Seed]
}

export const CornflowerDoodadDescription = {
    spreadMax: 4,
    gather: {
        [GrowingStage.Vegetative]: [
            { type: ItemType.PlantRoots },
        ],
        [GrowingStage.Budding]: [
            { type: Registry<PigmentDye>().get('itemCornflower') },
            { type: ItemType.PlantRoots },
        ],
    },
    harvest: {
        [GrowingStage.Flowering]: [
            { type: Registry<PigmentDye>().get('itemCornflower') },
            { type: Registry<PigmentDye>().get('itemCornflower') },
        ],
        [GrowingStage.Ripening]: [
            { type: Registry<PigmentDye>().get('itemCornflowerSeeds') },
            { type: Registry<PigmentDye>().get('itemCornflower') },
            { type: Registry<PigmentDye>().get('itemCornflower'), chance: 15 },
            { type: Registry<PigmentDye>().get('itemCornflower') },
        ],
    },
    skillUse: SkillType.Botany,
    allowedTiles: [TerrainType.Dirt, TerrainType.FertileSoil, TerrainType.Grass],
    canTrampleWhenMature: true,
    isFlammable: true,
    graphicVariation: true,
    particles: { r: 26, g: 96, b: 255 },
    growthParticles: {
        [GrowingStage.Seedling]: { r: 187, g: 213, b: 81 },
    },
    canGrow: true,
    decayMax: 2600,
    durability: 6,
    spawnOnWorldGen: {
        [BiomeType.Coastal]: {
            [WorldZ.Overworld]: {
                [TerrainType.Grass]: 10,
            },
        },
    }
}