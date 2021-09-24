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
    "itemsLeatherTunics"
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
            use: [Registry<ColorsEverywhere>(MOD_NAME).get('actionDyeItem')],
            groups: [ItemTypeGroup.Equipment]
        })))
    public itemsLeatherTunics: ItemType[];


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
            ...this.terrainsCobblestoneFlooring,
            ...this.terrainsWoodenFlooring,
            ...this.terrainsClayFlooring,
            ...this.terrainsAshCementFlooring
        ]
    }

    public getVanillaTerrainList (): TerrainType[] {
        return [
            TerrainType.CobblestoneFlooring,
            TerrainType.WoodenFlooring,
            TerrainType.ClayFlooring,
            TerrainType.AshCementFlooring
        ]
    }

    public getDoodadList (): DoodadType[] {
        return [
            ...this.doodadsWoodenChests,
            ...this.doodadsCopperChests,
            ...this.doodadsWroughtIronChests,
            ...this.doodadsIronChests,
            ...this.doodadsTinChests,
            ...this.doodadsBronzeChests,
            ...this.doodadsOrnateWoodenChests,
            ...this.doodadsStoneWalls,
            ...this.doodadsWoodenWalls,
            ...this.doodadsWoodenFences,
            ...this.doodadsWoodenDoors,
            ...this.doodadsWoodenDoorsOpen,
            ...this.doodadsWoodenGates,
            ...this.doodadsWoodenGatesOpen,
            ...this.doodadsClayWalls,
            ...this.doodadsAshCementWalls
        ];
    }

    public getVanillaDoodadList (): DoodadType[] {
        return [
            DoodadType.WoodenChest,
            DoodadType.CopperChest,
            DoodadType.WroughtIronChest,
            DoodadType.IronChest,
            DoodadType.TinChest,
            DoodadType.BronzeChest,
            DoodadType.OrnateWoodenChest,
            DoodadType.StoneWall,
            DoodadType.WoodenWall,
            DoodadType.WoodenDoor,
            DoodadType.WoodenDoorOpen,
            DoodadType.WoodenFence,
            DoodadType.WoodenGate,
            DoodadType.WoodenGateOpen,
            DoodadType.ClayWall,
            DoodadType.AshCementWall
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
            const doodadVanillaTypeList = ths.getVanillaDoodadList();
            const terrainTypeList = ths.getTerrainList();
            const terrainVanillaTypeList = ths.getVanillaTerrainList();

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
                    if (doodadBulkRegistration ) {
                        tileDoodad?.changeType(doodadBulkRegistration[color]);
                    } else {
                        doodadVanillaTypeList.map(() => {
                            
                            doodadType === DoodadType.WoodenChest ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenChests[color]) : null

                            doodadType === DoodadType.CopperChest ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsCopperChests[color]) : null

                            doodadType === DoodadType.WroughtIronChest ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWroughtIronChests[color]) : null
                            
                            doodadType === DoodadType.IronChest ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsIronChests[color]) : null

                            doodadType === DoodadType.TinChest ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsTinChests[color]) : null

                            doodadType === DoodadType.BronzeChest ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsBronzeChests[color]) : null

                            doodadType === DoodadType.OrnateWoodenChest ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsOrnateWoodenChests[color]) : null

                            doodadType === DoodadType.StoneWall ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsStoneWalls[color]) : null

                            doodadType === DoodadType.ClayWall ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsClayWalls[color]) : null

                            doodadType === DoodadType.AshCementWall ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsAshCementWalls[color]) : null

                            doodadType === DoodadType.WoodenWall ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenWalls[color]) : null

                            doodadType === DoodadType.WoodenFence ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenFences[color]) : null

                            doodadType === DoodadType.WoodenDoorOpen ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenDoorsOpen[color]) : null

                            doodadType === DoodadType.WoodenGate ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenGates[color]) : null

                            doodadType === DoodadType.WoodenGateOpen ? 
                            tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenGatesOpen[color]) : null

                        })
                    }
                } else {
                    // Implied wooden door since index is 0
                    tileDoodad?.changeType(ColorsEverywhere.INSTANCE.doodadsWoodenDoors[color])
                }

                if (terrainType) {
                    const terrainBulkRegistration = ths.getTerrainBulkRegistration(terrainType);
                    if (terrainBulkRegistration) {
                        game.changeTile(terrainBulkRegistration[color], tilePosition.x, tilePosition.y, tilePosition.z, false)
                    } else {
                        terrainVanillaTypeList.map(() => {

                            function changeTile(newTileInfo: TerrainType) {
                                return game.changeTile(newTileInfo, tilePosition.x, tilePosition.y, tilePosition.z, false)
                            }

                            terrainType === TerrainType.CobblestoneFlooring ? 
                            changeTile(ColorsEverywhere.INSTANCE.terrainsCobblestoneFlooring[color]) : null

                            terrainType === TerrainType.WoodenFlooring ? 
                            changeTile(ColorsEverywhere.INSTANCE.terrainsWoodenFlooring[color]) : null

                            terrainType === TerrainType.ClayFlooring ? 
                            changeTile(ColorsEverywhere.INSTANCE.terrainsClayFlooring[color]) : null

                            terrainType === TerrainType.AshCementFlooring ? 
                            changeTile(ColorsEverywhere.INSTANCE.terrainsAshCementFlooring[color]) : null

                        })
                    }
                }

                item.returns();
            }

            if (tileDoodad || tileTerrain) {
                if (tileDoodad) {
                    if (doodadTypeList.includes(tileDoodad!.type) || doodadVanillaTypeList.includes(tileDoodad!.type)) {
                        usePaintAction(color, tileDoodad?.type);
                    }
                }
                if ((tileTerrain && terrainTypeList.includes(tileTerrain)) || (tileTerrain && terrainVanillaTypeList.includes(tileTerrain))) {
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

    public getDyeList (): DoodadType[] {
        return [
            ...this.doodadsDyes
        ];
    }

    public getVanillaEquipment (): ItemType[] {
        return [
            ItemType.LeatherTunic
        ];
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
            const vanillaEquipment = ths.getVanillaEquipment();
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
                        vanillaEquipment.map(() => {

                            itemType === ItemType.LeatherTunic ?
                            item.changeInto(ColorsEverywhere.INSTANCE.itemsLeatherTunics[doodadColor]) : null

                        })
                    }
                }

            }

            if (tileDoodad) {
                if (dyeTubs.includes(tileDoodad!.type)) {
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
    private leatherTunicOrig: IItemDescription;

    @Override public onLoad () {

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

        // Leather Tunic
        this.leatherTunicOrig = itemDescriptions[ItemType.LeatherTunic];
        const leatherTunic = itemDescriptions[ItemType.LeatherTunic];

        if (leatherTunic) {
            // Append dye action
            !leatherTunic.use ? leatherTunic.use = [ColorsEverywhere.INSTANCE.actionDyeItem] : undefined;
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
