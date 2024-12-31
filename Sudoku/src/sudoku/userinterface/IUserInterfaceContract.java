<<<<<<< HEAD
package sudoku.userinterface;

import sudoku.problemdomain.SudokuGame;

public interface IUserInterfaceContract {
	interface EventListener {
		void onSudokuInput(int x, int y, int input);
		void onDialogClick();
	}
	
	interface View {
		void setListerner(IUserInterfaceContract.EventListener listener);
		void updateSquare(int x, int y, int input);
		void updateBoard(SudokuGame game);
		void showDialog(String message);
		void showError(String message);
	}
}
=======
package sudoku.userinterface;

import sudoku.problemdomain.SudokuGame;

public interface IUserInterfaceContract {
	interface EventListener {
		void onSudokuInput(int x, int y, int input);
		void onDialogClick();
	}
	
	interface View {
		void setListerner(IUserInterfaceContract.EventListener listener);
		void updateSquare(int x, int y, int input);
		void updateBoard(SudokuGame game);
		void showDialog(String message);
		void showError(String message);
	}
}
>>>>>>> 02f4d956e9f78ec33fd415a036a6069acef98999
