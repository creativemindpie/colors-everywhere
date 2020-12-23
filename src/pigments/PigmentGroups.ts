import { ItemType } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

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
    default: Registry<PigmentDye>().get("itemRose"),
    types: [
        Registry<PigmentDye>().get("itemRose")
    ]
}

export const YellowPigmentIngredientGroup = {
    default: Registry<PigmentDye>().get("itemSunflower"),
    types: [
        Registry<PigmentDye>().get("itemSunflower"),
        ItemType.ArcticPoppies,
        ItemType.Beggarticks
    ]
}

export const BluePigmentIngredientGroup = {
    default: Registry<PigmentDye>().get("itemCornflower"),
    types: [
        Registry<PigmentDye>().get("itemCornflower")
    ]
}