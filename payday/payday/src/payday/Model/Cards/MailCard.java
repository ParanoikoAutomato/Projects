package payday.Model.Cards;

import static payday.Model.Cards.MailCardType.AD;
import static payday.Model.Cards.MailCardType.BILL;
import static payday.Model.Cards.MailCardType.CHARITY;
import static payday.Model.Cards.MailCardType.MAD;
import static payday.Model.Cards.MailCardType.MOVE;
import static payday.Model.Cards.MailCardType.PTN;
import payday.Model.Player.Player;

public class MailCard extends Card {

    private int amount;
    private String choice1;
    private MailCardType type;
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the title ,image and text of the card.Also sets the amount of money the player needs to pay or take,the choice to press the button to accept and the type of the mail card
     * @param title Title of the mail card.
     * @param image Image of the mail card.
     * @param text Text written on the mail card
     * @param amount The money the player needs to pay or take.
     * @param choice1 Accept the mail card.
     * @param type The type of the mail card.
     */

    public MailCard(String title, String image, String text, int amount,
            String choice1, String type) {
        super(title, image, text);
        this.amount = amount;
        this.choice1 = choice1;
        switch (type) {
            case "Advertisement":
                this.type = AD;
                break;
            case "Bill":
                this.type = BILL;
                break;
            case "Charity":
                this.type = CHARITY;
                break;
            case "PayTheNeighbor":
                this.type = PTN;
                break;
            case "MadMoney":
                this.type = MAD;
                break;
            case "MoveToDealBuyer":
                this.type = MOVE;
                break;
        }
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the amount.
     * @return The amount.
     */

    public int getAmount() {
        return amount;
    }
     /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the choice1.
     * @return The choice1.
     */

    public String getChoice1() {
        return choice1;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the type of the mail card.
     * @return The type of the mail card.
     */

    public MailCardType getType() {
        return type;
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of the class Player.
     * <b>Postcondition:</b> Based on the type of the mail card the method chooses to perform on of the 6 actions.
     * @param player The player
     */

    public void action(Player player) {
        switch (type) {
            case AD:
                adAction(player);
                break;
            case BILL:
                billAction(player);
                break;
            case CHARITY:
                charityAction(player);
                break;
            case PTN:
                ptnAction(player);
                break;
            case MAD:
                madAction(player);
                break;
            case MOVE:
                moveAction(player);
                break;
        }
    }
     /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of the class Player and the case of action method must be AD.
     * <b>Postcondition:</b> Does what is written in the text of the AD mail card.
     * @param player The player
     */

    public void adAction(Player player) {

    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of the class Player and the case of action method must be BILL.
     * <b>Postcondition:</b> Does what is written in the text of the BILL mail card.
     * @param player The player
     */

    public void billAction(Player player) {

    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of the class Player and the case of action method must be CHARITY.
     * <b>Postcondition:</b> Does what is written in the text of the CHARITY mail card.
     * @param player The player
     */

    public void charityAction(Player player) {

    }
     /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of the class Player and the case of action method must be PTN.
     * <b>Postcondition:</b> Does what is written in the text of the PTN mail card.
     * @param player The player
     */

    public void ptnAction(Player player) {

    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of the class Player and the case of action method must be MAD.
     * <b>Postcondition:</b> Does what is written in the text of the MAD mail card.
     * @param player The player
     */

    public void madAction(Player player) {

    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> The player must be valid instance of the class Player and the case of action method must be MOVE.
     * <b>Postcondition:</b> Does what is written in the text of the MOVE mail card.
     * @param player The player
     */

    public void moveAction(Player player) {

    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the string representation of the mail card.
     * @return The sting representation of the mail card.
     */

    @Override
    public String toString() {
        return "Mail Card: amount= " + getAmount();
    }
}
