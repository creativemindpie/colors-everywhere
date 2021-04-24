import { SkillType } from "game/entity/IHuman";
import { IItemDescription, ItemType, ItemTypeGroup, RecipeLevel } from "game/item/IItem";
import { RecipeComponent } from "game/item/Items";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "../ColorsEverywhere";
import { Colors, MOD_NAME } from "../IColorsEverywhere";

const recipes: Partial<Record<Colors, Colors[]>> = {
    [Colors.Orange]: [Colors.Red, Colors.Yellow],
    [Colors.Green]: [Colors.Blue, Colors.Yellow],
    [Colors.Purple]: [Colors.Blue, Colors.Red],
};

export function getPigmentDescription (color: Colors): IItemDescription {
    const ingredients: (ItemType | ItemTypeGroup)[] = [];
    const recipe = recipes[color];
    if (recipe) {
        ingredients.push(...recipe.map(color =>
            Registry<ColorsEverywhere>(MOD_NAME).get("itemPigments", color)));
    } else {
        ingredients.push(Registry<ColorsEverywhere>(MOD_NAME).get("itemPigmentIngredientGroups", color));
    }

    return {
        weight: 0.5,
        recipe: {
            components: [
                RecipeComponent(ItemTypeGroup.MortarAndPestle, 1, 0),
                ...ingredients.map(ingredient =>
                    RecipeComponent(ingredient, 1, 1))
            ],
            skill: SkillType.Chemistry,
            level: RecipeLevel.Simple,
            reputation: 2
        }
    };
}
