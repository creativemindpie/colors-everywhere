import { IRGB } from "utilities/Color";

export function particleColor(color: string): IRGB {

    const colorName = `${color}RGB`;
    const defaultColorValue = rgbColors[0].value;
    let dynamicColorValue = defaultColorValue;

    rgbColors.find(n => { 
        if (n.name === colorName) { dynamicColorValue = n.value; }
    })

   return dynamicColorValue;

}

export const bulkColors = ["White","Black","Red","Yellow","Blue","Orange","Green","Purple"] as const;

// RGB Colors
export const rgbColors = [
    { name: 'whiteRGB', value: { r: 255, g: 255, b: 255 } },
    { name: 'blackRGB', value: { r: 16, g: 16, b: 16 } },
    { name: 'redRGB', value: { r: 100, g: 0, b: 0 } },
    { name: 'yellowRGB', value: { r: 247, g: 232, b: 62 } },
    { name: 'blueRGB', value: { r: 10, g: 112, b: 216 } },
    { name: 'orangeRGB', value: { r: 216, g: 112, b: 10 } },
    { name: 'greenRGB', value: { r: 50, g: 189, b: 32 } },
    { name: 'purpleRGB', value: { r: 144, g: 44, b: 207 } }
];