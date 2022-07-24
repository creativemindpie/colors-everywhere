import Translation from "language/Translation";
import Mod from "mod/Mod";
import { BlockRow, ColumnType } from "ui/component/BlockRow";
import Component from "ui/component/Component";
import { Paragraph } from "ui/component/Text";
import Dialog from "ui/screen/screens/game/component/Dialog";
import { DialogId, IDialogDescription } from "ui/screen/screens/game/Dialogs";
import ColorsEverywhere from "./ColorsEverywhere";
import { DialogTexts, MOD_NAME } from "./IColorsEverywhere";

export default class ColorsEverywhereDialog extends Dialog {
	public static description: IDialogDescription = {
		minSize: {
			x: 20,
			y: 20,
		},
		size: {
			x: 20,
			y: 30,
		},
		maxSize: {
			x: 50,
			y: 70,
		},
		edges: "center",
		saveOpen: false
	};
   
    public static INSTANCE: ColorsEverywhereDialog;

	@Mod.instance<ColorsEverywhere>(MOD_NAME)
	public readonly COLORSEVERYWHERE: ColorsEverywhere;

    private readonly wrapper: Component;
    public results: Component;

    public constructor(id: DialogId) {
		super(id);

		new Component()
			.append(this.wrapper = this.addScrollableWrapper())
			.appendTo(this.body);

		let block = new BlockRow()
			.setColumns(ColumnType.Fill)
			.appendTo(this.wrapper);

        new Paragraph()
            .setText(Translation.get(this.COLORSEVERYWHERE.dictionary, DialogTexts.SpecialThanks))
            .appendTo(block);
	}

}