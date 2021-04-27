import { IRGB } from "utilities/Color";
import { Colors } from "../IColorsEverywhere";

// RGB Colors
export const rgbColors: Record<Colors, IRGB> = {
    [Colors.White]: { r: 255, g: 255, b: 255 },
    [Colors.Black]: { r: 16, g: 16, b: 16 },
    [Colors.Red]: { r: 100, g: 0, b: 0 },
    [Colors.Yellow]: { r: 247, g: 232, b: 62 },
    [Colors.Blue]: { r: 10, g: 112, b: 216 },
    [Colors.Orange]: { r: 216, g: 112, b: 10 },
    [Colors.Green]: { r: 50, g: 189, b: 32 },
    [Colors.Purple]: { r: 144, g: 44, b: 207 }
};
