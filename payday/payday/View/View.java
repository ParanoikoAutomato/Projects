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

    public View() {
    }

    private void initComponents() {
    }

    private class TileListener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }

    private class Player1Listener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }

    private class Player2Listener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }

    private class Card1Listener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
        }
    }

    public void updateTiles() {
    }

    public void updatePawn(Player player) {

    }

    public void updatePlayerInfo(Player player) {
    }

}
