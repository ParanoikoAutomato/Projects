package payday.View;

import java.awt.Image;
import java.awt.List;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.URL;
import java.util.ArrayList;
import java.util.Random;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import payday.Model.Board.Board;
import payday.Model.Cards.DealCard;
import payday.Model.Cards.MailCard;

public class PayDayBrd extends javax.swing.JFrame {

    private javax.swing.JButton dealcards;
    private javax.swing.JButton dice1;
    private javax.swing.JButton dice2;
    private javax.swing.JButton endtrn1;
    private javax.swing.JButton endtrn2;
    private javax.swing.JButton getln1;
    private javax.swing.JButton getln2;
    private javax.swing.JDesktopPane jDesktopPane1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel14;
    private javax.swing.JLabel jLabel15;
    private javax.swing.JLabel jLabel16;
    private javax.swing.JLabel jLabel17;
    private javax.swing.JLabel jLabel18;
    private javax.swing.JLabel jLabel19;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel20;
    private javax.swing.JLabel jLabel21;
    private javax.swing.JLabel jLabel22;
    private javax.swing.JLabel jLabel23;
    private javax.swing.JLabel jLabel24;
    private javax.swing.JLabel jLabel25;
    private javax.swing.JLabel jLabel26;
    private javax.swing.JLabel jLabel27;
    private javax.swing.JLabel jLabel28;
    private javax.swing.JLabel jLabel29;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel30;
    private javax.swing.JLabel jLabel31;
    private javax.swing.JLabel jLabel32;
    private javax.swing.JLabel jLabel33;
    private javax.swing.JLabel jLabel34;
    private javax.swing.JLabel jLabel35;
    private javax.swing.JLabel jLabel36;
    private javax.swing.JLabel jLabel37;
    private javax.swing.JLabel jLabel38;
    private javax.swing.JLabel jLabel39;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel40;
    private javax.swing.JLabel jLabel41;
    private javax.swing.JLabel jLabel42;
    private javax.swing.JLabel jLabel43;
    private javax.swing.JLabel jLabel44;
    private javax.swing.JLabel jLabel45;
    private javax.swing.JLabel jLabel46;
    private javax.swing.JLabel jLabel47;
    private javax.swing.JLabel jLabel48;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JLayeredPane jLayeredPane1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JButton mailcards;
    private javax.swing.JButton mydc1;
    private javax.swing.JButton mydc2;
    private javax.swing.JButton rolldice1;
    private javax.swing.JButton rolldice2;
    private javax.swing.JButton tile1;
    private javax.swing.JButton tile10;
    private javax.swing.JButton tile11;
    private javax.swing.JButton tile12;
    private javax.swing.JButton tile13;
    private javax.swing.JButton tile14;
    private javax.swing.JButton tile15;
    private javax.swing.JButton tile16;
    private javax.swing.JButton tile17;
    private javax.swing.JButton tile18;
    private javax.swing.JButton tile19;
    private javax.swing.JButton tile2;
    private javax.swing.JButton tile20;
    private javax.swing.JButton tile21;
    private javax.swing.JButton tile22;
    private javax.swing.JButton tile23;
    private javax.swing.JButton tile24;
    private javax.swing.JButton tile25;
    private javax.swing.JButton tile26;
    private javax.swing.JButton tile27;
    private javax.swing.JButton tile28;
    private javax.swing.JButton tile29;
    private javax.swing.JButton tile3;
    private javax.swing.JButton tile30;
    private javax.swing.JButton tile31;
    private javax.swing.JButton tile32;
    private javax.swing.JButton tile4;
    private javax.swing.JButton tile5;
    private javax.swing.JButton tile6;
    private javax.swing.JButton tile7;
    private javax.swing.JButton tile8;
    private javax.swing.JButton tile9;
    private JButton[] Tiles;
    private Random rand = new Random();
    private Board brd;
    private PayDayCards pdcards;
    private int mailCardCount = 0;
    private ArrayList<DealCard> dealCardsList = new ArrayList<DealCard>();
    private ArrayList<MailCard> mailCardsList = new ArrayList<MailCard>();


