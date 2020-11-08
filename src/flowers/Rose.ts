import { GrowingStage } from "doodad/IDoodad";
import { ActionType } from "entity/action/IAction";
import { SkillType } from "entity/IHuman";
import { BiomeType } from "game/IBiome";
import { WorldZ } from "game/WorldZ";
import { ItemType, ItemTypeGroup } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import { TerrainType } from "tile/ITerrain";
import PigmentDye from "../PigmentDye";

export const RoseDescription = {
    use: [ActionType.Eat],
    weight: 0.2,
    groups: [ItemTypeGroup.Medicinal]
}

export const RoseSeedsDescription = {
    use: [ActionType.Plant, ActionType.Eat],
    weight: 0.1,
    onUse:  { [ActionType.Plant] : Registry<PigmentDye>().get('doodadRose') },
    groups: [ItemTypeGroup.Seed]
}

export const RoseDoodadDescription = {
    spreadMax: 4,
    gather: {
        [GrowingStage.Vegetative]: [
            { type: ItemType.PlantRoots },
        ],
        [GrowingStage.Budding]: [
            { type: Registry<PigmentDye>().get('itemRose') },
            { type: ItemType.PlantRoots },
        ],
    },
    harvest: {
        [GrowingStage.Flowering]: [
            { type: Registry<PigmentDye>().get('itemRose') },
            { type: Registry<PigmentDye>().get('itemRose') },
        ],
        [GrowingStage.Ripening]: [
            { type: Registry<PigmentDye>().get('itemRoseSeeds') },
            { type: Registry<PigmentDye>().get('itemRose') },
            { type: Registry<PigmentDye>().get('itemRose'), chance: 15 },
            { type: Registry<PigmentDye>().get('itemRose') },
        ],
    },
    skillUse: SkillType.Botany,
    allowedTiles: [TerrainType.Dirt, TerrainType.FertileSoil, TerrainType.Grass],
    canTrampleWhenMature: true,
    isFlammable: true,
    graphicVariation: true,
    particles: { r: 183, g: 17, b: 28 },
    growthParticles: {
        [GrowingStage.Seedling]: { r: 187, g: 213, b: 81 },
    },
    canGrow: true,
    decayMax: 2600,
    durability: 6,
    spawnOnWorldGen: {
        [BiomeType.Coastal]: {
            [WorldZ.Overworld]: {
                [TerrainType.Grass]: 3,
            },
        },
    }
}