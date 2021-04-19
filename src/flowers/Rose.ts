import { GrowingStage } from "game/doodad/IDoodad";
import { ActionType } from "game/entity/action/IAction";
import { SkillType } from "game/entity/IHuman";
import { BiomeType } from "game/biome/IBiome";
import { WorldZ } from "game/WorldZ";
import { ItemType, ItemTypeGroup } from "game/item/IItem";
import { Registry } from "mod/ModRegistry";
import { TerrainType } from "game/tile/ITerrain";
import ColorsEverywhere from "../ColorsEverywhere";

export const RoseDescription = {
    use: [ActionType.Eat],
    weight: 0.2,
    groups: [ItemTypeGroup.Medicinal]
}

export const RoseSeedsDescription = {
    use: [ActionType.Plant, ActionType.Eat],
    weight: 0.1,
    onUse:  { [ActionType.Plant] : Registry<ColorsEverywhere>().get('doodadRose') },
    groups: [ItemTypeGroup.Seed]
}

export const RoseDoodadDescription = {
    spreadMax: 4,
    gather: {
        [GrowingStage.Vegetative]: [
            { type: ItemType.PlantRoots },
        ],
        [GrowingStage.Budding]: [
            { type: Registry<ColorsEverywhere>().get('itemRose') },
            { type: ItemType.PlantRoots },
        ],
    },
    harvest: {
        [GrowingStage.Flowering]: [
            { type: Registry<ColorsEverywhere>().get('itemRose') },
            { type: Registry<ColorsEverywhere>().get('itemRose') },
        ],
        [GrowingStage.Ripening]: [
            { type: Registry<ColorsEverywhere>().get('itemRoseSeeds') },
            { type: Registry<ColorsEverywhere>().get('itemRose') },
            { type: Registry<ColorsEverywhere>().get('itemRose'), chance: 15 },
            { type: Registry<ColorsEverywhere>().get('itemRose') },
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
                [TerrainType.Grass]: 10,
            },
        },
    }
}