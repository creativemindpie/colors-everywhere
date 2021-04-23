// import { ActionType } from "game/entity/action/IAction";
// import { SkillType } from "game/entity/IHuman";
// import { IItemDescription, ItemTypeGroup, RecipeLevel } from "game/item/IItem";
// import { RecipeComponent } from "game/item/Items";
// import { Registry } from "mod/ModRegistry";
// import ColorsEverywhere from "src/ColorsEverywhere";

// export const WhiteDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemWhitePigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadWhiteDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadWhiteDye')
// }

// export const BlackDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemBlackPigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlackDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadBlackDye')
// }

// export const RedDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemRedPigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadRedDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadRedDye')
// }

// export const YellowDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemYellowPigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadYellowDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadYellowDye')
// }

// export const BlueDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemBluePigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadBlueDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadBlueDye')
// }

// export const OrangeDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemOrangePigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadOrangeDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadOrangeDye')
// }

// export const GreenDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemGreenPigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadGreenDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadGreenDye')
// }

// export const PurpleDyeDescription: IItemDescription = {
//     weight: 0.5,
//     recipe: {
//         components: [
//             RecipeComponent(ItemTypeGroup.Liquid,1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemPurplePigment"),1,1),
//             RecipeComponent(Registry<ColorsEverywhere>().get("itemStoneBowl"),1,1)
//         ],
//         skill: SkillType.Chemistry,
//         level: RecipeLevel.Simple,
//         requiresFire: true,
//         reputation: 2
//     },
//     use: [ActionType.Build],
//     onUse: { [ActionType.Build] : Registry<ColorsEverywhere>().get('doodadPurpleDye')},
//     placeDownType: Registry<ColorsEverywhere>().get('doodadPurpleDye')
// }