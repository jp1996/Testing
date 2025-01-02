package snake;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

import java.util.Arrays;
import java.util.Random;

public class GamePanel extends JPanel implements ActionListener{

	//Graphics g is the application itself.
	
	//Sets dimensions, size of items, the max amount of items on screen, delay in ms
	static final int SCREEN_WIDTH = 600;
	static final int SCREEN_HEIGHT = 600;
	static final int UNIT_SIZE = 25;
	static final int GAME_UNITS = (SCREEN_WIDTH*SCREEN_HEIGHT/UNIT_SIZE);
	static final int DELAY = 75;
	
	//x and y coordinates of the snake, as well as initial body parts of snake
	final int x[] = new int[GAME_UNITS];
	final int y[] = new int[GAME_UNITS];
	int bodyParts = 6;
	
	//apples eaten by snake and coords of the apple
	int applesEaten;
	int appleX;
	int appleY;
	
	//directions dictated by letters 'L'eft, 'R'ight, 'U'p, and 'D'own
	char direction = 'R';
	char nextInput = direction;
	boolean dirChanged = false;
	
	boolean running = false;
	Timer timer;
	Random random;
	double lastInput = System.currentTimeMillis();
	final double COOLDOWN = 200;
	
	//Constructor
	GamePanel() {
		
		random = new Random();
		
		//When JPanel is redrawn (resized, repainted, or becomes visible ie the methods used below, paintComponent() method is called
		//If paintComponent is needed again at some point, repaint() method can be used
		this.setPreferredSize(new Dimension(SCREEN_WIDTH, SCREEN_HEIGHT));
		this.setBackground(Color.black);
		this.setFocusable(true);
		this.addKeyListener(new MyKeyAdapter());
		
		startGame();
		
	}
	
	public void startGame() {
		
		//reset all stats
		applesEaten = 0;
		bodyParts = 6;
		Arrays.fill(x, 0);
		Arrays.fill(y, 0);
		direction = 'R';
		
		newApple();
		running = true;
		timer = new Timer(DELAY, this);
		timer.start();
		
	}
	
	public void paintComponent(Graphics g) {
		
		//super is called so that the default method runs before any other behavior (draw method is called)
		super.paintComponent(g);
		draw(g);
		
	}
	
	public void draw(Graphics g) {
		
		if(running) {
			//draws gridlines based off unit size
			/*for(int i = 0; i<SCREEN_HEIGHT/UNIT_SIZE; i++) {
				
				g.drawLine(i*UNIT_SIZE, 0, i*UNIT_SIZE, SCREEN_HEIGHT);
				g.drawLine(0, i*UNIT_SIZE, SCREEN_WIDTH, i*UNIT_SIZE);
				
			}*/
			
			//draw apple
			g.setColor(Color.red);
			g.fillOval(appleX, appleY, UNIT_SIZE, UNIT_SIZE);
			
			
			//draws snake. i = 0 is the head of the snake, colored differently than the body
			for(int i = 0; i < bodyParts; i++) {
				if(i == 0) {
					g.setColor(Color.green);
					g.fillRect(x[i], y[i], UNIT_SIZE, UNIT_SIZE);
				} else {
					g.setColor(new Color(45, 180, 0));
					g.setColor(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255)));
					g.fillRect(x[i], y[i], UNIT_SIZE, UNIT_SIZE);
				}
			}
			
