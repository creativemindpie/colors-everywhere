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
import Message from "language/dictionary/Message";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import Register, { Registry } from "mod/ModRegistry";
import { Tuple } from "utilities/collection/Arrays";
import Enums from "utilities/enum/Enums";
import TileHelpers from "utilities/game/TileHelpers";
import { DyeGroup } from "./dyes/DyeGroup";
import { getDoodadDyeDescription, getItemDyeDescription } from "./dyes/Dyes";
import { CornflowerDescription, CornflowerDoodadDescription, CornflowerSeedsDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { Colors, MOD_NAME } from "./IColorsEverywhere";
import { getPigmentIngredientGroupDescription } from "./pigments/PigmentGroups";
import { getPigmentDescription } from "./pigments/Pigments";
import { DyeRemoverDescription, getItemPaintbrushDescription, PaintbrushDescription, StoneBowlDescription } from "./tools/Tools";
import { rgbColors } from "./utils/Utils";
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
    "itemsLeatherBelts"
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
    "doodadsWoodenGates",
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
            groups: [ItemTypeGroup.Equipment]
        })))
    public itemsLeatherTunics: ItemType[];

    @Register.bulk("item", ...Enums.values(Colors)
        .map(color => Tuple(`${Colors[color]}LeatherBelt`, {
            ...itemDescriptions[ItemType.LeatherBelt],
            recipe: undefined,
            use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
            groups: [ItemTypeGroup.Equipment]
        })))
    public itemsLeatherBelts: ItemType[];


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

    @Register.action("Paint", new Action(ActionArgument.ItemNearby)
        .setUsableBy(EntityType.Player)
        .setHandler((action, item) => {

            // TODO
            // - Trigger dialog for overlapping doodad/terrain options

            const player = action.executor;
            const tile = player.getFacingTile();
            const tilePosition = player.getFacingPoint();
            const tileDoodad = tile.doodad;
            const tileTerrain = TileHelpers.getType(tile);

            const ths = ColorsEverywhere.INSTANCE;
            const mappedDoodads = ths.mappedDoodads();
            const mappedTerrains = ths.mappedTerrains();
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

                if (doodadType && !terrainType) {
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
                    if (!terrainType) {
                        // Implied wooden door since index is 0
                        tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenDoors[color]);
                        item.returns();
                    }
                }

                if (terrainType && !doodadType) {
                    const terrainBulkRegistration = ths.getTerrainBulkRegistration(terrainType);
                    if (terrainBulkRegistration) {
                        game.changeTile(terrainBulkRegistration[color], tilePosition.x, tilePosition.y, tilePosition.z, false);
                        item.returns();
                    } else {
                        mappedTerrains.map(vanillaType => {

                            function changeTile(newTileInfo: TerrainType) {
                                return game.changeTile(newTileInfo, tilePosition.x, tilePosition.y, tilePosition.z, false)
                            }

                            if (terrainType === vanillaType.vanilla) {
                                changeTile(vanillaType.registered[color]);
                                item.returns();
                            }

                        })
                    }
                }

            }

            if (tileDoodad || tileTerrain) {
                if (tileDoodad) {
                    const typeId = mappedDoodads.some(v => v.registered.includes(tileDoodad!.type) || v.vanilla === tileDoodad!.type);
                    if (typeId) {
                        usePaintAction(color, tileDoodad?.type);
                    }
                }
                if (tileTerrain) {
                    const typeId = mappedTerrains.some(v => v.registered.includes(tileTerrain) || v.vanilla === tileTerrain);
                    if (typeId) { 
                        usePaintAction(color, undefined, tileTerrain);
                    }
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

            const ths = ColorsEverywhere.INSTANCE;
            const mappedDoodads = ths.mappedDoodads();
            const mappedTerrains = ths.mappedTerrains();

            function useRemovePaintAction (doodadType?: DoodadType, terrainType?: TerrainType) {

                if (doodadType) {
                    mappedDoodads.map(vanillaType => {
                        const color = ths.getDoodadColor(doodadType);
                        if (doodadType === vanillaType.registered[color]) {
                            tileDoodad?.changeType(vanillaType.vanilla);
                            item.returns();
                        }
                    })
                }

                if (terrainType) {
                    mappedTerrains.map(vanillaType => {
                        const color = ths.getTileColor(terrainType);
                        if (terrainType === vanillaType.registered[color]) {
                            game.changeTile(vanillaType.vanilla, tilePosition.x, tilePosition.y, tilePosition.z, false);
                            item.returns();
                        }
                    })
                }

                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[Colors.White]);

            }

            if (tileDoodad || tileTerrain) {
                if (tileDoodad) {
                    const typeId = mappedDoodads.some(v => v.registered.includes(tileDoodad!.type));
                    if (typeId) {
                        useRemovePaintAction(tileDoodad?.type);
                    }
                }
                if (tileTerrain) {
                    const typeId = mappedTerrains.some(v => v.registered.includes(tileTerrain));
                    if (typeId) {
                        useRemovePaintAction(undefined, tileTerrain);
                    }
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

    public getDyeList(): DoodadType[] {
        return [
            ...this.doodadsDyes
        ];
    }

    public mappedEquipment() {
        return [
            { vanilla: ItemType.LeatherTunic, registered: [...this.itemsLeatherTunics] },
            { vanilla: ItemType.LeatherBelt, registered: [...this.itemsLeatherBelts] }
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
                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, rgbColors[existingColor]);

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
    private itemOrig: IItemDescription[] = [];

    private addDyeActions() {
        const dyeItemTypes = this.mappedEquipment();
        dyeItemTypes.map( itemType => {
            this.itemOrig.push({...itemDescriptions[itemType.vanilla]});
            const itemTypeName = itemDescriptions[itemType.vanilla];
            if (itemTypeName) {
                !itemTypeName.use ? itemTypeName.use = [ColorsEverywhere.INSTANCE.actionDyeItem] : undefined;
            }
        })
    }

    private removeDyeActions() {
        const dyeItemTypes = this.mappedEquipment();
        dyeItemTypes.map( itemType => {
            this.itemOrig.map(value => {
                itemDescriptions[itemType.vanilla] = value;
            })
        })
        this.itemOrig = [];
    }

    @Override public onLoad () {

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

    @Override public onUnload () {
        itemDescriptions[ItemType.MilkThistleFlowers] = this.milkThistleOrig;

        // Remove dye actions
        this.removeDyeActions();
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
