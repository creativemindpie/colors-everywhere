const fs = require('fs');

const Colors = {
	white: "White",
	black: "Black",
	red: "Red",
	yellow: "Yellow",
    blue: "Blue",
    orange: "Orange",
    green: "Green",
    purple: "Purple"
}

const baseName = 'modColorsEverywhere';

let data = new Object({
    extends: "English",
    dictionaries: {
        [`${baseName}ColorsEverywhere`]: {
            specialThanks: "A huge thanks to the developers for being available and always answering questions. Drathy, Chiri, Spacetech you all rock! To all my other modders, a huge thanks as well. We support each other and make the community great!"
        },
        dialog: {
            [`${baseName}ColorsEverywhereDialog`]: "Special Thanks",
        },
        item: {
            // Static entries
            [`${baseName}Cornflower`]: ["cornflower", "A beautiful cornflower. Can be used to create pigment."],
			[`${baseName}CornflowerSeeds`]: ["cornflower seeds", "Cornflower seeds. Plant them and make more cornflowers to harvest."],
			[`${baseName}Rose`]: ["rose", "A beautiful rose. Can be used to create pigment."],
			[`${baseName}RoseSeeds`]: ["rose seeds", "Rose seeds. Plant them and make more roses to harvest."],
			[`${baseName}Sunflower`]: ["sunflower", "A beautiful sunflower. Can be used to create pigment."],
			[`${baseName}SunflowerSeeds`]: ["sunflower seeds", "Sunflower seeds. Plant them and make more sunflowers to harvest."],
            [`${baseName}StoneBowl`]: ["stone bowl", "A bowl used to hold any dyes created."],
			[`${baseName}Paintbrush`]: ["paintbrush", "A paintbrush that can be used to apply dye."],
			[`${baseName}DyeRemover`]: ["paint remover", "A brush that can be used to remove paint from surfaces."]
        },
        doodad: {
            // Static entries
            [`${baseName}Cornflower`]: ["cornflower", "A beautiful cornflower."],
			[`${baseName}Rose`]: ["rose", "A beautiful rose."],
			[`${baseName}Sunflower`]: ["sunflower", "A beautiful sunflower."]
        },
        terrain: {
            // No static entry, built from color combos.
        },
        itemGroup: {
            // Static entries
            [`${baseName}ItemWhitePigmentIngredientGroup`]: ["white pigments", "Pigments of white color."],
			[`${baseName}ItemBlackPigmentIngredientGroup`]: ["black pigments", "Pigments of black color."],
			[`${baseName}ItemRedPigmentIngredientGroup`]: ["red pigments", "Pigments of red color. Perhaps you can mix it with another color..."],
			[`${baseName}ItemYellowPigmentIngredientGroup`]: ["yellow pigments", "Pigments of yellow color. Perhaps you can mix it with another color..."],
			[`${baseName}ItemBluePigmentIngredientGroup`]: ["blue pigments", "Pigments of blue color. Perhaps you can mix it with another color..."],
            [`${baseName}DyeGroup`]: ["dye group", "Dyes"]
        },
        action: {
            // Static entries
            [`${baseName}PaintDoodad`]: ["Paint", "Paint a chest perhaps."],
            [`${baseName}PaintTerrain`]: ["Paint Floor", "Change the color of the terrain."],
			[`${baseName}RemovePaintDoodad`]: ["Remove Paint", "Clean the paint off and restore to its original look."],
            [`${baseName}RemovePaintTerrain`]: ["Remove Floor Paint", "Clean the paint off the floor and restore to its original look."],
			[`${baseName}CleanPaintbrush`]: ["Clean Paintbrush", "Remove the dye from your brush."],
            [`${baseName}DyeItem`]: ["Dye Item", "Dye the item the color of the bowl you are facing."]
        },
        message: {
            // Static entries
            [`${baseName}PaintbrushNotDirty`]: "{#--text-secondary: The paintbrush is already clean.}",
			[`${baseName}NoWaterSource`]: "{#--color-message-bad: You need water to do that.}",
			[`${baseName}NoDyeSource`]: "{#--color-message-bad: You need to be facing a dye bowl to do that.}",
			[`${baseName}NoSameColor`]: "{#--color-message-attack: That just feels like a waste of dye, doesn't it...}",
			[`${baseName}NoDyeAllowed`]: "{#--color-message-attack: You swipe your brush frantically in the air, dying absolutely... nothing.}"
        }
    }
});

