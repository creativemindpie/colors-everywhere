import { DoodadType, DoodadTypeGroup } from "game/doodad/IDoodad";
import { Action } from "game/entity/action/Action";
import { ActionArgument, ActionType } from "game/entity/action/IAction";
import { EntityType } from "game/entity/IEntity";
import { SkillType } from "game/entity/IHuman";
import { Source } from "game/entity/player/IMessageManager";
import { Quality } from "game/IObject";
import { IItemDescription, ItemType, ItemTypeGroup } from "game/item/IItem";
import { itemDescriptions } from "game/item/Items";
import { doodadDescriptions } from "game/doodad/Doodads";
import { TerrainType, TerrainTypeGroup } from "game/tile/ITerrain";
import { Tuple } from "utilities/collection/Arrays";
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
import { EventHandler } from "event/EventManager";
import { EventBus } from "event/EventBuses";
import { Game } from "game/Game";
import { DialogId } from "ui/screen/screens/game/Dialogs";
import { IInput } from "ui/input/IInput";

import Register, { Registry } from "mod/ModRegistry";
import Enums from "utilities/enum/Enums";
import Message from "language/dictionary/Message";
import Mod from "mod/Mod";
import TileHelpers from "utilities/game/TileHelpers";
import Bindable from "ui/input/Bindable";
import ItemManager from "game/item/ItemManager";
import ColorsEverywhereDialog from "./ColorsEverywhereDialog";
import Dictionary from "language/Dictionary";
import Bind from "ui/input/Bind";
import terrainDescriptions from "game/tile/Terrains";

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
    "itemsStoneWalls",
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
    "doodadsStoneWalls",
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenChests", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsCopperChests", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWroughtIronChests", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsIronChests", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsTinChests", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsBronzeChests", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsOrnateWoodenChests", color) },
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
        .map(color => Tuple(`${Colors[color]}StoneWall`, {
            ...itemDescriptions[ItemType.StoneWall],
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsStoneWalls", color) },
            placeDownType: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsStoneWalls", color),
            groups: [ItemTypeGroup.Housing]
        })))
    public itemsStoneWalls: ItemType[];

    @Register.bulk("doodad", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}StoneWall`, {
            ...doodadDescriptions[DoodadType.StoneWall],
            repairItem: Registry<ColorsEverywhere>(MOD_NAME).get("itemsStoneWalls", color),
            pickUp: [Registry<ColorsEverywhere>(MOD_NAME).get("itemsStoneWalls", color)]
        })))
    public doodadsStoneWalls: DoodadType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}ClayWall`, {
            ...itemDescriptions[ItemType.ClayWall],
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsClayWalls", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsAshCementWalls", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenWalls", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenGates", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenDoors", color) },
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
            recipe: undefined,
            use: [ActionType.Build],
            onUse: { [ActionType.Build]: Registry<ColorsEverywhere>(MOD_NAME).get("doodadsWoodenFences", color) },
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
            recipe: undefined,
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
            groups: [TerrainTypeGroup.Flooring]
        })))
    public terrainsCobblestoneFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}WoodenFlooring`, {
            ...itemDescriptions[ItemType.WoodenFlooring],
            recipe: undefined,
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
            groups: [TerrainTypeGroup.Flooring]
        })))
    public terrainsWoodenFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}ClayFlooring`, {
            ...itemDescriptions[ItemType.ClayFlooring],
            recipe: undefined,
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
            groups: [TerrainTypeGroup.Flooring]
        })))
    public terrainsClayFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}AshCementFlooring`, {
            ...itemDescriptions[ItemType.AshCementFlooring],
            recipe: undefined,
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
            groups: [TerrainTypeGroup.Flooring]
        })))
    public terrainsAshCementFlooring: TerrainType[];

    ////////////////////////////////////////////////////////////
    // Register equipment
    ////////////////////////////////////////////////////////////

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}LeatherTunic`, {
            ...itemDescriptions[ItemType.LeatherTunic],
            recipe: undefined,
            use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
            groups: ItemManager.getGroups(ItemType.LeatherTunic)
        })))
    public itemsLeatherTunics: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}LeatherBelt`, {
            ...itemDescriptions[ItemType.LeatherBelt],
            recipe: undefined,
            use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
            groups: ItemManager.getGroups(ItemType.LeatherBelt)
        })))
    public itemsLeatherBelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}AnimalPelt`, {
        ...itemDescriptions[ItemType.AnimalPelt],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.AnimalPelt)
    })))
    public itemsAnimalPelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleBelt`, {
        ...itemDescriptions[ItemType.ArmoredScaleBelt],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleBelt)
    })))
    public itemsArmoredScaleBelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleBevor`, {
        ...itemDescriptions[ItemType.ArmoredScaleBevor],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleBevor)
    })))
    public itemsArmoredScaleBevors: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleBoots`, {
        ...itemDescriptions[ItemType.ArmoredScaleBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleBoots)
    })))
    public itemsArmoredScaleBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleCrown`, {
        ...itemDescriptions[ItemType.ArmoredScaleCrown],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleCrown)
    })))
    public itemsArmoredScaleCrowns: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleCuisses`, {
        ...itemDescriptions[ItemType.ArmoredScaleCuisses],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleCuisses)
    })))
    public itemsArmoredScaleCuisses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleGloves`, {
        ...itemDescriptions[ItemType.ArmoredScaleGloves],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleGloves)
    })))
    public itemsArmoredScaleGloves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ArmoredScaleVest`, {
        ...itemDescriptions[ItemType.ArmoredScaleVest],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ArmoredScaleVest)
    })))
    public itemsArmoredScaleVests: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Backpack`, {
        ...itemDescriptions[ItemType.Backpack],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Backpack)
    })))
    public itemsBackpacks: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BarkLeggings`, {
        ...itemDescriptions[ItemType.BarkLeggings],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BarkLeggings)
    })))
    public itemsBarkLeggings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BarkShield`, {
        ...itemDescriptions[ItemType.BarkShield],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BarkShield)
    })))
    public itemsBarkShields: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BarkTunic`, {
        ...itemDescriptions[ItemType.BarkTunic],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BarkTunic)
    })))
    public itemsBarkTunics: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Bow`, {
        ...itemDescriptions[ItemType.Bow],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Bow)
    })))
    public itemsBows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BrambleCrown`, {
        ...itemDescriptions[ItemType.BrambleCrown],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BrambleCrown)
    })))
    public itemsBrambleCrowns: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Cloak`, {
        ...itemDescriptions[ItemType.Cloak],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Cloak)
    })))
    public itemsCloaks: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ClothShirt`, {
        ...itemDescriptions[ItemType.ClothShirt],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ClothShirt)
    })))
    public itemsClothShirts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ClothTrousers`, {
        ...itemDescriptions[ItemType.ClothTrousers],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ClothTrousers)
    })))
    public itemsClothTrousers: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CompositeBow`, {
        ...itemDescriptions[ItemType.CompositeBow],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CompositeBow)
    })))
    public itemsCompositeBows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CordedSling`, {
        ...itemDescriptions[ItemType.CordedSling],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CordedSling)
    })))
    public itemsCordedSlings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}FurBoots`, {
        ...itemDescriptions[ItemType.FurBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.FurBoots)
    })))
    public itemsFurBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}FurCoat`, {
        ...itemDescriptions[ItemType.FurCoat],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.FurCoat)
    })))
    public itemsFurCoats: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}FurMittens`, {
        ...itemDescriptions[ItemType.FurMittens],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.FurMittens)
    })))
    public itemsFurMittens: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherBoots`, {
        ...itemDescriptions[ItemType.LeatherBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherBoots)
    })))
    public itemsLeatherBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherCap`, {
        ...itemDescriptions[ItemType.LeatherCap],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherCap)
    })))
    public itemsLeatherCaps: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherGloves`, {
        ...itemDescriptions[ItemType.LeatherGloves],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherGloves)
    })))
    public itemsLeatherGloves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherGorget`, {
        ...itemDescriptions[ItemType.LeatherGorget],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherGorget)
    })))
    public itemsLeatherGorgets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherPants`, {
        ...itemDescriptions[ItemType.LeatherPants],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherPants)
    })))
    public itemsLeatherPants: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherQuiver`, {
        ...itemDescriptions[ItemType.LeatherQuiver],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherQuiver)
    })))
    public itemsLeatherQuivers: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LeatherSling`, {
        ...itemDescriptions[ItemType.LeatherSling],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LeatherSling)
    })))
    public itemsLeatherSlings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}LongBow`, {
        ...itemDescriptions[ItemType.LongBow],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.LongBow)
    })))
    public itemsLongBows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}MageRobe`, {
        ...itemDescriptions[ItemType.MageRobe],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.MageRobe)
    })))
    public itemsMageRobes: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}OrnateCape`, {
        ...itemDescriptions[ItemType.OrnateCape],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.OrnateCape)
    })))
    public itemsOrnateCapes: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}PirateHat`, {
        ...itemDescriptions[ItemType.PirateHat],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.PirateHat)
    })))
    public itemsPirateHats: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleBelt`, {
        ...itemDescriptions[ItemType.ScaleBelt],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleBelt)
    })))
    public itemsScaleBelts: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleBevor`, {
        ...itemDescriptions[ItemType.ScaleBevor],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleBevor)
    })))
    public itemsScaleBevors: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleBoots`, {
        ...itemDescriptions[ItemType.ScaleBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleBoots)
    })))
    public itemsScaleBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleCap`, {
        ...itemDescriptions[ItemType.ScaleCap],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleCap)
    })))
    public itemsScaleCaps: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleGloves`, {
        ...itemDescriptions[ItemType.ScaleGloves],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleGloves)
    })))
    public itemsScaleGloves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleLeggings`, {
        ...itemDescriptions[ItemType.ScaleLeggings],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleLeggings)
    })))
    public itemsScaleLeggings: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ScaleVest`, {
        ...itemDescriptions[ItemType.ScaleVest],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ScaleVest)
    })))
    public itemsScaleVests: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}ShortBow`, {
        ...itemDescriptions[ItemType.ShortBow],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.ShortBow)
    })))
    public itemsShortbows: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}Skullcap`, {
        ...itemDescriptions[ItemType.Skullcap],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.Skullcap)
    })))
    public itemsSkullCaps: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}SmallBag`, {
        ...itemDescriptions[ItemType.SmallBag],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.SmallBag)
    })))
    public itemsSmallBags: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}StrawHat`, {
        ...itemDescriptions[ItemType.StrawHat],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.StrawHat)
    })))
    public itemsStrawHats: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinGloves`, {
        ...itemDescriptions[ItemType.TinGloves],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinGloves)
    })))
    public itemsTinGloves: ItemType[];
    
    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinHelmet`, {
        ...itemDescriptions[ItemType.TinHelmet],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinHelmet)
    })))
    public itemsTinHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinShield`, {
        ...itemDescriptions[ItemType.TinShield],
        recipe: undefined,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinShield)
    })))
    public itemsTinShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WoodenShield`, {
        ...itemDescriptions[ItemType.WoodenShield],
        recipe: undefined,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WoodenShield)
    })))
    public itemsWoodenShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronBoots`, {
        ...itemDescriptions[ItemType.WroughtIronBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronBoots)
    })))
    public itemsWroughtIronBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronBreastplate`, {
        ...itemDescriptions[ItemType.WroughtIronBreastplate],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronBreastplate)
    })))
    public itemsWroughtIronBreastplate: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronCuisses`, {
        ...itemDescriptions[ItemType.WroughtIronCuisses],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronCuisses)
    })))
    public itemsWroughtIronCuisses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronGauntlets`, {
        ...itemDescriptions[ItemType.WroughtIronGauntlets],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronGauntlets)
    })))
    public itemsWroughtIronGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronGorget`, {
        ...itemDescriptions[ItemType.WroughtIronGorget],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronGorget)
    })))
    public itemsWroughtIronGorget: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronHelmet`, {
        ...itemDescriptions[ItemType.WroughtIronHelmet],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronHelmet)
    })))
    public itemsWroughtIronHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}WroughtIronShield`, {
        ...itemDescriptions[ItemType.WroughtIronShield],
        recipe: undefined,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.WroughtIronShield)
    })))
    public itemsWroughtIronShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeBevor`, {
        ...itemDescriptions[ItemType.BronzeBevor],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeBevor)
    })))
    public itemsBronzeBevor: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeBoots`, {
        ...itemDescriptions[ItemType.BronzeBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeBoots)
    })))
    public itemsBronzeBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeChestArmor`, {
        ...itemDescriptions[ItemType.BronzeChestArmor],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeChestArmor)
    })))
    public itemsBronzeChestArmor: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeGauntlets`, {
        ...itemDescriptions[ItemType.BronzeGauntlets],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeGauntlets)
    })))
    public itemsBronzeGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeGreaves`, {
        ...itemDescriptions[ItemType.BronzeGreaves],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeGreaves)
    })))
    public itemsBronzeGreaves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeHelmet`, {
        ...itemDescriptions[ItemType.BronzeHelmet],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeHelmet)
    })))
    public itemsBronzeHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}BronzeKiteShield`, {
        ...itemDescriptions[ItemType.BronzeKiteShield],
        recipe: undefined,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.BronzeKiteShield)
    })))
    public itemsBronzeKiteShield: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperBoots`, {
        ...itemDescriptions[ItemType.CopperBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperBoots)
    })))
    public itemsCopperBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperBuckler`, {
        ...itemDescriptions[ItemType.CopperBuckler],
        recipe: undefined,
        use: [ActionType.Melee, Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperBuckler)
    })))
    public itemsCopperBuckler: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperCuirass`, {
        ...itemDescriptions[ItemType.CopperCuirass],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperCuirass)
    })))
    public itemsCopperCuirass: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperGauntlets`, {
        ...itemDescriptions[ItemType.CopperGauntlets],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperGauntlets)
    })))
    public itemsCopperGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperGorget`, {
        ...itemDescriptions[ItemType.CopperGorget],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperGorget)
    })))
    public itemsCopperGorget: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}CopperGreaves`, {
        ...itemDescriptions[ItemType.CopperGreaves],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.CopperGreaves)
    })))
    public itemsCopperGreaves: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronBoots`, {
        ...itemDescriptions[ItemType.IronBoots],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronBoots)
    })))
    public itemsIronBoots: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronBreastplate`, {
        ...itemDescriptions[ItemType.IronBreastplate],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronBreastplate)
    })))
    public itemsIronBreastplate: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronCuisses`, {
        ...itemDescriptions[ItemType.IronCuisses],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronCuisses)
    })))
    public itemsIronCuisses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronGauntlets`, {
        ...itemDescriptions[ItemType.IronGauntlets],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronGauntlets)
    })))
    public itemsIronGauntlets: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronGorget`, {
        ...itemDescriptions[ItemType.IronGorget],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronGorget)
    })))
    public itemsIronGorget: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronHeater`, {
        ...itemDescriptions[ItemType.IronHeater],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronHeater)
    })))
    public itemsIronHeater: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}IronHelmet`, {
        ...itemDescriptions[ItemType.IronHelmet],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.IronHelmet)
    })))
    public itemsIronHelmet: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinBevor`, {
        ...itemDescriptions[ItemType.TinBevor],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinBevor)
    })))
    public itemsTinBevor: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinChausses`, {
        ...itemDescriptions[ItemType.TinChausses],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinChausses)
    })))
    public itemsTinChausses: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinCuirass`, {
        ...itemDescriptions[ItemType.TinCuirass],
        recipe: undefined,
        use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
        groups: ItemManager.getGroups(ItemType.TinCuirass)
    })))
    public itemsTinCuirass: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
    .map(color => Tuple(`${Colors[color]}TinFootgear`, {
        ...itemDescriptions[ItemType.TinFootgear],
        recipe: undefined,
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
            { vanilla: DoodadType.StoneWall, registered: [...this.doodadsStoneWalls] },
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
            const tile = player.getFacingTile();
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
                renderer?.particle.create(player.island, player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[color])

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
        const tile = player.getFacingTile();
        const tilePosition = player.getFacingPoint();
        const tileTerrain = TileHelpers.getType(tile);

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
            renderer?.particle.create(player.island, player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[color])

            if (terrainType) {
                const terrainBulkRegistration = ths.getTerrainBulkRegistration(terrainType);
                if (terrainBulkRegistration) {
                    localIsland?.changeTile(terrainBulkRegistration[color], tilePosition.x, tilePosition.y, tilePosition.z, false);
                    item.returns();
                } else {
                    mappedTerrains.map(vanillaType => {

                        function changeTile(newTileInfo: TerrainType) {
                            return localIsland?.changeTile(newTileInfo, tilePosition.x, tilePosition.y, tilePosition.z, false)
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
            const tile = player.getFacingTile();
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

                renderer?.particle.create(player.island, player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[Colors.White]);

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
        const tile = player.getFacingTile();
        const tilePosition = player.getFacingPoint();
        const tileTerrain = TileHelpers.getType(tile);

        const ths = ColorsEverywhere.INSTANCE;
        const mappedTerrains = ths.mappedTerrains();

        function useRemovePaintAction (terrainType?: TerrainType) {

            if (terrainType) {
                mappedTerrains.map(vanillaType => {
                    const color = ths.getTileColor(terrainType);
                    if (terrainType === vanillaType.registered[color]) {
                        localIsland?.changeTile(vanillaType.vanilla, tilePosition.x, tilePosition.y, tilePosition.z, false);
                        item.returns();
                    }
                })
            }

            renderer?.particle.create(player.island, player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[Colors.White]);

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
            const tile = player.getFacingTile();
            const tileDoodad = tile.doodad;
            const terrainType = TileHelpers.getType(tile);
            const cleanBrush = ColorsEverywhere.INSTANCE.itemPaintbrush;

            function cleanIt () {
                renderer?.particle.create(player.island,player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[Colors.Blue]);
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
            const tile = player.getFacingTile();
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
                renderer?.particle.create(player.island,player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[existingColor]);

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


    @EventHandler(EventBus.Game, "play")
    public onGameStart (game: Game, isLoadingSave: boolean, playedCount: number): void {
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
            localPlayer.createItemInInventory(ItemType.LeatherBelt);
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
            localPlayer.createItemInInventory(ItemType.CopperChest);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsLeatherTunics[Colors.Red]);
            localPlayer.createItemInInventory(this.itemsStoneWalls[Colors.White]);
            localPlayer.createItemInInventory(this.itemsStoneWalls[Colors.White]);
            localPlayer.createItemInInventory(this.itemsStoneWalls[Colors.White]);
            localPlayer.createItemInInventory(this.itemsWoodenWalls[Colors.White]);
            localPlayer.createItemInInventory(this.itemsWoodenWalls[Colors.Black]);
            localPlayer.createItemInInventory(this.itemsWoodenWalls[Colors.Red]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsDyes[Colors.Purple]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsDyes[Colors.Red]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemDyeRemover);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsCobblestoneFlooring[Colors.Blue]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsCobblestoneFlooring[Colors.White]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsCobblestoneFlooring[Colors.Red]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsWoodenFlooring[Colors.Blue]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsWoodenFlooring[Colors.White]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsWoodenFlooring[Colors.Red]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsClayFlooring[Colors.Blue]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsClayFlooring[Colors.White]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsAshCementFlooring[Colors.Red]);
            localPlayer.createItemInInventory(ItemType.WoodenDoor);
            localPlayer.createItemInInventory(ItemType.WoodenGate);
            localPlayer.createItemInInventory(ItemType.WoodenFence);
            localPlayer.createItemInInventory(ItemType.WoodenFence);
            localPlayer.createItemInInventory(ItemType.WoodenFence);
            localPlayer.createItemInInventory(ItemType.ClayWall);
            localPlayer.createItemInInventory(ItemType.AshCementWall);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsWoodenDoors[Colors.Green]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsWoodenFences[Colors.Green]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsWoodenGates[Colors.Green]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsClayWalls[Colors.Green]);
            localPlayer.createItemInInventory(ColorsEverywhere.INSTANCE.itemsAshCementWalls[Colors.Green]);
            localPlayer.createItemInInventory(ItemType.MageRobe);
            localPlayer.createItemInInventory(ItemType.ScaleBoots);
            localPlayer.createItemInInventory(ItemType.BronzeKiteShield);
            localPlayer.createItemInInventory(ItemType.BronzeChestArmor);
            localPlayer.createItemInInventory(ItemType.WoodenShield);
            localPlayer.createItemInInventory(ItemType.IronGauntlets);
            localPlayer.createItemInInventory(ItemType.TinBevor);
        }
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

    private getTileColor (registration: TerrainType): Colors {

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
