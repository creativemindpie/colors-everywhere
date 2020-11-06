import { DoodadType } from "doodad/IDoodad";
import { ActionType } from "entity/action/IAction";
import { ItemType, ItemTypeGroup } from "item/IItem";
import Mod from "mod/Mod";
import Register from "mod/ModRegistry";
import { CornflowerDescription } from "./Cornflower";

export default class PigmentDye extends Mod {

    @Mod.instance<PigmentDye>("PigmentDye")
    public static readonly INSTANCE: PigmentDye;

    // Register new flower type

    @Register.item("Cornflower", {
        use: [ActionType.Gather],
        weight: 0.1,
        // onUse: { [ActionType.Build] : Registry<ColorChests>().get('doodadBlackWoodenChest')},
        // doodadContainer: Registry<ColorChests>().get('doodadBlackWoodenChest'),
        // placeDownType: Registry<ColorChests>().get('doodadBlackWoodenChest'),
        groups: [ItemTypeGroup.Medicinal]
    })
    public itemCornflower: ItemType;

    @Register.item("CornflowerSeeds", {
        use: [ActionType.Plant],
        weight: 0.05,
        // onUse: { [ActionType.Build] : Registry<ColorChests>().get('doodadBlackWoodenChest')},
        // doodadContainer: Registry<ColorChests>().get('doodadBlackWoodenChest'),
        // placeDownType: Registry<ColorChests>().get('doodadBlackWoodenChest'),
        groups: [ItemTypeGroup.Medicinal]
    })
    public itemCornflowerSeeds: ItemType;

    @Register.doodad("Cornflower", {
        ...CornflowerDescription
    })
    public doodadCornflower: DoodadType;


}
