import { DoodadType, DoodadTypeGroup } from "game/doodad/IDoodad";
import { Action } from "game/entity/action/Action";
import { ActionArgument, ActionType } from "game/entity/action/IAction";
import { EntityType } from "game/entity/IEntity";
import { SkillType } from "game/entity/IHuman";
import { Source } from "game/entity/player/IMessageManager";
import { IItemDescription, ItemType, ItemTypeGroup } from "game/item/IItem";
import { itemDescriptions } from "game/item/ItemDescriptions";
import { doodadDescriptions } from "game/doodad/Doodads";
import { TerrainType, TerrainTypeGroup } from "game/tile/ITerrain";
import { Tuple } from "utilities/collection/Tuple";
import { DyeGroup } from "./dyes/DyeGroup";
import { getDoodadDyeDescription, getItemDyeDescription } from "./dyes/Dyes";
import { CornflowerDescription, CornflowerDoodadDescription, CornflowerSeedsDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { Colors, DialogTexts, MOD_NAME } from "./IColorsEverywhere";
import { getPigmentIngredientGroupDescription } from "./pigments/PigmentGroups";
import { getPigmentDescription } from "./pigments/Pigments";
import { DyeRemoverDescription, getItemPaintbrushDescription, PaintbrushDescription, StoneBowlDescription } from "./tools/Tools";
import { rgbColors } from "./utils/Utils";
import { DialogId } from "ui/screen/screens/game/Dialogs";
import { IInput } from "ui/input/IInput";

import Register, { Registry } from "mod/ModRegistry";
import Enums from "utilities/enum/Enums";
import Message from "language/dictionary/Message";
import Mod from "mod/Mod";
import Bindable from "ui/input/Bindable";
import ItemManager from "game/item/ItemManager";
import ColorsEverywhereDialog from "./ColorsEverywhereDialog";
import Dictionary from "language/Dictionary";
import Bind from "ui/input/Bind";
import terrainDescriptions from "game/tile/TerrainResources";

type ItemRegistrations = PickValues<ColorsEverywhere, (ItemType | ItemTypeGroup)[]>;
const itemBulkRegistrations: (keyof ItemRegistrations)[] = [
    "itemPigmentIngredientGroups",
    "itemPigments",
    "itemsDyes",
    "itemsPaintbrushes",
    "itemsWoodenChests",
    "itemsCopperChests",
    "itemsWroughtIronChests",
    "itemsIronChests",
    "itemsTinChests",
    "itemsBronzeChests",
    "itemsOrnateWoodenChests",
    "itemsGraniteWalls",
    "itemsWoodenWalls",
    "itemsWoodenGates",
    "itemsWoodenDoors",
    "itemsWoodenFences",
    "itemsWoodenGates",
    "itemsCobblestoneFlooring",
    "itemsWoodenFlooring",
    "itemsClayFlooring",
    "itemsAshCementFlooring",
    "itemsClayWalls",
    "itemsAshCementWalls",
    "itemsLeatherTunics",
    "itemsLeatherBelts",
    "itemsAnimalPelts",
    "itemsArmoredScaleBelts",
    "itemsArmoredScaleBevors",
    "itemsArmoredScaleBoots",
    "itemsArmoredScaleCrowns",
    "itemsArmoredScaleCuisses",
    "itemsArmoredScaleGloves",
    "itemsArmoredScaleVests",
    "itemsBackpacks",
    "itemsBarkLeggings",
    "itemsBarkShields",
    "itemsBarkTunics",
    "itemsBows",
    "itemsBrambleCrowns",
    "itemsCloaks",
    "itemsClothShirts",
    "itemsClothTrousers",
    "itemsCompositeBows",
    "itemsCordedSlings",
    "itemsFurBoots",
    "itemsFurCoats",
    "itemsFurMittens",
    "itemsLeatherBoots",
    "itemsLeatherCaps",
    "itemsLeatherGloves",
    "itemsLeatherGorgets",
    "itemsLeatherPants",
    "itemsLeatherQuivers",
    "itemsLeatherSlings",
    "itemsLongBows",
    "itemsMageRobes",
    "itemsOrnateCapes",
    "itemsPirateHats",
    "itemsScaleBelts",
    "itemsScaleBevors",
    "itemsScaleBoots",
    "itemsScaleCaps",
    "itemsScaleGloves",
    "itemsScaleLeggings",
    "itemsScaleVests",
    "itemsShortbows",
    "itemsSkullCaps",
    "itemsSmallBags",
    "itemsStrawHats",
    "itemsTinGloves",
    "itemsTinHelmet",
    "itemsTinShield",
    "itemsWoodenShield",
    "itemsWroughtIronBoots",
    "itemsWroughtIronBreastplate",
    "itemsWroughtIronCuisses",
    "itemsWroughtIronGauntlets",
    "itemsWroughtIronGorget",
    "itemsWroughtIronHelmet",
    "itemsWroughtIronShield",
    "itemsBronzeBevor",
    "itemsBronzeBoots",
    "itemsBronzeChestArmor",
    "itemsBronzeGauntlets",
    "itemsBronzeGreaves",
    "itemsBronzeHelmet",
    "itemsBronzeKiteShield",
    "itemsCopperBoots",
    "itemsCopperBuckler",
    "itemsCopperCuirass",
    "itemsCopperGauntlets",
    "itemsCopperGorget",
    "itemsCopperGreaves",
    "itemsIronBoots",
    "itemsIronBreastplate",
    "itemsIronCuisses",
    "itemsIronGauntlets",
    "itemsIronGorget",
    "itemsIronHeater",
    "itemsIronHelmet",
    "itemsTinBevor",
    "itemsTinChausses",
    "itemsTinCuirass",
    "itemsTinFootGear"
];

type DoodadRegistrations = PickValues<ColorsEverywhere, (DoodadType | DoodadTypeGroup)[]>;
const doodadBulkRegistrations: (keyof DoodadRegistrations)[] = [
    "doodadsDyes",
    "doodadsWoodenChests",
    "doodadsCopperChests",
    "doodadsWroughtIronChests",
    "doodadsIronChests",
    "doodadsTinChests",
    "doodadsBronzeChests",
    "doodadsOrnateWoodenChests",
    "doodadsGraniteWalls",
    "doodadsWoodenWalls",
    "doodadsWoodenDoors",
    "doodadsWoodenDoorsOpen",
    "doodadsWoodenFences",
    "doodadsWoodenGates",
    "doodadsWoodenGatesOpen",
    "doodadsClayWalls",
    "doodadsAshCementWalls"
];

type TerrainRegistrations = PickValues<ColorsEverywhere, TerrainType[]>;
const terrainBulkRegistrations: (keyof TerrainRegistrations)[] = [
    "terrainsCobblestoneFlooring",
    "terrainsWoodenFlooring",
    "terrainsClayFlooring",
    "terrainsAshCementFlooring"
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
    // Register chests
    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenChest`, {
            ...itemDescriptions[ItemType.WoodenChest],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenChests", color)} },
            doodadContainer: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsWoodenChests`, color),
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenChests", color),
            groups: [ItemTypeGroup.Storage]
        })))
    public itemsWoodenChests: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenChest`, {
            ...doodadDescriptions[DoodadType.WoodenChest],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenChests", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenChests", color)]
        })))
    public doodadsWoodenChests: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}CopperChest`, {
            ...itemDescriptions[ItemType.CopperChest],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsCopperChests", color)} },
            doodadContainer: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsCopperChests`, color),
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsCopperChests", color),
            groups: [ItemTypeGroup.Storage]
        })))
    public itemsCopperChests: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}CopperChest`, {
            ...doodadDescriptions[DoodadType.CopperChest],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsCopperChests", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsCopperChests", color)]
        })))
    public doodadsCopperChests: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WroughtIronChest`, {
            ...itemDescriptions[ItemType.WroughtIronChest],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWroughtIronChests", color)} },
            doodadContainer: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsWroughtIronChests`, color),
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWroughtIronChests", color),
            groups: [ItemTypeGroup.Storage]
        })))
    public itemsWroughtIronChests: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WroughtIronChest`, {
            ...doodadDescriptions[DoodadType.WroughtIronChest],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWroughtIronChests", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWroughtIronChests", color)]
        })))
    public doodadsWroughtIronChests: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}IronChest`, {
            ...itemDescriptions[ItemType.IronChest],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsIronChests", color)} },
            doodadContainer: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsIronChests`, color),
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsIronChests", color),
            groups: [ItemTypeGroup.Storage]
        })))
    public itemsIronChests: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}IronChest`, {
            ...doodadDescriptions[DoodadType.IronChest],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsIronChests", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsIronChests", color)]
        })))
    public doodadsIronChests: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}TinChest`, {
            ...itemDescriptions[ItemType.TinChest],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsTinChests", color)} },
            doodadContainer: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsTinChests`, color),
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsTinChests", color),
            groups: [ItemTypeGroup.Storage]
        })))
    public itemsTinChests: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}TinChest`, {
            ...doodadDescriptions[DoodadType.TinChest],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsTinChests", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsTinChests", color)]
        })))
    public doodadsTinChests: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}BronzeChest`, {
            ...itemDescriptions[ItemType.BronzeChest],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsBronzeChests", color)} },
            doodadContainer: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsBronzeChests`, color),
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsBronzeChests", color),
            groups: [ItemTypeGroup.Storage]
        })))
    public itemsBronzeChests: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}BronzeChest`, {
            ...doodadDescriptions[DoodadType.BronzeChest],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsBronzeChests", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsBronzeChests", color)]
        })))
    public doodadsBronzeChests: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}OrnateWoodenChest`, {
            ...itemDescriptions[ItemType.OrnateWoodenChest],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsOrnateWoodenChests", color)} },
            doodadContainer: Registry<ColorsEverywhere>(MOD_NAME).get(`doodadsOrnateWoodenChests`, color),
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsOrnateWoodenChests", color),
            groups: [ItemTypeGroup.Storage]
        })))
    public itemsOrnateWoodenChests: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}OrnateWoodenChest`, {
            ...doodadDescriptions[DoodadType.OrnateWoodenChest],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsOrnateWoodenChests", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsOrnateWoodenChests", color)]
        })))
    public doodadsOrnateWoodenChests: DoodadType[];

    ////////////////////////////////////////////////////////////
    // Register walls
    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}GraniteWall`, {
            ...itemDescriptions[ItemType.GraniteWall],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsGraniteWalls", color)} },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsGraniteWalls", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsGraniteWalls: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}GraniteWall`, {
            ...doodadDescriptions[DoodadType.GraniteWall],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsGraniteWalls", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsGraniteWalls", color)]
        })))
    public doodadsGraniteWalls: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}ClayWall`, {
            ...itemDescriptions[ItemType.ClayWall],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsClayWalls", color)} },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsClayWalls", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsClayWalls: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}ClayWall`, {
            ...doodadDescriptions[DoodadType.ClayWall],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsClayWalls", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsClayWalls", color)]
        })))
    public doodadsClayWalls: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}AshCementWall`, {
            ...itemDescriptions[ItemType.AshCementWall],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsAshCementWalls", color)} },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsAshCementWalls", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsAshCementWalls: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}AshCementWall`, {
            ...doodadDescriptions[DoodadType.AshCementWall],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsAshCementWalls", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsAshCementWalls", color)]
        })))
    public doodadsAshCementWalls: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenWall`, {
            ...itemDescriptions[ItemType.WoodenWall],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenWalls", color)} },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenWalls", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsWoodenWalls: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenWall`, {
            ...doodadDescriptions[DoodadType.WoodenWall],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenWalls", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenWalls", color)]
        })))
    public doodadsWoodenWalls: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenGate`, {
            ...itemDescriptions[ItemType.WoodenGate],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenGates", color)} },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenGates", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsWoodenGates: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenGate`, {
            ...doodadDescriptions[DoodadType.WoodenGate],
            doorToggled: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenGatesOpen", color),
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenGates", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenGates", color)]
        })))
    public doodadsWoodenGates: DoodadType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenGateOpen`, {
            ...doodadDescriptions[DoodadType.WoodenGateOpen],
            doorToggled: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenGates", color),
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenGates", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenGates", color)]
        })))
    public doodadsWoodenGatesOpen: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenDoor`, {
            ...itemDescriptions[ItemType.WoodenDoor],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenDoors", color)} },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenDoors", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsWoodenDoors: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenDoor`, {
            ...doodadDescriptions[DoodadType.WoodenDoor],
            doorToggled: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenDoorsOpen", color),
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenDoors", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenDoors", color)]
        })))
    public doodadsWoodenDoors: DoodadType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenDoorOpen`, {
            ...doodadDescriptions[DoodadType.WoodenDoorOpen],
            doorToggled: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenDoors", color),
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenDoors", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenDoors", color)]
        })))
    public doodadsWoodenDoorsOpen: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenFence`, {
            ...itemDescriptions[ItemType.WoodenFence],
            craftable: false,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: {type: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenFences", color)} },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenFences", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsWoodenFences: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenFence`, {
            ...doodadDescriptions[DoodadType.WoodenFence],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenFences", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsWoodenFences", color)]
        })))
    public doodadsWoodenFences: DoodadType[];


    ////////////////////////////////////////////////////////////
    // Register terrains
    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}CobblestoneFlooring`, {
            ...itemDescriptions[ItemType.CobblestoneFlooring],
            craftable: false,
            use: [ActionType.SetDown],
            onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsCobblestoneFlooring`, color) },
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsCobblestoneFlooring: ItemType[];

    @Register.bulk("terrain", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}CobblestoneFlooring`, {
            ...terrainDescriptions[TerrainType.CobblestoneFlooring],
            baseTerrain: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsCobblestoneFlooring`, color),
            terrainType: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsCobblestoneFlooring`, color),
            groups: [TerrainTypeGroup.Flooring],
            resources: [{ type: Registry<ColorsEverywhere>(MOD_NAME).get(`itemsCobblestoneFlooring`, color) }]
        })))
    public terrainsCobblestoneFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenFlooring`, {
            ...itemDescriptions[ItemType.WoodenFlooring],
            craftable: false,
            use: [ActionType.SetDown],
            onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsWoodenFlooring`, color) },
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsWoodenFlooring: ItemType[];

    @Register.bulk("terrain", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenFlooring`, {
            ...terrainDescriptions[TerrainType.WoodenFlooring],
            baseTerrain: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsWoodenFlooring`, color),
            terrainType: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsWoodenFlooring`, color),
            groups: [TerrainTypeGroup.Flooring],
            resources: [{ type: Registry<ColorsEverywhere>(MOD_NAME).get(`itemsWoodenFlooring`, color) }]
        })))
    public terrainsWoodenFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}ClayFlooring`, {
            ...itemDescriptions[ItemType.ClayFlooring],
            craftable: false,
            use: [ActionType.SetDown],
            onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsClayFlooring`, color) },
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsClayFlooring: ItemType[];

    @Register.bulk("terrain", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}ClayFlooring`, {
            ...terrainDescriptions[TerrainType.ClayFlooring],
            baseTerrain: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsClayFlooring`, color),
            terrainType: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsClayFlooring`, color),
            groups: [TerrainTypeGroup.Flooring],
            resources: [{ type: Registry<ColorsEverywhere>(MOD_NAME).get(`itemsClayFlooring`, color) }]
        })))
    public terrainsClayFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}AshCementFlooring`, {
            ...itemDescriptions[ItemType.AshCementFlooring],
            craftable: false,
            use: [ActionType.SetDown],
            onUse: { [ActionType.SetDown]: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsAshCementFlooring`, color) },
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsAshCementFlooring: ItemType[];

    @Register.bulk("terrain", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}AshCementFlooring`, {
            ...terrainDescriptions[TerrainType.AshCementFlooring],
            baseTerrain: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsAshCementFlooring`, color),
            terrainType: Registry<ColorsEverywhere>(MOD_NAME).get(`terrainsAshCementFlooring`, color),
            groups: [TerrainTypeGroup.Flooring],
            resources: [{ type: Registry<ColorsEverywhere>(MOD_NAME).get(`itemsAshCementFlooring`, color) }]
        })))
    public terrainsAshCementFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////
    // Register equipment
    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}LeatherTunic`, {
            ...itemDescriptions[ItemType.LeatherTunic],
            craftable: false,
            use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
            groups: ItemManager.getGroups(ItemType.LeatherTunic)
        })))
    public itemsLeatherTunics: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}LeatherBelt`, {
            ...itemDescriptions[ItemType.LeatherBelt],
            craftable: false,
            use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
            groups: ItemManager.getGroups(ItemType.LeatherBelt)
        })))
    public itemsLeatherBelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}AnimalPelt`, {
        ...itemDescriptions[ItemType.AnimalPelt],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.AnimalPelt)
    })))
    public itemsAnimalPelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleBelt`, {
        ...itemDescriptions[ItemType.ArmoredScaleBelt],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleBelt)
    })))
    public itemsArmoredScaleBelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleBevor`, {
        ...itemDescriptions[ItemType.ArmoredScaleBevor],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleBevor)
    })))
    public itemsArmoredScaleBevors: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleBoots`, {
        ...itemDescriptions[ItemType.ArmoredScaleBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleBoots)
    })))
    public itemsArmoredScaleBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleCrown`, {
        ...itemDescriptions[ItemType.ArmoredScaleCrown],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleCrown)
    })))
    public itemsArmoredScaleCrowns: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleCuisses`, {
        ...itemDescriptions[ItemType.ArmoredScaleCuisses],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleCuisses)
    })))
    public itemsArmoredScaleCuisses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleGloves`, {
        ...itemDescriptions[ItemType.ArmoredScaleGloves],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleGloves)
    })))
    public itemsArmoredScaleGloves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleVest`, {
        ...itemDescriptions[ItemType.ArmoredScaleVest],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleVest)
    })))
    public itemsArmoredScaleVests: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Backpack`, {
        ...itemDescriptions[ItemType.Backpack],
        craftable: false,
        use: [ActionType.OpenContainer, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Backpack)
    })))
    public itemsBackpacks: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BarkLeggings`, {
        ...itemDescriptions[ItemType.BarkLeggings],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BarkLeggings)
    })))
    public itemsBarkLeggings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BarkShield`, {
        ...itemDescriptions[ItemType.BarkShield],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BarkShield)
    })))
    public itemsBarkShields: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BarkTunic`, {
        ...itemDescriptions[ItemType.BarkTunic],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BarkTunic)
    })))
    public itemsBarkTunics: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Bow`, {
        ...itemDescriptions[ItemType.Bow],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Bow)
    })))
    public itemsBows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BrambleCrown`, {
        ...itemDescriptions[ItemType.BrambleCrown],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BrambleCrown)
    })))
    public itemsBrambleCrowns: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Cloak`, {
        ...itemDescriptions[ItemType.Cloak],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Cloak)
    })))
    public itemsCloaks: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ClothShirt`, {
        ...itemDescriptions[ItemType.ClothShirt],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ClothShirt)
    })))
    public itemsClothShirts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ClothTrousers`, {
        ...itemDescriptions[ItemType.ClothTrousers],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ClothTrousers)
    })))
    public itemsClothTrousers: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CompositeBow`, {
        ...itemDescriptions[ItemType.CompositeBow],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CompositeBow)
    })))
    public itemsCompositeBows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CordedSling`, {
        ...itemDescriptions[ItemType.CordedSling],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CordedSling)
    })))
    public itemsCordedSlings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}FurBoots`, {
        ...itemDescriptions[ItemType.FurBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.FurBoots)
    })))
    public itemsFurBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}FurCoat`, {
        ...itemDescriptions[ItemType.FurCoat],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.FurCoat)
    })))
    public itemsFurCoats: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}FurMittens`, {
        ...itemDescriptions[ItemType.FurMittens],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.FurMittens)
    })))
    public itemsFurMittens: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherBoots`, {
        ...itemDescriptions[ItemType.LeatherBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherBoots)
    })))
    public itemsLeatherBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherCap`, {
        ...itemDescriptions[ItemType.LeatherCap],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherCap)
    })))
    public itemsLeatherCaps: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherGloves`, {
        ...itemDescriptions[ItemType.LeatherGloves],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherGloves)
    })))
    public itemsLeatherGloves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherGorget`, {
        ...itemDescriptions[ItemType.LeatherGorget],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherGorget)
    })))
    public itemsLeatherGorgets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherPants`, {
        ...itemDescriptions[ItemType.LeatherPants],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherPants)
    })))
    public itemsLeatherPants: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherQuiver`, {
        ...itemDescriptions[ItemType.LeatherQuiver],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherQuiver)
    })))
    public itemsLeatherQuivers: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherSling`, {
        ...itemDescriptions[ItemType.LeatherSling],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherSling)
    })))
    public itemsLeatherSlings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LongBow`, {
        ...itemDescriptions[ItemType.LongBow],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LongBow)
    })))
    public itemsLongBows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}MageRobe`, {
        ...itemDescriptions[ItemType.MageRobe],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.MageRobe)
    })))
    public itemsMageRobes: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}OrnateCape`, {
        ...itemDescriptions[ItemType.OrnateCape],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.OrnateCape)
    })))
    public itemsOrnateCapes: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}PirateHat`, {
        ...itemDescriptions[ItemType.PirateHat],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.PirateHat)
    })))
    public itemsPirateHats: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleBelt`, {
        ...itemDescriptions[ItemType.ScaleBelt],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleBelt)
    })))
    public itemsScaleBelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleBevor`, {
        ...itemDescriptions[ItemType.ScaleBevor],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleBevor)
    })))
    public itemsScaleBevors: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleBoots`, {
        ...itemDescriptions[ItemType.ScaleBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleBoots)
    })))
    public itemsScaleBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleCap`, {
        ...itemDescriptions[ItemType.ScaleCap],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleCap)
    })))
    public itemsScaleCaps: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleGloves`, {
        ...itemDescriptions[ItemType.ScaleGloves],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleGloves)
    })))
    public itemsScaleGloves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleLeggings`, {
        ...itemDescriptions[ItemType.ScaleLeggings],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleLeggings)
    })))
    public itemsScaleLeggings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleVest`, {
        ...itemDescriptions[ItemType.ScaleVest],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleVest)
    })))
    public itemsScaleVests: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ShortBow`, {
        ...itemDescriptions[ItemType.ShortBow],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ShortBow)
    })))
    public itemsShortbows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Skullcap`, {
        ...itemDescriptions[ItemType.Skullcap],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Skullcap)
    })))
    public itemsSkullCaps: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}SmallBag`, {
        ...itemDescriptions[ItemType.SmallBag],
        craftable: false,
        use: [ActionType.OpenContainer, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.SmallBag)
    })))
    public itemsSmallBags: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}StrawHat`, {
        ...itemDescriptions[ItemType.StrawHat],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.StrawHat)
    })))
    public itemsStrawHats: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinGloves`, {
        ...itemDescriptions[ItemType.TinGloves],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinGloves)
    })))
    public itemsTinGloves: ItemType[];
    
    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinHelmet`, {
        ...itemDescriptions[ItemType.TinHelmet],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinHelmet)
    })))
    public itemsTinHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinShield`, {
        ...itemDescriptions[ItemType.TinShield],
        craftable: false,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinShield)
    })))
    public itemsTinShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WoodenShield`, {
        ...itemDescriptions[ItemType.WoodenShield],
        craftable: false,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WoodenShield)
    })))
    public itemsWoodenShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronBoots`, {
        ...itemDescriptions[ItemType.WroughtIronBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronBoots)
    })))
    public itemsWroughtIronBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronBreastplate`, {
        ...itemDescriptions[ItemType.WroughtIronBreastplate],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronBreastplate)
    })))
    public itemsWroughtIronBreastplate: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronCuisses`, {
        ...itemDescriptions[ItemType.WroughtIronCuisses],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronCuisses)
    })))
    public itemsWroughtIronCuisses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronGauntlets`, {
        ...itemDescriptions[ItemType.WroughtIronGauntlets],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronGauntlets)
    })))
    public itemsWroughtIronGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronGorget`, {
        ...itemDescriptions[ItemType.WroughtIronGorget],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronGorget)
    })))
    public itemsWroughtIronGorget: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronHelmet`, {
        ...itemDescriptions[ItemType.WroughtIronHelmet],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronHelmet)
    })))
    public itemsWroughtIronHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronShield`, {
        ...itemDescriptions[ItemType.WroughtIronShield],
        craftable: false,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronShield)
    })))
    public itemsWroughtIronShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeBevor`, {
        ...itemDescriptions[ItemType.BronzeBevor],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeBevor)
    })))
    public itemsBronzeBevor: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeBoots`, {
        ...itemDescriptions[ItemType.BronzeBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeBoots)
    })))
    public itemsBronzeBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeChestArmor`, {
        ...itemDescriptions[ItemType.BronzeChestArmor],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeChestArmor)
    })))
    public itemsBronzeChestArmor: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeGauntlets`, {
        ...itemDescriptions[ItemType.BronzeGauntlets],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeGauntlets)
    })))
    public itemsBronzeGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeGreaves`, {
        ...itemDescriptions[ItemType.BronzeGreaves],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeGreaves)
    })))
    public itemsBronzeGreaves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeHelmet`, {
        ...itemDescriptions[ItemType.BronzeHelmet],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeHelmet)
    })))
    public itemsBronzeHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeKiteShield`, {
        ...itemDescriptions[ItemType.BronzeKiteShield],
        craftable: false,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeKiteShield)
    })))
    public itemsBronzeKiteShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperBoots`, {
        ...itemDescriptions[ItemType.CopperBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperBoots)
    })))
    public itemsCopperBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperBuckler`, {
        ...itemDescriptions[ItemType.CopperBuckler],
        craftable: false,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperBuckler)
    })))
    public itemsCopperBuckler: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperCuirass`, {
        ...itemDescriptions[ItemType.CopperCuirass],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperCuirass)
    })))
    public itemsCopperCuirass: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperGauntlets`, {
        ...itemDescriptions[ItemType.CopperGauntlets],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperGauntlets)
    })))
    public itemsCopperGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperGorget`, {
        ...itemDescriptions[ItemType.CopperGorget],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperGorget)
    })))
    public itemsCopperGorget: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperGreaves`, {
        ...itemDescriptions[ItemType.CopperGreaves],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperGreaves)
    })))
    public itemsCopperGreaves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronBoots`, {
        ...itemDescriptions[ItemType.IronBoots],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronBoots)
    })))
    public itemsIronBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronBreastplate`, {
        ...itemDescriptions[ItemType.IronBreastplate],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronBreastplate)
    })))
    public itemsIronBreastplate: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronCuisses`, {
        ...itemDescriptions[ItemType.IronCuisses],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronCuisses)
    })))
    public itemsIronCuisses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronGauntlets`, {
        ...itemDescriptions[ItemType.IronGauntlets],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronGauntlets)
    })))
    public itemsIronGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronGorget`, {
        ...itemDescriptions[ItemType.IronGorget],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronGorget)
    })))
    public itemsIronGorget: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronHeater`, {
        ...itemDescriptions[ItemType.IronHeater],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronHeater)
    })))
    public itemsIronHeater: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronHelmet`, {
        ...itemDescriptions[ItemType.IronHelmet],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronHelmet)
    })))
    public itemsIronHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinBevor`, {
        ...itemDescriptions[ItemType.TinBevor],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinBevor)
    })))
    public itemsTinBevor: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinChausses`, {
        ...itemDescriptions[ItemType.TinChausses],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinChausses)
    })))
    public itemsTinChausses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinCuirass`, {
        ...itemDescriptions[ItemType.TinCuirass],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinCuirass)
    })))
    public itemsTinCuirass: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinFootgear`, {
        ...itemDescriptions[ItemType.TinFootgear],
        craftable: false,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinFootgear)
    })))
    public itemsTinFootGear: ItemType[];

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
    // Register dialog
    ////////////////////////////////////////////////////////////    

    @Register.dialog("ColorsEverywhereDialog", ColorsEverywhereDialog.description, ColorsEverywhereDialog)
	public readonly dialogMain: DialogId;

    @Register.dictionary("ColorsEverywhere", DialogTexts)
	public readonly dictionary: Dictionary;

    @Register.bindable("Toggle", IInput.key("Delete", "Shift"))
	public readonly keyBind: Bindable;

    @Bind.onDown(Registry<ColorsEverywhere>().get("keyBind"))
	public onToggleBind() {
        gameScreen!.dialogs.open(ColorsEverywhere.INSTANCE.dialogMain);
        return true;
	}

    ////////////////////////////////////////////////////////////
    // Register actions
    ////////////////////////////////////////////////////////////

    public mappedTerrains() {
        return [
            { vanilla: TerrainType.CobblestoneFlooring, registered: [...this.terrainsCobblestoneFlooring] },
            { vanilla: TerrainType.WoodenFlooring, registered: [...this.terrainsWoodenFlooring] },
            { vanilla: TerrainType.ClayFlooring, registered: [...this.terrainsClayFlooring] },
            { vanilla: TerrainType.AshCementFlooring, registered: [...this.terrainsAshCementFlooring] }
        ]
    }

    public mappedDoodads() {
        return [
            { vanilla: DoodadType.WoodenChest, registered: [...this.doodadsWoodenChests] },
            { vanilla: DoodadType.CopperChest, registered: [...this.doodadsCopperChests] },
            { vanilla: DoodadType.WroughtIronChest, registered: [...this.doodadsWroughtIronChests] },
            { vanilla: DoodadType.IronChest, registered: [...this.doodadsIronChests] },
            { vanilla: DoodadType.TinChest, registered: [...this.doodadsTinChests] },
            { vanilla: DoodadType.BronzeChest, registered: [...this.doodadsBronzeChests] },
            { vanilla: DoodadType.OrnateWoodenChest, registered: [...this.doodadsOrnateWoodenChests] },
            { vanilla: DoodadType.GraniteWall, registered: [...this.doodadsGraniteWalls] },
            { vanilla: DoodadType.WoodenWall, registered: [...this.doodadsWoodenWalls] },
            { vanilla: DoodadType.WoodenDoor, registered: [...this.doodadsWoodenDoors] },
            { vanilla: DoodadType.WoodenDoorOpen, registered: [...this.doodadsWoodenDoorsOpen] },
            { vanilla: DoodadType.WoodenFence, registered: [...this.doodadsWoodenFences] },
            { vanilla: DoodadType.WoodenGate, registered: [...this.doodadsWoodenGates] },
            { vanilla: DoodadType.WoodenGateOpen, registered: [...this.doodadsWoodenGatesOpen] },
            { vanilla: DoodadType.ClayWall, registered: [...this.doodadsClayWalls] },
            { vanilla: DoodadType.AshCementWall, registered: [...this.doodadsAshCementWalls] }
        ]
    }

    @Register.action("PaintDoodad", new Action(ActionArgument.ItemNearby)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            const player = action.executor;
            const tile = player.facingTile;
            const tileDoodad = tile.doodad;

            const ths = ColorsEverywhere.INSTANCE;
            const mappedDoodads = ths.mappedDoodads();
            const color = ths.getItemColor(item.type);

            function usePaintAction (color: Colors, doodadType?: DoodadType) {

                let existingColor!: Colors;

                if (doodadType) {
                    existingColor = ths.getDoodadColor(doodadType);
                }

                // Can't paint it the same color
                if (color === existingColor) {
                    player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoSameColor);
                    return;
                }

                // Painting over the paint
                renderer?.particle.create(tile, rgbColors[color])

                if (doodadType) {
                    const doodadBulkRegistration = ths.getDoodadBulkRegistration(doodadType);
                    if (doodadBulkRegistration ) {
                        tileDoodad?.changeType(doodadBulkRegistration[color]);
                        item.returns();
                    } else {
                        mappedDoodads.map(vanillaType => {
                            if (doodadType === vanillaType.vanilla) {
                                tileDoodad?.changeType(vanillaType.registered[color]);
                                item.returns();
                            }
                        })
                    }
                } else {
                    // Implied wooden door since index is 0
                    tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenDoors[color]);
                    item.returns();
                }

            }


            if (tileDoodad) {
                const typeId = mappedDoodads.some(v => v.registered.includes(tileDoodad!.type) || v.vanilla === tileDoodad!.type);
                if (typeId) {
                    usePaintAction(color, tileDoodad?.type);
                }
            } else {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeAllowed);
            }

            game.passTurn(player);
        }))

    public readonly actionPaintDoodad: ActionType;

    @Register.action("PaintTerrain", new Action(ActionArgument.ItemNearby)
    .setUsableBy(EntityType.Player)
    .setHandler((action, item) => {

        const player = action.executor;
        const tile = player.facingTile;
        //const tilePosition = player.point;
        const tileTerrain = tile.type;

        const ths = ColorsEverywhere.INSTANCE;
        const mappedTerrains = ths.mappedTerrains();
        const color = ths.getItemColor(item.type);

        function usePaintAction (color: Colors, terrainType?: TerrainType) {

            let existingColor!: Colors;

            if (terrainType) {
                existingColor = ths.getTileColor(terrainType);
            }

            // Can't paint it the same color
            if (color === existingColor) {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoSameColor);
                return;
            }

            // Painting over the paint
            renderer?.particle.create(tile, rgbColors[color])

            if (terrainType) {
                const terrainBulkRegistration = ths.getTerrainBulkRegistration(terrainType);
                if (terrainBulkRegistration) {
                    tile?.changeTile(terrainBulkRegistration[color], false);
                    item.returns();
                } else {
                    mappedTerrains.map(vanillaType => {

                        function changeTile(newTileInfo: TerrainType) {
                            return tile?.changeTile(newTileInfo, false)
                        }

                        if (terrainType === vanillaType.vanilla) {
                            changeTile(vanillaType.registered[color]);
                            item.returns();
                        }

                    })
                }
            }

        }

        if (tileTerrain) {
            const typeId = mappedTerrains.some(v => v.registered.includes(tileTerrain) || v.vanilla === tileTerrain);
            if (typeId) { 
                usePaintAction(color, tileTerrain);
            } else {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeAllowed);
            }
        }

        game.passTurn(player);
    }))

    public readonly actionPaintTerrain: ActionType;

    // ------------------------------------------------------------ //

    @Register.action("RemovePaintDoodad", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            const player = action.executor;
            const tile = player.facingTile;
            const tileDoodad = tile.doodad;

            const ths = ColorsEverywhere.INSTANCE;
            const mappedDoodads = ths.mappedDoodads();

            function useRemovePaintAction (doodadType?: DoodadType) {

                if (doodadType) {
                    mappedDoodads.map(vanillaType => {
                        const color = ths.getDoodadColor(doodadType);
                        if (doodadType === vanillaType.registered[color]) {
                            tileDoodad?.changeType(vanillaType.vanilla);
                            item.returns();
                        }
                    })
                }

                renderer?.particle.create(tile, rgbColors[Colors.White])

            }

            if (tileDoodad) {
                const typeId = mappedDoodads.some(v => v.registered.includes(tileDoodad!.type));
                if (typeId) {
                    useRemovePaintAction(tileDoodad?.type);
                } else {
                    player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeAllowed);
                }
            }
                
            game.passTurn(player);
        }))

    public readonly actionRemovePaintDoodad: ActionType;

    @Register.action("RemovePaintTerrain", new Action(ActionArgument.Item)
    .setUsableBy(EntityType.Player)
    .setHandler((action, item) => {

        const player = action.executor;
        const tile = player.facingTile;
        //const tilePosition = player.point;
        const tileTerrain = tile.type;

        const ths = ColorsEverywhere.INSTANCE;
        const mappedTerrains = ths.mappedTerrains();

        function useRemovePaintAction (terrainType?: TerrainType) {

            if (terrainType) {
                mappedTerrains.map(vanillaType => {
                    const color = ths.getTileColor(terrainType);
                    if (terrainType === vanillaType.registered[color]) {
                        tile?.changeTile(vanillaType.vanilla, false);
                        item.returns();
                    }
                })
            }

            renderer?.particle.create(tile, rgbColors[Colors.White])

        }

        if (tileTerrain) {
            const typeId = mappedTerrains.some(v => v.registered.includes(tileTerrain));
            if (typeId) {
                useRemovePaintAction(tileTerrain);
            } else {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeAllowed);
            }
        }

        game.passTurn(player);
    }))

    public readonly actionRemovePaintTerrain: ActionType;

    // ------------------------------------------------------------ //

    @Register.action("CleanPaintbrush", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            const player = action.executor;
            const tile = player.facingTile;
            const tileDoodad = tile.doodad;
            const terrainType = tile.type;
            const cleanBrush = ColorsEverywhere.INSTANCE.itemPaintbrush;

            function cleanIt () {
                renderer?.particle.create(tile, rgbColors[Colors.Blue])
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
                    || tileDoodad?.type === DoodadType.GraniteWell
                    || tileDoodad?.type === DoodadType.SandstoneWell
                    || tileDoodad?.type === DoodadType.ClayWaterStill
                    || tileDoodad?.type === DoodadType.GraniteWaterStill
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

    public getDyeList(): DoodadType[] {
        return [
            ...this.doodadsDyes
        ];
    }

    public mappedEquipment() {
        return [
            { vanilla: ItemType.LeatherTunic, registered: [...this.itemsLeatherTunics] },
            { vanilla: ItemType.LeatherBelt, registered: [...this.itemsLeatherBelts] },
            { vanilla: ItemType.AnimalPelt, registered: [...this.itemsAnimalPelts] },
            { vanilla: ItemType.ArmoredScaleBelt, registered: [...this.itemsArmoredScaleBelts] },
            { vanilla: ItemType.ArmoredScaleBevor, registered: [...this.itemsArmoredScaleBevors] },
            { vanilla: ItemType.ArmoredScaleBoots, registered: [...this.itemsArmoredScaleBoots] },
            { vanilla: ItemType.ArmoredScaleCrown, registered: [...this.itemsArmoredScaleCrowns] },
            { vanilla: ItemType.ArmoredScaleCuisses, registered: [...this.itemsArmoredScaleCuisses] },
            { vanilla: ItemType.ArmoredScaleGloves, registered: [...this.itemsArmoredScaleGloves] },
            { vanilla: ItemType.ArmoredScaleVest, registered: [...this.itemsArmoredScaleVests] },
            { vanilla: ItemType.Backpack, registered: [...this.itemsBackpacks] },
            { vanilla: ItemType.BarkLeggings, registered: [...this.itemsBarkLeggings] },
            { vanilla: ItemType.BarkShield, registered: [...this.itemsBarkShields] },
            { vanilla: ItemType.BarkTunic, registered: [...this.itemsBarkTunics] },
            { vanilla: ItemType.Bow, registered: [...this.itemsBows] },
            { vanilla: ItemType.BrambleCrown, registered: [...this.itemsBrambleCrowns] },
            { vanilla: ItemType.Cloak, registered: [...this.itemsCloaks] },
            { vanilla: ItemType.ClothShirt, registered: [...this.itemsClothShirts] },
            { vanilla: ItemType.ClothTrousers, registered: [...this.itemsClothTrousers] },
            { vanilla: ItemType.CompositeBow, registered: [...this.itemsCompositeBows] },
            { vanilla: ItemType.CordedSling, registered: [...this.itemsCordedSlings] },
            { vanilla: ItemType.FurBoots, registered: [...this.itemsFurBoots] },
            { vanilla: ItemType.FurCoat, registered: [...this.itemsFurCoats] },
            { vanilla: ItemType.FurMittens, registered: [...this.itemsFurMittens] },
            { vanilla: ItemType.LeatherBoots, registered: [...this.itemsLeatherBoots] },
            { vanilla: ItemType.LeatherCap, registered: [...this.itemsLeatherCaps] },
            { vanilla: ItemType.LeatherGloves, registered: [...this.itemsLeatherGloves] },
            { vanilla: ItemType.LeatherGorget, registered: [...this.itemsLeatherGorgets] },
            { vanilla: ItemType.LeatherPants, registered: [...this.itemsLeatherPants] },
            { vanilla: ItemType.LeatherQuiver, registered: [...this.itemsLeatherQuivers] },
            { vanilla: ItemType.LeatherSling, registered: [...this.itemsLeatherSlings] },
            { vanilla: ItemType.LongBow, registered: [...this.itemsLongBows] },
            { vanilla: ItemType.MageRobe, registered: [...this.itemsMageRobes] },
            { vanilla: ItemType.OrnateCape, registered: [...this.itemsOrnateCapes] },
            { vanilla: ItemType.PirateHat, registered: [...this.itemsPirateHats] },
            { vanilla: ItemType.ScaleBelt, registered: [...this.itemsScaleBelts] },
            { vanilla: ItemType.ScaleBevor, registered: [...this.itemsScaleBevors] },
            { vanilla: ItemType.ScaleBoots, registered: [...this.itemsScaleBoots] },
            { vanilla: ItemType.ScaleCap, registered: [...this.itemsScaleCaps] },
            { vanilla: ItemType.ScaleGloves, registered: [...this.itemsScaleGloves] },
            { vanilla: ItemType.ScaleLeggings, registered: [...this.itemsScaleLeggings] },
            { vanilla: ItemType.ScaleVest, registered: [...this.itemsScaleVests] },
            { vanilla: ItemType.ShortBow, registered: [...this.itemsShortbows] },
            { vanilla: ItemType.Skullcap, registered: [...this.itemsSkullCaps] },
            { vanilla: ItemType.SmallBag, registered: [...this.itemsSmallBags] },
            { vanilla: ItemType.StrawHat, registered: [...this.itemsStrawHats] },
            { vanilla: ItemType.TinGloves, registered: [...this.itemsTinGloves] },
            { vanilla: ItemType.TinHelmet, registered: [...this.itemsTinHelmet] },
            { vanilla: ItemType.TinShield, registered: [...this.itemsTinShield] },
            { vanilla: ItemType.WoodenShield, registered: [...this.itemsWoodenShield] },
            { vanilla: ItemType.WroughtIronBoots, registered: [...this.itemsWroughtIronBoots] },
            { vanilla: ItemType.WroughtIronBreastplate, registered: [...this.itemsWroughtIronBreastplate] },
            { vanilla: ItemType.WroughtIronCuisses, registered: [...this.itemsWroughtIronCuisses] },
            { vanilla: ItemType.WroughtIronGauntlets, registered: [...this.itemsWroughtIronGauntlets] },
            { vanilla: ItemType.WroughtIronGorget, registered: [...this.itemsWroughtIronGorget] },
            { vanilla: ItemType.WroughtIronHelmet, registered: [...this.itemsWroughtIronHelmet] },
            { vanilla: ItemType.WroughtIronShield, registered: [...this.itemsWroughtIronShield] },
            { vanilla: ItemType.BronzeBevor, registered: [...this.itemsBronzeBevor] },
            { vanilla: ItemType.BronzeBoots, registered: [...this.itemsBronzeBoots] },
            { vanilla: ItemType.BronzeChestArmor, registered: [...this.itemsBronzeChestArmor] },
            { vanilla: ItemType.BronzeGauntlets, registered: [...this.itemsBronzeGauntlets] },
            { vanilla: ItemType.BronzeGreaves, registered: [...this.itemsBronzeGreaves] },
            { vanilla: ItemType.BronzeHelmet, registered: [...this.itemsBronzeHelmet] },
            { vanilla: ItemType.BronzeKiteShield, registered: [...this.itemsBronzeKiteShield] },
            { vanilla: ItemType.CopperBoots, registered: [...this.itemsCopperBoots] },
            { vanilla: ItemType.CopperBuckler, registered: [...this.itemsCopperBuckler] },
            { vanilla: ItemType.CopperCuirass, registered: [...this.itemsCopperCuirass] },
            { vanilla: ItemType.CopperGauntlets, registered: [...this.itemsCopperGauntlets] },
            { vanilla: ItemType.CopperGorget, registered: [...this.itemsCopperGorget] },
            { vanilla: ItemType.CopperGreaves, registered: [...this.itemsCopperGreaves] },
            { vanilla: ItemType.IronBoots, registered: [...this.itemsIronBoots] },
            { vanilla: ItemType.IronBreastplate, registered: [...this.itemsIronBreastplate] },
            { vanilla: ItemType.IronCuisses, registered: [...this.itemsIronCuisses] },
            { vanilla: ItemType.IronGauntlets, registered: [...this.itemsIronGauntlets] },
            { vanilla: ItemType.IronGorget, registered: [...this.itemsIronGorget] },
            { vanilla: ItemType.IronHeater, registered: [...this.itemsIronHeater] },
            { vanilla: ItemType.IronHelmet, registered: [...this.itemsIronHelmet] },
            { vanilla: ItemType.TinBevor, registered: [...this.itemsTinBevor] },
            { vanilla: ItemType.TinChausses, registered: [...this.itemsTinChausses] },
            { vanilla: ItemType.TinCuirass, registered: [...this.itemsTinCuirass] },
            { vanilla: ItemType.TinFootgear, registered: [...this.itemsTinFootGear] }
        ]
    }

    @Register.action("DyeItem", new Action(ActionArgument.Item)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            const player = action.executor;
            const tile = player.facingTile;
            //const tileNew = player.facingTile();
            const tileDoodad = tile.doodad;
            const itemType = item.type;

            const ths = ColorsEverywhere.INSTANCE;
            const dyeTubs = ths.getDyeList();
            const mappedEquipment = ths.mappedEquipment();
            const color = ths.getItemColor(item.type);

            function applyDye (color: Colors, doodadType?: DoodadType, itemType?: ItemType) {

                let existingColor!: Colors;

                if (doodadType) {
                    existingColor = ths.getDoodadColor(doodadType);
                }

                // Can't dye it the same color
                if (color === existingColor) {
                    player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoSameColor);
                    return;
                }

                // Painting over the paint
                renderer?.particle.create(tile, rgbColors[existingColor])

                if (doodadType && itemType) {
                    const doodadColor = ths.getDoodadColor(doodadType);
                    const itemBulkRegistrations = ths.getItemBulkRegistration(itemType);
                    if (itemBulkRegistrations ) {
                        item.changeInto(itemBulkRegistrations[doodadColor]);
                        tileDoodad!.damage();
                    } else {
                        mappedEquipment.map(vanillaType => {
                            if (itemType === vanillaType.vanilla) {
                                item.changeInto(vanillaType.registered[doodadColor]);
                            }
                        })
                    }
                }

            }

            if (tileDoodad) {
                const typeId = dyeTubs.some(v => v === tileDoodad!.type);
                if (typeId) {
                    applyDye(color, tileDoodad?.type, itemType);
                }
            } else {
                player.messages.source(Source.Action).send(ColorsEverywhere.INSTANCE.messageNoDyeSource);
            }

            game.passTurn(player);

        }))

    public readonly actionDyeItem: ActionType;


    ////////////////////////////////////////////////////////////
    // Overrides
    ////////////////////////////////////////////////////////////

    private milkThistleOrig: IItemDescription;

    private vanillaDuplicates: { 
        itemIndex: number;
        origItem: IItemDescription;
    }[] = [];

    private addDyeActions() {
        const dyeItemTypes = this.mappedEquipment();
        dyeItemTypes.map( itemType => {

            this.vanillaDuplicates.push({ itemIndex: itemType.vanilla, origItem: {...itemDescriptions[itemType.vanilla]} });

            const itemTypeName = itemDescriptions[itemType.vanilla];
            const actions = itemDescriptions[itemType.vanilla].use;

            if (itemTypeName && !actions) {
                !itemTypeName.use ? itemTypeName.use = [ColorsEverywhere.INSTANCE.actionDyeItem] : undefined;
            }

            if (itemTypeName && !actions?.includes(ColorsEverywhere.INSTANCE.actionDyeItem)) {
                !itemTypeName.use ? itemTypeName.use = [ColorsEverywhere.INSTANCE.actionDyeItem] : actions?.push(ColorsEverywhere.INSTANCE.actionDyeItem);
            }
        })
    }

    private removeDyeActions() {
        const dyeItemTypes = this.mappedEquipment();
        dyeItemTypes.map( itemType => {

            this.vanillaDuplicates.map(value => {
                if (value.itemIndex === itemType.vanilla) {
                    itemDescriptions[itemType.vanilla] = value.origItem;
                    itemDescriptions[itemType.vanilla].use = value.origItem.use;
                }
                
            })

        })
        this.vanillaDuplicates = [];
    }

    public override onLoad(): void {

        // Create dye actions
        this.addDyeActions();

        // Milk Thistle
        this.milkThistleOrig = itemDescriptions[ItemType.MilkThistleFlowers];
        const milkThistle = itemDescriptions[ItemType.MilkThistleFlowers];

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

    }

    public override onUnload(): void {

        itemDescriptions[ItemType.MilkThistleFlowers] = this.milkThistleOrig;

        // Remove dye actions
        this.removeDyeActions();
    }

    ////////////////////////////////////////////////////////////
    // Chiri is amazing section ;D
    ////////////////////////////////////////////////////////////

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
            return (this[registrationKey] as any as R[] ).indexOf(registration);
        }

        for (const key of itemBulkRegistrations) {
            const value = this[key as keyof this] as any as (ItemType | ItemTypeGroup)[];
            const index = value.indexOf(registration);
            if (index >= 0) {
                return index;
            }
        }

        this.getLog().warn("Tried to get color of non-bulk-registered item or itemGroup", registration);
        return 0;
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
            return (this[registrationKey] as any as R[]).indexOf(registration);
        }

        for (const key of doodadBulkRegistrations) {
            const value = this[key as keyof this] as any as (DoodadType | DoodadTypeGroup)[];
            const index = value.indexOf(registration);
            if (index >= 0) {
                return index;
            }
        }

        this.getLog().warn("Tried to get color of non-bulk-registered doodad or doodadGroup", registration);
        return 0;
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

    private getTileColor (registration: TerrainType): Colors {

        for (const key of terrainBulkRegistrations) {
            const value = this[key as keyof this] as any as TerrainType[];
            const index = value.indexOf(registration);
            if (index >= 0) {
                return index;
            }
        }

        this.getLog().warn("Tried to get color of non-bulk-registered tile", registration);
        return 0;
    }

}