    public PayDayBrd() {
        dealCardsList.add(new DealCard("Deal", "/cardsimg/tesla.jpg", "Agora Aftokinhtou se timh efkairias", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/iphone.png", "Agora i-phone 13 apo Iapwnia", 500, 700, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/ethereum.png", "Agora Ethereum", 3000, 5000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/honda.jpg", "Agora Mhxanhs", 4000, 7000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/ps5.jpg", "Agora Playstasion 5 apo Korea", 200, 400, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/taxyploo.jpg", "Agora Taxyploou", 5000, 9000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/chl.jpg", "Agora Eisithriou VIP gia ton teliko tou Champions League", 700, 1400, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/maiden.jpg", "Agora Eisithriou gia thn synavlia twn Iron Maiden", 200, 500, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/laptop.jpg", "Agora Macbook apo to eBay", 1000, 1700, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/watch.jpg", "Agora Xrysoy Rologioy", 2000, 4000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/camera.jpg", "Agora Epaggelmatikhs Fwtografikhs Mhxanhs", 1200, 2000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/elaiolado.jpg", "Agora Elaioladou", 1500, 3000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/terrier.jpg", "Agora Skylou Yorkshire Terrier", 250, 550, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/facebook.jpg", "Agora Metoxwn sto Facebook", 1000, 2000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/elafonisi.jpg", "Agora Oikopedou sto Elafonhsi", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/guitar2.jpg", "Agora Syllektikhs Kitharas", 3000, 6000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/talos.jpg", "Agora Katasthmatos sto Talos Plaza", 10000, 18000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/nba.jpg", "Agora Eishthriou gia ton teliko tou NBA", 900, 1800, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/spania.jpeg", "Agora Spanias Gatas", 700, 1200, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/zaxar.jpg", "Agora Zaxaroplasteiou", 5000, 9500, "Agorase", "Agnohse th Symfwnia"));
        pdcards = new PayDayCards();
        brd = new Board();
        this.setVisible(true);

        this.setResizable(false);
        initComponents();
    }
public void showDealCard(int i) {
 Object[] options = {dealCardsList.get(i).getChoice1(), dealCardsList.get(i).getChoice2()};

                URL imageURL = getClass().getResource( dealCardsList.get(i).getImage()); //image
                System.out.println("Type: " + dealCardsList.get(i).getTitle()
                        + "\nMessage: " + dealCardsList.get(i).getText() + "\nCost:" + dealCardsList.get(i).getBuyPrice()
                        + "\nValue:" + dealCardsList.get(i).getSellPrice() + "\nChoice1: " + dealCardsList.get(i).getChoice1() + "\nChoice2: " + dealCardsList.get(i).getChoice2());
                Image image = new ImageIcon(imageURL).getImage();
                image = image.getScaledInstance(200, 200, java.awt.Image.SCALE_SMOOTH);
                JOptionPane p = new JOptionPane();
            
                int n = p.showOptionDialog(this,
                        dealCardsList.get(i).getText() + "\nΤιμή Αγοράς: " + dealCardsList.get(i).getBuyPrice() + " Ευρώ \nΤιμή Πώλησης: " + dealCardsList.get(i).getSellPrice() + " Ευρώ \n",
                        dealCardsList.get(i).getTitle(),
                        JOptionPane.OK_OPTION,
                        0,
                        new ImageIcon(image),
                        options,
                        options[0]);

}
    private void initComponents() {

        jLayeredPane1 = new javax.swing.JLayeredPane();
        jLabel2 = new javax.swing.JLabel();
        tile22 = new javax.swing.JButton();
        jLabel10 = new javax.swing.JLabel();
        tile2 = new javax.swing.JButton();
        tile3 = new javax.swing.JButton();
        tile4 = new javax.swing.JButton();
        tile5 = new javax.swing.JButton();
        tile6 = new javax.swing.JButton();
        tile7 = new javax.swing.JButton();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jLabel8 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();
        jLabel12 = new javax.swing.JLabel();
        jLabel13 = new javax.swing.JLabel();
        jLabel14 = new javax.swing.JLabel();
        jLabel15 = new javax.swing.JLabel();
        jLabel16 = new javax.swing.JLabel();
        tile1 = new javax.swing.JButton();
        tile9 = new javax.swing.JButton();
        tile11 = new javax.swing.JButton();
        tile12 = new javax.swing.JButton();
        tile13 = new javax.swing.JButton();
        tile14 = new javax.swing.JButton();
        tile10 = new javax.swing.JButton();
        jLabel17 = new javax.swing.JLabel();
        jLabel18 = new javax.swing.JLabel();
        jLabel19 = new javax.swing.JLabel();
        jLabel20 = new javax.swing.JLabel();
        jLabel21 = new javax.swing.JLabel();
        jLabel22 = new javax.swing.JLabel();
        jLabel23 = new javax.swing.JLabel();
        tile8 = new javax.swing.JButton();
        tile16 = new javax.swing.JButton();
        tile17 = new javax.swing.JButton();
        tile18 = new javax.swing.JButton();
        tile19 = new javax.swing.JButton();
        tile20 = new javax.swing.JButton();
        tile21 = new javax.swing.JButton();
        jLabel24 = new javax.swing.JLabel();
        jLabel25 = new javax.swing.JLabel();
        jLabel26 = new javax.swing.JLabel();
        jLabel27 = new javax.swing.JLabel();
        jLabel28 = new javax.swing.JLabel();
        jLabel29 = new javax.swing.JLabel();
        jLabel30 = new javax.swing.JLabel();
        tile15 = new javax.swing.JButton();
        tile23 = new javax.swing.JButton();
        tile24 = new javax.swing.JButton();
        tile25 = new javax.swing.JButton();
        tile26 = new javax.swing.JButton();
        tile27 = new javax.swing.JButton();
        tile28 = new javax.swing.JButton();
        jLabel31 = new javax.swing.JLabel();
        jLabel32 = new javax.swing.JLabel();
        jLabel33 = new javax.swing.JLabel();
        jLabel34 = new javax.swing.JLabel();
        tile29 = new javax.swing.JButton();
        tile30 = new javax.swing.JButton();
        tile31 = new javax.swing.JButton();
        tile32 = new javax.swing.JButton();
        jPanel2 = new javax.swing.JPanel();
        jLabel36 = new javax.swing.JLabel();
        jLabel37 = new javax.swing.JLabel();
        jLabel38 = new javax.swing.JLabel();
        jLabel39 = new javax.swing.JLabel();
        rolldice2 = new javax.swing.JButton();
        mydc2 = new javax.swing.JButton();
        getln2 = new javax.swing.JButton();
        endtrn2 = new javax.swing.JButton();
        dice2 = new javax.swing.JButton();
        jPanel3 = new javax.swing.JPanel();
        jLabel40 = new javax.swing.JLabel();
        jLabel41 = new javax.swing.JLabel();
        jLabel42 = new javax.swing.JLabel();
        jLabel43 = new javax.swing.JLabel();
        rolldice1 = new javax.swing.JButton();
        mydc1 = new javax.swing.JButton();
        getln1 = new javax.swing.JButton();
        endtrn1 = new javax.swing.JButton();
        dice1 = new javax.swing.JButton();
        jPanel4 = new javax.swing.JPanel();
        jLabel44 = new javax.swing.JLabel();
        jLabel45 = new javax.swing.JLabel();
        jLabel46 = new javax.swing.JLabel();
        jLabel47 = new javax.swing.JLabel();
        mailcards = new javax.swing.JButton();
        dealcards = new javax.swing.JButton();
        jLabel35 = new javax.swing.JLabel();
        jLabel48 = new javax.swing.JLabel();
        jDesktopPane1 = new javax.swing.JDesktopPane();
        jLabel1 = new javax.swing.JLabel();

        //mailcards.addActionListener(new CardListener());
        Tiles = new JButton[]{tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9,
            tile10, tile11, tile12, tile13, tile14, tile15, tile16, tile17, tile18, tile19, tile20, tile21, tile22, tile23, tile24,
            tile25, tile26, tile27, tile28, tile29, tile30, tile31, tile32};
        dealcards.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {

                int x = mailCardCount++;
                if (mailCardCount == 20) {
                    mailCardCount = 0;
                }
               showDealCard(x);
            }
        });
        dice1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {

                int randomNum = rand.nextInt((6 - 1) + 1) + 1;
                switch (randomNum) {
                    case 1:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-1.jpg")));
                        break;
                    case 2:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-2.jpg")));
                        break;
                    case 3:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-3.jpg")));
                        break;
                    case 4:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-4.jpg")));
                        break;
                    case 5:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-5.jpg")));
                        break;
                    case 6:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-6.jpg")));
                        break;

                }
            }
        });
        rolldice1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {

                int randomNum = rand.nextInt((6 - 1) + 1) + 1;
                switch (randomNum) {
                    case 1:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-1.jpg")));
                        break;
                    case 2:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-2.jpg")));
                        break;
                    case 3:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-3.jpg")));
                        break;
                    case 4:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-4.jpg")));
                        break;
                    case 5:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-5.jpg")));
                        break;
                    case 6:
                        dice1.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-6.jpg")));
                        break;

                }
            }
        });
        dice2.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {

                int randomNum = rand.nextInt((6 - 1) + 1) + 1;
                switch (randomNum) {
                    case 1:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-1.jpg")));
                        break;
                    case 2:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-2.jpg")));
                        break;
                    case 3:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-3.jpg")));
                        break;
                    case 4:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-4.jpg")));
                        break;
                    case 5:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-5.jpg")));
                        break;
                    case 6:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-6.jpg")));
                        break;

                }
            }
        });
        rolldice2.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {

                int randomNum = rand.nextInt((6 - 1) + 1) + 1;
                switch (randomNum) {
                    case 1:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-1.jpg")));
                        break;
                    case 2:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-2.jpg")));
                        break;
                    case 3:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-3.jpg")));
                        break;
                    case 4:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-4.jpg")));
                        break;
                    case 5:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-5.jpg")));
                        break;
                    case 6:
                        dice2.setIcon(new ImageIcon(getClass().getResource("/imgs/dice-6.jpg")));
                        break;

                }
            }
        });

        for (int i = 1; i <= 31; i++) {
            Tiles[i].setIcon(new ImageIcon(getClass().getResource(brd.getPosition(i - 1).getImage())));
        }

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jLabel2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/imageedit_4_3416452090.png"))); // NOI18N

        //tile22.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/yrd.png"))); // NOI18N
        jLabel10.setBackground(new java.awt.Color(255, 255, 0));
        jLabel10.setText("Start");
        jLabel10.setOpaque(true);

        //tile2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml1.png"))); // NOI18N
        //tile3.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml2.png"))); // NOI18N
        //tile4.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml2.png"))); // NOI18N
        //tile5.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/baier.png"))); // NOI18N
        // tile6.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/csn.png"))); // NOI18N
        //tile7.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dl.png"))); // NOI18N
        jLabel3.setBackground(new java.awt.Color(255, 255, 0));
        jLabel3.setText("Monday 1");
        jLabel3.setOpaque(true);

        jLabel4.setBackground(new java.awt.Color(255, 255, 0));
        jLabel4.setText("Tuesday 2");
        jLabel4.setOpaque(true);

        jLabel5.setBackground(new java.awt.Color(255, 255, 0));
        jLabel5.setText("Wednesday 3");
        jLabel5.setOpaque(true);

        jLabel6.setBackground(new java.awt.Color(255, 255, 0));
        jLabel6.setText("Thursday 4");
        jLabel6.setOpaque(true);

        jLabel7.setBackground(new java.awt.Color(255, 255, 0));
        jLabel7.setText("Friday 5");
        jLabel7.setOpaque(true);

        jLabel8.setBackground(new java.awt.Color(255, 255, 0));
        jLabel8.setText("Saturday 6");
        jLabel8.setOpaque(true);

        jLabel9.setBackground(new java.awt.Color(255, 255, 0));
        jLabel9.setText("Sunday 7");
        jLabel9.setOpaque(true);

        jLabel11.setBackground(new java.awt.Color(255, 255, 0));
        jLabel11.setText("Monday 8");
        jLabel11.setOpaque(true);

        jLabel12.setBackground(new java.awt.Color(255, 255, 0));
        jLabel12.setText("Tuesday 9");
        jLabel12.setOpaque(true);

        jLabel13.setBackground(new java.awt.Color(255, 255, 0));
        jLabel13.setText("Wednesday 10");
        jLabel13.setOpaque(true);

        jLabel14.setBackground(new java.awt.Color(255, 255, 0));
        jLabel14.setText("Thursday 11");
        jLabel14.setOpaque(true);

        jLabel15.setBackground(new java.awt.Color(255, 255, 0));
        jLabel15.setText("Friday 12");
        jLabel15.setOpaque(true);

        jLabel16.setBackground(new java.awt.Color(255, 255, 0));
        jLabel16.setText("Saturday 13");
        jLabel16.setOpaque(true);

        tile1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/strt.png"))); // NOI18N

        //tile9.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/rdio.png"))); // NOI18N
        //tile11.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dl.png"))); // NOI18N
        //tile12.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/sweepstks.png"))); // NOI18N
        //tile13.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/sweepstks.png"))); // NOI18N
        //tile14.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ltr.png"))); // NOI18N
        //tile10.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/rdio.png"))); // NOI18N
        jLabel17.setBackground(new java.awt.Color(255, 255, 0));
        jLabel17.setText("Sunday 14");
        jLabel17.setOpaque(true);

        jLabel18.setBackground(new java.awt.Color(255, 255, 0));
        jLabel18.setText("Monday 15");
        jLabel18.setOpaque(true);

        jLabel19.setBackground(new java.awt.Color(255, 255, 0));
        jLabel19.setText("Tuesday 16");
        jLabel19.setOpaque(true);

        jLabel20.setBackground(new java.awt.Color(255, 255, 0));
        jLabel20.setText("Wednesday 17");
        jLabel20.setOpaque(true);

        jLabel21.setBackground(new java.awt.Color(255, 255, 0));
        jLabel21.setText("Thursday 18");
        jLabel21.setOpaque(true);

        jLabel22.setBackground(new java.awt.Color(255, 255, 0));
        jLabel22.setText("Friday 19");
        jLabel22.setOpaque(true);

        jLabel23.setBackground(new java.awt.Color(255, 255, 0));
        jLabel23.setText("Saturday 20");
        jLabel23.setOpaque(true);

        //tile8.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/baier.png"))); // NOI18N
        //tile16.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml1.png"))); // NOI18N
        //tile17.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml1.png"))); // NOI18N
        //tile18.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/yrd.png"))); // NOI18N
        //tile19.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dl.png"))); // NOI18N
        //tile20.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/csn.png"))); // NOI18N
        //tile21.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/baier.png"))); // NOI18N
        jLabel24.setBackground(new java.awt.Color(255, 255, 51));
        jLabel24.setText("Sunday 21");
        jLabel24.setOpaque(true);

        jLabel25.setBackground(new java.awt.Color(255, 255, 0));
        jLabel25.setText("Monday 22");
        jLabel25.setOpaque(true);

        jLabel26.setBackground(new java.awt.Color(255, 255, 0));
        jLabel26.setText("Tuesday 23");
        jLabel26.setOpaque(true);

        jLabel27.setBackground(new java.awt.Color(255, 255, 0));
        jLabel27.setText("Wednesday 24");
        jLabel27.setOpaque(true);

        jLabel28.setBackground(new java.awt.Color(255, 255, 0));
        jLabel28.setText("Thursday 25");
        jLabel28.setOpaque(true);

        jLabel29.setBackground(new java.awt.Color(255, 255, 0));
        jLabel29.setText("Friday 26");
        jLabel29.setOpaque(true);

        jLabel30.setBackground(new java.awt.Color(255, 255, 0));
        jLabel30.setText("Saturday 27");
        jLabel30.setOpaque(true);

        //tile15.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml2.png"))); // NOI18N
        //tile23.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/baier.png"))); // NOI18N
        //tile24.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml1.png"))); // NOI18N
        //tile25.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/baier.png"))); // NOI18N
        //tile26.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ltr.png"))); // NOI18N
        //tile27.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ml2.png"))); // NOI18N
        //tile28.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/baier.png"))); // NOI18N
        jLabel31.setBackground(new java.awt.Color(255, 255, 0));
        jLabel31.setText("Sunday 28");
        jLabel31.setOpaque(true);

        jLabel32.setBackground(new java.awt.Color(255, 255, 0));
        jLabel32.setText("Monday 29");
        jLabel32.setOpaque(true);

        jLabel33.setBackground(new java.awt.Color(255, 255, 0));
        jLabel33.setText("Tuesday 30");
        jLabel33.setOpaque(true);

        jLabel34.setBackground(new java.awt.Color(255, 255, 0));
        jLabel34.setText("Wednesday 31");
        jLabel34.setOpaque(true);

        //tile29.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dl.png"))); // NOI18N
        //tile30.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/ltr.png"))); // NOI18N
        //tile31.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dl.png"))); // NOI18N
        tile32.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/pd.png"))); // NOI18N

        jPanel2.setBackground(new java.awt.Color(204, 204, 204));

        jLabel36.setBackground(new java.awt.Color(204, 204, 204));
        jLabel36.setText(" Player2");

        jLabel37.setText(" jLabel37");

        jLabel38.setText(" jLabel38");

        jLabel39.setText(" jLabel39");

        rolldice2.setText("Roll Dice");

        mydc2.setText("My Deal Cards");

        getln2.setText("Get Loan");

        endtrn2.setText("End Turn");

        dice2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dice-1.jpg"))); // NOI18N

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
                jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jPanel2Layout.createSequentialGroup()
                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                        .addComponent(mydc2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                        .addComponent(rolldice2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                        .addGroup(jPanel2Layout.createSequentialGroup()
                                                .addGap(4, 4, 4)
                                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addComponent(jLabel37)
                                                        .addComponent(jLabel36)
                                                        .addComponent(jLabel38)
                                                        .addComponent(jLabel39))))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(dice2, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(20, 20, 20))
                        .addGroup(jPanel2Layout.createSequentialGroup()
                                .addComponent(getln2)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(endtrn2)
                                .addContainerGap(30, Short.MAX_VALUE))
        );
        jPanel2Layout.setVerticalGroup(
                jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jPanel2Layout.createSequentialGroup()
                                .addComponent(jLabel36)
                                .addGap(18, 18, 18)
                                .addComponent(jLabel37)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(jLabel38)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(jLabel39)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addGroup(jPanel2Layout.createSequentialGroup()
                                                .addComponent(rolldice2)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(mydc2)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(getln2)
                                                        .addComponent(endtrn2)))
                                        .addComponent(dice2, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)))
        );

        jPanel3.setBackground(new java.awt.Color(204, 204, 204));

        jLabel40.setBackground(new java.awt.Color(204, 204, 204));
        jLabel40.setText(" Player1");

        jLabel41.setText(" jLabel37");

        jLabel42.setText(" jLabel38");

        jLabel43.setText(" jLabel39");

        rolldice1.setText("Roll Dice");

        mydc1.setText("My Deal Cards");

        getln1.setText("Get Loan");

        endtrn1.setText("End Turn");

        dice1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dice-1.jpg"))); // NOI18N

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
                jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jPanel3Layout.createSequentialGroup()
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                        .addComponent(mydc1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                        .addComponent(rolldice1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                        .addGroup(jPanel3Layout.createSequentialGroup()
                                                .addGap(4, 4, 4)
                                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addComponent(jLabel41)
                                                        .addComponent(jLabel40)
                                                        .addComponent(jLabel42)
                                                        .addComponent(jLabel43))))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(dice1, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(20, 20, 20))
                        .addGroup(jPanel3Layout.createSequentialGroup()
                                .addComponent(getln1)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(endtrn1)
                                .addContainerGap(30, Short.MAX_VALUE))
        );
        jPanel3Layout.setVerticalGroup(
                jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jPanel3Layout.createSequentialGroup()
                                .addComponent(jLabel40)
                                .addGap(18, 18, 18)
                                .addComponent(jLabel41)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(jLabel42)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(jLabel43)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addGroup(jPanel3Layout.createSequentialGroup()
                                                .addComponent(rolldice1)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(mydc1)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(getln1)
                                                        .addComponent(endtrn1)))
                                        .addComponent(dice1, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)))
        );

        jLabel44.setText(" Info Box");

        jLabel45.setText(" jLabel45");

        jLabel46.setText(" jLabel46");

        jLabel47.setText(" jLabel47");

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
                jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jPanel4Layout.createSequentialGroup()
                                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addComponent(jLabel44)
                                        .addComponent(jLabel45)
                                        .addComponent(jLabel46)
                                        .addComponent(jLabel47))
                                .addGap(0, 141, Short.MAX_VALUE))
        );
        jPanel4Layout.setVerticalGroup(
                jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jPanel4Layout.createSequentialGroup()
                                .addComponent(jLabel44)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel45)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel46)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel47))
        );

        mailcards.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/mlcrds.png"))); // NOI18N

        dealcards.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/dlcrds.png"))); // NOI18N

        jLabel35.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/jackpot.png"))); // NOI18N

        jLabel48.setFont(new java.awt.Font("Tahoma", 1, 14)); // NOI18N
        jLabel48.setForeground(new java.awt.Color(255, 255, 255));
        jLabel48.setText("Jackpot: 3000 Euros");

        jLayeredPane1.setLayer(jLabel2, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile22, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel10, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile2, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile3, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile4, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile5, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile6, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile7, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel3, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel4, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel5, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel6, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel7, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel8, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel9, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel11, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel12, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel13, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel14, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel15, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel16, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile1, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile9, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile11, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile12, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile13, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile14, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile10, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel17, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel18, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel19, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel20, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel21, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel22, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel23, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile8, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile16, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile17, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile18, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile19, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile20, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile21, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel24, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel25, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel26, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel27, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel28, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel29, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel30, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile15, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile23, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile24, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile25, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile26, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile27, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile28, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel31, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel32, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel33, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel34, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile29, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile30, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile31, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(tile32, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jPanel2, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jPanel3, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jPanel4, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(mailcards, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(dealcards, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel35, javax.swing.JLayeredPane.DEFAULT_LAYER);
        jLayeredPane1.setLayer(jLabel48, javax.swing.JLayeredPane.DEFAULT_LAYER);

        javax.swing.GroupLayout jLayeredPane1Layout = new javax.swing.GroupLayout(jLayeredPane1);
        jLayeredPane1.setLayout(jLayeredPane1Layout);
        jLayeredPane1Layout.setHorizontalGroup(
                jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                .addContainerGap()
                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                                                .addComponent(jLabel31, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                                        .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                                                                .addComponent(jLabel24, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                                                        .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                                                                                .addComponent(jLabel17, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                                                                        .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                                                                                                .addComponent(jLabel9, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                                                                .addComponent(tile22, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                                                                        .addComponent(tile1, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                                                                        .addComponent(tile8, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                                                        .addComponent(tile15, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                                        .addComponent(jLabel10, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addComponent(tile9, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile10, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile11, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile12, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile13, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile14, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                        .addComponent(tile2, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                        .addComponent(jLabel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                        .addComponent(jLabel11, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                        .addComponent(tile3, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                        .addComponent(jLabel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                        .addComponent(jLabel12, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                        .addComponent(tile4, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                        .addComponent(jLabel5, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                        .addComponent(jLabel13, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                        .addComponent(tile5, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                        .addComponent(jLabel6, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                        .addComponent(jLabel14, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                        .addComponent(tile6, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                        .addComponent(jLabel7, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                        .addComponent(jLabel15, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                        .addComponent(tile7, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                        .addComponent(jLabel16, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                        .addComponent(jLabel8, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                                                        .addComponent(jLabel25, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                                        .addComponent(tile16, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                                                        .addComponent(tile17, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                        .addComponent(jLabel26, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                                .addComponent(jLabel27, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                                .addComponent(jLabel28, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                                .addComponent(jLabel29, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                                .addComponent(jLabel30, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                                .addComponent(tile18, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                                .addComponent(tile19, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                                .addComponent(tile20, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                                .addComponent(tile21, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))))
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addComponent(jLabel18, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel19, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel20, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel21, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel22, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel23, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addComponent(tile23, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile24, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile25, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile26, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile27, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(tile28, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addComponent(jLabel32, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel33, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel34, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addGap(63, 63, 63)
                                                                .addComponent(jLabel48))))
                                        .addComponent(jLabel2)
                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                .addComponent(tile29, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(tile30, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(tile31, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(tile32, javax.swing.GroupLayout.PREFERRED_SIZE, 95, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addGap(75, 75, 75)
                                                .addComponent(jLabel35)))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 117, Short.MAX_VALUE)
                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addComponent(jPanel3, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addComponent(jPanel2, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addComponent(jPanel4, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jLayeredPane1Layout.createSequentialGroup()
                                                .addComponent(mailcards, javax.swing.GroupLayout.PREFERRED_SIZE, 84, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addGap(18, 18, 18)
                                                .addComponent(dealcards, javax.swing.GroupLayout.PREFERRED_SIZE, 83, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                .addContainerGap())
        );
        jLayeredPane1Layout.setVerticalGroup(
                jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jLayeredPane1Layout.createSequentialGroup()
                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                .addContainerGap(20, Short.MAX_VALUE)
                                                .addComponent(jLabel2)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(jLabel10)
                                                        .addComponent(jLabel3)
                                                        .addComponent(jLabel4)
                                                        .addComponent(jLabel5)
                                                        .addComponent(jLabel6)
                                                        .addComponent(jLabel7)
                                                        .addComponent(jLabel8))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addComponent(tile2, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile3, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile4, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile5, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile6, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile7, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile1, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(jLabel9)
                                                        .addComponent(jLabel11)
                                                        .addComponent(jLabel12)
                                                        .addComponent(jLabel13)
                                                        .addComponent(jLabel14)
                                                        .addComponent(jLabel15)
                                                        .addComponent(jLabel16))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                                                .addComponent(tile12, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addComponent(tile11, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addComponent(tile13, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addComponent(tile14, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                                .addComponent(tile10, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                        .addComponent(tile9, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile8, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(jLabel17)
                                                        .addComponent(jLabel18)
                                                        .addComponent(jLabel19)
                                                        .addComponent(jLabel20)
                                                        .addComponent(jLabel21)
                                                        .addComponent(jLabel22)
                                                        .addComponent(jLabel23)))
                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                .addGap(22, 22, 22)
                                                .addComponent(jPanel3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addGap(44, 44, 44)
                                                .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addComponent(dealcards, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 47, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(mailcards, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 47, javax.swing.GroupLayout.PREFERRED_SIZE))))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addComponent(tile16, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile17, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile18, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile19, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile20, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile21, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile15, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                        .addComponent(jLabel24)
                                                        .addComponent(jLabel25)
                                                        .addComponent(jLabel26)
                                                        .addComponent(jLabel27)
                                                        .addComponent(jLabel28)
                                                        .addComponent(jLabel29)
                                                        .addComponent(jLabel30))
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addComponent(tile22, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile23, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile24, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile25, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile26, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile27, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                        .addComponent(tile28, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE))
                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                                                        .addComponent(jLabel31)
                                                                        .addComponent(jLabel32)
                                                                        .addComponent(jLabel33)
                                                                        .addComponent(jLabel34))
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addGroup(jLayeredPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                                                        .addComponent(tile30, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 83, Short.MAX_VALUE)
                                                                        .addComponent(tile31, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                                                                        .addComponent(tile32, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                                                                        .addComponent(tile29, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)))
                                                        .addGroup(jLayeredPane1Layout.createSequentialGroup()
                                                                .addGap(22, 22, 22)
                                                                .addComponent(jLabel35)
                                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                                .addComponent(jLabel48)))
                                                .addContainerGap())
                                        .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jLayeredPane1Layout.createSequentialGroup()
                                                .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addGap(97, 97, 97))))
        );

        jLabel1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imgs/bg_green.png"))); // NOI18N

        jDesktopPane1.setLayer(jLabel1, javax.swing.JLayeredPane.DEFAULT_LAYER);

        javax.swing.GroupLayout jDesktopPane1Layout = new javax.swing.GroupLayout(jDesktopPane1);
        jDesktopPane1.setLayout(jDesktopPane1Layout);
        jDesktopPane1Layout.setHorizontalGroup(
                jDesktopPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGap(0, 1024, Short.MAX_VALUE)
                        .addGroup(jDesktopPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addGroup(jDesktopPane1Layout.createSequentialGroup()
                                        .addGap(0, 0, Short.MAX_VALUE)
                                        .addComponent(jLabel1)
                                        .addGap(0, 0, Short.MAX_VALUE)))
        );
        jDesktopPane1Layout.setVerticalGroup(
                jDesktopPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGap(0, 768, Short.MAX_VALUE)
                        .addGroup(jDesktopPane1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addGroup(jDesktopPane1Layout.createSequentialGroup()
                                        .addGap(0, 0, Short.MAX_VALUE)
                                        .addComponent(jLabel1)
                                        .addGap(0, 0, Short.MAX_VALUE)))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addComponent(jLayeredPane1)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addGroup(layout.createSequentialGroup()
                                        .addGap(0, 0, Short.MAX_VALUE)
                                        .addComponent(jDesktopPane1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(0, 0, Short.MAX_VALUE)))
        );
        layout.setVerticalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(layout.createSequentialGroup()
                                .addComponent(jLayeredPane1)
                                .addContainerGap())
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addGroup(layout.createSequentialGroup()
                                        .addGap(0, 12, Short.MAX_VALUE)
                                        .addComponent(jDesktopPane1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(0, 13, Short.MAX_VALUE)))
        );

        pack();
    }

    public static void main(String args[]) {

        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(PayDayBrd.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(PayDayBrd.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(PayDayBrd.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(PayDayBrd.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }

        PayDayBrd pdb = new PayDayBrd();

    }

}
