import { SkillType } from "entity/IHuman";
import { IItemDescription, ItemTypeGroup, RecipeLevel } from "item/IItem";
import { RecipeComponent } from "item/Items";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

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