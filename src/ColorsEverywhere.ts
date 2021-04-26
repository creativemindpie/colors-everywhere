import { DoodadType, DoodadTypeGroup } from "game/doodad/IDoodad";
import { Action } from "game/entity/action/Action";
import { ActionArgument, ActionType } from "game/entity/action/IAction";
import { EntityType } from "game/entity/IEntity";
import { SkillType } from "game/entity/IHuman";
import { Source } from "game/entity/player/IMessageManager";
import { Quality } from "game/IObject";
import { IItemDescription, ItemType, ItemTypeGroup } from "game/item/IItem";
import { itemDescriptions } from "game/item/Items";
import { TerrainType, TerrainTypeGroup } from "game/tile/ITerrain";
import Message from "language/dictionary/Message";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import Register, { Registry } from "mod/ModRegistry";
import { Tuple } from "utilities/collection/Arrays";
import Enums from "utilities/enum/Enums";
import TileHelpers from "utilities/game/TileHelpers";
import { BaseStatsDoodadCopperChest, BaseStatsDoodadIronChest, BaseStatsDoodadStoneWall, BaseStatsDoodadWoodenChest, BaseStatsDoodadWroughtIronChest } from "./doodads/BaseDoodad";
import { BlackCopperChestDescription, BlackIronChestDescription, BlackWoodenChestDescription, BlackWroughtIronChestDescription, BlueCopperChestDescription, BlueIronChestDescription, BlueWoodenChestDescription, BlueWroughtIronChestDescription, GreenCopperChestDescription, GreenIronChestDescription, GreenWoodenChestDescription, GreenWroughtIronChestDescription, OrangeCopperChestDescription, OrangeIronChestDescription, OrangeWoodenChestDescription, OrangeWroughtIronChestDescription, PurpleCopperChestDescription, PurpleIronChestDescription, PurpleWoodenChestDescription, PurpleWroughtIronChestDescription, RedCopperChestDescription, RedIronChestDescription, RedWoodenChestDescription, RedWroughtIronChestDescription, WhiteCopperChestDescription, WhiteIronChestDescription, WhiteWoodenChestDescription, WhiteWroughtIronChestDescription, YellowCopperChestDescription, YellowIronChestDescription, YellowWoodenChestDescription, YellowWroughtIronChestDescription } from "./doodads/Doodads";
import { DyeGroup } from "./dyes/DyeGroup";
import { getDoodadDyeDescription, getItemDyeDescription } from "./dyes/Dyes";
import { CornflowerDescription, CornflowerDoodadDescription, CornflowerSeedsDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { Colors, MOD_NAME } from "./IColorsEverywhere";
import { getPigmentIngredientGroupDescription } from "./pigments/PigmentGroups";
import { getPigmentDescription } from "./pigments/Pigments";
import { BlackAshCementFlooringDescription, BlackAshCementFlooringTerrainDescription, BlackClayFlooringDescription, BlackClayFlooringTerrainDescription, BlackCobblestoneFlooringDescription, BlackCobblestoneFlooringTerrainDescription, BlackWoodenFlooringDescription, BlackWoodenFlooringTerrainDescription, BlueAshCementFlooringDescription, BlueAshCementFlooringTerrainDescription, BlueClayFlooringDescription, BlueClayFlooringTerrainDescription, BlueCobblestoneFlooringDescription, BlueCobblestoneFlooringTerrainDescription, BlueWoodenFlooringDescription, BlueWoodenFlooringTerrainDescription, GreenAshCementFlooringDescription, GreenAshCementFlooringTerrainDescription, GreenClayFlooringDescription, GreenClayFlooringTerrainDescription, GreenCobblestoneFlooringDescription, GreenCobblestoneFlooringTerrainDescription, GreenWoodenFlooringDescription, GreenWoodenFlooringTerrainDescription, OrangeAshCementFlooringDescription, OrangeAshCementFlooringTerrainDescription, OrangeClayFlooringDescription, OrangeClayFlooringTerrainDescription, OrangeCobblestoneFlooringDescription, OrangeCobblestoneFlooringTerrainDescription, OrangeWoodenFlooringDescription, OrangeWoodenFlooringTerrainDescription, PurpleAshCementFlooringDescription, PurpleAshCementFlooringTerrainDescription, PurpleClayFlooringDescription, PurpleClayFlooringTerrainDescription, PurpleCobblestoneFlooringDescription, PurpleCobblestoneFlooringTerrainDescription, PurpleWoodenFlooringDescription, PurpleWoodenFlooringTerrainDescription, RedAshCementFlooringDescription, RedAshCementFlooringTerrainDescription, RedClayFlooringDescription, RedClayFlooringTerrainDescription, RedCobblestoneFlooringDescription, RedCobblestoneFlooringTerrainDescription, RedWoodenFlooringDescription, RedWoodenFlooringTerrainDescription, WhiteAshCementFlooringDescription, WhiteAshCementFlooringTerrainDescription, WhiteClayFlooringDescription, WhiteClayFlooringTerrainDescription, WhiteCobblestoneFlooringDescription, WhiteCobblestoneFlooringTerrainDescription, WhiteWoodenFlooringDescription, WhiteWoodenFlooringTerrainDescription, YellowAshCementFlooringDescription, YellowAshCementFlooringTerrainDescription, YellowClayFlooringDescription, YellowClayFlooringTerrainDescription, YellowCobblestoneFlooringDescription, YellowCobblestoneFlooringTerrainDescription, YellowWoodenFlooringDescription, YellowWoodenFlooringTerrainDescription } from "./terrains/Terrains";
import { DyeRemoverDescription, getItemPaintbrushDescription, PaintbrushDescription, StoneBowlDescription } from "./tools/Tools";
import { rgbColors } from "./utils/Utils";

type ItemRegistrations = PickValues<ColorsEverywhere, (ItemType | ItemTypeGroup)[]>;
const itemBulkRegistrations: (keyof ItemRegistrations)[] = [
    "itemPigmentIngredientGroups",
    "itemPigments",
    "itemsDyes",
    "itemsPaintbrushes",
    "itemsStoneWalls"
];

type DoodadRegistrations = PickValues<ColorsEverywhere, (DoodadType | DoodadTypeGroup)[]>;
const doodadBulkRegistrations: (keyof DoodadRegistrations)[] = [
    "doodadsDyes",
    "doodadsStoneWalls"
];

type TerrainRegistrations = PickValues<ColorsEverywhere, TerrainType[]>;
const terrainBulkRegistrations: (keyof TerrainRegistrations)[] = [
];

export default class ColorsEverywhere extends Mod {

    @Mod.instance<ColorsEverywhere>(MOD_NAME)
    public static readonly INSTANCE: ColorsEverywhere;

    ////////////////////////////////////////////////////////////
    // Register new flower types
    ////////////////////////////////////////////////////////////

    @Register.item("Cornflower", { ...CornflowerDescription })
    public itemCornflower: ItemType;

    @Register.item("Rose", { ...RoseDescription })
    public itemRose: ItemType;

    @Register.item("Sunflower", { ...SunflowerDescription })
    public itemSunflower: ItemType;

    @Register.item("CornflowerSeeds", { ...CornflowerSeedsDescription })
    public itemCornflowerSeeds: ItemType;

    @Register.item("RoseSeeds", { ...RoseSeedsDescription })
    public itemRoseSeeds: ItemType;

    @Register.item("SunflowerSeeds", { ...SunflowerSeedsDescription })
    public itemSunflowerSeeds: ItemType;

    @Register.doodad("Cornflower", { ...CornflowerDoodadDescription })
    public doodadCornflower: DoodadType;

    @Register.doodad("Rose", { ...RoseDoodadDescription })
    public doodadRose: DoodadType;

    @Register.doodad("Sunflower", { ...SunflowerDoodadDescription })
    public doodadSunflower: DoodadType;


    ////////////////////////////////////////////////////////////
    // Register pigment groups
    ////////////////////////////////////////////////////////////

    @Register.bulk("itemGroup", ...Enums.values(Colors)
        .map(color => Tuple(`item${Colors[color]}PigmentIngredientGroup`, getPigmentIngredientGroupDescription(color))))
    public itemPigmentIngredientGroups: ItemTypeGroup[];


    ////////////////////////////////////////////////////////////
    // Register pigments
    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}Pigment`, getPigmentDescription(color))))
    public itemPigments: ItemType[];


    ////////////////////////////////////////////////////////////
    // Register dye group
    ////////////////////////////////////////////////////////////

    @Register.itemGroup("DyeGroup", { ...DyeGroup })
    public itemDyeGroup: ItemTypeGroup;


    ////////////////////////////////////////////////////////////
    // Register dyes
    ////////////////////////////////////////////////////////////

    // // Doodads
    @Register.bulk("doodad", ...Enums.values(Colors).map(color => Tuple(`${Colors[color]}Dye`, getDoodadDyeDescription(color))))
    public readonly doodadsDyes: DoodadType[];

    // Items
    @Register.bulk("item", ...Enums.values(Colors).map(color => Tuple(`${Colors[color]}Dye`, getItemDyeDescription(color))))
    public readonly itemsDyes: ItemType[];


    ////////////////////////////////////////////////////////////
    // Register tools
    ////////////////////////////////////////////////////////////

    @Register.item("StoneBowl", { ...StoneBowlDescription })
    public itemStoneBowl: ItemType;

    @Register.item("DyeRemover", { ...DyeRemoverDescription })
    public itemDyeRemover: ItemType;

    @Register.item("Paintbrush", { ...PaintbrushDescription })
    public itemPaintbrush: ItemType;

    // Color Paintbrushes
    @Register.bulk("item", ...Enums.values(Colors).map(color => Tuple(`${Colors[color]}Paintbrush`, getItemPaintbrushDescription(color))))
    public readonly itemsPaintbrushes: ItemType[];


    ////////////////////////////////////////////////////////////
    // Register doodads - W,B,R,Y,B,O,G,P
    ////////////////////////////////////////////////////////////

    @Register.item("WhiteWoodenChest", { ...WhiteWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteWoodenChest: ItemType;
    @Register.doodad("WhiteWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteWoodenChest')] })
    public doodadWhiteWoodenChest: DoodadType;

    @Register.item("BlackWoodenChest", { ...BlackWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackWoodenChest: ItemType;
    @Register.doodad("BlackWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackWoodenChest')] })
    public doodadBlackWoodenChest: DoodadType;

    @Register.item("RedWoodenChest", { ...RedWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedWoodenChest: ItemType;
    @Register.doodad("RedWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedWoodenChest')] })
    public doodadRedWoodenChest: DoodadType;

    @Register.item("YellowWoodenChest", { ...YellowWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowWoodenChest: ItemType;
    @Register.doodad("YellowWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowWoodenChest')] })
    public doodadYellowWoodenChest: DoodadType;

    @Register.item("BlueWoodenChest", { ...BlueWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueWoodenChest: ItemType;
    @Register.doodad("BlueWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueWoodenChest')] })
    public doodadBlueWoodenChest: DoodadType;

    @Register.item("OrangeWoodenChest", { ...OrangeWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeWoodenChest: ItemType;
    @Register.doodad("OrangeWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeWoodenChest')] })
    public doodadOrangeWoodenChest: DoodadType;

    @Register.item("GreenWoodenChest", { ...GreenWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenWoodenChest: ItemType;
    @Register.doodad("GreenWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenWoodenChest')] })
    public doodadGreenWoodenChest: DoodadType;

    @Register.item("PurpleWoodenChest", { ...PurpleWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleWoodenChest: ItemType;
    @Register.doodad("PurpleWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleWoodenChest')] })
    public doodadPurpleWoodenChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteCopperChest", { ...WhiteCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteCopperChest: ItemType;
    @Register.doodad("WhiteCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteCopperChest')] })
    public doodadWhiteCopperChest: DoodadType;

    @Register.item("BlackCopperChest", { ...BlackCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackCopperChest: ItemType;
    @Register.doodad("BlackCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackCopperChest')] })
    public doodadBlackCopperChest: DoodadType;

    @Register.item("RedCopperChest", { ...RedCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedCopperChest: ItemType;
    @Register.doodad("RedCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedCopperChest')] })
    public doodadRedCopperChest: DoodadType;

    @Register.item("YellowCopperChest", { ...YellowCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowCopperChest: ItemType;
    @Register.doodad("YellowCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowCopperChest')] })
    public doodadYellowCopperChest: DoodadType;

    @Register.item("BlueCopperChest", { ...BlueCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueCopperChest: ItemType;
    @Register.doodad("BlueCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueCopperChest')] })
    public doodadBlueCopperChest: DoodadType;

    @Register.item("OrangeCopperChest", { ...OrangeCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeCopperChest: ItemType;
    @Register.doodad("OrangeCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeCopperChest')] })
    public doodadOrangeCopperChest: DoodadType;

    @Register.item("GreenCopperChest", { ...GreenCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenCopperChest: ItemType;
    @Register.doodad("GreenCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenCopperChest')] })
    public doodadGreenCopperChest: DoodadType;

    @Register.item("PurpleCopperChest", { ...PurpleCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleCopperChest: ItemType;
    @Register.doodad("PurpleCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleCopperChest')] })
    public doodadPurpleCopperChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteWroughtIronChest", { ...WhiteWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteWroughtIronChest: ItemType;
    @Register.doodad("WhiteWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteWroughtIronChest')] })
    public doodadWhiteWroughtIronChest: DoodadType;

    @Register.item("BlackWroughtIronChest", { ...BlackWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackWroughtIronChest: ItemType;
    @Register.doodad("BlackWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackWroughtIronChest')] })
    public doodadBlackWroughtIronChest: DoodadType;

    @Register.item("RedWroughtIronChest", { ...RedWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedWroughtIronChest: ItemType;
    @Register.doodad("RedWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedWroughtIronChest')] })
    public doodadRedWroughtIronChest: DoodadType;

    @Register.item("YellowWroughtIronChest", { ...YellowWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowWroughtIronChest: ItemType;
    @Register.doodad("YellowWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowWroughtIronChest')] })
    public doodadYellowWroughtIronChest: DoodadType;

    @Register.item("BlueWroughtIronChest", { ...BlueWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueWroughtIronChest: ItemType;
    @Register.doodad("BlueWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueWroughtIronChest')] })
    public doodadBlueWroughtIronChest: DoodadType;

    @Register.item("OrangeWroughtIronChest", { ...OrangeWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeWroughtIronChest: ItemType;
    @Register.doodad("OrangeWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeWroughtIronChest')] })
    public doodadOrangeWroughtIronChest: DoodadType;

    @Register.item("GreenWroughtIronChest", { ...GreenWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenWroughtIronChest: ItemType;
    @Register.doodad("GreenWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenWroughtIronChest')] })
    public doodadGreenWroughtIronChest: DoodadType;

    @Register.item("PurpleWroughtIronChest", { ...PurpleWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleWroughtIronChest: ItemType;
    @Register.doodad("PurpleWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleWroughtIronChest')] })
    public doodadPurpleWroughtIronChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteIronChest", { ...WhiteIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteIronChest: ItemType;
    @Register.doodad("WhiteIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteIronChest')] })
    public doodadWhiteIronChest: DoodadType;

    @Register.item("BlackIronChest", { ...BlackIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackIronChest: ItemType;
    @Register.doodad("BlackIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackIronChest')] })
    public doodadBlackIronChest: DoodadType;

    @Register.item("RedIronChest", { ...RedIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedIronChest: ItemType;
    @Register.doodad("RedIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedIronChest')] })
    public doodadRedIronChest: DoodadType;

    @Register.item("YellowIronChest", { ...YellowIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowIronChest: ItemType;
    @Register.doodad("YellowIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowIronChest')] })
    public doodadYellowIronChest: DoodadType;

    @Register.item("BlueIronChest", { ...BlueIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueIronChest: ItemType;
    @Register.doodad("BlueIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueIronChest')] })
    public doodadBlueIronChest: DoodadType;

    @Register.item("OrangeIronChest", { ...OrangeIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeIronChest: ItemType;
    @Register.doodad("OrangeIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeIronChest')] })
    public doodadOrangeIronChest: DoodadType;

    @Register.item("GreenIronChest", { ...GreenIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenIronChest: ItemType;
    @Register.doodad("GreenIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenIronChest')] })
    public doodadGreenIronChest: DoodadType;

    @Register.item("PurpleIronChest", { ...PurpleIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleIronChest: ItemType;
    @Register.doodad("PurpleIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleIronChest')] })
    public doodadPurpleIronChest: DoodadType;

    // ----------------------------------------

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}StoneWall`, {
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsStoneWalls", color) },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsStoneWalls", color)
        })))
    public itemsStoneWalls: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}StoneWall`, {
            ...BaseStatsDoodadStoneWall,
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsStoneWalls", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsStoneWalls", color)]
        })))
    public doodadsStoneWalls: DoodadType[];


    ////////////////////////////////////////////////////////////
    // Register terrains
    ////////////////////////////////////////////////////////////

    @Register.item("WhiteCobblestoneFlooring", { ...WhiteCobblestoneFlooringDescription })
    public itemWhiteCobblestoneFlooring: ItemType;
    @Register.terrain("WhiteCobblestoneFlooring", { ...WhiteCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteCobblestoneFlooring: TerrainType;

    @Register.item("BlackCobblestoneFlooring", { ...BlackCobblestoneFlooringDescription })
    public itemBlackCobblestoneFlooring: ItemType;
    @Register.terrain("BlackCobblestoneFlooring", { ...BlackCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackCobblestoneFlooring: TerrainType;

    @Register.item("RedCobblestoneFlooring", { ...RedCobblestoneFlooringDescription })
    public itemRedCobblestoneFlooring: ItemType;
    @Register.terrain("RedCobblestoneFlooring", { ...RedCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedCobblestoneFlooring: TerrainType;

    @Register.item("YellowCobblestoneFlooring", { ...YellowCobblestoneFlooringDescription })
    public itemYellowCobblestoneFlooring: ItemType;
    @Register.terrain("YellowCobblestoneFlooring", { ...YellowCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowCobblestoneFlooring: TerrainType;

    @Register.item("BlueCobblestoneFlooring", { ...BlueCobblestoneFlooringDescription })
    public itemBlueCobblestoneFlooring: ItemType;
    @Register.terrain("BlueCobblestoneFlooring", { ...BlueCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueCobblestoneFlooring: TerrainType;

    @Register.item("OrangeCobblestoneFlooring", { ...OrangeCobblestoneFlooringDescription })
    public itemOrangeCobblestoneFlooring: ItemType;
    @Register.terrain("OrangeCobblestoneFlooring", { ...OrangeCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeCobblestoneFlooring: TerrainType;

    @Register.item("GreenCobblestoneFlooring", { ...GreenCobblestoneFlooringDescription })
    public itemGreenCobblestoneFlooring: ItemType;
    @Register.terrain("GreenCobblestoneFlooring", { ...GreenCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenCobblestoneFlooring: TerrainType;

    @Register.item("PurpleCobblestoneFlooring", { ...PurpleCobblestoneFlooringDescription })
    public itemPurpleCobblestoneFlooring: ItemType;
    @Register.terrain("PurpleCobblestoneFlooring", { ...PurpleCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainPurpleCobblestoneFlooring: TerrainType;

    // ----------------------------------------

    @Register.item("WhiteWoodenFlooring", { ...WhiteWoodenFlooringDescription })
    public itemWhiteWoodenFlooring: ItemType;
    @Register.terrain("WhiteWoodenFlooring", { ...WhiteWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteWoodenFlooring: TerrainType;

    @Register.item("BlackWoodenFlooring", { ...BlackWoodenFlooringDescription })
    public itemBlackWoodenFlooring: ItemType;
    @Register.terrain("BlackWoodenFlooring", { ...BlackWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackWoodenFlooring: TerrainType;

    @Register.item("RedWoodenFlooring", { ...RedWoodenFlooringDescription })
    public itemRedWoodenFlooring: ItemType;
    @Register.terrain("RedWoodenFlooring", { ...RedWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedWoodenFlooring: TerrainType;

    @Register.item("YellowWoodenFlooring", { ...YellowWoodenFlooringDescription })
    public itemYellowWoodenFlooring: ItemType;
    @Register.terrain("YellowWoodenFlooring", { ...YellowWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowWoodenFlooring: TerrainType;

    @Register.item("BlueWoodenFlooring", { ...BlueWoodenFlooringDescription })
    public itemBlueWoodenFlooring: ItemType;
    @Register.terrain("BlueWoodenFlooring", { ...BlueWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueWoodenFlooring: TerrainType;

    @Register.item("OrangeWoodenFlooring", { ...OrangeWoodenFlooringDescription })
    public itemOrangeWoodenFlooring: ItemType;
    @Register.terrain("OrangeWoodenFlooring", { ...OrangeWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeWoodenFlooring: TerrainType;

    @Register.item("GreenWoodenFlooring", { ...GreenWoodenFlooringDescription })
    public itemGreenWoodenFlooring: ItemType;
    @Register.terrain("GreenWoodenFlooring", { ...GreenWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenWoodenFlooring: TerrainType;

    @Register.item("PurpleWoodenFlooring", { ...PurpleWoodenFlooringDescription })
    public itemPurpleWoodenFlooring: ItemType;
    @Register.terrain("PurpleWoodenFlooring", { ...PurpleWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainPurpleWoodenFlooring: TerrainType;

    // ----------------------------------------

    @Register.item("WhiteClayFlooring", { ...WhiteClayFlooringDescription })
    public itemWhiteClayFlooring: ItemType;
    @Register.terrain("WhiteClayFlooring", { ...WhiteClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteClayFlooring: TerrainType;

    @Register.item("BlackClayFlooring", { ...BlackClayFlooringDescription })
    public itemBlackClayFlooring: ItemType;
    @Register.terrain("BlackClayFlooring", { ...BlackClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackClayFlooring: TerrainType;

    @Register.item("RedClayFlooring", { ...RedClayFlooringDescription })
    public itemRedClayFlooring: ItemType;
    @Register.terrain("RedClayFlooring", { ...RedClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedClayFlooring: TerrainType;

    @Register.item("YellowClayFlooring", { ...YellowClayFlooringDescription })
    public itemYellowClayFlooring: ItemType;
    @Register.terrain("YellowClayFlooring", { ...YellowClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowClayFlooring: TerrainType;

    @Register.item("BlueClayFlooring", { ...BlueClayFlooringDescription })
    public itemBlueClayFlooring: ItemType;
    @Register.terrain("BlueClayFlooring", { ...BlueClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueClayFlooring: TerrainType;

    @Register.item("OrangeClayFlooring", { ...OrangeClayFlooringDescription })
    public itemOrangeClayFlooring: ItemType;
    @Register.terrain("OrangeClayFlooring", { ...OrangeClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeClayFlooring: TerrainType;

    @Register.item("GreenClayFlooring", { ...GreenClayFlooringDescription })
    public itemGreenClayFlooring: ItemType;
    @Register.terrain("GreenClayFlooring", { ...GreenClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenClayFlooring: TerrainType;

    @Register.item("PurpleClayFlooring", { ...PurpleClayFlooringDescription })
    public itemPurpleClayFlooring: ItemType;
    @Register.terrain("PurpleClayFlooring", { ...PurpleClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainPurpleClayFlooring: TerrainType;

    // ----------------------------------------

    @Register.item("WhiteAshCementFlooring", { ...WhiteAshCementFlooringDescription })
    public itemWhiteAshCementFlooring: ItemType;
    @Register.terrain("WhiteAshCementFlooring", { ...WhiteAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteAshCementFlooring: TerrainType;

    @Register.item("BlackAshCementFlooring", { ...BlackAshCementFlooringDescription })
    public itemBlackAshCementFlooring: ItemType;
    @Register.terrain("BlackAshCementFlooring", { ...BlackAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackAshCementFlooring: TerrainType;

    @Register.item("RedAshCementFlooring", { ...RedAshCementFlooringDescription })
    public itemRedAshCementFlooring: ItemType;
    @Register.terrain("RedAshCementFlooring", { ...RedAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedAshCementFlooring: TerrainType;

    @Register.item("YellowAshCementFlooring", { ...YellowAshCementFlooringDescription })
    public itemYellowAshCementFlooring: ItemType;
    @Register.terrain("YellowAshCementFlooring", { ...YellowAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowAshCementFlooring: TerrainType;

    @Register.item("BlueAshCementFlooring", { ...BlueAshCementFlooringDescription })
    public itemBlueAshCementFlooring: ItemType;
    @Register.terrain("BlueAshCementFlooring", { ...BlueAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueAshCementFlooring: TerrainType;

    @Register.item("OrangeAshCementFlooring", { ...OrangeAshCementFlooringDescription })
    public itemOrangeAshCementFlooring: ItemType;
    @Register.terrain("OrangeAshCementFlooring", { ...OrangeAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeAshCementFlooring: TerrainType;

    @Register.item("GreenAshCementFlooring", { ...GreenAshCementFlooringDescription })
    public itemGreenAshCementFlooring: ItemType;
    @Register.terrain("GreenAshCementFlooring", { ...GreenAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenAshCementFlooring: TerrainType;

    @Register.item("PurpleAshCementFlooring", { ...PurpleAshCementFlooringDescription })
    public itemPurpleAshCementFlooring: ItemType;
    @Register.terrain("PurpleAshCementFlooring", { ...PurpleAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainPurpleAshCementFlooring: TerrainType;


    ////////////////////////////////////////////////////////////
    // Register equipment
    ////////////////////////////////////////////////////////////

    @Register.item("RedLeatherTunic")
    public itemRedLeatherTunic: ItemType;


    ////////////////////////////////////////////////////////////
    // Register messages
    ////////////////////////////////////////////////////////////

    @Register.message("PaintbrushNotDirty")
    public readonly messagePaintbrushNotDirty: Message;

    @Register.message("NoWaterSource")
    public readonly messageNoWaterSource: Message;

    @Register.message("NoDyeSource")
    public readonly messageNoDyeSource: Message;

    @Register.message("NoDyeAllowed")
    public readonly messageNoDyeAllowed: Message;

    @Register.message("NoSameColor")
    public readonly messageNoSameColor: Message;


    ////////////////////////////////////////////////////////////
    // Register actions
    ////////////////////////////////////////////////////////////

    public getTerrainList (): TerrainType[] {
        return [
            TerrainType.CobblestoneFlooring,
            TerrainType.WoodenFlooring,
            TerrainType.ClayFlooring,
            TerrainType.AshCementFlooring,
            this.terrainWhiteCobblestoneFlooring,
            this.terrainBlackCobblestoneFlooring,
            this.terrainRedCobblestoneFlooring,
            this.terrainYellowCobblestoneFlooring,
            this.terrainBlueCobblestoneFlooring,
            this.terrainOrangeCobblestoneFlooring,
            this.terrainGreenCobblestoneFlooring,
            this.terrainPurpleCobblestoneFlooring,
            this.terrainWhiteWoodenFlooring,
            this.terrainBlackWoodenFlooring,
            this.terrainRedWoodenFlooring,
            this.terrainYellowWoodenFlooring,
            this.terrainBlueWoodenFlooring,
            this.terrainOrangeWoodenFlooring,
            this.terrainGreenWoodenFlooring,
            this.terrainPurpleWoodenFlooring,
            this.terrainWhiteClayFlooring,
            this.terrainBlackClayFlooring,
            this.terrainRedClayFlooring,
            this.terrainYellowClayFlooring,
            this.terrainBlueClayFlooring,
            this.terrainOrangeClayFlooring,
            this.terrainGreenClayFlooring,
            this.terrainPurpleClayFlooring,
            this.terrainWhiteAshCementFlooring,
            this.terrainBlackAshCementFlooring,
            this.terrainRedAshCementFlooring,
            this.terrainYellowAshCementFlooring,
            this.terrainBlueAshCementFlooring,
            this.terrainOrangeAshCementFlooring,
            this.terrainGreenAshCementFlooring,
            this.terrainPurpleAshCementFlooring
        ]
    }

    public getDoodadList (): DoodadType[] {
        return [
            DoodadType.WoodenChest,
            DoodadType.WroughtIronChest,
            DoodadType.IronChest,
            DoodadType.CopperChest,
            DoodadType.StoneWall,
            this.doodadWhiteWoodenChest,
            this.doodadBlackWoodenChest,
            this.doodadRedWoodenChest,
            this.doodadYellowWoodenChest,
            this.doodadBlueWoodenChest,
            this.doodadOrangeWoodenChest,
            this.doodadGreenWoodenChest,
            this.doodadPurpleWoodenChest,
            this.doodadWhiteCopperChest,
            this.doodadBlackCopperChest,
            this.doodadRedCopperChest,
            this.doodadYellowCopperChest,
            this.doodadBlueCopperChest,
            this.doodadOrangeCopperChest,
            this.doodadGreenCopperChest,
            this.doodadPurpleCopperChest,
            this.doodadWhiteWroughtIronChest,
            this.doodadBlackWroughtIronChest,
            this.doodadRedWroughtIronChest,
            this.doodadYellowWroughtIronChest,
            this.doodadBlueWroughtIronChest,
            this.doodadOrangeWroughtIronChest,
            this.doodadGreenWroughtIronChest,
            this.doodadPurpleWroughtIronChest,
            this.doodadWhiteIronChest,
            this.doodadBlackIronChest,
            this.doodadRedIronChest,
            this.doodadYellowIronChest,
            this.doodadBlueIronChest,
            this.doodadOrangeIronChest,
            this.doodadGreenIronChest,
            this.doodadPurpleIronChest,
            ...this.doodadsStoneWalls
        ];
    }

    @Register.action("Paint", new Action(ActionArgument.ItemNearby)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            // TODO
            // - Trigger dialog for overlapping doodad/terrain options
            // - Carry item quality on paintbrush/items

            const player = action.executor;
            const tile = player.getFacingTile();
            const tilePosition = player.getFacingPoint();
            const tileDoodad = tile.doodad;
            const tileTerrain = TileHelpers.getType(tile);

            const ths = ColorsEverywhere.INSTANCE;
            const doodadTypeList = ths.getDoodadList();
            const terrainTypeList = ths.getTerrainList();

            const color = ths.getItemColor(item.type);

            function usePaintAction (color: Colors, doodadType?: DoodadType, terrainType?: TerrainType) {

                let existingColor!: Colors;

                if (doodadType) {
                    existingColor = ths.getDoodadColor(doodadType);
                }
                if (terrainType) {
                    existingColor = ths.getTileColor(terrainType);
                }


                // Can't paint it the same color
                if (color === existingColor) {
                    player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoSameColor);
                    return;
                }

                // Painting over the paint

                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[color]);

                if (doodadType) {
                    const doodadBulkRegistration = ths.getDoodadBulkRegistration(doodadType);
                    if (doodadBulkRegistration) {
                        tileDoodad?.changeType(doodadBulkRegistration[color]);
                    }
                }

                if (terrainType) {
                    const terrainBulkRegistration = ths.getTerrainBulkRegistration(terrainType);
                    if (terrainBulkRegistration) {
                        game.changeTile(terrainBulkRegistration[color], tilePosition.x, tilePosition.y, tilePosition.z, false)
                    }
                }

                item.returns();
            }

            if (tileDoodad || tileTerrain) {
                if (tileDoodad && doodadTypeList.includes(tileDoodad.type)) {
                    usePaintAction(color, tileDoodad?.type);
                }
                if (tileTerrain && terrainTypeList.includes(tileTerrain)) {
                    usePaintAction(color, undefined, tileTerrain);
                }
            } else {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeAllowed);
            }

            game.passTurn(player);
        }))

    public readonly actionPaint: ActionType;

    // ------------------------------------------------------------ //

    @Register.action("RemovePaint", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            const player = action.executor;
            const tile = player.getFacingTile();
            const tilePosition = player.getFacingPoint();
            const tileDoodad = tile.doodad;
            const tileTerrain = TileHelpers.getType(tile);

            const doodadTypeList = ColorsEverywhere.INSTANCE.getDoodadList();
            const terrainTypeList = ColorsEverywhere.INSTANCE.getTerrainList();

            function useRemovePaintAction (doodadType?: DoodadType, terrainType?: TerrainType) {

                let keyName: string | undefined;

                if (doodadType) {
                    const doodadKeys = Enums.toString(DoodadType, doodadType);
                    keyName = doodadKeys.split(" | ").pop();
                }
                if (terrainType) {
                    const terrainKeys = Enums.toString(TerrainType, terrainType);
                    keyName = terrainKeys.split(" | ").pop();
                }

                // Remove paint
                if (keyName?.includes('ModColorsEverywhere')) {
                    const removedModName = keyName.replace('ModColorsEverywhere', '');
                    const colorArray = ['White', 'Black', 'Red', 'Yellow', 'Blue', 'Orange', 'Green', 'Purple'];
                    colorArray.forEach(val => {
                        if (keyName?.includes(val)) {
                            keyName = removedModName.replace(val, '')
                        }
                    })
                }

                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[Colors.White]);

                if (doodadType) {
                    const name = `${keyName}` as keyof typeof DoodadType;
                    const changedTypeName = DoodadType[name] as DoodadType;
                    tileDoodad?.changeType(changedTypeName);
                }

                if (terrainType) {
                    const name = `${keyName}` as keyof typeof TerrainType;
                    const changedTypeName = TerrainType[name] as TerrainType;
                    game.changeTile(changedTypeName, tilePosition.x, tilePosition.y, tilePosition.z, false)
                }

                item.returns();

            }

            if (tileDoodad || tileTerrain) {
                if (tileDoodad && doodadTypeList.includes(tileDoodad.type)) {
                    useRemovePaintAction(tileDoodad?.type);
                }
                if (tileTerrain && terrainTypeList.includes(tileTerrain)) {
                    useRemovePaintAction(undefined, tileTerrain);
                }
            } else {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeAllowed);
            }

            game.passTurn(player);
        }))

    public readonly actionRemovePaint: ActionType;

    // ------------------------------------------------------------ //

    @Register.action("CleanPaintbrush", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            const player = action.executor;
            const tile = player.getFacingTile();
            const tileDoodad = tile.doodad;
            const terrainType = TileHelpers.getType(tile);
            const cleanBrush = ColorsEverywhere.INSTANCE.itemPaintbrush;

            function cleanIt () {
                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[Colors.Blue]);
                item.changeInto(cleanBrush);
            }

            // Water Check
            if (tileDoodad || terrainType) {
                if (
                    terrainType === TerrainType.Seawater
                    || terrainType === TerrainType.ShallowSeawater
                    || terrainType === TerrainType.DeepSeawater
                    || terrainType === TerrainType.FreshWater
                    || terrainType === TerrainType.ShallowFreshWater
                    || terrainType === TerrainType.DeepFreshWater
                    || tileDoodad?.type === DoodadType.ClayWell
                    || tileDoodad?.type === DoodadType.StoneWell
                    || tileDoodad?.type === DoodadType.SandstoneWell
                    || tileDoodad?.type === DoodadType.ClayWaterStill
                    || tileDoodad?.type === DoodadType.StoneWaterStill
                    || tileDoodad?.type === DoodadType.SandstoneWaterStill
                ) {
                    cleanIt();
                } else {
                    player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoWaterSource);
                }
            }
            game.passTurn(player);
        }))

    public readonly actionCleanPaintbrush: ActionType;

    // ------------------------------------------------------------ //

    @Register.action("DyeItem", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            const player = action.executor;
            const tile = player.getFacingTile();
            const tileDoodad = tile.doodad;

            if (tileDoodad?.type !== ColorsEverywhere.INSTANCE.doodadsDyes[Colors.Red]) {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeSource);
            } else {
                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[Colors.Red]);
                item.changeInto(ColorsEverywhere.INSTANCE.itemRedLeatherTunic);
                tileDoodad.damage();
            }

        }))

    public readonly actionDyeItem: ActionType;


    ////////////////////////////////////////////////////////////
    // Overrides
    ////////////////////////////////////////////////////////////

    private milkThistleOrig: IItemDescription;
    private leatherTunicOrig: IItemDescription;

    @Override public onLoad () {

        // Milk Thistle

        this.milkThistleOrig = itemDescriptions[ItemType.MilkThistleFlowers];
        const milkThistle = itemDescriptions[ItemType.MilkThistleFlowers];

        // const purple = this.items.filter(v => v'itemPurplePigment'));

        if (milkThistle && milkThistle.dismantle === undefined) {
            milkThistle.dismantle = {
                items: [{
                    type: this.itemPigments[Colors.Purple],
                    amount: 1
                }],
                required: ItemTypeGroup.MortarAndPestle,
                skill: SkillType.Chemistry,
                reputation: 2
            };
        }

        // Leather Tunic

        this.leatherTunicOrig = itemDescriptions[ItemType.LeatherTunic];
        const leatherTunic = itemDescriptions[ItemType.LeatherTunic];

        // Repeat colors
        let redLeatherTunic = itemDescriptions[ColorsEverywhere.INSTANCE.itemRedLeatherTunic];

        if (leatherTunic) {
            // Append dye action
            !leatherTunic.use ? leatherTunic.use = [ColorsEverywhere.INSTANCE.actionDyeItem] : undefined;
            // Clone item stats for each color
            Object.assign(redLeatherTunic, leatherTunic);
        }
    }

    @Override public onUnload () {
        itemDescriptions[ItemType.MilkThistleFlowers] = this.milkThistleOrig;
        itemDescriptions[ItemType.LeatherTunic] = this.leatherTunicOrig;
    }

    @Override @HookMethod
    public onGameStart (isLoadingSave: boolean, playedCount: number): void {
        if (!isLoadingSave) {
            localPlayer.createItemInInventory(ItemType.IronHoe);
            localPlayer.createItemInInventory(this.itemCornflower);
            localPlayer.createItemInInventory(this.itemCornflowerSeeds);
            localPlayer.createItemInInventory(this.itemRose);
            localPlayer.createItemInInventory(this.itemRoseSeeds);
            localPlayer.createItemInInventory(this.itemSunflower);
            localPlayer.createItemInInventory(this.itemSunflowerSeeds);
            localPlayer.createItemInInventory(ItemType.ClayMortarAndPestle);
            localPlayer.createItemInInventory(ItemType.MilkThistleFlowers);
            localPlayer.createItemInInventory(ItemType.ClayJugOfUnpurifiedFreshWater);
            localPlayer.createItemInInventory(ItemType.LargeRock);
            localPlayer.createItemInInventory(ItemType.LeatherTunic);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.Red]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.Yellow]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.White]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.Black]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.Orange]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.Blue]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.Purple]);
            localPlayer.createItemInInventory(ItemType.LeatherTunic, Quality.Exceptional);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsPaintbrushes[Colors.Green], Quality.Exceptional);
            localPlayer.createItemInInventory(ItemType.Ectoplasm);
            localPlayer.createItemInInventory(ItemType.StoneWall);
            localPlayer.createItemInInventory(ItemType.StoneWall);
            localPlayer.createItemInInventory(this.itemRedLeatherTunic);
            localPlayer.createItemInInventory(this.itemsStoneWalls[Colors.White]);
            localPlayer.createItemInInventory(this.itemsStoneWalls[Colors.White]);
            localPlayer.createItemInInventory(this.itemsStoneWalls[Colors.White]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsDyes[Colors.Purple]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsDyes[Colors.Red]);
            localPlayer.createItemInInventory(this.itemWhiteCobblestoneFlooring);
        }
    }

    // ignore that this isn't used, you'll need it later i bet
    // @ts-ignore
    private getItemBulkRegistration<R extends ItemType | ItemTypeGroup> (registration: R) {
        for (const key of itemBulkRegistrations) {
            const value = this[key as keyof this] as any as (ItemType | ItemTypeGroup)[];
            if (value.includes(registration)) {
                return value as R[];
            }
        }

        this.getLog().warn("Tried to get registration key of non-bulk-registered item or itemGroup", registration);
        return undefined;
    }

    private getItemColor<R extends ItemType | ItemTypeGroup> (registration: R, registrationKey?: keyof PickValues<ColorsEverywhere, R[]>): Colors {
        if (registrationKey) {
            return (this[registrationKey] as R[]).indexOf(registration);
        }

        for (const key of itemBulkRegistrations) {
            const value = this[key as keyof this] as any as (ItemType | ItemTypeGroup)[];
            const index = value.indexOf(registration);
            if (index >= 0) {
                return index;
            }
        }

        this.getLog().warn("Tried to get color of non-bulk-registered item or itemGroup", registration);
        return -1;
    }

    private getDoodadBulkRegistration<R extends DoodadType | DoodadTypeGroup> (registration: R) {
        for (const key of doodadBulkRegistrations) {
            const value = this[key as keyof this] as any as (DoodadType | DoodadTypeGroup)[];
            if (value.includes(registration)) {
                return value as R[];
            }
        }

        this.getLog().warn("Tried to get registration key of non-bulk-registered doodad or doodadGroup", registration);
        return undefined;
    }

    private getDoodadColor<R extends DoodadType | DoodadTypeGroup> (registration: R, registrationKey?: keyof PickValues<ColorsEverywhere, R[]>): Colors {
        if (registrationKey) {
            return (this[registrationKey] as R[]).indexOf(registration);
        }

        for (const key of doodadBulkRegistrations) {
            const value = this[key as keyof this] as any as (DoodadType | DoodadTypeGroup)[];
            const index = value.indexOf(registration);
            if (index >= 0) {
                return index;
            }
        }

        this.getLog().warn("Tried to get color of non-bulk-registered doodad or doodadGroup", registration);
        return -1;
    }

    private getTerrainBulkRegistration (registration: TerrainType) {
        for (const key of terrainBulkRegistrations) {
            const value = this[key as keyof this] as any as TerrainType[];
            if (value.includes(registration)) {
                return value;
            }
        }

        this.getLog().warn("Tried to get registration key of non-bulk-registered terrain", registration);
        return undefined;
    }

    private getTileColor (registration: TerrainType, registrationKey?: keyof PickValues<ColorsEverywhere, TerrainType[]>): Colors {
        if (registrationKey) {
            // remove the "as any"s when there's a TerrainType bulk registration
            return ((this as any)[registrationKey as any] as TerrainType[]).indexOf(registration);
        }

        for (const key of terrainBulkRegistrations) {
            const value = this[key as keyof this] as any as TerrainType[];
            const index = value.indexOf(registration);
            if (index >= 0) {
                return index;
            }
        }

        this.getLog().warn("Tried to get color of non-bulk-registered tile", registration);
        return -1;
    }

}
