import { IItemGroupDescription, ItemType, ItemTypeGroup } from "game/item/IItem";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "../ColorsEverywhere";
import { Colors, MOD_NAME } from "../IColorsEverywhere";

const ingredients: Partial<Record<Colors, (ItemType | ItemTypeGroup)[]>> = {
    [Colors.White]: [
        ItemType.TalcumPowder,
        ItemType.BoneMeal,
        ItemType.LimestonePowder
    ],
    [Colors.Black]: [
        ItemType.Charcoal,
        ItemType.PileOfAsh
    ],
    [Colors.Red]: [
        Registry<ColorsEverywhere>(MOD_NAME).get("itemRose")
    ],
    [Colors.Yellow]: [
        Registry<ColorsEverywhere>(MOD_NAME).get("itemSunflower"),
        ItemType.ArcticPoppies,
        ItemType.Beggarticks
    ],
    [Colors.Blue]: [
        Registry<ColorsEverywhere>(MOD_NAME).get("itemCornflower")
    ]
};

export function getPigmentIngredientGroupDescription (color: Colors): IItemGroupDescription {
    const itemsInGroup = ingredients[color];
    if (itemsInGroup?.length) {
        return {
            default: itemsInGroup[0],
            types: itemsInGroup
        };
    }

    return {
        default: ItemType.None,
        types: []
    };
}
