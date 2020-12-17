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
    },
    use: [Registry<PigmentDye>().get("actionPaintChest")]
}