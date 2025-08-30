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

    /** <b>Constructor</b><p>
     * <b>Postcondition:</b> Initializes the controller that connects the model
     * and view.
     *
     */
    public Controller() {
        this.player1Score = 0;
        this.player2Score = 0;
        this.turn = (new Random()).nextBoolean();
        this.p1 = new Player(0, 0, "");
        this.p2 = new Player(0, 0, "");
        this.view = new View();
       // this.board = new Board();
        initCards();
    }

    /** <b>Transformer</b><p>
     * <b>Postcondition:</b> Initializes the cards.
     *
     */
    public void initCards() {
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));

    }

    /** <b>Transformer</b><p>
     * <b>Postcondition:</b> Initializes the turn of the player.
     *
     */
    public void setTurn() {
    }

    /** <b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the tile.
     *
     * @param i Depends the type you want to get the tile from.
     * @return Tile
     */
    public Position getTile(int i) {
        return board.getPosition(i);
    }

    /** <b>Observer</b><p>
     * <b>Postcondition</b> Returns true if a player reaches the payday tile at
     * the end of the last month.False otherwise.
     *
     * @return True if a player reaches the payday tile at the end of the last
     * month.False otherwise.
     */
    public boolean gameIsFinished() {
        return false;
    }

    /** <b>Transformer</b><p>
     * <b>Postcondition:</b> Calculates which player has the most money.
     *
     * @param p The player
     *
     */
    public void calculateScore(Player p) {
    }

    /** <b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the player who has the most money at the
     * end of the last month.
     *
     * @return The player with the most money.
     */
    public Player getWinner() {
        return null;
    }
}
