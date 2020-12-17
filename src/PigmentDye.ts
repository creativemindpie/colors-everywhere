import { DoodadType } from "doodad/IDoodad";
import { Action } from "entity/action/Action";
import { ActionArgument, ActionType } from "entity/action/IAction";
import { EntityType } from "entity/IEntity";
import { SkillType } from "entity/IHuman";
import { IItemDescription, ItemType, ItemTypeGroup } from "item/IItem";
import { itemDescriptions } from "item/Items";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import Register from "mod/ModRegistry";
import { RedDyeDescription } from "./dyes/Dyes";
import { CornflowerDescription, CornflowerSeedsDescription, CornflowerDoodadDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { BluePigmentIngredientGroup, RedPigmentIngredientGroup, YellowPigmentIngredientGroup } from "./pigments/PigmentGroups";
import { BluePigmentDescription, GreenPigmentDescription, OrangePigmentDescription, PurplePigmentDescription, RedPigmentDescription, YellowPigmentDescription } from "./pigments/Pigments";
import { PaintbrushDescription, StoneBowlDescription } from "./tools/Tools";


export default class PigmentDye extends Mod {

    @Mod.instance<PigmentDye>("PigmentDye")
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

    ////////////////////////////////////////////////////////////
    // Register actions
    ////////////////////////////////////////////////////////////

    @Register.action("PaintChest", new Action(ActionArgument.ItemNearby)
		.setUsableBy(EntityType.Player)
		.setHandler((action, item) => {

			const player = action.executor;
			const tile = player.getFacingTile();
            const tileDoodad = tile.doodad;

            if (tileDoodad && tileDoodad.type === DoodadType.WoodenChest) {
                const tileDoodadDescription = tileDoodad.description();
                if (tileDoodadDescription) { 
                    tileDoodadDescription.imagePath = 'redchest.png';
                }
            }

			game.particle.create(player.x + player.direction.x, player.y + player.direction.y, player.z, { r: 12, g: 128, b: 247 });
			// item.changeInto(PigmentDye.INSTANCE.itemPaintbrush);
			game.passTurn(player);
        }))
        
	public readonly actionPaintChest: ActionType;

    
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
            localPlayer.createItemInInventory(this.itemPaintbrush);
            localPlayer.createItemInInventory(ItemType.WoodenChest);
            localPlayer.createItemInInventory(ItemType.WoodenPole);
            localPlayer.createItemInInventory(ItemType.String);
		}
	}


}
