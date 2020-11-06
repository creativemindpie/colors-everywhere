import { DoodadType } from "doodad/IDoodad";
import { ItemType } from "item/IItem";
import { HookMethod } from "mod/IHookHost";
import Mod from "mod/Mod";
import Register from "mod/ModRegistry";
import { CornflowerDescription, CornflowerSeedsDescription, CornflowerDoodadDescription } from "./Cornflower";

export default class PigmentDye extends Mod {

    @Mod.instance<PigmentDye>("PigmentDye")
    public static readonly INSTANCE: PigmentDye;

    ////////////////////////////////////////////////////////////
    // Register new flower types
    ////////////////////////////////////////////////////////////

    @Register.item("Cornflower", { ...CornflowerDescription })
    public itemCornflower: ItemType;

    @Register.item("CornflowerSeeds", { ...CornflowerSeedsDescription })
    public itemCornflowerSeeds: ItemType;

    @Register.doodad("Cornflower", { ...CornflowerDoodadDescription })
    public doodadCornflower: DoodadType;

    // ------------------------------------------------------ //

    @Override @HookMethod
	public onGameStart(isLoadingSave: boolean, playedCount: number): void {
		if (!isLoadingSave) {
            localPlayer.createItemInInventory(ItemType.IronHoe);
            localPlayer.createItemInInventory(this.itemCornflower);
            localPlayer.createItemInInventory(this.itemCornflowerSeeds);
		}
	}


}
