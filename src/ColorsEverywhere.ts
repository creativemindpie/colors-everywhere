import { DoodadType } from "game/doodad/IDoodad";
import { Action } from "game/entity/action/Action";
import { ActionArgument, ActionType } from "game/entity/action/IAction";
import { EntityType } from "game/entity/IEntity";
import { SkillType } from "game/entity/IHuman";
import { Source } from "game/entity/player/IMessageManager";
import { IItemDescription, ItemType, ItemTypeGroup } from "game/item/IItem";
import { itemDescriptions } from "game/item/Items";
import Message from "language/dictionary/Message";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import Register, { Registry } from "mod/ModRegistry";
import { TerrainType, TerrainTypeGroup } from "game/tile/ITerrain";
import { BlackDyeDescription, BlueDyeDescription, GreenDyeDescription, OrangeDyeDescription, PurpleDyeDescription, RedDyeDescription, WhiteDyeDescription, YellowDyeDescription } from "./dyes/Dyes";
import { CornflowerDescription, CornflowerSeedsDescription, CornflowerDoodadDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { BlackPigmentIngredientGroup, BluePigmentIngredientGroup, RedPigmentIngredientGroup, WhitePigmentIngredientGroup, YellowPigmentIngredientGroup } from "./pigments/PigmentGroups";
import { BlackPigmentDescription, BluePigmentDescription, GreenPigmentDescription, OrangePigmentDescription, PurplePigmentDescription, RedPigmentDescription, WhitePigmentDescription, YellowPigmentDescription } from "./pigments/Pigments";
import { BlackPaintbrushDescription, BluePaintbrushDescription, DyeRemoverDescription, GreenPaintbrushDescription, OrangePaintbrushDescription, PaintbrushDescription, PurplePaintbrushDescription, RedPaintbrushDescription, StoneBowlDescription, WhitePaintbrushDescription, YellowPaintbrushDescription } from "./tools/Tools";
import TileHelpers from "utilities/game/TileHelpers";
import { BlackCopperChestDescription, BlackIronChestDescription, BlackStoneWallDescription, BlackWoodenChestDescription, BlackWroughtIronChestDescription, BlueCopperChestDescription, BlueIronChestDescription, BlueStoneWallDescription, BlueWoodenChestDescription, BlueWroughtIronChestDescription, GreenCopperChestDescription, GreenIronChestDescription, GreenStoneWallDescription, GreenWoodenChestDescription, GreenWroughtIronChestDescription, OrangeCopperChestDescription, OrangeIronChestDescription, OrangeStoneWallDescription, OrangeWoodenChestDescription, OrangeWroughtIronChestDescription, PurpleCopperChestDescription, PurpleIronChestDescription, PurpleStoneWallDescription, PurpleWoodenChestDescription, PurpleWroughtIronChestDescription, RedCopperChestDescription, RedIronChestDescription, RedStoneWallDescription, RedWoodenChestDescription, RedWroughtIronChestDescription, WhiteCopperChestDescription, WhiteIronChestDescription, WhiteStoneWallDescription, WhiteWoodenChestDescription, WhiteWroughtIronChestDescription, YellowCopperChestDescription, YellowIronChestDescription, YellowStoneWallDescription, YellowWoodenChestDescription, YellowWroughtIronChestDescription } from "./doodads/Doodads";
import { BaseStatsDoodadCopperChest, BaseStatsDoodadDye, BaseStatsDoodadIronChest, BaseStatsDoodadStoneWall, BaseStatsDoodadWoodenChest, BaseStatsDoodadWroughtIronChest } from "./doodads/BaseDoodad";
import Enums from "utilities/enum/Enums";
import { particleColor } from "./utils/Utils";
import { Quality } from "game/IObject";
import { BlackAshCementFlooringDescription, BlackAshCementFlooringTerrainDescription, BlackClayFlooringDescription, BlackClayFlooringTerrainDescription, BlackCobblestoneFlooringDescription, BlackCobblestoneFlooringTerrainDescription, BlackWoodenFlooringDescription, BlackWoodenFlooringTerrainDescription, BlueAshCementFlooringDescription, BlueAshCementFlooringTerrainDescription, BlueClayFlooringDescription, BlueClayFlooringTerrainDescription, BlueCobblestoneFlooringDescription, BlueCobblestoneFlooringTerrainDescription, BlueWoodenFlooringDescription, BlueWoodenFlooringTerrainDescription, GreenAshCementFlooringDescription, GreenAshCementFlooringTerrainDescription, GreenClayFlooringDescription, GreenClayFlooringTerrainDescription, GreenCobblestoneFlooringDescription, GreenCobblestoneFlooringTerrainDescription, GreenWoodenFlooringDescription, GreenWoodenFlooringTerrainDescription, OrangeAshCementFlooringDescription, OrangeAshCementFlooringTerrainDescription, OrangeClayFlooringDescription, OrangeClayFlooringTerrainDescription, OrangeCobblestoneFlooringDescription, OrangeCobblestoneFlooringTerrainDescription, OrangeWoodenFlooringDescription, OrangeWoodenFlooringTerrainDescription, PurpleAshCementFlooringDescription, PurpleAshCementFlooringTerrainDescription, PurpleClayFlooringDescription, PurpleClayFlooringTerrainDescription, PurpleCobblestoneFlooringDescription, PurpleCobblestoneFlooringTerrainDescription, PurpleWoodenFlooringDescription, PurpleWoodenFlooringTerrainDescription, RedAshCementFlooringDescription, RedAshCementFlooringTerrainDescription, RedClayFlooringDescription, RedClayFlooringTerrainDescription, RedCobblestoneFlooringDescription, RedCobblestoneFlooringTerrainDescription, RedWoodenFlooringDescription, RedWoodenFlooringTerrainDescription, WhiteAshCementFlooringDescription, WhiteAshCementFlooringTerrainDescription, WhiteClayFlooringDescription, WhiteClayFlooringTerrainDescription, WhiteCobblestoneFlooringDescription, WhiteCobblestoneFlooringTerrainDescription, WhiteWoodenFlooringDescription, WhiteWoodenFlooringTerrainDescription, YellowAshCementFlooringDescription, YellowAshCementFlooringTerrainDescription, YellowClayFlooringDescription, YellowClayFlooringTerrainDescription, YellowCobblestoneFlooringDescription, YellowCobblestoneFlooringTerrainDescription, YellowWoodenFlooringDescription, YellowWoodenFlooringTerrainDescription } from "./terrains/Terrains";
import { DyeGroup } from "./dyes/DyeGroup";


export default class ColorsEverywhere extends Mod {

    @Mod.instance<ColorsEverywhere>("Colors Everywhere")
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

    @Register.itemGroup("WhitePigmentIngredientGroup", { ...WhitePigmentIngredientGroup })
    public itemWhitePigmentIngredientGroup: ItemTypeGroup;

    @Register.itemGroup("BlackPigmentIngredientGroup", { ...BlackPigmentIngredientGroup })
    public itemBlackPigmentIngredientGroup: ItemTypeGroup;

    @Register.itemGroup("RedPigmentIngredientGroup", { ...RedPigmentIngredientGroup })
    public itemRedPigmentIngredientGroup: ItemTypeGroup;

    @Register.itemGroup("YellowPigmentIngredientGroup", { ...YellowPigmentIngredientGroup })
    public itemYellowPigmentIngredientGroup: ItemTypeGroup;

    @Register.itemGroup("BluePigmentIngredientGroup", { ...BluePigmentIngredientGroup })
    public itemBluePigmentIngredientGroup: ItemTypeGroup;

    // New system for 2.10

/*     const itemColors = ["red", "blue", "green"];
    class Mod {
        @Register.bulk("item", ...itemColors
            .map(color => Tuple(`${color}Item`, { weight: 1 })))
        public readonly items: ItemType[];
    } */


    ////////////////////////////////////////////////////////////
    // Register pigments
    ////////////////////////////////////////////////////////////

    @Register.item("WhitePigment", { ...WhitePigmentDescription })
    public itemWhitePigment: ItemType;

    @Register.item("BlackPigment", { ...BlackPigmentDescription })
    public itemBlackPigment: ItemType;

    @Register.item("RedPigment", { ...RedPigmentDescription })
    public itemRedPigment: ItemType;

    @Register.item("YellowPigment", { ...YellowPigmentDescription })
    public itemYellowPigment: ItemType;

    @Register.item("BluePigment", { ...BluePigmentDescription })
    public itemBluePigment: ItemType;

    @Register.item("OrangePigment", { ...OrangePigmentDescription })
    public itemOrangePigment: ItemType;

    @Register.item("GreenPigment", { ...GreenPigmentDescription })
    public itemGreenPigment: ItemType;

    @Register.item("PurplePigment", { ...PurplePigmentDescription })
    public itemPurplePigment: ItemType;


    ////////////////////////////////////////////////////////////
    // Register dye group
    ////////////////////////////////////////////////////////////

    @Register.itemGroup("DyeGroup", { ...DyeGroup })
    public itemDyeGroup: ItemTypeGroup;


    ////////////////////////////////////////////////////////////
    // Register dyes
    ////////////////////////////////////////////////////////////

    @Register.item("WhiteDye", { ...WhiteDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemWhiteDye: ItemType;
    @Register.doodad("WhiteDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteDye')] })
    public doodadWhiteDye: DoodadType;

    @Register.item("BlackDye", { ...BlackDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemBlackDye: ItemType;
    @Register.doodad("BlackDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemBlackDye')] })
    public doodadBlackDye: DoodadType;

    @Register.item("RedDye", { ...RedDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemRedDye: ItemType;
    @Register.doodad("RedDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemRedDye')] })
    public doodadRedDye: DoodadType;

    @Register.item("YellowDye", { ...YellowDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemYellowDye: ItemType;
    @Register.doodad("YellowDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemYellowDye')] })
    public doodadYellowDye: DoodadType;

    @Register.item("BlueDye", { ...BlueDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemBlueDye: ItemType;
    @Register.doodad("BlueDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemBlueDye')] })
    public doodadBlueDye: DoodadType;

    @Register.item("OrangeDye", { ...OrangeDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemOrangeDye: ItemType;
    @Register.doodad("OrangeDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeDye')] })
    public doodadOrangeDye: DoodadType;

    @Register.item("GreenDye", { ...GreenDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemGreenDye: ItemType;
    @Register.doodad("GreenDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemGreenDye')] })
    public doodadGreenDye: DoodadType;

    @Register.item("PurpleDye", { ...PurpleDyeDescription, groups: [Registry<ColorsEverywhere>().get('itemDyeGroup')] })
    public itemPurpleDye: ItemType;
    @Register.doodad("PurpleDye", { ...BaseStatsDoodadDye, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleDye')] })
    public doodadPurpleDye: DoodadType;
    

    ////////////////////////////////////////////////////////////
    // Register tools - W,B,R,Y,B,O,G,P
    ////////////////////////////////////////////////////////////

    @Register.item("StoneBowl", { ...StoneBowlDescription })
    public itemStoneBowl: ItemType;

    @Register.item("DyeRemover", { ...DyeRemoverDescription })
    public itemDyeRemover: ItemType;

    @Register.item("Paintbrush", { ...PaintbrushDescription })
    public itemPaintbrush: ItemType;

    @Register.item("WhitePaintbrush", { ...WhitePaintbrushDescription })
    public itemWhitePaintbrush: ItemType;

    @Register.item("BlackPaintbrush", { ...BlackPaintbrushDescription })
    public itemBlackPaintbrush: ItemType;

    @Register.item("RedPaintbrush", { ...RedPaintbrushDescription })
    public itemRedPaintbrush: ItemType;

    @Register.item("YellowPaintbrush", { ...YellowPaintbrushDescription })
    public itemYellowPaintbrush: ItemType;

    @Register.item("BluePaintbrush", { ...BluePaintbrushDescription })
    public itemBluePaintbrush: ItemType;

    @Register.item("OrangePaintbrush", { ...OrangePaintbrushDescription })
    public itemOrangePaintbrush: ItemType;

    @Register.item("GreenPaintbrush", { ...GreenPaintbrushDescription })
    public itemGreenPaintbrush: ItemType;

    @Register.item("PurplePaintbrush", { ...PurplePaintbrushDescription })
    public itemPurplePaintbrush: ItemType;


    ////////////////////////////////////////////////////////////
    // Register doodads - W,B,R,Y,B,O,G,P
    ////////////////////////////////////////////////////////////
    
    @Register.item("WhiteWoodenChest", { ... WhiteWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteWoodenChest: ItemType;
    @Register.doodad("WhiteWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteWoodenChest')] })
    public doodadWhiteWoodenChest: DoodadType;

    @Register.item("BlackWoodenChest", { ... BlackWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackWoodenChest: ItemType;
    @Register.doodad("BlackWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackWoodenChest')] })
    public doodadBlackWoodenChest: DoodadType;

    @Register.item("RedWoodenChest", { ... RedWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedWoodenChest: ItemType;
    @Register.doodad("RedWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedWoodenChest')] })
    public doodadRedWoodenChest: DoodadType;

    @Register.item("YellowWoodenChest", { ... YellowWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowWoodenChest: ItemType;
    @Register.doodad("YellowWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowWoodenChest')] })
    public doodadYellowWoodenChest: DoodadType;

    @Register.item("BlueWoodenChest", { ... BlueWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueWoodenChest: ItemType;
    @Register.doodad("BlueWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueWoodenChest')] })
    public doodadBlueWoodenChest: DoodadType;

    @Register.item("OrangeWoodenChest", { ... OrangeWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeWoodenChest: ItemType;
    @Register.doodad("OrangeWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeWoodenChest')] })
    public doodadOrangeWoodenChest: DoodadType;

    @Register.item("GreenWoodenChest", { ... GreenWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenWoodenChest: ItemType;
    @Register.doodad("GreenWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenWoodenChest')] })
    public doodadGreenWoodenChest: DoodadType;

    @Register.item("PurpleWoodenChest", { ... PurpleWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleWoodenChest: ItemType;
    @Register.doodad("PurpleWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleWoodenChest')] })
    public doodadPurpleWoodenChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteCopperChest", { ... WhiteCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteCopperChest: ItemType;
    @Register.doodad("WhiteCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteCopperChest')] })
    public doodadWhiteCopperChest: DoodadType;

    @Register.item("BlackCopperChest", { ... BlackCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackCopperChest: ItemType;
    @Register.doodad("BlackCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackCopperChest')] })
    public doodadBlackCopperChest: DoodadType;

    @Register.item("RedCopperChest", { ... RedCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedCopperChest: ItemType;
    @Register.doodad("RedCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedCopperChest')] })
    public doodadRedCopperChest: DoodadType;

    @Register.item("YellowCopperChest", { ... YellowCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowCopperChest: ItemType;
    @Register.doodad("YellowCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowCopperChest')] })
    public doodadYellowCopperChest: DoodadType;

    @Register.item("BlueCopperChest", { ... BlueCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueCopperChest: ItemType;
    @Register.doodad("BlueCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueCopperChest')] })
    public doodadBlueCopperChest: DoodadType;

    @Register.item("OrangeCopperChest", { ... OrangeCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeCopperChest: ItemType;
    @Register.doodad("OrangeCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeCopperChest')] })
    public doodadOrangeCopperChest: DoodadType;

    @Register.item("GreenCopperChest", { ... GreenCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenCopperChest: ItemType;
    @Register.doodad("GreenCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenCopperChest')] })
    public doodadGreenCopperChest: DoodadType;

    @Register.item("PurpleCopperChest", { ... PurpleCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleCopperChest: ItemType;
    @Register.doodad("PurpleCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleCopperChest')] })
    public doodadPurpleCopperChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteWroughtIronChest", { ... WhiteWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteWroughtIronChest: ItemType;
    @Register.doodad("WhiteWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteWroughtIronChest')] })
    public doodadWhiteWroughtIronChest: DoodadType;

    @Register.item("BlackWroughtIronChest", { ... BlackWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackWroughtIronChest: ItemType;
    @Register.doodad("BlackWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackWroughtIronChest')] })
    public doodadBlackWroughtIronChest: DoodadType;

    @Register.item("RedWroughtIronChest", { ... RedWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedWroughtIronChest: ItemType;
    @Register.doodad("RedWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedWroughtIronChest')] })
    public doodadRedWroughtIronChest: DoodadType;

    @Register.item("YellowWroughtIronChest", { ... YellowWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowWroughtIronChest: ItemType;
    @Register.doodad("YellowWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowWroughtIronChest')] })
    public doodadYellowWroughtIronChest: DoodadType;

    @Register.item("BlueWroughtIronChest", { ... BlueWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueWroughtIronChest: ItemType;
    @Register.doodad("BlueWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueWroughtIronChest')] })
    public doodadBlueWroughtIronChest: DoodadType;

    @Register.item("OrangeWroughtIronChest", { ... OrangeWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeWroughtIronChest: ItemType;
    @Register.doodad("OrangeWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeWroughtIronChest')] })
    public doodadOrangeWroughtIronChest: DoodadType;

    @Register.item("GreenWroughtIronChest", { ... GreenWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenWroughtIronChest: ItemType;
    @Register.doodad("GreenWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenWroughtIronChest')] })
    public doodadGreenWroughtIronChest: DoodadType;

    @Register.item("PurpleWroughtIronChest", { ... PurpleWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleWroughtIronChest: ItemType;
    @Register.doodad("PurpleWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleWroughtIronChest')] })
    public doodadPurpleWroughtIronChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteIronChest", { ... WhiteIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteIronChest: ItemType;
    @Register.doodad("WhiteIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemWhiteIronChest')] })
    public doodadWhiteIronChest: DoodadType;

    @Register.item("BlackIronChest", { ... BlackIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackIronChest: ItemType;
    @Register.doodad("BlackIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlackIronChest')] })
    public doodadBlackIronChest: DoodadType;

    @Register.item("RedIronChest", { ... RedIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedIronChest: ItemType;
    @Register.doodad("RedIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemRedIronChest')] })
    public doodadRedIronChest: DoodadType;

    @Register.item("YellowIronChest", { ... YellowIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowIronChest: ItemType;
    @Register.doodad("YellowIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemYellowIronChest')] })
    public doodadYellowIronChest: DoodadType;

    @Register.item("BlueIronChest", { ... BlueIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueIronChest: ItemType;
    @Register.doodad("BlueIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemBlueIronChest')] })
    public doodadBlueIronChest: DoodadType;

    @Register.item("OrangeIronChest", { ... OrangeIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeIronChest: ItemType;
    @Register.doodad("OrangeIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemOrangeIronChest')] })
    public doodadOrangeIronChest: DoodadType;

    @Register.item("GreenIronChest", { ... GreenIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenIronChest: ItemType;
    @Register.doodad("GreenIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemGreenIronChest')] })
    public doodadGreenIronChest: DoodadType;

    @Register.item("PurpleIronChest", { ... PurpleIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleIronChest: ItemType;
    @Register.doodad("PurpleIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<ColorsEverywhere>().get('itemPurpleIronChest')] })
    public doodadPurpleIronChest: DoodadType;

    // ----------------------------------------

    @Register.item("WhiteStoneWall", { ... WhiteStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemWhiteStoneWall: ItemType;
    @Register.doodad("WhiteStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemWhiteStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemWhiteStoneWall')] })
    public doodadWhiteStoneWall: DoodadType;

    @Register.item("BlackStoneWall", { ... BlackStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemBlackStoneWall: ItemType;
    @Register.doodad("BlackStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemBlackStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemBlackStoneWall')] })
    public doodadBlackStoneWall: DoodadType;

    @Register.item("RedStoneWall", { ... RedStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemRedStoneWall: ItemType;
    @Register.doodad("RedStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemRedStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemRedStoneWall')] })
    public doodadRedStoneWall: DoodadType;

    @Register.item("YellowStoneWall", { ... YellowStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemYellowStoneWall: ItemType;
    @Register.doodad("YellowStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemYellowStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemYellowStoneWall')] })
    public doodadYellowStoneWall: DoodadType;

    @Register.item("BlueStoneWall", { ... BlueStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemBlueStoneWall: ItemType;
    @Register.doodad("BlueStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemBlueStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemBlueStoneWall')] })
    public doodadBlueStoneWall: DoodadType;

    @Register.item("OrangeStoneWall", { ... OrangeStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemOrangeStoneWall: ItemType;
    @Register.doodad("OrangeStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemOrangeStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemOrangeStoneWall')] })
    public doodadOrangeStoneWall: DoodadType;

    @Register.item("GreenStoneWall", { ... GreenStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemGreenStoneWall: ItemType;
    @Register.doodad("GreenStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemGreenStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemGreenStoneWall')] })
    public doodadGreenStoneWall: DoodadType;

    @Register.item("PurpleStoneWall", { ... PurpleStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemPurpleStoneWall: ItemType;
    @Register.doodad("PurpleStoneWall", { ...BaseStatsDoodadStoneWall, repairItem: Registry<ColorsEverywhere>().get('itemPurpleStoneWall'), pickUp: [Registry<ColorsEverywhere>().get('itemPurpleStoneWall')] })
    public doodadPurpleStoneWall: DoodadType;


    ////////////////////////////////////////////////////////////
    // Register terrains
    ////////////////////////////////////////////////////////////

    @Register.item("WhiteCobblestoneFlooring", { ... WhiteCobblestoneFlooringDescription })
    public itemWhiteCobblestoneFlooring: ItemType;
    @Register.terrain("WhiteCobblestoneFlooring", { ... WhiteCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteCobblestoneFlooring: TerrainType;

    @Register.item("BlackCobblestoneFlooring", { ... BlackCobblestoneFlooringDescription })
    public itemBlackCobblestoneFlooring: ItemType;
    @Register.terrain("BlackCobblestoneFlooring", { ... BlackCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackCobblestoneFlooring: TerrainType;

    @Register.item("RedCobblestoneFlooring", { ... RedCobblestoneFlooringDescription })
    public itemRedCobblestoneFlooring: ItemType;
    @Register.terrain("RedCobblestoneFlooring", { ... RedCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedCobblestoneFlooring: TerrainType;

    @Register.item("YellowCobblestoneFlooring", { ... YellowCobblestoneFlooringDescription })
    public itemYellowCobblestoneFlooring: ItemType;
    @Register.terrain("YellowCobblestoneFlooring", { ... YellowCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowCobblestoneFlooring: TerrainType;

    @Register.item("BlueCobblestoneFlooring", { ... BlueCobblestoneFlooringDescription })
    public itemBlueCobblestoneFlooring: ItemType;
    @Register.terrain("BlueCobblestoneFlooring", { ... BlueCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueCobblestoneFlooring: TerrainType;

    @Register.item("OrangeCobblestoneFlooring", { ... OrangeCobblestoneFlooringDescription })
    public itemOrangeCobblestoneFlooring: ItemType;
    @Register.terrain("OrangeCobblestoneFlooring", { ... OrangeCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeCobblestoneFlooring: TerrainType;

    @Register.item("GreenCobblestoneFlooring", { ... GreenCobblestoneFlooringDescription })
    public itemGreenCobblestoneFlooring: ItemType;
    @Register.terrain("GreenCobblestoneFlooring", { ... GreenCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenCobblestoneFlooring: TerrainType;

    @Register.item("PurpleCobblestoneFlooring", { ... PurpleCobblestoneFlooringDescription })
    public itemPurpleCobblestoneFlooring: ItemType;
    @Register.terrain("PurpleCobblestoneFlooring", { ... PurpleCobblestoneFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainPurpleCobblestoneFlooring: TerrainType;

    // ----------------------------------------

    @Register.item("WhiteWoodenFlooring", { ... WhiteWoodenFlooringDescription })
    public itemWhiteWoodenFlooring: ItemType;
    @Register.terrain("WhiteWoodenFlooring", { ... WhiteWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteWoodenFlooring: TerrainType;

    @Register.item("BlackWoodenFlooring", { ... BlackWoodenFlooringDescription })
    public itemBlackWoodenFlooring: ItemType;
    @Register.terrain("BlackWoodenFlooring", { ... BlackWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackWoodenFlooring: TerrainType;

    @Register.item("RedWoodenFlooring", { ... RedWoodenFlooringDescription })
    public itemRedWoodenFlooring: ItemType;
    @Register.terrain("RedWoodenFlooring", { ... RedWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedWoodenFlooring: TerrainType;

    @Register.item("YellowWoodenFlooring", { ... YellowWoodenFlooringDescription })
    public itemYellowWoodenFlooring: ItemType;
    @Register.terrain("YellowWoodenFlooring", { ... YellowWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowWoodenFlooring: TerrainType;

    @Register.item("BlueWoodenFlooring", { ... BlueWoodenFlooringDescription })
    public itemBlueWoodenFlooring: ItemType;
    @Register.terrain("BlueWoodenFlooring", { ... BlueWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueWoodenFlooring: TerrainType;

    @Register.item("OrangeWoodenFlooring", { ... OrangeWoodenFlooringDescription })
    public itemOrangeWoodenFlooring: ItemType;
    @Register.terrain("OrangeWoodenFlooring", { ... OrangeWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeWoodenFlooring: TerrainType;

    @Register.item("GreenWoodenFlooring", { ... GreenWoodenFlooringDescription })
    public itemGreenWoodenFlooring: ItemType;
    @Register.terrain("GreenWoodenFlooring", { ... GreenWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenWoodenFlooring: TerrainType;

    @Register.item("PurpleWoodenFlooring", { ... PurpleWoodenFlooringDescription })
    public itemPurpleWoodenFlooring: ItemType;
    @Register.terrain("PurpleWoodenFlooring", { ... PurpleWoodenFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainPurpleWoodenFlooring: TerrainType;

    // ----------------------------------------

    @Register.item("WhiteClayFlooring", { ... WhiteClayFlooringDescription })
    public itemWhiteClayFlooring: ItemType;
    @Register.terrain("WhiteClayFlooring", { ... WhiteClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteClayFlooring: TerrainType;

    @Register.item("BlackClayFlooring", { ... BlackClayFlooringDescription })
    public itemBlackClayFlooring: ItemType;
    @Register.terrain("BlackClayFlooring", { ... BlackClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackClayFlooring: TerrainType;

    @Register.item("RedClayFlooring", { ... RedClayFlooringDescription })
    public itemRedClayFlooring: ItemType;
    @Register.terrain("RedClayFlooring", { ... RedClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedClayFlooring: TerrainType;

    @Register.item("YellowClayFlooring", { ... YellowClayFlooringDescription })
    public itemYellowClayFlooring: ItemType;
    @Register.terrain("YellowClayFlooring", { ... YellowClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowClayFlooring: TerrainType;

    @Register.item("BlueClayFlooring", { ... BlueClayFlooringDescription })
    public itemBlueClayFlooring: ItemType;
    @Register.terrain("BlueClayFlooring", { ... BlueClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueClayFlooring: TerrainType;

    @Register.item("OrangeClayFlooring", { ... OrangeClayFlooringDescription })
    public itemOrangeClayFlooring: ItemType;
    @Register.terrain("OrangeClayFlooring", { ... OrangeClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeClayFlooring: TerrainType;

    @Register.item("GreenClayFlooring", { ... GreenClayFlooringDescription })
    public itemGreenClayFlooring: ItemType;
    @Register.terrain("GreenClayFlooring", { ... GreenClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenClayFlooring: TerrainType;

    @Register.item("PurpleClayFlooring", { ... PurpleClayFlooringDescription })
    public itemPurpleClayFlooring: ItemType;
    @Register.terrain("PurpleClayFlooring", { ... PurpleClayFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainPurpleClayFlooring: TerrainType;

    // ----------------------------------------

    @Register.item("WhiteAshCementFlooring", { ... WhiteAshCementFlooringDescription })
    public itemWhiteAshCementFlooring: ItemType;
    @Register.terrain("WhiteAshCementFlooring", { ... WhiteAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainWhiteAshCementFlooring: TerrainType;

    @Register.item("BlackAshCementFlooring", { ... BlackAshCementFlooringDescription })
    public itemBlackAshCementFlooring: ItemType;
    @Register.terrain("BlackAshCementFlooring", { ... BlackAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlackAshCementFlooring: TerrainType;

    @Register.item("RedAshCementFlooring", { ... RedAshCementFlooringDescription })
    public itemRedAshCementFlooring: ItemType;
    @Register.terrain("RedAshCementFlooring", { ... RedAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainRedAshCementFlooring: TerrainType;

    @Register.item("YellowAshCementFlooring", { ... YellowAshCementFlooringDescription })
    public itemYellowAshCementFlooring: ItemType;
    @Register.terrain("YellowAshCementFlooring", { ... YellowAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainYellowAshCementFlooring: TerrainType;

    @Register.item("BlueAshCementFlooring", { ... BlueAshCementFlooringDescription })
    public itemBlueAshCementFlooring: ItemType;
    @Register.terrain("BlueAshCementFlooring", { ... BlueAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainBlueAshCementFlooring: TerrainType;

    @Register.item("OrangeAshCementFlooring", { ... OrangeAshCementFlooringDescription })
    public itemOrangeAshCementFlooring: ItemType;
    @Register.terrain("OrangeAshCementFlooring", { ... OrangeAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainOrangeAshCementFlooring: TerrainType;

    @Register.item("GreenAshCementFlooring", { ... GreenAshCementFlooringDescription })
    public itemGreenAshCementFlooring: ItemType;
    @Register.terrain("GreenAshCementFlooring", { ... GreenAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
    public terrainGreenAshCementFlooring: TerrainType;

    @Register.item("PurpleAshCementFlooring", { ... PurpleAshCementFlooringDescription })
    public itemPurpleAshCementFlooring: ItemType;
    @Register.terrain("PurpleAshCementFlooring", { ... PurpleAshCementFlooringTerrainDescription, group: [TerrainTypeGroup.Flooring] })
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

    public getTerrainList(): TerrainType[] {
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

    public getDoodadList(): DoodadType[] {
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
            this.doodadWhiteStoneWall,
            this.doodadBlackStoneWall,
            this.doodadRedStoneWall,
            this.doodadYellowStoneWall,
            this.doodadBlueStoneWall,
            this.doodadOrangeStoneWall,
            this.doodadGreenStoneWall,
            this.doodadPurpleStoneWall
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

            const doodadTypeList = ColorsEverywhere.INSTANCE.getDoodadList();
            const terrainTypeList = ColorsEverywhere.INSTANCE.getTerrainList();

            const itemName = item.getName(false,1,false,false).toString();
            const itemSplitName = itemName.split(' ').shift();
            let itemColorName = itemSplitName ? itemSplitName : '';

            function usePaintAction(color: string, doodadType?: DoodadType, terrainType?: TerrainType) {

                const colorName = color.charAt(0).toUpperCase() + color.slice(1);
                let keyName: string | undefined;

                if (doodadType) { 
                    const doodadKeys = Enums.toString(DoodadType, doodadType);
                    keyName = doodadKeys.split(" | ").pop();
                }
                if (terrainType) {
                    const terrainKeys = Enums.toString(TerrainType, terrainType);
                    keyName = terrainKeys.split(" | ").pop();
                }
                

                // Can't paint it the same color
                if (keyName?.includes(colorName)) { 
                    player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoSameColor);
                    return;
                }

                // Painting over the paint
                if (keyName?.includes('ModColorsEverywhere')) { 
                    const removedModName = keyName.replace('ModColorsEverywhere', '');
                    const colorArray = ['White', 'Black', 'Red', 'Yellow', 'Blue', 'Orange', 'Green', 'Purple'];
                    colorArray.forEach( val => {
                        if (keyName?.includes(val)) { 
                            keyName = removedModName.replace(val, '')
                        }
                    })
                }

                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, particleColor(color));

                if (doodadType) {
                    const name = `doodad${colorName}${keyName}` as keyof ColorsEverywhere;
                    const changedTypeName = ColorsEverywhere.INSTANCE[name] as DoodadType;
                    tileDoodad?.changeType(changedTypeName);
                }

                if (terrainType) {
                    const name = `terrain${colorName}${keyName}` as keyof ColorsEverywhere;
                    const changedTypeName = ColorsEverywhere.INSTANCE[name] as TerrainType;
                    game.changeTile(changedTypeName, tilePosition.x, tilePosition.y, tilePosition.z, false)
                }

                item.returns();

            }

            if (tileDoodad || tileTerrain) {
                if (tileDoodad && doodadTypeList.includes(tileDoodad.type)) {
                    usePaintAction(itemColorName, tileDoodad?.type);
                }
                if (tileTerrain && terrainTypeList.includes(tileTerrain)) {
                    usePaintAction(itemColorName, undefined, tileTerrain);
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

            function useRemovePaintAction(doodadType?: DoodadType, terrainType?: TerrainType) {

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
                    colorArray.forEach( val => {
                        if (keyName?.includes(val)) { 
                            keyName = removedModName.replace(val, '')
                        }
                    })
                }

                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, particleColor('white'));

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

            function cleanIt() {
                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, particleColor('blue'));
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

            if (tileDoodad?.type !== ColorsEverywhere.INSTANCE.doodadRedDye) {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeSource);
            } else {
                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, particleColor('red'));
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
    
    @Override public onLoad() {

        // Milk Thistle

        this.milkThistleOrig = itemDescriptions[ItemType.MilkThistleFlowers];
        const milkThistle = itemDescriptions[ItemType.MilkThistleFlowers];

        if (milkThistle && milkThistle.dismantle === undefined) {
            milkThistle.dismantle = {
                items: [{
                    type: this.itemPurplePigment,
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

    @Override public onUnload() {
        itemDescriptions[ItemType.MilkThistleFlowers] = this.milkThistleOrig;
        itemDescriptions[ItemType.LeatherTunic] = this.leatherTunicOrig;
    }

    @Override @HookMethod
	public onGameStart(isLoadingSave: boolean, playedCount: number): void {
		if (!isLoadingSave) {
            localPlayer.createItemInInventory(ItemType.IronHoe);
            localPlayer.createItemInInventory(this.itemCornflower);
            localPlayer.createItemInInventory(this.itemCornflowerSeeds);
            localPlayer.createItemInInventory(this.itemRose);
            localPlayer.createItemInInventory(this.itemRoseSeeds);
            localPlayer.createItemInInventory(this.itemSunflower);
            localPlayer.createItemInInventory(this.itemSunflowerSeeds);
            localPlayer.createItemInInventory(this.itemRedPigment);
            localPlayer.createItemInInventory(this.itemBluePigment);
            localPlayer.createItemInInventory(this.itemYellowPigment);
            localPlayer.createItemInInventory(ItemType.ClayMortarAndPestle);
            localPlayer.createItemInInventory(ItemType.MilkThistleFlowers);
            localPlayer.createItemInInventory(ItemType.ClayJugOfUnpurifiedFreshWater);
            localPlayer.createItemInInventory(ItemType.LargeRock);
            localPlayer.createItemInInventory(ItemType.LeatherTunic);
            localPlayer.createItemInInventory(this.itemRedPaintbrush);
            localPlayer.createItemInInventory(this.itemYellowPaintbrush);
            localPlayer.createItemInInventory(this.itemWhitePaintbrush);
            localPlayer.createItemInInventory(this.itemBlackPaintbrush);
            localPlayer.createItemInInventory(this.itemOrangePaintbrush);
            localPlayer.createItemInInventory(this.itemBluePaintbrush);
            localPlayer.createItemInInventory(this.itemPurplePaintbrush);
            localPlayer.createItemInInventory(ItemType.LeatherTunic, Quality.Exceptional);
            localPlayer.createItemInInventory(this.itemGreenPaintbrush, Quality.Exceptional);
            localPlayer.createItemInInventory(ItemType.Ectoplasm);
            localPlayer.createItemInInventory(ItemType.StoneWall);
            localPlayer.createItemInInventory(ItemType.StoneWall);
            localPlayer.createItemInInventory(this.itemRedLeatherTunic);
            localPlayer.createItemInInventory(this.itemWhiteStoneWall);
            localPlayer.createItemInInventory(this.itemWhiteStoneWall);
            localPlayer.createItemInInventory(this.itemWhiteStoneWall);
            localPlayer.createItemInInventory(this.itemRedDye);
            localPlayer.createItemInInventory(this.itemWhiteDye);
            localPlayer.createItemInInventory(this.itemPurpleDye);
            localPlayer.createItemInInventory(this.itemWhiteCobblestoneFlooring);
		}
	}


}
