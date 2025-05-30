package sudoku;

import java.io.IOException;

import javafx.application.Application;
import javafx.stage.Stage;
import sudoku.buildlogic.SudokuBuildLogic;
import sudoku.userinterface.IUserInterfaceContract;
import sudoku.userinterface.UserInterfaceImpl;

public class SudokuApplication extends Application {
	private IUserInterfaceContract.View uiImpl;
	
	@Override
	public void start(Stage primaryState) throws Exception{
		uiImpl = new UserInterfaceImpl(primaryState);
		try {
			SudokuBuildLogic.build(uiImpl);
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	public static void main(String[] args) { 
		launch(args); 
	}
	
}
