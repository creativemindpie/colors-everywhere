import { DoodadType } from "doodad/IDoodad";
import { Action } from "entity/action/Action";
import { ActionArgument, ActionType } from "entity/action/IAction";
import { EntityType } from "entity/IEntity";
import { SkillType } from "entity/IHuman";
import { Source } from "entity/player/IMessageManager";
import { IItemDescription, ItemType, ItemTypeGroup } from "item/IItem";
import { itemDescriptions } from "item/Items";
import Message from "language/dictionary/Message";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import Register, { Registry } from "mod/ModRegistry";
import { TerrainType } from "tile/ITerrain";
import { BlackDyeDescription, BlueDyeDescription, GreenDyeDescription, OrangeDyeDescription, PurpleDyeDescription, RedDyeDescription, WhiteDyeDescription, YellowDyeDescription } from "./dyes/Dyes";
import { CornflowerDescription, CornflowerSeedsDescription, CornflowerDoodadDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { BlackPigmentIngredientGroup, BluePigmentIngredientGroup, RedPigmentIngredientGroup, WhitePigmentIngredientGroup, YellowPigmentIngredientGroup } from "./pigments/PigmentGroups";
import { BlackPigmentDescription, BluePigmentDescription, GreenPigmentDescription, OrangePigmentDescription, PurplePigmentDescription, RedPigmentDescription, WhitePigmentDescription, YellowPigmentDescription } from "./pigments/Pigments";
import { BlackPaintbrushDescription, BluePaintbrushDescription, DyeRemoverDescription, GreenPaintbrushDescription, OrangePaintbrushDescription, PaintbrushDescription, PurplePaintbrushDescription, RedPaintbrushDescription, StoneBowlDescription, WhitePaintbrushDescription, YellowPaintbrushDescription } from "./tools/Tools";
import TileHelpers from "utilities/TileHelpers";
import { BlackCopperChestDescription, BlackIronChestDescription, BlackStoneWallDescription, BlackWoodenChestDescription, BlackWroughtIronChestDescription, BlueCopperChestDescription, BlueIronChestDescription, BlueStoneWallDescription, BlueWoodenChestDescription, BlueWroughtIronChestDescription, GreenCopperChestDescription, GreenIronChestDescription, GreenStoneWallDescription, GreenWoodenChestDescription, GreenWroughtIronChestDescription, OrangeCopperChestDescription, OrangeIronChestDescription, OrangeStoneWallDescription, OrangeWoodenChestDescription, OrangeWroughtIronChestDescription, PurpleCopperChestDescription, PurpleIronChestDescription, PurpleStoneWallDescription, PurpleWoodenChestDescription, PurpleWroughtIronChestDescription, RedCopperChestDescription, RedIronChestDescription, RedStoneWallDescription, RedWoodenChestDescription, RedWroughtIronChestDescription, WhiteCopperChestDescription, WhiteIronChestDescription, WhiteStoneWallDescription, WhiteWoodenChestDescription, WhiteWroughtIronChestDescription, YellowCopperChestDescription, YellowIronChestDescription, YellowStoneWallDescription, YellowWoodenChestDescription, YellowWroughtIronChestDescription } from "./doodads/Doodads";
import { BaseStatsDoodadCopperChest, BaseStatsDoodadIronChest, BaseStatsDoodadStoneWall, BaseStatsDoodadWoodenChest, BaseStatsDoodadWroughtIronChest } from "./doodads/BaseDoodad";
import Enums from "utilities/enum/Enums";
import { particleColor } from "./utils/Utils";
import { Quality } from "game/IObject";


export default class PigmentDye extends Mod {

    @Mod.instance<PigmentDye>("Pigment Dye")
    public static readonly INSTANCE: PigmentDye;


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
    // Register dyes
    ////////////////////////////////////////////////////////////

    @Register.item("WhiteDye", { ...WhiteDyeDescription })
    public itemWhiteDye: ItemType;

    @Register.item("BlackDye", { ...BlackDyeDescription })
    public itemBlackDye: ItemType;

    @Register.item("RedDye", { ...RedDyeDescription })
    public itemRedDye: ItemType;

    @Register.item("YellowDye", { ...YellowDyeDescription })
    public itemYellowDye: ItemType;

    @Register.item("BlueDye", { ...BlueDyeDescription })
    public itemBlueDye: ItemType;

    @Register.item("OrangeDye", { ...OrangeDyeDescription })
    public itemOrangeDye: ItemType;

    @Register.item("GreenDye", { ...GreenDyeDescription })
    public itemGreenDye: ItemType;

    @Register.item("PurpleDye", { ...PurpleDyeDescription })
    public itemPurpleDye: ItemType;
    

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
    @Register.doodad("WhiteWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemWhiteWoodenChest')] })
    public doodadWhiteWoodenChest: DoodadType;

    @Register.item("BlackWoodenChest", { ... BlackWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackWoodenChest: ItemType;
    @Register.doodad("BlackWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemBlackWoodenChest')] })
    public doodadBlackWoodenChest: DoodadType;

    @Register.item("RedWoodenChest", { ... RedWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedWoodenChest: ItemType;
    @Register.doodad("RedWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemRedWoodenChest')] })
    public doodadRedWoodenChest: DoodadType;

    @Register.item("YellowWoodenChest", { ... YellowWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowWoodenChest: ItemType;
    @Register.doodad("YellowWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemYellowWoodenChest')] })
    public doodadYellowWoodenChest: DoodadType;

    @Register.item("BlueWoodenChest", { ... BlueWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueWoodenChest: ItemType;
    @Register.doodad("BlueWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemBlueWoodenChest')] })
    public doodadBlueWoodenChest: DoodadType;

    @Register.item("OrangeWoodenChest", { ... OrangeWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeWoodenChest: ItemType;
    @Register.doodad("OrangeWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemOrangeWoodenChest')] })
    public doodadOrangeWoodenChest: DoodadType;

    @Register.item("GreenWoodenChest", { ... GreenWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenWoodenChest: ItemType;
    @Register.doodad("GreenWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemGreenWoodenChest')] })
    public doodadGreenWoodenChest: DoodadType;

    @Register.item("PurpleWoodenChest", { ... PurpleWoodenChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleWoodenChest: ItemType;
    @Register.doodad("PurpleWoodenChest", { ...BaseStatsDoodadWoodenChest, pickUp: [Registry<PigmentDye>().get('itemPurpleWoodenChest')] })
    public doodadPurpleWoodenChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteCopperChest", { ... WhiteCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteCopperChest: ItemType;
    @Register.doodad("WhiteCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemWhiteCopperChest')] })
    public doodadWhiteCopperChest: DoodadType;

    @Register.item("BlackCopperChest", { ... BlackCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackCopperChest: ItemType;
    @Register.doodad("BlackCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemBlackCopperChest')] })
    public doodadBlackCopperChest: DoodadType;

    @Register.item("RedCopperChest", { ... RedCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedCopperChest: ItemType;
    @Register.doodad("RedCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemRedCopperChest')] })
    public doodadRedCopperChest: DoodadType;

    @Register.item("YellowCopperChest", { ... YellowCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowCopperChest: ItemType;
    @Register.doodad("YellowCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemYellowCopperChest')] })
    public doodadYellowCopperChest: DoodadType;

    @Register.item("BlueCopperChest", { ... BlueCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueCopperChest: ItemType;
    @Register.doodad("BlueCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemBlueCopperChest')] })
    public doodadBlueCopperChest: DoodadType;

    @Register.item("OrangeCopperChest", { ... OrangeCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeCopperChest: ItemType;
    @Register.doodad("OrangeCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemOrangeCopperChest')] })
    public doodadOrangeCopperChest: DoodadType;

    @Register.item("GreenCopperChest", { ... GreenCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenCopperChest: ItemType;
    @Register.doodad("GreenCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemGreenCopperChest')] })
    public doodadGreenCopperChest: DoodadType;

    @Register.item("PurpleCopperChest", { ... PurpleCopperChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleCopperChest: ItemType;
    @Register.doodad("PurpleCopperChest", { ...BaseStatsDoodadCopperChest, pickUp: [Registry<PigmentDye>().get('itemPurpleCopperChest')] })
    public doodadPurpleCopperChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteWroughtIronChest", { ... WhiteWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteWroughtIronChest: ItemType;
    @Register.doodad("WhiteWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemWhiteWroughtIronChest')] })
    public doodadWhiteWroughtIronChest: DoodadType;

    @Register.item("BlackWroughtIronChest", { ... BlackWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackWroughtIronChest: ItemType;
    @Register.doodad("BlackWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemBlackWroughtIronChest')] })
    public doodadBlackWroughtIronChest: DoodadType;

    @Register.item("RedWroughtIronChest", { ... RedWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedWroughtIronChest: ItemType;
    @Register.doodad("RedWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemRedWroughtIronChest')] })
    public doodadRedWroughtIronChest: DoodadType;

    @Register.item("YellowWroughtIronChest", { ... YellowWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowWroughtIronChest: ItemType;
    @Register.doodad("YellowWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemYellowWroughtIronChest')] })
    public doodadYellowWroughtIronChest: DoodadType;

    @Register.item("BlueWroughtIronChest", { ... BlueWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueWroughtIronChest: ItemType;
    @Register.doodad("BlueWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemBlueWroughtIronChest')] })
    public doodadBlueWroughtIronChest: DoodadType;

    @Register.item("OrangeWroughtIronChest", { ... OrangeWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeWroughtIronChest: ItemType;
    @Register.doodad("OrangeWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemOrangeWroughtIronChest')] })
    public doodadOrangeWroughtIronChest: DoodadType;

    @Register.item("GreenWroughtIronChest", { ... GreenWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenWroughtIronChest: ItemType;
    @Register.doodad("GreenWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemGreenWroughtIronChest')] })
    public doodadGreenWroughtIronChest: DoodadType;

    @Register.item("PurpleWroughtIronChest", { ... PurpleWroughtIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleWroughtIronChest: ItemType;
    @Register.doodad("PurpleWroughtIronChest", { ...BaseStatsDoodadWroughtIronChest, pickUp: [Registry<PigmentDye>().get('itemPurpleWroughtIronChest')] })
    public doodadPurpleWroughtIronChest: DoodadType;

    // ------------------------------------------------------------ //

    @Register.item("WhiteIronChest", { ... WhiteIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemWhiteIronChest: ItemType;
    @Register.doodad("WhiteIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemWhiteIronChest')] })
    public doodadWhiteIronChest: DoodadType;

    @Register.item("BlackIronChest", { ... BlackIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackIronChest: ItemType;
    @Register.doodad("BlackIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemBlackIronChest')] })
    public doodadBlackIronChest: DoodadType;

    @Register.item("RedIronChest", { ... RedIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedIronChest: ItemType;
    @Register.doodad("RedIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemRedIronChest')] })
    public doodadRedIronChest: DoodadType;

    @Register.item("YellowIronChest", { ... YellowIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowIronChest: ItemType;
    @Register.doodad("YellowIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemYellowIronChest')] })
    public doodadYellowIronChest: DoodadType;

    @Register.item("BlueIronChest", { ... BlueIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueIronChest: ItemType;
    @Register.doodad("BlueIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemBlueIronChest')] })
    public doodadBlueIronChest: DoodadType;

    @Register.item("OrangeIronChest", { ... OrangeIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeIronChest: ItemType;
    @Register.doodad("OrangeIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemOrangeIronChest')] })
    public doodadOrangeIronChest: DoodadType;

    @Register.item("GreenIronChest", { ... GreenIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenIronChest: ItemType;
    @Register.doodad("GreenIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemGreenIronChest')] })
    public doodadGreenIronChest: DoodadType;

    @Register.item("PurpleIronChest", { ... PurpleIronChestDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleIronChest: ItemType;
    @Register.doodad("PurpleIronChest", { ...BaseStatsDoodadIronChest, pickUp: [Registry<PigmentDye>().get('itemPurpleIronChest')] })
    public doodadPurpleIronChest: DoodadType;

    // ----------------------------------------

    @Register.item("WhiteStoneWall", { ... WhiteStoneWallDescription, groups: [ItemTypeGroup.Housing] })
    public itemWhiteStoneWall: ItemType;
    @Register.doodad("WhiteStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemWhiteStoneWall')] })
    public doodadWhiteStoneWall: DoodadType;

    @Register.item("BlackStoneWall", { ... BlackStoneWallDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlackStoneWall: ItemType;
    @Register.doodad("BlackStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemBlackStoneWall')] })
    public doodadBlackStoneWall: DoodadType;

    @Register.item("RedStoneWall", { ... RedStoneWallDescription, groups: [ItemTypeGroup.Storage] })
    public itemRedStoneWall: ItemType;
    @Register.doodad("RedStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemRedStoneWall')] })
    public doodadRedStoneWall: DoodadType;

    @Register.item("YellowStoneWall", { ... YellowStoneWallDescription, groups: [ItemTypeGroup.Storage] })
    public itemYellowStoneWall: ItemType;
    @Register.doodad("YellowStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemYellowStoneWall')] })
    public doodadYellowStoneWall: DoodadType;

    @Register.item("BlueStoneWall", { ... BlueStoneWallDescription, groups: [ItemTypeGroup.Storage] })
    public itemBlueStoneWall: ItemType;
    @Register.doodad("BlueStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemBlueStoneWall')] })
    public doodadBlueStoneWall: DoodadType;

    @Register.item("OrangeStoneWall", { ... OrangeStoneWallDescription, groups: [ItemTypeGroup.Storage] })
    public itemOrangeStoneWall: ItemType;
    @Register.doodad("OrangeStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemOrangeStoneWall')] })
    public doodadOrangeStoneWall: DoodadType;

    @Register.item("GreenStoneWall", { ... GreenStoneWallDescription, groups: [ItemTypeGroup.Storage] })
    public itemGreenStoneWall: ItemType;
    @Register.doodad("GreenStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemGreenStoneWall')] })
    public doodadGreenStoneWall: DoodadType;

    @Register.item("PurpleStoneWall", { ... PurpleStoneWallDescription, groups: [ItemTypeGroup.Storage] })
    public itemPurpleStoneWall: ItemType;
    @Register.doodad("PurpleStoneWall", { ...BaseStatsDoodadStoneWall, pickUp: [Registry<PigmentDye>().get('itemPurpleStoneWall')] })
    public doodadPurpleStoneWall: DoodadType;



    ////////////////////////////////////////////////////////////
    // Register messages
    ////////////////////////////////////////////////////////////

    @Register.message("PaintbrushNotDirty")
    public readonly messagePaintbrushNotDirty: Message;
    
    @Register.message("NoWaterSource")
    public readonly messageNoWaterSource: Message;

    @Register.message("NoDyeAllowed")
    public readonly messageNoDyeAllowed: Message;

    @Register.message("NoSameColor")
    public readonly messageNoSameColor: Message;
    

    ////////////////////////////////////////////////////////////
    // Register actions
    ////////////////////////////////////////////////////////////

    public getDoodadList(): DoodadType[] {
        return [
            DoodadType.WoodenChest,
            DoodadType.WroughtIronChest,
            DoodadType.IronChest,
            DoodadType.CopperChest,
            // DoodadType.StoneWall,
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
            this.doodadPurpleIronChest
            /* this.doodadWhiteStoneWall,
            this.doodadBlackStoneWall,
            this.doodadRedStoneWall,
            this.doodadYellowStoneWall,
            this.doodadBlueStoneWall,
            this.doodadOrangeStoneWall,
            this.doodadGreenStoneWall,
            this.doodadPurpleStoneWall */
        ];
      }

    @Register.action("Paint", new Action(ActionArgument.ItemNearby)
		.setUsableBy(EntityType.Player)
		.setHandler((action, item) => {

			const player = action.executor;
			const tile = player.getFacingTile();
            const tileDoodad = tile.doodad;
            const doodadTypeList = PigmentDye.INSTANCE.getDoodadList();
            const itemName = item.getName(false,1,false,false).toString();
            const itemSplitName = itemName.split(' ').shift();
            let itemColorName = itemSplitName ? itemSplitName : '';

            function usePaintAction(doodadType: DoodadType, color: string) {

                const colorName = color.charAt(0).toUpperCase() + color.slice(1);
                const doodadKeys = Enums.toString(DoodadType, doodadType);
                let doodadKeyName = doodadKeys.split(" | ").pop();

                // Can't paint it the same color
                if (doodadKeyName?.includes(colorName)) { 
                    player.messages.source(Source.Action).send(PigmentDye.INSTANCE.messageNoSameColor);
                    return;
                }

                // Painting over the paint
                if (doodadKeyName?.includes('ModPigmentDye')) { 
                    const removedModName = doodadKeyName.replace('ModPigmentDye', '');
                    const colorArray = ['White', 'Black', 'Red', 'Yellow', 'Blue', 'Orange', 'Green', 'Purple'];
                    colorArray.forEach( val => {
                        if (doodadKeyName?.includes(val)) { 
                            doodadKeyName = removedModName.replace(val, '')
                        }
                    })
                }

                const name = `doodad${colorName}${doodadKeyName}` as keyof PigmentDye;
                const changedTypeName = PigmentDye.INSTANCE[name] as DoodadType;

                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, particleColor(color));
                tileDoodad?.changeType(changedTypeName);
                item.returns();

            }

            if (tileDoodad && doodadTypeList.includes(tileDoodad.type)) {
                usePaintAction(tileDoodad?.type, itemColorName);
            } else {
                player.messages.source(Source.Action).send(PigmentDye.INSTANCE.messageNoDyeAllowed);
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
            const tileDoodad = tile.doodad;
            const doodadTypeList = PigmentDye.INSTANCE.getDoodadList();
            // const terrainType = TileHelpers.getType(tile);

            function useRemovePaintAction(doodadType: DoodadType) {

                const doodadKeys = Enums.toString(DoodadType, doodadType);
                let doodadKeyName = doodadKeys.split(" | ").pop();

                // Remove paint
                if (doodadKeyName?.includes('ModPigmentDye')) { 
                    const removedModName = doodadKeyName.replace('ModPigmentDye', '');
                    const colorArray = ['White', 'Black', 'Red', 'Yellow', 'Blue', 'Orange', 'Green', 'Purple'];
                    colorArray.forEach( val => {
                        if (doodadKeyName?.includes(val)) { 
                            doodadKeyName = removedModName.replace(val, '')
                        }
                    })
                }

                const name = `${doodadKeyName}` as keyof typeof DoodadType;
                const changedTypeName = DoodadType[name] as DoodadType;

                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, particleColor('white'));
                tileDoodad?.changeType(changedTypeName);
                item.returns();

            }

            if (tileDoodad && doodadTypeList.includes(tileDoodad.type)) {
                useRemovePaintAction(tileDoodad?.type);
            } else {
                player.messages.source(Source.Action).send(PigmentDye.INSTANCE.messageNoDyeAllowed);
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
            const cleanBrush = PigmentDye.INSTANCE.itemPaintbrush;

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
                    player.messages.source(Source.Action).send(PigmentDye.INSTANCE.messageNoWaterSource);
                }
            }
			game.passTurn(player);
        }))
        
    public readonly actionCleanPaintbrush: ActionType;

    
    ////////////////////////////////////////////////////////////
    // Overrides
    ////////////////////////////////////////////////////////////

    private milkThistleOrig: IItemDescription;
    
    @Override public onLoad() {
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
    }

    @Override public onUnload() {
        itemDescriptions[ItemType.MilkThistleFlowers] = this.milkThistleOrig;
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
            localPlayer.createItemInInventory(this.itemRedPaintbrush);
            localPlayer.createItemInInventory(this.itemYellowPaintbrush);
            localPlayer.createItemInInventory(this.itemWhitePaintbrush);
            localPlayer.createItemInInventory(this.itemBlackPaintbrush);
            localPlayer.createItemInInventory(this.itemOrangePaintbrush);
            localPlayer.createItemInInventory(this.itemBluePaintbrush);
            localPlayer.createItemInInventory(this.itemPurplePaintbrush);
            localPlayer.createItemInInventory(this.itemGreenPaintbrush, Quality.Exceptional);
            localPlayer.createItemInInventory(ItemType.WoodenChest);
            localPlayer.createItemInInventory(ItemType.CopperChest);
            localPlayer.createItemInInventory(ItemType.WroughtIronChest);
            localPlayer.createItemInInventory(ItemType.IronChest);
            localPlayer.createItemInInventory(ItemType.Ectoplasm);
            localPlayer.createItemInInventory(ItemType.StoneWall);
            localPlayer.createItemInInventory(ItemType.StoneWall);
            localPlayer.createItemInInventory(ItemType.StoneWall);
		}
	}


}
