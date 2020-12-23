import { SkillType } from "entity/IHuman";
import { IItemDescription, ItemTypeGroup, RecipeLevel } from "item/IItem";
import { RecipeComponent } from "item/Items";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

export const WhiteDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemWhitePigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}

export const BlackDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemBlackPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}

export const RedDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemRedPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}

export const YellowDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemYellowPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}

export const BlueDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemBluePigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}

export const OrangeDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemOrangePigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}

export const GreenDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemGreenPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}

export const PurpleDyeDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Liquid,1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemPurplePigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemStoneBowl"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        requiresFire: true,
        reputation: 2
    }
}