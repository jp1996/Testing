<<<<<<< HEAD
package sudoku.computationlogic;

import sudoku.problemdomain.SudokuGame;

public class SudokuUtilities {
	public static void copySudokuArrayValues(int[][] oldArray, int[][] newArray) {
		for (int xIndex = 0; xIndex < SudokuGame.GRID_BOUNDARY; xIndex++) {
			for (int yIndex = 0; yIndex < SudokuGame.GRID_BOUNDARY; yIndex++) {
				newArray[xIndex][yIndex] = oldArray[xIndex][yIndex];
			}
		}
	}
	
	
	public static int[][] copyToNewArray(int[][] oldArray) {
		int[][] newArray = new int[SudokuGame.GRID_BOUNDARY][SudokuGame.GRID_BOUNDARY];
		
		for (int xIndex = 0; xIndex < SudokuGame.GRID_BOUNDARY; xIndex++) {
			for (int yIndex = 0; yIndex < SudokuGame.GRID_BOUNDARY; yIndex++) {
				newArray[xIndex][yIndex] = oldArray[xIndex][yIndex];
			}
		}
		
		return newArray;
	}
}
=======
package sudoku.computationlogic;

import sudoku.problemdomain.SudokuGame;

public class SudokuUtilities {
	public static void copySudokuArrayValues(int[][] oldArray, int[][] newArray) {
		for (int xIndex = 0; xIndex < SudokuGame.GRID_BOUNDARY; xIndex++) {
			for (int yIndex = 0; yIndex < SudokuGame.GRID_BOUNDARY; yIndex++) {
				newArray[xIndex][yIndex] = oldArray[xIndex][yIndex];
			}
		}
	}
	
	
	public static int[][] copyToNewArray(int[][] oldArray) {
		int[][] newArray = new int[SudokuGame.GRID_BOUNDARY][SudokuGame.GRID_BOUNDARY];
		
		for (int xIndex = 0; xIndex < SudokuGame.GRID_BOUNDARY; xIndex++) {
			for (int yIndex = 0; yIndex < SudokuGame.GRID_BOUNDARY; yIndex++) {
				newArray[xIndex][yIndex] = oldArray[xIndex][yIndex];
			}
		}
		
		return newArray;
	}
}
>>>>>>> 02f4d956e9f78ec33fd415a036a6069acef98999
