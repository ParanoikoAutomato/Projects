package payday.Model.Position;

import payday.Model.Player.Player;

public class CardPosition extends Position {

    private CardPositionType cardType;
    private int numberOfCards;
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the image of the tile the number of cards you need to draw and the card type.
     * @param image Image of the tile
     * @param numberOfCards Number of cards the player needs to draw
     * @param cardType The type of the card
     *
     */

    public CardPosition(String image, int numberOfCards, CardPositionType cardType) {
        super(image);
        this.numberOfCards = numberOfCards;
        this.cardType = cardType;
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> Player must valid instance of class Player.
     * <b>Postcondition:</b> Based on the type of the tile does the deal and mail actions.
     * @param player The player.
     */

    @Override
    public void action(Player player) {
        switch (cardType) {
            case DEAL:
                dealAction(player);
                break;
            case MAIL:
                mailAction(player);
                break;
        }
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> Player must valid instance of class Player and the case of the action method must be MAIL.
     * <b>Postcondition:</b> Does the actions described in the tile.
     * @param player The player.
     */
    

    public void mailAction(Player player) {

    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> Player must valid instance of class Player and the case of the action method must be DEAL.
     * <b>Postcondition:</b> Does the actions described in the tile.
     * @param player The player.
     */

    public void dealAction(Player player) {

    }

}
