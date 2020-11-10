import { DoodadType } from "doodad/IDoodad";
import { ItemType, ItemTypeGroup } from "item/IItem";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import Register, { Registry } from "mod/ModRegistry";
import { CornflowerDescription, CornflowerSeedsDescription, CornflowerDoodadDescription } from "./flowers/Cornflower";
import { RoseDescription, RoseDoodadDescription, RoseSeedsDescription } from "./flowers/Rose";
import { SunflowerDescription, SunflowerDoodadDescription, SunflowerSeedsDescription } from "./flowers/Sunflower";
import { BluePigmentGroup, GreenPigmentGroup, OrangePigmentGroup, PigmentGroup, PurplePigmentGroup, RedPigmentGroup, YellowPigmentGroup } from "./pigments/PigmentGroups";
import { BluePigmentDescription, GreenPigmentDescription, OrangePigmentDescription, PurplePigmentDescription, RedPigmentDescription, YellowPigmentDescription } from "./pigments/Pigments";

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

    @Register.itemGroup("PigmentGroup", { ...PigmentGroup })
    public itemPigmentGroup: ItemTypeGroup;

    @Register.itemGroup("RedPigmentGroup", { ...RedPigmentGroup })
    public itemRedPigmentGroup: ItemTypeGroup;

    @Register.itemGroup("YellowPigmentGroup", { ...YellowPigmentGroup })
    public itemYellowPigmentGroup: ItemTypeGroup;

    @Register.itemGroup("BluePigmentGroup", { ...BluePigmentGroup })
    public itemBluePigmentGroup: ItemTypeGroup;

    @Register.itemGroup("OrangePigmentGroup", { ...OrangePigmentGroup })
    public itemOrangePigmentGroup: ItemTypeGroup;

    @Register.itemGroup("PurplePigmentGroup", { ...PurplePigmentGroup })
    public itemPurplePigmentGroup: ItemTypeGroup;

    @Register.itemGroup("GreenPigmentGroup", { ...GreenPigmentGroup })
    public itemGreenPigmentGroup: ItemTypeGroup;


    ////////////////////////////////////////////////////////////
    // Register pigments
    ////////////////////////////////////////////////////////////

    @Register.item("RedPigment", { 
        ...RedPigmentDescription,
        groups: [Registry<PigmentDye>().get("itemPigmentGroup"), Registry<PigmentDye>().get("itemRedPigmentGroup")]
    })
    public itemRedPigment: ItemType;

    @Register.item("YellowPigment", { 
        ...YellowPigmentDescription,
        groups: [Registry<PigmentDye>().get("itemPigmentGroup"), Registry<PigmentDye>().get("itemYellowPigmentGroup")]
    })
    public itemYellowPigment: ItemType;

    @Register.item("BluePigment", { 
        ...BluePigmentDescription,
        groups: [Registry<PigmentDye>().get("itemPigmentGroup"), Registry<PigmentDye>().get("itemBluePigmentGroup")]
    })
    public itemBluePigment: ItemType;

    @Register.item("OrangePigment", { 
        ...OrangePigmentDescription,
        groups: [Registry<PigmentDye>().get("itemPigmentGroup"), Registry<PigmentDye>().get("itemOrangePigmentGroup")]
    })
    public itemOrangePigment: ItemType;

    @Register.item("PurplePigment", { 
        ...PurplePigmentDescription,
        groups: [Registry<PigmentDye>().get("itemPigmentGroup"), Registry<PigmentDye>().get("itemPurplePigmentGroup")]
    })
    public itemPurplePigment: ItemType;

    @Register.item("GreenPigment", { 
        ...GreenPigmentDescription,
        groups: [Registry<PigmentDye>().get("itemPigmentGroup"), Registry<PigmentDye>().get("itemGreenPigmentGroup")]
    })
    public itemGreenPigment: ItemType;

    
    ////////////////////////////////////////////////////////////
    // Overrides
    ////////////////////////////////////////////////////////////

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
            // localPlayer.createItemInInventory(ItemType.MilkThistleFlowers);
		}
	}


}
