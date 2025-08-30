package payday.View;

import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import payday.Model.Player.Player;

public class View extends JFrame {

    JButton[] tiles = new JButton[31];
    JButton dealCardsButton;
    JButton mailCardsButton;
    JLabel info;
    JLayeredPane boardPane;
    JLayeredPane infoBoxPane;
    JLabel[] infoBoxLabels = new JLabel[3];

    JLayeredPane player1Pane;
    JLabel labelP1;
    JLabel[] playerInfoP1 = new JLabel[3];
    JButton rollDiceP1;
    JButton myDealCardsP1;
    JButton getLoanP1;
    JButton endTurnP1;
    Image diceP1;

    JLayeredPane player2Pane;
    JLabel labelP2;
    JLabel[] playerInfoP2 = new JLabel[3];
    JButton rollDiceP2;
    JButton myDealCardsP2;
    JButton getLoanP2;
    JButton endTurnP2;
    Image diceP2;
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Constructs the GUI.
     * 
     */

    public View() {
    }
    /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Initializing buttons and jlables.
     */

    private void initComponents() {
    }
    /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Actions when the tile button is pressed.
     */

    private class TileListener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }
    /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Actions for the buttons of the first player menu.
     */

    private class Player1Listener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }
    /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Actions for the buttons of the second player menu.
     */

    private class Player2Listener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }
    /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Actions for the cards buttons.
     */

    private class Card1Listener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }
     /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Update tile info day ,date,second month etc.
     */
    

    public void updateTiles() {
    }
     /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Update the pawn position.
     * @param player The player
     */

    public void updatePawn(Player player) {

    }
     /**<b>Transformer</b><p>
     *  <b>Postcondition:</b> Update the player's info in the textfield.
     * @param player The player.
     */

    public void updatePlayerInfo(Player player) {
    }

}
