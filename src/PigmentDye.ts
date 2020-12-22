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
import { RedDyeDescription } from "./dyes/Dyes";
import { CornflowerDescription, CornflowerSeedsDescription, CornflowerDoodadDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { BluePigmentIngredientGroup, RedPigmentIngredientGroup, YellowPigmentIngredientGroup } from "./pigments/PigmentGroups";
import { BluePigmentDescription, GreenPigmentDescription, OrangePigmentDescription, PurplePigmentDescription, RedPigmentDescription, YellowPigmentDescription } from "./pigments/Pigments";
import { GreenPaintbrushDescription, PaintbrushDescription, RedPaintbrushDescription, StoneBowlDescription } from "./tools/Tools";
import TileHelpers from "utilities/TileHelpers";
import { GreenWoodenChestDescription, RedWoodenChestDescription } from "./chests/Chests";
import { BaseStatsDoodadWoodenChest } from "./chests/BaseDoodad";
import Enums from "utilities/enum/Enums";
import { rgbColors } from "./utils/Utils";
import { IRGB } from "utilities/Color";
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

    @Register.itemGroup("RedPigmentIngredientGroup", { ...RedPigmentIngredientGroup })
    public itemRedPigmentIngredientGroup: ItemTypeGroup;

    @Register.itemGroup("YellowPigmentIngredientGroup", { ...YellowPigmentIngredientGroup })
    public itemYellowPigmentIngredientGroup: ItemTypeGroup;

    @Register.itemGroup("BluePigmentIngredientGroup", { ...BluePigmentIngredientGroup })
    public itemBluePigmentIngredientGroup: ItemTypeGroup;


    ////////////////////////////////////////////////////////////
    // Register pigments
    ////////////////////////////////////////////////////////////

    @Register.item("RedPigment", { ...RedPigmentDescription })
    public itemRedPigment: ItemType;

    @Register.item("YellowPigment", { ...YellowPigmentDescription })
    public itemYellowPigment: ItemType;

    @Register.item("BluePigment", { ...BluePigmentDescription })
    public itemBluePigment: ItemType;

    @Register.item("OrangePigment", { ...OrangePigmentDescription })
    public itemOrangePigment: ItemType;

    @Register.item("PurplePigment", { ...PurplePigmentDescription })
    public itemPurplePigment: ItemType;

    @Register.item("GreenPigment", { ...GreenPigmentDescription })
    public itemGreenPigment: ItemType;


    ////////////////////////////////////////////////////////////
    // Register dyes
    ////////////////////////////////////////////////////////////

    @Register.item("RedDye", { ...RedDyeDescription })
    public itemRedDye: ItemType;
    

    ////////////////////////////////////////////////////////////
    // Register tools
    ////////////////////////////////////////////////////////////

    @Register.item("StoneBowl", { ...StoneBowlDescription })
    public itemStoneBowl: ItemType;

    @Register.item("Paintbrush", { ...PaintbrushDescription })
    public itemPaintbrush: ItemType;

    @Register.item("RedPaintbrush", { ...RedPaintbrushDescription })
    public itemRedPaintbrush: ItemType;

    @Register.item("GreenPaintbrush", { ...GreenPaintbrushDescription })
    public itemGreenPaintbrush: ItemType;
    

    ////////////////////////////////////////////////////////////
    // Register tools
    ////////////////////////////////////////////////////////////

    @Register.message("PaintbrushNotDirty")
    public readonly messagePaintbrushNotDirty: Message;
    
    @Register.message("NoWaterSource")
    public readonly messageNoWaterSource: Message;


    ////////////////////////////////////////////////////////////
    // Register chests
    ////////////////////////////////////////////////////////////
    
    @Register.item("RedWoodenChest", { 
        ... RedWoodenChestDescription,
        groups: [ItemTypeGroup.Storage]
    })
    public itemRedWoodenChest: ItemType;

    @Register.doodad("RedWoodenChest", {
        ...BaseStatsDoodadWoodenChest,
        pickUp: [Registry<PigmentDye>().get('itemRedWoodenChest')]
    })
    public doodadRedWoodenChest: DoodadType;

    // --

    @Register.item("GreenWoodenChest", { 
        ... GreenWoodenChestDescription,
        groups: [ItemTypeGroup.Storage]
    })
    public itemGreenWoodenChest: ItemType;

    @Register.doodad("GreenWoodenChest", {
        ...BaseStatsDoodadWoodenChest,
        pickUp: [Registry<PigmentDye>().get('itemGreenWoodenChest')]
    })
    public doodadGreenWoodenChest: DoodadType;
    

    ////////////////////////////////////////////////////////////
    // Register actions
    ////////////////////////////////////////////////////////////

    @Register.action("Paint", new Action(ActionArgument.ItemNearby)
		.setUsableBy(EntityType.Player)
		.setHandler((action, item) => {

            const doodadTypeList = [
                DoodadType.WoodenChest,
                DoodadType.WroughtIronChest,
                DoodadType.IronChest,
                DoodadType.CopperChest,
                PigmentDye.INSTANCE.doodadRedWoodenChest,
                PigmentDye.INSTANCE.doodadGreenWoodenChest
            ];

			const player = action.executor;
			const tile = player.getFacingTile();
            const tileDoodad = tile.doodad;

            const itemName = item.getName(false,1,false,false).toString();
            const itemSplitName = itemName.split(' ').shift();
            let itemColorName = itemSplitName ? itemSplitName : '';

            function particleColor(color: string): IRGB {

                const colorName = `${color}RGB`;
                const defaultColorValue = rgbColors[0].value;
                let dynamicColorValue = defaultColorValue;

                rgbColors.find(n => { 
                    if (n.name === colorName) { dynamicColorValue = n.value; }
                })

               return dynamicColorValue;

            }

            function usePaintAction(doodadType: DoodadType, color: string) {

                const colorName = color.charAt(0).toUpperCase() + color.slice(1);
                const doodadKeys = Enums.toString(DoodadType, doodadType);
                let doodadKeyName = doodadKeys.split(" | ").pop();

                // Can't paint it the same color
                if (doodadKeyName?.includes(colorName)) { 
                    console.log('You cant do that');
                    return;
                }

                // Painting over the paint
                if (doodadKeyName?.includes('ModPigmentDye')) { 
                    const removedModName = doodadKeyName.replace('ModPigmentDye', '');
                    const colorArray = ['Red', 'Yellow', 'Blue', 'Green', 'Orange', 'Purple'];
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
                // item.changeInto(PigmentDye.INSTANCE.itemPaintbrush);

            }

            if (tileDoodad && doodadTypeList.includes(tileDoodad.type)) {
                usePaintAction(tileDoodad?.type, itemColorName);
            } else {
                console.log('You paint nothing Jon snow.');
            }

			game.passTurn(player);
        }))
        
    public readonly actionPaint: ActionType;

    @Register.action("CleanPaintbrush", new Action(ActionArgument.Item)
		.setUsableBy(EntityType.Player)
		.setHandler((action, item) => {

            const player = action.executor;
            const tile = player.getFacingTile();
            const tileDoodad = tile.doodad;
            const terrainType = TileHelpers.getType(tile);
            const cleanBrush = PigmentDye.INSTANCE.itemPaintbrush;

            function cleanIt() {
                game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, { r: 12, g: 128, b: 247 });
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
            localPlayer.createItemInInventory(this.itemGreenPaintbrush, Quality.Exceptional);
            localPlayer.createItemInInventory(ItemType.WoodenChest);
            localPlayer.createItemInInventory(ItemType.WoodenPole);
            localPlayer.createItemInInventory(ItemType.String);
		}
	}


}
