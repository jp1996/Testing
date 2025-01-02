<<<<<<< HEAD
package snake;
import javax.swing.JFrame;

public class GameFrame extends JFrame{
	
	GameFrame() {
		//Add GamePanel to Frame
		this.add(new GamePanel());
		
		/**Settings for application -
		 	-set title to Snake
			-application closes on exit
			-Can't resize window
			-pack sets window to be the size of subcomponents
			-application is visible
			-centers application
		*/	
		
		this.setTitle("Snake");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setResizable(false);
		this.pack();
		this.setVisible(true);
		this.setLocationRelativeTo(null);
		
	}
	
}
=======
package snake;
import javax.swing.JFrame;

public class GameFrame extends JFrame{
	
	GameFrame() {
		//Add GamePanel to Frame
		this.add(new GamePanel());
		
		/**Settings for application -
		 	-set title to Snake
			-application closes on exit
			-Can't resize window
			-pack sets window to be the size of subcomponents
			-application is visible
			-centers application
		*/	
		
		this.setTitle("Snake");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setResizable(false);
		this.pack();
		this.setVisible(true);
		this.setLocationRelativeTo(null);
		
	}
	
}
>>>>>>> 02f4d956e9f78ec33fd415a036a6069acef98999
