import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "../ColorsEverywhere";
import { Colors, MOD_NAME } from "../IColorsEverywhere";

export const DyeGroup = {
    default: Registry<ColorsEverywhere>("Colors Everywhere").get(`itemsDyes`, Colors.White),
    types: [
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.White),
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.Black),
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.Red),
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.Yellow),
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.Blue),
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.Orange),
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.Green),
        Registry<ColorsEverywhere>(MOD_NAME).get(`itemsDyes`, Colors.Purple)
    ]
}