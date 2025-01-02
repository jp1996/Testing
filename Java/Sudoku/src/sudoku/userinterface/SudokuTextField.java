<<<<<<< HEAD
package sudoku.userinterface;

import javafx.scene.control.TextField;

public class SudokuTextField extends TextField {
	
	private final int x;
	private final int y;
	
	public SudokuTextField(int x, int y) {
		this.x = x;
		this.y = y;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	@Override
	public void replaceText(int i, int i1, String s) {
		if (!s.matches("[0-9]")) {
			super.replaceText(i,  i1,  s);
		}
	}

	@Override
	public void replaceSelection(String s) {
		if (!s.matches("[0-9]")) {
			super.replaceSelection(s);
		}
	}
	
	
	
	
}
=======
package sudoku.userinterface;

import javafx.scene.control.TextField;

public class SudokuTextField extends TextField {
	
	private final int x;
	private final int y;
	
	public SudokuTextField(int x, int y) {
		this.x = x;
		this.y = y;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	@Override
	public void replaceText(int i, int i1, String s) {
		if (!s.matches("[0-9]")) {
			super.replaceText(i,  i1,  s);
		}
	}

	@Override
	public void replaceSelection(String s) {
		if (!s.matches("[0-9]")) {
			super.replaceSelection(s);
		}
	}
	
	
	
	
}
>>>>>>> 02f4d956e9f78ec33fd415a036a6069acef98999
