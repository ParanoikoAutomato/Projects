package payday.Model.Cards;

import payday.Model.Player.Player;

public class DealCard extends Card {

    private int sellPrice;
    private int buyPrice;
    private String choice1;
    private String choice2;
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the title, image and text of the card.Also sets the price needed to buy the card and the price needed to sell the card and the choices to buy the card and ignore the deal.
     * @param title Title of the deal card.
     * @param image Image of the deal card.
     * @param text Text written on the deal card.
     * @param buyPrice Price needed to buy the card.
     * @param sellPrice Price needed to sell the card.
     * @param choice1 Buy the card.
     * @param choice2  Ignore the deal.
     */

    public DealCard(String title, String image, String text, int buyPrice, int sellPrice,
            String choice1, String choice2) {
        super(title, image, text);
        this.sellPrice = sellPrice;
        this.buyPrice = buyPrice;
        this.choice1 = choice1;
        this.choice2 = choice2;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the sellPrice.
     * 
     * @return The sellPrice.
     */

    public int getSellPrice() {
        return sellPrice;
    }
    
    /**<b>Accessor</b><p>
     *<b>Postcondition:</b> Returns the BuyPrice.
     * @return The BuyPrice.
     */

    public int getBuyPrice() {
        return buyPrice;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns choice1.
     * @return choice1
     */
    public String getChoice1() {
        return choice1;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns choice2.
     * @return choice2
     */

    public String getChoice2() {
        return choice2;
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of class Player. 
     * <b>Postcondition:</b> Performs the actions written on the deal card.
     * @param player The player.
     */

    @Override
    public void action(Player player) {
    }
/**
     * <b>Accessor</b>
     * <p><b>Postcondition:</b> Returns the info of the deal card in a string.
     * @return The info of the deal card in a string.
     */
    @Override
    public String toString() {
        return "Deal Card: sellPrice= " + getSellPrice() + " buyPrice= " + getBuyPrice();
    }
}