			//draw score
			drawScore(g);
			
		} else {
			gameOver(g);
		}
		
	}
	
	public void newApple() {
		
		appleX = random.nextInt((int)(SCREEN_WIDTH/UNIT_SIZE))*UNIT_SIZE;
		appleY = random.nextInt((int)(SCREEN_HEIGHT/UNIT_SIZE))*UNIT_SIZE;
		
		//if apple spawns where snake exists, choose different coords
		while (Arrays.asList(x).contains(appleX) && Arrays.asList(y).contains(appleY)) {
		     appleX = random.nextInt((int)(SCREEN_WIDTH/UNIT_SIZE))*UNIT_SIZE;
		     appleY = random.nextInt((int)(SCREEN_HEIGHT/UNIT_SIZE))*UNIT_SIZE;
		}
		
	}
	
	public void move() {
		
		//if direction was not changed, then if there was a stored input change it to the stored input.
		//stored input is the same as direction if there isn't a stored input.
		if(!dirChanged) {
			direction = nextInput;
		}
		
		for(int i = bodyParts; i > 0; i--) {
			
			x[i] = x[i-1];
			y[i] = y[i-1];
			
		}
		
		switch(direction) {
		
			case 'U':
				y[0] = y[0] - UNIT_SIZE;
				break;
				
			case 'D':
				y[0] = y[0] + UNIT_SIZE;
				break;
				
			case 'L':
				x[0] = x[0] - UNIT_SIZE;
				break;
				
			case 'R':
				x[0] = x[0] + UNIT_SIZE;
				break;
				
		}
		//reset dirChanged
		dirChanged = false;
		
	}

	public void checkApple() {
		
		//checks if head is at apple coordinates. if so, make snake longer, add to the apple eaten counter, and make a new apple
		if((x[0] == appleX) && (y[0] == appleY)) {
			bodyParts++;
			applesEaten++;
			newApple();
		}
		
	}
	
	public void checkCollisions() {
		
		//checks if head collides with body
		for(int i = bodyParts; i > 0; i--) {
			if((x[0] == x[i]) && (y[0] == y[i])) {
				running = false;
			}
		}
		//check if head touches left border
		if(x[0] < 0) running = false;

		//check if head touches right border
		if(x[0] > SCREEN_WIDTH-UNIT_SIZE) running = false;

		//check if head touches top border
		if(y[0] < 0) running = false;

		//check if head touches bottom border
		if(y[0] > SCREEN_HEIGHT-UNIT_SIZE) running = false;
		
		if(!running) timer.stop();
	}
	
	
	public void drawScore(Graphics g) {
		
		g.setColor(Color.red);
		g.setFont(new Font("Ink Free", Font.BOLD, 40));
		FontMetrics metrics = getFontMetrics(g.getFont());
		g.drawString("Score: " + applesEaten, (SCREEN_WIDTH - metrics.stringWidth("Score: " + applesEaten))/2, g.getFont().getSize());
		
	}
	
	public void gameOver(Graphics g) {
		
		//set up game over text
		g.setColor(Color.red);
		g.setFont(new Font("Ink Free", Font.BOLD, 75));
		FontMetrics metrics1 = getFontMetrics(g.getFont());
		g.drawString("Game Over", (SCREEN_WIDTH - metrics1.stringWidth("Game Over"))/2, SCREEN_HEIGHT/2);
		drawScore(g);
		g.setColor(Color.blue);
		g.setFont(new Font("Ink Free", Font.BOLD, 50));
		FontMetrics metrics2 = getFontMetrics(g.getFont());
		g.drawString("Press Space to Play Again", (SCREEN_WIDTH - metrics2.stringWidth("Press Space to Play Again"))/2,
				SCREEN_HEIGHT/2 + g.getFont().getSize());
		drawScore(g);
		
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		
		if(running) {
			move();
			checkApple();
			checkCollisions();
		}
		repaint();
		
	}
	
	public class MyKeyAdapter extends KeyAdapter{
		
		@Override
		public void keyPressed(KeyEvent e) {
			
			if(!running && e.getKeyCode() == KeyEvent.VK_SPACE) {
				startGame();
			}
			
			//Stores current time, checks if the current key press and last key press happened too soon (not longer than the DELAY)
			//If not too soon, moves normally. If it is too soon, stores key press for after the delay
			double now = System.currentTimeMillis();
			
			if (now - lastInput > DELAY) {
				
				//changes the direction only if the snake is not going the opposite direction (snake is not allowed to 180 and eat its body)
				switch(e.getKeyCode()) {
				
					case KeyEvent.VK_LEFT:
						if(direction != 'R') direction = 'L';
						break;
	
					case KeyEvent.VK_RIGHT:
						if(direction != 'L') direction = 'R';
						break;
						
					case KeyEvent.VK_UP:
						if(direction != 'D') direction = 'U';
						break;
						
					case KeyEvent.VK_DOWN:
						if(direction != 'U') direction = 'D';
						break;
				
				}
				
				//next input reset to direction so that they match. last input is the current one, 
				//and dirchanged is true since a key was pressed.
				nextInput = direction;
				lastInput = now;
				dirChanged = true;
				
			} else {
				switch(e.getKeyCode()) {
				
					case KeyEvent.VK_LEFT:
						if(direction != 'R') nextInput = 'L';
						break;
	
					case KeyEvent.VK_RIGHT:
						if(direction != 'L') nextInput = 'R';
						break;
						
					case KeyEvent.VK_UP:
						if(direction != 'D') nextInput = 'U';
						break;
						
					case KeyEvent.VK_DOWN:
						if(direction != 'U') nextInput = 'D';
						break;
				}
			}
			
			
		}
		
	}
	

}
