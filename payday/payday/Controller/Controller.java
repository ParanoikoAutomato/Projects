package payday.Controller;

import java.util.ArrayList;
import java.util.Random;
import payday.Model.Board.Board;
import payday.Model.Cards.DealCard;
import payday.Model.Cards.MailCard;
import payday.Model.Player.Player;
import payday.Model.Position.Position;
import payday.View.View;

public class Controller {

    private Player p1, p2;
    private Player currentPlayer;
    private Player nextPlayer;
    private ArrayList<DealCard> dealCardsList;
    private ArrayList<MailCard> mailCardsList;
    private int player1Score;
    private int player2Score;
    private int dice;
    private int month;
    private final int jackpot = 3000;
    private View view;
    private boolean turn;
    private Board board;

    public Controller() {
        this.player1Score = 0;
        this.player2Score = 0;
        this.turn = (new Random()).nextBoolean();
        this.p1 = new Player(0, 0, "");
        this.p2 = new Player(0, 0, "");
        this.view = new View();
        this.board = new Board();
        initCards();
    }

    public void initCards() {
    }

    public void setTurn() {
    }

    public Position getTile(int i) {
        return board.getPosition(i);
    }

    public boolean gameIsFinished() {
        return false;
    }

    public void calculateScore(Player p) {
    }

    public Player getWinner() {
        return null;
    }
}
