import { IDoodadDescription } from "game/doodad/IDoodad";
import { ActionType } from "game/entity/action/IAction";
import { SkillType } from "game/entity/IHuman";
import { IItemDescription, ItemTypeGroup, RecipeLevel } from "game/item/IItem";
import { RecipeComponent } from "game/item/Items";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "../ColorsEverywhere";
import { Colors, MOD_NAME } from "../IColorsEverywhere";

export function getItemDyeDescription (color: Colors): IItemDescription {
    return {
        weight: 0.5,
        recipe: {
            components: [
                RecipeComponent(ItemTypeGroup.Liquid, 1, 1),
                RecipeComponent(Registry<ColorsEverywhere>(MOD_NAME).get("itemPigments", color), 1, 1),
                RecipeComponent(Registry<ColorsEverywhere>(MOD_NAME).get("itemStoneBowl"), 1, 1)
            ],
            skill: SkillType.Chemistry,
            level: RecipeLevel.Simple,
            requiresFire: true,
            reputation: 2
        },
        use: [ActionType.Build],
        onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsDyes`, color) },
        placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsDyes`, color)
    };
}

export function getDoodadDyeDescription (color: Colors): IDoodadDescription {
    return {
        blockMove: true,
        isTall: true,
        reduceDurabilityOnGather: false,
        pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, color)]
    }
}