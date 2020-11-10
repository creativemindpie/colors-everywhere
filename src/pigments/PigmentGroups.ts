import { ItemType } from "item/IItem";
import { Registry } from "mod/ModRegistry";
import PigmentDye from "src/PigmentDye";

export const PigmentGroup = {
    default: Registry<PigmentDye>().get("itemRedPigment"),
    types: [
        Registry<PigmentDye>().get("itemRedPigment"),
        Registry<PigmentDye>().get("itemYellowPigment"),
        Registry<PigmentDye>().get("itemBluePigment"),
        Registry<PigmentDye>().get("itemOrangePigment"),
        Registry<PigmentDye>().get("itemPurplePigment"),
        Registry<PigmentDye>().get("itemGreenPigment")
    ]
}

export const RedPigmentGroup = {
    default: Registry<PigmentDye>().get("itemRose"),
    types: [
        Registry<PigmentDye>().get("itemRose")
    ]
}

export const YellowPigmentGroup = {
    default: Registry<PigmentDye>().get("itemSunflower"),
    types: [
        Registry<PigmentDye>().get("itemSunflower"),
        ItemType.ArcticPoppies,
        ItemType.Beggarticks
    ]
}

export const BluePigmentGroup = {
    default: Registry<PigmentDye>().get("itemCornflower"),
    types: [
        Registry<PigmentDye>().get("itemCornflower")
    ]
}

export const OrangePigmentGroup = {
    default: Registry<PigmentDye>().get("itemOrangePigment"),
    types: [
        Registry<PigmentDye>().get("itemOrangePigment")
    ]
}

export const PurplePigmentGroup = {
    default: Registry<PigmentDye>().get("itemPurplePigment"),
    types: [
        Registry<PigmentDye>().get("itemPurplePigment")
    ]
}

export const GreenPigmentGroup = {
    default: Registry<PigmentDye>().get("itemGreenPigment"),
    types: [
        Registry<PigmentDye>().get("itemGreenPigment")
    ]
}