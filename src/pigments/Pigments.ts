import { SkillType } from "game/entity/IHuman";
import { IItemDescription, ItemTypeGroup, RecipeLevel } from "game/item/IItem";
import { RecipeComponent } from "game/item/Items";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "src/ColorsEverywhere";

export const WhitePigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemWhitePigmentIngredientGroup"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const BlackPigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemBlackPigmentIngredientGroup"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const RedPigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemRedPigmentIngredientGroup"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const YellowPigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemYellowPigmentIngredientGroup"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const BluePigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemBluePigmentIngredientGroup"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const OrangePigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemRedPigment"),1,1),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemYellowPigment"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const GreenPigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemYellowPigment"),1,1),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemBluePigment"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const PurplePigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemRedPigment"),1,1),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemBluePigment"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}
