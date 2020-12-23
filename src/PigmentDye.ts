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
import { BlackPaintbrushDescription, BluePaintbrushDescription, GreenPaintbrushDescription, OrangePaintbrushDescription, PaintbrushDescription, PurplePaintbrushDescription, RedPaintbrushDescription, StoneBowlDescription, WhitePaintbrushDescription, YellowPaintbrushDescription } from "./tools/Tools";
import TileHelpers from "utilities/TileHelpers";
import { BlackWoodenChestDescription, BlueWoodenChestDescription, GreenWoodenChestDescription, OrangeWoodenChestDescription, PurpleWoodenChestDescription, RedWoodenChestDescription, WhiteWoodenChestDescription, YellowWoodenChestDescription } from "./chests/Chests";
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
    // Register chests - W,B,R,Y,B,O,G,P
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


    ////////////////////////////////////////////////////////////
    // Register messages
    ////////////////////////////////////////////////////////////

    @Register.message("PaintbrushNotDirty")
    public readonly messagePaintbrushNotDirty: Message;
    
    @Register.message("NoWaterSource")
    public readonly messageNoWaterSource: Message;
    

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
                PigmentDye.INSTANCE.doodadWhiteWoodenChest,
                PigmentDye.INSTANCE.doodadBlackWoodenChest,
                PigmentDye.INSTANCE.doodadRedWoodenChest,
                PigmentDye.INSTANCE.doodadYellowWoodenChest,
                PigmentDye.INSTANCE.doodadBlueWoodenChest,
                PigmentDye.INSTANCE.doodadOrangeWoodenChest,
                PigmentDye.INSTANCE.doodadGreenWoodenChest,
                PigmentDye.INSTANCE.doodadPurpleWoodenChest
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
