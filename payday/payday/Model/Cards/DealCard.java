package payday.Model.Cards;

import payday.Model.Player.Player;

public class DealCard extends Card {

    private int sellPrice;
    private int buyPrice;
    private String choice1;
    private String choice2;

    public DealCard(String title, String image, String text, int buyPrice, int sellPrice,
            String choice1, String choice2) {
        super(title, image, text);
        this.sellPrice = sellPrice;
        this.buyPrice = buyPrice;
        this.choice1 = choice1;
        this.choice2 = choice2;
    }

    public int getSellPrice() {
        return sellPrice;
    }

    public int getBuyPrice() {
        return buyPrice;
    }

    public String getChoice1() {
        return choice1;
    }

    public String getChoice2() {
        return choice2;
    }

    public void action(Player player) {
    }

    public String toString() {
        return "Deal Card: sellPrice= " + getSellPrice() + " buyPrice= " + getBuyPrice();
    }
}
