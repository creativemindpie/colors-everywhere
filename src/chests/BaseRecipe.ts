import { DoodadTypeGroup } from "doodad/IDoodad";
import { SkillType } from "entity/IHuman";
import { IRecipeComponent, ItemType, ItemTypeGroup, RecipeLevel } from "item/IItem";

export const WoodenChestBase: IRecipeComponent[] = [
    {
        type: ItemType.Log, 
        requiredAmount: 3,
        consumedAmount: 3,
        disassembleAmount: 0,
        ignoreWeight: true
    },
    {
        type: ItemType.WoodenDowels,
        requiredAmount: 2,
        consumedAmount: 2,
        disassembleAmount: 0,
        ignoreWeight: true
    },
    {
        type: ItemType.SharpRock,
        requiredAmount: 1,
        consumedAmount: 1,
        disassembleAmount: 0,
        ignoreWeight: true
    }
];

export const CopperChestBase: IRecipeComponent[] = [
    {
        type: ItemType.CopperIngot, 
        requiredAmount: 15,
        consumedAmount: 15,
        disassembleAmount: 0,
        ignoreWeight: true
    },
    {
        type: ItemTypeGroup.Hammer,
        requiredAmount: 1,
        consumedAmount: 0,
        disassembleAmount: 0,
        ignoreWeight: true
    }
];

export const WroughtIronChestBase: IRecipeComponent[] = [
    {
        type: ItemType.WroughtIron, 
        requiredAmount: 15,
        consumedAmount: 15,
        disassembleAmount: 0,
        ignoreWeight: true
    },
    {
        type: ItemTypeGroup.Hammer,
        requiredAmount: 1,
        consumedAmount: 0,
        disassembleAmount: 0,
        ignoreWeight: true
    },
    {
        type: ItemTypeGroup.Tongs,
        requiredAmount: 1,
        consumedAmount: 0,
        disassembleAmount: 0,
        ignoreWeight: true
    }
];

export const IronChestBase: IRecipeComponent[] = [
    {
        type: ItemType.IronIngot, 
        requiredAmount: 15,
        consumedAmount: 15,
        disassembleAmount: 0,
        ignoreWeight: true
    },
    {
        type: ItemTypeGroup.Hammer,
        requiredAmount: 1,
        consumedAmount: 0,
        disassembleAmount: 0,
        ignoreWeight: true
    },
    {
        type: ItemTypeGroup.Tongs,
        requiredAmount: 1,
        consumedAmount: 0,
        disassembleAmount: 0,
        ignoreWeight: true
    }
];

export const BaseStatsItemWoodenChest = {
    skill: SkillType.Woodworking,
    level: RecipeLevel.Intermediate,
    reputation: 25
}

export const BaseStatsItemCopperChest = {
    skill: SkillType.Blacksmithing,
    level: RecipeLevel.Intermediate,
    requiredDoodad: DoodadTypeGroup.Anvil,
    reputation: 25
}

export const BaseStatsItemWroughtIronChest = {
    skill: SkillType.Blacksmithing,
    level: RecipeLevel.Advanced,
    requiredDoodad: DoodadTypeGroup.Anvil,
    requiresFire: true,
    reputation: 25
}

export const BaseStatsItemIronChest = {
    skill: SkillType.Blacksmithing,
    level: RecipeLevel.Expert,
    requiredDoodad: DoodadTypeGroup.Anvil,
    requiresFire: true,
    reputation: 25
}