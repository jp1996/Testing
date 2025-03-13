package Hangman;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;
import java.util.Stack;

public class run {
	public static void main(String[] args) throws FileNotFoundException {
		String word = choose(new File("./src/wordlist.txt"));
		String guess = "_";
		ArrayList<Character> old = new ArrayList<>(); 
		for(int drawLines = 1; drawLines < word.length(); drawLines++) {
			guess+= " _";
		}
		System.out.format("Welcome to Hangman. This is your word: %s!\nPlease guess a lowercase letter: ", guess);
		int missGuess = 0;
		Scanner input = new Scanner(System.in);
		String letter = "";
		while(true) {
			letter = input.nextLine().toLowerCase();
			if(letter.isEmpty()) {
				continue;
			}
				
			if(validLetter(letter))
			{
				if(word.contains(letter) && !old.contains(letter.charAt(0))) {
					
					for (int index = word.indexOf(letter); index >= 0; index = word.indexOf(letter, index + 1)) {
						guess = guess.substring(0, index*2) + letter + guess.substring(index*2+1);
					}
					
					old.add(letter.charAt(0));
					System.out.format("Well Done, This is your word: %s\nHere are the current letters guessed: " + Arrays.toString(old.toArray()).replace("[", "").replace("]","") +"\nGuess another letter: ", guess);
					
				} else if (old.contains(letter.charAt(0))){
					System.out.println("You've already guessed that letter before. Here are the current letters guessed: " + Arrays.toString(old.toArray()).replace("[", "").replace("]","") + "\nThis is your word: %s\nPlease guess another letter: ");
				} else {
					
					old.add(letter.charAt(0));
					missGuess++;
					drawBody(missGuess);
					System.out.format("Oof. That letter isn't in the word. Here are the current letters guessed: " + Arrays.toString(old.toArray()).replace("[", "").replace("]","") + "\nThis is your word: %s\nYou've missed %d times. Try Again!", guess, missGuess);
					
				}
			} else if(!letter.isEmpty()) {
				
				System.out.format("That's not a viable entry, Here are the current letters guessed: " + Arrays.toString(old.toArray()).replace("[", "").replace("]","") + "\nThis is your word: %s\nPlease enter a letter.", guess);
				letter = "";
				continue;
				
			}
			
			if(missGuess == 7) {
				System.out.println("You're hopeless. The word was " + word);
				break;
			}
			
			if(!guess.contains("_")) {
				System.out.println("Well Done, You've guessed the word " + word + "!");
				break;
				
			}
		}
	}

	private static String choose(File f) throws FileNotFoundException {
		String result = null;
		Random rand = new Random();
		int n = 0;
		for(Scanner sc = new Scanner(f); sc.hasNext();) {
			++n;
			String line = sc.nextLine();
			if(rand.nextInt(n) == 0) result = line;
		}
		return result;
	}

	private static boolean validLetter(String letter) {
		return letter.length() == 1 && Character.isLetter(letter.charAt(0));
	}
	
	private static void drawBody(int missGuess) {
		Stack<String> stack = new Stack<String>();
		stack.push("      _|_");
		stack.push("       |");
		stack.push("       |");
		stack.push("       |");
		stack.push("  |    |");
		stack.push("   ____");
		switch (missGuess) {
			case 7:
				stack.set(0, "_/ \\_ _|_");
			case 6:
				if(missGuess != 7) stack.set(0, "_/    _|_");
			case 5:
				stack.set(1, "  |    |");
			case 4:
				stack.set(2, "\\_|_/  |");
			case 3:
				if(missGuess < 4) stack.set(2, "\\_|    |");
			case 2:
				if(missGuess < 3) stack.set(2, "  |    |");
			case 1:
				stack.set(3,"  O    |");
				break;
		}
		for(int i = 0; i <stack.size();) {
			System.out.println(stack.pop());
		}
	}
}