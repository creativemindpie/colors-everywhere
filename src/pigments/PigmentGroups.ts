import { ItemType } from "game/item/IItem";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "src/ColorsEverywhere";

export const WhitePigmentIngredientGroup = {
    default: ItemType.TalcumPowder,
    types: [
        ItemType.TalcumPowder,
        ItemType.BoneMeal,
        ItemType.LimestonePowder
    ]
}

export const BlackPigmentIngredientGroup = {
    default: ItemType.Charcoal,
    types: [
        ItemType.Charcoal,
        ItemType.PileOfAsh
    ]
}

export const RedPigmentIngredientGroup = {
    default: Registry<ColorsEverywhere>().get("itemRose"),
    types: [
        Registry<ColorsEverywhere>().get("itemRose")
    ]
}

export const YellowPigmentIngredientGroup = {
    default: Registry<ColorsEverywhere>().get("itemSunflower"),
    types: [
        Registry<ColorsEverywhere>().get("itemSunflower"),
        ItemType.ArcticPoppies,
        ItemType.Beggarticks
    ]
}

export const BluePigmentIngredientGroup = {
    default: Registry<ColorsEverywhere>().get("itemCornflower"),
    types: [
        Registry<ColorsEverywhere>().get("itemCornflower")
    ]
}