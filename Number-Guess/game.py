import tkinter as tk
import random

class NumberGuessingGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Number Guessing Game")
        self.root.geometry("400x300")
        self.number = random.randint(1, 100)
        self.guesses = 0

        self.label = tk.Label(root, text="Guess a number between 1 and 100", font=("Arial", 14))
        self.label.pack(pady=20)

        self.entry = tk.Entry(root, font=("Arial", 12))
        self.entry.pack()

        self.button = tk.Button(root, text="Submit Guess", command=self.check_guess, font=("Arial", 12))
        self.button.pack(pady=10)

        self.feedback = tk.Label(root, text="", font=("Arial", 12))
        self.feedback.pack()

        self.reset_btn = tk.Button(root, text="Play Again", command=self.reset_game, font=("Arial", 12))
        self.reset_btn.pack(pady=10)
        self.reset_btn.config(state=tk.DISABLED)

    def check_guess(self):
        try:
            guess = int(self.entry.get())
            self.guesses += 1
            if guess > self.number:
                self.feedback.config(text="Lower number please!")
            elif guess < self.number:
                self.feedback.config(text="Higher number please!")
            else:
                self.feedback.config(text=f"You guessed it in {self.guesses} attempts! 🎉")
                self.button.config(state=tk.DISABLED)
                self.reset_btn.config(state=tk.NORMAL)
        except ValueError:
            self.feedback.config(text="Please enter a valid number.")

    def reset_game(self):
        self.number = random.randint(1, 100)
        self.guesses = 0
        self.entry.delete(0, tk.END)
        self.feedback.config(text="")
        self.button.config(state=tk.NORMAL)
        self.reset_btn.config(state=tk.DISABLED)

# Create the GUI window
root = tk.Tk()
game = NumberGuessingGame(root)
root.mainloop()