// Color combo entries
for (const value in Colors) {

    // Item
    const pigment = {[`${baseName}${Colors[value]}Pigment`]: [`${value} pigment`, `${Colors[value]} pigment to be used in creating dye.`]}
    const paintbrush = {[`${baseName}${Colors[value]}Paintbrush`]: [`${value} paintbrush`, `A paintbrush with ${value} dye.`]}
    const dyeItem = {[`${baseName}${Colors[value]}Dye`]: [`${value} dye bowl`, `A bowl of ${value} dye. Can be placed down to dye equipment.`]}
    const armoredScaleBelt = {[`${baseName}${Colors[value]}ArmoredScaleBelt`]: [`${value} armored scale belt`, `Together with string and armored scales, this garment is meant to hold up any leggings or pants while providing defense to your waist section.`]}
    const armoredScaleVest =  {[`${baseName}${Colors[value]}ArmoredScaleVest`]: [`${value} armored scale vest`, `Armor crafted with alternating small and large keratin scales arranged in the shape of a vest.`]}
    const armoredScaleBoots = {[`${baseName}${Colors[value]}ArmoredScaleBoots`]: [`${value} armored scale boots`, `Finely crafted boots, made from armored scales and tightly wrapped and sewn together in the form of footwear.`]}
    const armoredScaleCrown = {[`${baseName}${Colors[value]}ArmoredScaleCrown`]: [`${value} armored scale crown`, `An arrangement of armored scales shaped into a headband appearing like a crown when worn.`]}
    const armoredScaleBevor = {[`${baseName}${Colors[value]}ArmoredScaleBevor`]: [`${value} armored scale bevor`, `A rather uncomplicated piece of neck protecting armor made from armored scales.`]}
    const armoredScaleCuisses = {[`${baseName}${Colors[value]}ArmoredScaleCuisses`]: [`${value} armored scale cuisses`, `Thigh and leg coverings crafted with armored keratin-based scales.`]}
    const armoredScaleGloves = {[`${baseName}${Colors[value]}ArmoredScaleGloves`]: [`${value} armored scale gloves`, `A pair of gloves crafted with armored scales. Not the most comfortable, but appears to be quite protective on one's hands.`]}
    const barkLeggings = {[`${baseName}${Colors[value]}BarkLeggings`]: [`${value} bark leggings`, `Rudimentary leg armor, crafted from strong tree bark and secured with string.`]}
    const barkShield = {[`${baseName}${Colors[value]}BarkShield`]: [`${value} bark shield`, `A makeshift shield, used to block incoming attacks, made with tree bark and wrapped with string.`]}
    const barkTunic = {[`${baseName}${Colors[value]}BarkTunic`]: [`${value} bark tunic`, `Tree bark chest armor bound together with string.`]}
    const cobblestoneFlooring = {[`${baseName}${Colors[value]}CobblestoneFlooring`]: [`${value} cobblestone flooring`, `Primitive flooring created by placing stones in an organized pattern, filling any gaps.`]}
    const skullcap = {[`${baseName}${Colors[value]}Skullcap`]: [`${value} skullcap`, `A hollowed-out animal skull, useful as a provisional helmet.`]}
    const graniteWall = {[`${baseName}${Colors[value]}GraniteWall`]: [`${value} granite wall`, `A series of interlaced stones and rocks, shaped into a vertical wall structure. Can be built to keep enemies out.`]}
    const bow = {[`${baseName}${Colors[value]}Bow`]: [`${value} bow`, `A bent wooden pole with a shorter string tied to both ends. The tension of the string is used to fire arrows.`]}
    const smallBag = {[`${baseName}${Colors[value]}SmallBag`]: [`${value} small bag`, `A leather pouch used for holding a few items, carried at your waist, reducing encumbrance.`]}
    const leatherBelt = {[`${baseName}${Colors[value]}LeatherBelt`]: [`${value} leather belt`, `Made from tanned animal hide, cut, wrapped, and stitched together to tie around the waist.`]}
    const leatherTunic = {[`${baseName}${Colors[value]}LeatherTunic`]: [`${value} leather tunic`, `A leather garment which provides protection for the torso.`]}
    const leatherBoots = {[`${baseName}${Colors[value]}LeatherBoots`]: [`${value} leather boots`, `Malleable yet tough foot protection, crafted from tanned animal hide.`]}
    const leatherCap = {[`${baseName}${Colors[value]}LeatherCap`]: [`${value} leather cap`, `A hat made of leather, double layered for extra sturdiness.`]}
    const leatherGorget = {[`${baseName}${Colors[value]}LeatherGorget`]: [`${value} leather gorget`, `A circlet of leather, bound in two, stitched together and used as neck protection.`]}
    const leatherPants = {[`${baseName}${Colors[value]}LeatherPants`]: [`${value} leather pants`, `Basic leather leggings with just enough padding to provide some leg protection.`]}
    const leatherGloves = {[`${baseName}${Colors[value]}LeatherGloves`]: [`${value} leather gloves`, `Leather-bound hand protection, crafted from tanned animal hide.`]}
    const backpack = {[`${baseName}${Colors[value]}Backpack`]: [`${value} backpack`, `Crafted with leather, it's suitable for holding many items on your back, reducing overall weight.`]}
    const woodenChest = {[`${baseName}${Colors[value]}WoodenChest`]: [`${value} wooden chest`, `A large wooden container that can fit many items while placed on the ground. Foods will decay slower within it.`]}
    const ironBreastplate = {[`${baseName}${Colors[value]}IronBreastplate`]: [`${value} iron breastplate`, `Durable, armor worn over the torso. One could take a serious beating while wearing this.`]}
    const ironBoots = {[`${baseName}${Colors[value]}IronBoots`]: [`${value} iron boots`, `Heavy iron plated boots, shielding your feet from damage.`]}
    const ironHelmet = {[`${baseName}${Colors[value]}IronHelmet`]: [`${value} iron helmet`, `Iron plated headgear designed to withstand heavy blows.`]}
    const ironGorget = {[`${baseName}${Colors[value]}IronGorget`]: [`${value} iron gorget`, `A round metal brace worn around the neck and over the shoulders.`]}
    const ironCuisses = {[`${baseName}${Colors[value]}IronCuisses`]: [`${value} iron cuisses`, `Iron leggings; to be strapped on to the thighs and function as leg protection.`]}
    const ironGauntlets = {[`${baseName}${Colors[value]}IronGauntlets`]: [`${value} iron gauntlets`, `Iron gloves designed to be protective and durable, while maintaining as much flexibility as possible.`]}
    const ironHeater = {[`${baseName}${Colors[value]}IronHeater`]: [`${value} iron heater`, `A large and heavy iron shield, used for blocking projectiles or melee attacks.`]}
    const sandstoneWall = {[`${baseName}${Colors[value]}SandstoneWall`]: [`${value} sandstone wall`, `A constructed wall built from mined sandstone.`]}
    const sandstoneFlooring = {[`${baseName}${Colors[value]}SandstoneFlooring`]: [`${value} sandstone flooring`, `A group of sandstone bricks, placed in a grid to be used as flooring.`]}
    const wroughtIronShield = {[`${baseName}${Colors[value]}WroughtIronShield`]: [`${value} wrought iron shield`, `A sturdy wrought iron shield, made by bending large sheets of metal into shape.`]}
    const wroughtIronGauntlets = {[`${baseName}${Colors[value]}WroughtIronGauntlets`]: [`${value} wrought iron gauntlets`, `Intricate and sturdy, these wrought iron gloves fit snugly on your hands.`]}
    const wroughtIronCuisses = {[`${baseName}${Colors[value]}WroughtIronCuisses`]: [`${value} wrought iron cuisses`, `Wrought iron leggings, strapped and padded around the thighs to reduce most damage.`]}
    const wroughtIronGorget = {[`${baseName}${Colors[value]}WroughtIronGorget`]: [`${value} wrought iron gorget`, `A molded piece of metal, used to protect the area around the neck and shoulders.`]}
    const wroughtIronHelmet = {[`${baseName}${Colors[value]}WroughtIronHelmet`]: [`${value} wrought iron helmet`, `Using a barbute design, this iron helmet shields the head from most kinds of attacks.`]}
    const wroughtIronBoots = {[`${baseName}${Colors[value]}WroughtIronBoots`]: [`${value} wrought iron boots`, `Wrought iron footwear. Heavy and made specifically for protecting feet and lower legs.`]}
    const wroughtIronBreastplate = {[`${baseName}${Colors[value]}WroughtIronBreastplate`]: [`${value} wrought iron breastplate`, `A large wrought iron chest plate, worn over the torso.`]}
    const woodenWall = {[`${baseName}${Colors[value]}WoodenWall`]: [`${value} wooden wall`, `A sturdy set of bound logs, forming a protective wall that can be placed.`]}
    const woodenFlooring = {[`${baseName}${Colors[value]}WoodenFlooring`]: [`${value} wooden flooring`, `Wooden floor boards; planed to equal height and length.`]}
    const woodenDoor = {[`${baseName}${Colors[value]}WoodenDoor`]: [`${value} wooden door`, `A door crafted from long wooden planks with large wooden hinges. Can be opened and closed when built.`]}
    const shortBow = {[`${baseName}${Colors[value]}ShortBow`]: [`${value} short bow`, `A bow designed for powerful shots at close range.`]}
    const longBow = {[`${baseName}${Colors[value]}LongBow`]: [`${value} long bow`, `Nearly as tall as the average person, this bow is designed for maximum range.`]}
    const compositeBow = {[`${baseName}${Colors[value]}CompositeBow`]: [`${value} composite bow`, `An expertly crafted bow, designed for both velocity and force.`]}
    const leatherQuiver = {[`${baseName}${Colors[value]}LeatherQuiver`]: [`${value} leather quiver`, `A leather-bound, back-mounted container designed to hold arrows; however, other items will also fit inside as well.`]}
    const woodenFence = {[`${baseName}${Colors[value]}WoodenFence`]: [`${value} wooden fence`, `A section of wooden fencing, constructed from two logs and held together with horizontal beams.`]}
    const cordedSling = {[`${baseName}${Colors[value]}CordedSling`]: [`${value} corded sling`, `Several pieces of string, wrapped and bound with a slot made for a projectile. Used to swing ammunition, increasing throwing range.`]}
    const leatherSling = {[`${baseName}${Colors[value]}LeatherSling`]: [`${value} leather sling`, `A sling crafted from tanned leather. Designed to hold a projectile to be thrown at an increased velocity.`]}
    const clayWall = {[`${baseName}${Colors[value]}ClayWall`]: [`${value} clay wall`, `A wall made from clay bricks, set into a typical skewed, grid-like fashion to increase durability.`]}
    const clayFlooring = {[`${baseName}${Colors[value]}ClayFlooring`]: [`${value} clay flooring`, `Flooring crafted from clay bricks. Could be used as decoration or as part of a building.`]}
    const woodenGate = {[`${baseName}${Colors[value]}WoodenGate`]: [`${value} wooden gate`, `A gate crafted from long wooden planks with small wooden hinges. Can be opened and closed when built.`]}
    const wroughtIronChest = {[`${baseName}${Colors[value]}WroughtIronChest`]: [`${value} wrought iron chest`, `A spacious container built from wrought iron that can store many items. Foods will spoil slower inside of it.`]}
    const ironChest = {[`${baseName}${Colors[value]}IronChest`]: [`${value} iron chest`, `A large iron chest that is both roomy and sturdy. Foods contained within will decay at a slower rate.`]}
    const ornateWoodenChest = {[`${baseName}${Colors[value]}OrnateWoodenChest`]: [`${value} ornate wooden chest`, `A decorative wooden container gilded with symbols inlaid into the wood.`]}
    const ornateCape = {[`${baseName}${Colors[value]}OrnateCape`]: [`${value} ornate cape`, `A red and gold stitched cape, which drapes the back and fastens at the neck. Worn as a status symbol.`]}
    const mageRobe = {[`${baseName}${Colors[value]}MageRobe`]: [`${value} mage robe`, `An ancient tattered robe, once owned by a spell casting foe.`]}
    const animalPelt = {[`${baseName}${Colors[value]}AnimalPelt`]: [`${value} animal pelt`, `The remains of an unlucky skinned animal. Can be used as a makeshift garment or dismantled into the hide and fur separately.`]}
    const cloak = {[`${baseName}${Colors[value]}Cloak`]: [`${value} cloak`, `An old, but sturdy hooded cloak garment. It appears to be of high quality from a bygone era.`]}
    const copperBuckler = {[`${baseName}${Colors[value]}CopperBuckler`]: [`${value} copper buckler`, `A rounded copper offhanded armor piece. Copper can be an ideal material for taking a beating with such a design.`]}
    const copperGauntlets = {[`${baseName}${Colors[value]}CopperGauntlets`]: [`${value} copper gauntlets`, `Complex and intricate, but still fairly durable. These copper hand armor pieces are used to block damage to your extremities.`]}
    const copperGreaves = {[`${baseName}${Colors[value]}CopperGreaves`]: [`${value} copper greaves`, `Sturdy copper leggings that can be tied around your legs, shielding them from damage.`]}
    const copperGorget = {[`${baseName}${Colors[value]}CopperGorget`]: [`${value} copper gorget`, `A shiny copper neck protection piece.`]}
    const copperHelmet = {[`${baseName}${Colors[value]}CopperHelmet`]: [`${value} copper helmet`, `A piece of copper head armor, designed with ancient sensibilities.`]}
    const copperBoots = {[`${baseName}${Colors[value]}CopperBoots`]: [`${value} copper boots`, `Copper boots, work hardened and crafted to fit closely to your feet size.`]}
    const copperCuirass = {[`${baseName}${Colors[value]}CopperCuirass`]: [`${value} copper cuirass`, `Cold formed in a classic abdominal design, this copper cuirass can protect your torso from damage.`]}
    const copperChest = {[`${baseName}${Colors[value]}CopperChest`]: [`${value} copper chest`, `A roomy copper chest, used for caching items and food storage, reducing spoilage.`]}
    const strawHat = {[`${baseName}${Colors[value]}StrawHat`]: [`${value} straw hat`, `A hat made from braids of hay, woven together. What it lacks in protection, it makes up for in its sun-blocking properties and style.`]}
    const woodenShield = {[`${baseName}${Colors[value]}WoodenShield`]: [`${value} wooden shield`, `A sturdy wooden shield, quite effective at blocking blunt attacks. The handles on the back are fashioned out of wood and string.`]}
    const scaleBelt = {[`${baseName}${Colors[value]}ScaleBelt`]: [`${value} scale belt`, `A belt formed from braided cords of dried reptile skin used to keep your leggings up and for some moderate waist protection.`]}
    const scaleVest = {[`${baseName}${Colors[value]}ScaleVest`]: [`${value} scale vest`, `A fire-resistant vest made from sewn scales that can take a good beating.`]}
    const scaleBoots = {[`${baseName}${Colors[value]}ScaleBoots`]: [`${value} scale boots`, `Scale-bound boots, sewn together using dried reptile skin.`]}
    const scaleCap = {[`${baseName}${Colors[value]}ScaleCap`]: [`${value} scale cap`, `A stylish winged cap made from scaly reptile skin.`]}
    const scaleBevor = {[`${baseName}${Colors[value]}ScaleBevor`]: [`${value} scale bevor`, `A reptile skin fashioned neck and chin guard.`]}
    const scaleLeggings = {[`${baseName}${Colors[value]}ScaleLeggings`]: [`${value} scale leggings`, `Semi-tight leggings, crafted from dried and stretched reptile skin.`]}
    const scaleGloves = {[`${baseName}${Colors[value]}ScaleGloves`]: [`${value} scale gloves`, `Skillfully crafted scale gloves, used for hand protection when gathering or tending to your campfire.`]}
    const ashCementFlooring = {[`${baseName}${Colors[value]}AshCementFlooring`]: [`${value} ash cement flooring`, `Flooring made from interweaving ash cement bricks.`]}
    const ashCementWall = {[`${baseName}${Colors[value]}AshCementWall`]: [`${value} ash cement wall`, `A wall constructed of recycled ash cement. Although the resource is abundant, the durability is not.`]}
    const pirateHat = {[`${baseName}${Colors[value]}PirateHat`]: [`${value} pirate hat`, `A cocked hat, typically worn by seafaring people and more notably, pirate folk known for their distinctive tricorne style.`]}
    const tinShield = {[`${baseName}${Colors[value]}TinShield`]: [`${value} tin shield`, `A uniquely designed tin shield, seemingly forged from a large slab of tin. The design might be the only thing going for it due to the deformation properties of tin.`]}
    const tinGloves = {[`${baseName}${Colors[value]}TinGloves`]: [`${value} tin gloves`, `Delicately crafted tin-forged gloves, used for style and moderate protection. Mostly for style.`]}
    const tinChausses = {[`${baseName}${Colors[value]}TinChausses`]: [`${value} tin chausses`, `A pair of tin leggings to be used as inferior protection or as decoration.`]}
    const tinBevor = {[`${baseName}${Colors[value]}TinBevor`]: [`${value} tin bevor`, `A protective covering for one's neck and chin; crafted from tin.`]}
    const tinHelmet = {[`${baseName}${Colors[value]}TinHelmet`]: [`${value} tin helmet`, `A uniquely styled helmet made from tin. It becomes low in durability when used for its practical purpose.`]}
    const tinFootgear = {[`${baseName}${Colors[value]}TinFootgear`]: [`${value} tin footgear`, `A pair of tin-crafted shoes. They are lightweight, but probably not the most durable.`]}
    const tinCuirass = {[`${baseName}${Colors[value]}TinCuirass`]: [`${value} tin cuirass`, `A front-to-back upper body protective armor piece, crafted from tin.`]}
    const tinChest = {[`${baseName}${Colors[value]}TinChest`]: [`${value} tin chest`, `A tin chest crafted with an exaggerated boxy design. Suitable for holding all types of materials and items.`]}
    const bronzeKiteShield = {[`${baseName}${Colors[value]}BronzeKiteShield`]: [`${value} bronze kite shield`, `A shield formed into a kite shape allowing protection along a full body length. A unique pattern is riveted to its center.`]}
    const bronzeGauntlets = {[`${baseName}${Colors[value]}BronzeGauntlets`]: [`${value} bronze gauntlets`, `Bronze-forged hand protective armor. These gauntlets feature unique barbed bracer designs working their way up your forearms.`]}
    const bronzeGreaves = {[`${baseName}${Colors[value]}BronzeGreaves`]: [`${value} bronze greaves`, `A pair of bronze greaves, used to wrap and fit against your legs for more than adequate protection.`]}
    const bronzeBevor = {[`${baseName}${Colors[value]}BronzeBevor`]: [`${value} bronze bevor`, `A piece of protective bronze armor for the chin and neck area.`]}
    const bronzeHelmet = {[`${baseName}${Colors[value]}BronzeHelmet`]: [`${value} bronze helmet`, `A helmet fit for royalty, at least from the looks alone. This stylishly crafted headgear is great for taking a beating as well as looking illustrious.`]}
    const bronzeBoots = {[`${baseName}${Colors[value]}BronzeBoots`]: [`${value} bronze boots`, `Many delicately crafted bronze pieces are hinged together to form these protective boots.`]}
    const bronzeChestArmor = {[`${baseName}${Colors[value]}BronzeChestArmor`]: [`${value} bronze chest armor`, `A bronze armor chest piece with a unique, stylish design with split tassets for additional waist and upper thigh protection.`]}
    const bronzeChest = {[`${baseName}${Colors[value]}BronzeChest`]: [`${value} bronze chest`, `Your best bet for large storage capacity. This masterly crafted bronze chest is suitable for storing a plethora of items.`]}
    const furCoat = {[`${baseName}${Colors[value]}FurCoat`]: [`${value} fur coat`, `A balmy chest garment crafted from the furry hide of an animal.`]}
    const furMittens = {[`${baseName}${Colors[value]}FurMittens`]: [`${value} fur mittens`, `A pair of fur mittens with one compartment for your fingers, and another one for your thumb for increased warmth.`]}
    const furBoots = {[`${baseName}${Colors[value]}FurBoots`]: [`${value} fur boots`, `A set of boots designed for colder climates, made from animal pelts with extra fur added for protection and comfort.`]}
    const brambleCrown = {[`${baseName}${Colors[value]}BrambleCrown`]: [`${value} bramble crown`, `A twisted circular floral arrangement meant to wear as royalty wears a crown.`]}
    const clothShirt = {[`${baseName}${Colors[value]}ClothShirt`]: [`${value} cloth shirt`, `A simple white short-sleeved shirt, perfect for a sunny day, and not so much otherwise.`]}
    const clothTrousers = {[`${baseName}${Colors[value]}ClothTrousers`]: [`${value} cloth trousers`, `A fine, if not plain looking pair of brown trousers, suitable for covering your lower regions a bit.`]}

    // Doodad
    const dye = {[`${baseName}${Colors[value]}Dye`]: [`${value} dye`, `${Colors[value]} dye bowl.`]}
    const woodenChestDoodad = {[`${baseName}${Colors[value]}WoodenChest`]: [`${value} wooden chest`, `A chest used for stockpiling items and preserving food.`]}
    const ornateWoodenChestDoodad = {[`${baseName}${Colors[value]}OrnateWoodenChest`]: [`${value} ornate wooden chest`, `A decorative chest used for storing items and preserving perishables.`]}
    const copperChestDoodad = {[`${baseName}${Colors[value]}CopperChest`]: [`${value} copper chest`, `A storage chest made from copper, used to deposit food items for reduced decay, among other uses.`]}
    const ironChestDoodad = {[`${baseName}${Colors[value]}IronChest`]: [`${value} iron chest`, `An iron container for storing items and reducing food decay.`]}
    const wroughtIronChestDoodad = {[`${baseName}${Colors[value]}WroughtIronChest`]: [`${value} wrought iron chest`, `A large chest, used for storage and keeping edibles fresher.`]}
    const tinChestDoodad = {[`${baseName}${Colors[value]}TinChest`]: [`${value} tin chest`, `Not much more than a folded piece of tin sheet metal, this chest will still hold a fair number of items for you.`]}
    const bronzeChestDoodad = {[`${baseName}${Colors[value]}BronzeChest`]: [`${value} bronze chest`, `A large bronze chest with amazing storage capacity.`]}
    const graniteWallDoodad = {[`${baseName}${Colors[value]}GraniteWall`]: [`${value} stone wall`, `A hardy wall built from rocks.`]}
    const woodenWallDoodad = {[`${baseName}${Colors[value]}WoodenWall`]: [`${value} wooden wall`, `A wall crafted by connecting wooden logs together.`]}
    const woodenGateDoodad = {[`${baseName}${Colors[value]}WoodenGate`]: [`${value} wooden gate`, `A gate, used as a passage through connected fences.`]}
    const woodenGateOpen = {[`${baseName}${Colors[value]}WoodenGateOpen`]: [`${value} open wooden gate`, `An opened gate, allowing anything to escape or enter.`]}
    const woodenDoorDoodad = {[`${baseName}${Colors[value]}WoodenDoor`]: [`${value} wooden door`, `A sturdy door, used to keep unwanted creatures out.`]}
    const woodenDoorOpen = {[`${baseName}${Colors[value]}WoodenDoorOpen`]: [`${value} open wooden door`, `An open door, allowing anything to enter.`]}
    const woodenFenceDoodad = {[`${baseName}${Colors[value]}WoodenFence`]: [`${value} wooden fence`, `A set of panels, usually used to keep creatures inside.`]}
    const clayWallDoodad = {[`${baseName}${Colors[value]}ClayWall`]: [`${value} clay wall`, `A wall made from fired clay bricks.`]}
    const ashCementWallDoodad = {[`${baseName}${Colors[value]}AshCementWall`]: [`${value} ash cement wall`, `A wall constructed of ash cement bricks. Great as a recycled resource, but not the strongest material.`] }

    // Terrain
    const cobblestone = {[`${baseName}${Colors[value]}CobblestoneFlooring`]: `${value} cobblestone flooring` }
    const wooden = {[`${baseName}${Colors[value]}WoodenFlooring`]: `${value} wooden flooring` }
    const clay = {[`${baseName}${Colors[value]}ClayFlooring`]: `${value} clay flooring` }
    const ashCement = {[`${baseName}${Colors[value]}AshCementFlooring`]: `${value} ash cement flooring` }

    const itemCombo = {
        ...pigment,
        ...paintbrush,
        ...dyeItem,
        ...armoredScaleBelt,
        ...armoredScaleVest,
        ...armoredScaleBoots,
        ...armoredScaleCrown,
        ...armoredScaleBevor,
        ...armoredScaleCuisses,
        ...armoredScaleGloves,
        ...barkLeggings,
        ...barkShield,
        ...barkTunic,
        ...cobblestoneFlooring,
        ...skullcap,
        ...graniteWall,
        ...bow,
        ...smallBag,
        ...leatherBelt,
        ...leatherTunic,
        ...leatherBoots,
        ...leatherCap,
        ...leatherGorget,
        ...leatherPants,
        ...leatherGloves,
        ...backpack,
        ...woodenChest,
        ...ironBreastplate,
        ...ironBoots,
        ...ironHelmet,
        ...ironGorget,
        ...ironCuisses,
        ...ironGauntlets,
        ...ironHeater,
        ...sandstoneWall,
        ...sandstoneFlooring,
        ...wroughtIronShield,
        ...wroughtIronGauntlets,
        ...wroughtIronCuisses,
        ...wroughtIronGorget,
        ...wroughtIronHelmet,
        ...wroughtIronBoots,
        ...wroughtIronBreastplate,
        ...woodenWall,
        ...woodenFlooring,
        ...woodenDoor,
        ...shortBow,
        ...longBow,
        ...compositeBow,
        ...leatherQuiver,
        ...woodenFence,
        ...cordedSling,
        ...leatherSling,
        ...clayWall,
        ...clayFlooring,
        ...woodenGate,
        ...wroughtIronChest,
        ...ironChest,
        ...ornateWoodenChest,
        ...ornateCape,
        ...mageRobe,
        ...animalPelt,
        ...cloak,
        ...copperBuckler,
        ...copperGauntlets,
        ...copperGreaves,
        ...copperGorget,
        ...copperHelmet,
        ...copperBoots,
        ...copperCuirass,
        ...copperChest,
        ...strawHat,
        ...woodenShield,
        ...scaleBelt,
        ...scaleVest,
        ...scaleBoots,
        ...scaleCap,
        ...scaleBevor,
        ...scaleLeggings,
        ...scaleGloves,
        ...ashCementFlooring,
        ...ashCementWall,
        ...pirateHat,
        ...tinShield,
        ...tinGloves,
        ...tinChausses,
        ...tinBevor,
        ...tinHelmet,
        ...tinFootgear,
        ...tinCuirass,
        ...tinChest,
        ...bronzeKiteShield,
        ...bronzeGauntlets,
        ...bronzeGreaves,
        ...bronzeBevor,
        ...bronzeHelmet,
        ...bronzeBoots,
        ...bronzeChestArmor,
        ...bronzeChest,
        ...furCoat,
        ...furMittens,
        ...furBoots,
        ...brambleCrown,
        ...clothShirt,
        ...clothTrousers
    };

    const doodadCombo = {
        ...dye,
        ...woodenChestDoodad,
        ...ornateWoodenChestDoodad,
        ...copperChestDoodad,
        ...ironChestDoodad,
        ...wroughtIronChestDoodad,
        ...tinChestDoodad,
        ...bronzeChestDoodad,
        ...graniteWallDoodad,
        ...woodenWallDoodad,
        ...woodenGateDoodad,
        ...woodenGateOpen,
        ...woodenDoorDoodad,
        ...woodenDoorOpen,
        ...woodenFenceDoodad,
        ...clayWallDoodad,
        ...ashCementWallDoodad
    }

    const terrainCombo = {
        ...cobblestone,
        ...wooden,
        ...clay,
        ...ashCement
    }

    data.dictionaries.item = {...data.dictionaries.item, ...itemCombo};
    data.dictionaries.doodad = { ...data.dictionaries.doodad, ...doodadCombo};
    data.dictionaries.terrain = {...data.dictionaries.terrain, ...terrainCombo};

}

// Create English JSON file
fs.writeFile ("../../lang/english.json", JSON.stringify(data, null, 4), function(err) {
    if (err) throw err;
    console.log('Done');
    }
);