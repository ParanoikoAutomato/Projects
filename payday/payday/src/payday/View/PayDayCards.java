/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package payday.View;

import java.awt.Image;
import java.net.URL;
import java.util.ArrayList;
import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import payday.Model.Cards.DealCard;
import payday.Model.Cards.MailCard;

/**
 *
 * @author LG
 */
public class PayDayCards {

    private ArrayList<DealCard> dealCardsList = new ArrayList<DealCard>();
    private ArrayList<MailCard> mailCardsList = new ArrayList<MailCard>();

    public PayDayCards() {
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
        dealCardsList.add(new DealCard("Deal", ".cardsimg/facebook.jpg", "Agora Metoxwn sto Facebook", 1000, 2000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "cardsimg/elafonisi.jpg", "Agora Oikopedou sto Elafonhsi", 7000, 10000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/guitar2.jpg", "Agora Syllektikhs Kitharas", 3000, 6000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/talos.jpg", "Agora Katasthmatos sto Talos Plaza", 10000, 18000, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/nba.jpg", "Agora Eishthriou gia ton teliko tou NBA", 900, 1800, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/spania.jpeg", "Agora Spanias Gatas", 700, 1200, "Agorase", "Agnohse th Symfwnia"));
        dealCardsList.add(new DealCard("Deal", "/cardsimg/zaxar.jpg", "Agora Zaxaroplasteiou", 5000, 9500, "Agorase", "Agnohse th Symfwnia"));
    }
/*public void showDealCard(int i) {
		Object[] options = {dealCardsList.get(i).[i][6], dealCards[i][7]};
		URL imageURL = cldr.getResource("resources/images/" + dealCards[i][5]); //image
		System.out.println("Type: " + dealCards[i][0] + "\nTypeEn: " + dealCards[i][1]
				+ "\nMessage: " + dealCards[i][2] + "\nCost:" + Integer.parseInt(dealCards[i][3])
				+ "\nValue:" + Integer.parseInt(dealCards[i][4]) + "\nChoice1: " + dealCards[i][6] + "\nChoice2: " + dealCards[i][7]);
		Image image = new ImageIcon(imageURL).getImage();
		image = image.getScaledInstance(200, 200, java.awt.Image.SCALE_SMOOTH);
		JOptionPane p = new JOptionPane();

		
		
		int n = p.showOptionDialog(this,
				dealCards[i][2] + "\nΤιμή Αγοράς: " + dealCards[i][3] + " Ευρώ \nΤιμή Πώλησης: " + dealCards[i][4] + " Ευρώ \n",
				dealCards[i][0],
				JOptionPane.OK_OPTION,
				0,
				new ImageIcon(image),
				options,
				options[0]);
}*/
}
