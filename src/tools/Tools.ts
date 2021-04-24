import { SkillType } from "game/entity/IHuman";
import { IItemDescription, ItemType, ItemTypeGroup, RecipeLevel } from "game/item/IItem";
import { RecipeComponent } from "game/item/Items";
import { Registry } from "mod/ModRegistry";
import ColorsEverywhere from "src/ColorsEverywhere";

export const StoneBowlDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(ItemTypeGroup.Rock,1,1)
        ],
        skill: SkillType.Stonecrafting,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const DyeRemoverDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(ItemType.Ectoplasm,1,1),
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemDyeRemover"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionRemovePaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const PaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(ItemType.WoodenPole,1,1),
            RecipeComponent(ItemType.String,1,1)
        ],
        skill: SkillType.Woodworking,
        level: RecipeLevel.Simple,
        reputation: 2
    }
}

export const WhitePaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            // RecipeComponent(Registry<ColorsEverywhere>("Colors Everywhere").get(`items`, Colors.White),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemWhitePaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const BlackPaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            //RecipeComponent(Registry<ColorsEverywhere>().get(`items`, Colors.Black),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemBlackPaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const RedPaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            //RecipeComponent(Registry<ColorsEverywhere>().get(`items`, Colors.Red),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemRedPaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const YellowPaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            //RecipeComponent(Registry<ColorsEverywhere>().get(`items`, Colors.Yellow),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemYellowPaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const BluePaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            //RecipeComponent(Registry<ColorsEverywhere>().get(`items`, Colors.Blue),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemBluePaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const OrangePaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            //RecipeComponent(Registry<ColorsEverywhere>().get(`items`, Colors.Orange),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemOrangePaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const GreenPaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            //RecipeComponent(Registry<ColorsEverywhere>().get(`items`, Colors.Green),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemGreenPaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}

export const PurplePaintbrushDescription: IItemDescription = {
    recipe: {
        components: [
            RecipeComponent(Registry<ColorsEverywhere>().get("itemPaintbrush"),1,1),
            //RecipeComponent(Registry<ColorsEverywhere>().get(`items`, Colors.Purple),1,0,1)
        ],
        skill: SkillType.Chemistry,
        level: RecipeLevel.Simple,
        reputation: 2
    },
    returnOnUseAndDecay: {
        type: Registry<ColorsEverywhere>().get("itemPurplePaintbrush"),
        damaged: true,
    },
    use: [Registry<ColorsEverywhere>().get("actionPaint"), Registry<ColorsEverywhere>().get("actionCleanPaintbrush")]
}