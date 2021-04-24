import { SkillType } from "game/entity/IHuman";
import { IItemDescription, ItemType, ItemTypeGroup, RecipeLevel } from "game/item/IItem";
import { RecipeComponent } from "game/item/Items";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "../ColorsEverywhere";
import { Colors, MOD_NAME } from "../IColorsEverywhere";

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

export const DyeRemoverDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(ItemType.Ectoplasm,1,1),
            RecipeComponent(Registry<ColorsEverywhere>(MOD_NAME).get("itemPaintbrush"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>(MOD_NAME).get("itemDyeRemover"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>(MOD_NAME).get("actionRemovePaint"), Registry<ColorsEverywhere>(MOD_NAME).get("actionCleanPaintbrush")]
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

export function getItemPaintbrushDescription (color: Colors): IItemDescription {
    return {
        recipe: {
            components: [
                RecipeComponent(Registry<ColorsEverywhere>(MOD_NAME).get("itemPaintbrush"),1,1),
                RecipeComponent(Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, color), 1,0,1)
            ],
            skill: SkillType.Chemistry,
            level: RecipeLevel.Simple,
            reputation: 2
        },
        returnOnUseAndDecay: {
            type: Registry<ColorsEverywhere>(MOD_NAME).get(`itemsPaintbrushes`, color),
            damaged: true,
        },
        use: [Registry<ColorsEverywhere>(MOD_NAME).get("actionPaint"), Registry<ColorsEverywhere>(MOD_NAME).get("actionCleanPaintbrush")]
    };
}