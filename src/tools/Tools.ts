import { SkillType } from "entity/IHuman";
import { IItemDescription, ItemType, ItemTypeGroup, RecipeLevel } from "item/IItem";
import { RecipeComponent } from "item/Items";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

export const StoneBowlDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Rock,1,1)
        ],
        skill: SkillType.Stonecrafting,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const PaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(ItemType.WoodenPole,1,1),
            RecipeComponent(ItemType.String,1,1)
        ],
        skill: SkillType.Woodworking,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const RedPaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<PigmentDye>().get("itemPaintbrush"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemRedDye"),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    use: [Registry<PigmentDye>().get("actionPaint"), Registry<PigmentDye>().get("actionCleanPaintbrush")]
}

export const GreenPaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<PigmentDye>().get("itemPaintbrush"),1,1),
            RecipeComponent(Registry<PigmentDye>().get("itemRedDye"),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    use: [Registry<PigmentDye>().get("actionPaint"), Registry<PigmentDye>().get("actionCleanPaintbrush")]
}