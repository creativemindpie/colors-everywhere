import { SkillType } from "entity/IHuman";
import { IItemDescription, ItemTypeGroup, RecipeLevel } from "item/IItem";
import { RecipeComponent } from "item/Items";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

export const RedPigmentDescription: IItemDescription = {
    weightRange: [1,1],
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<PigmentDye>().get("itemRedPigmentGroup"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const YellowPigmentDescription: IItemDescription = {
    weightRange: [1,1],
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<PigmentDye>().get("itemYellowPigmentGroup"),1,1),
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const BluePigmentDescription: IItemDescription = {
    weightRange: [1,1],
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.MortarAndPestle,1,0),
            RecipeComponent(Registry<PigmentDye>().get("itemBluePigmentGroup"),1,1),
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const OrangePigmentDescription: IItemDescription = {
    weightRange: [1,1],
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(Registry<PigmentDye>().get("itemRedPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemYellowPigment"),1,1),
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const PurplePigmentDescription: IItemDescription = {
    weightRange: [1,1],
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(Registry<PigmentDye>().get("itemRedPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemBluePigment"),1,1),
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const GreenPigmentDescription: IItemDescription = {
    weightRange: [1,1],
    weight: 0.5,
    recipe: {
        components: [
            RecipeComponent(Registry<PigmentDye>().get("itemYellowPigment"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemBluePigment"),1,1),
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}
