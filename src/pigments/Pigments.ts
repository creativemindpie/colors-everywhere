import { SkillType } from "entity/IHuman";
import { IItemDescription, ItemTypeGroup, RecipeLevel } from "item/IItem";
import { RecipeComponent } from "item/Items";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

export const WhitePigmentDescription: IItemDescription = {
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<PigmentDye>().get("itemWhitePigmentIngredientGroup"),1,1)
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
            RecipeComponent(Registry<PigmentDye>().get("itemBlackPigmentIngredientGroup"),1,1)
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
            RecipeComponent(Registry<PigmentDye>().get("itemRedPigmentIngredientGroup"),1,1)
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
            RecipeComponent(Registry<PigmentDye>().get("itemYellowPigmentIngredientGroup"),1,1)
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
            RecipeComponent(Registry<PigmentDye>().get("itemBluePigmentIngredientGroup"),1,1)
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
            RecipeComponent(Registry<PigmentDye>().get("itemRedPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemYellowPigment"),1,1)
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
            RecipeComponent(Registry<PigmentDye>().get("itemYellowPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemBluePigment"),1,1)
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
            RecipeComponent(Registry<PigmentDye>().get("itemRedPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemBluePigment"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}
