import { GrowingStage } from "doodad/IDoodad";
import { SkillType } from "entity/IHuman";
import { BiomeType } from "game/IBiome";
import { WorldZ } from "game/WorldZ";
import { ItemType } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import { TerrainType } from "tile/ITerrain";
import PigmentDye from "./PigmentDye";

export const CornflowerDescription = {
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
        particles: { r: 245, g: 210, b: 17 },
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
        },
    };