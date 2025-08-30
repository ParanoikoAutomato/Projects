package payday.Model.Player;

import java.util.ArrayList;
import payday.Model.Cards.DealCard;
import payday.Model.Pawn.Pawn;

public class Player {

    private int money;
    private int loan;
    private int bills;
    private ArrayList<DealCard> dealCardsList;
    private Pawn pawn;
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the loan, bills and the pawn of the player and initializes the amount each player is getting from the start. 
     * @param loan The loan of the player.
     * @param bills The bills the player needs to pay.
     * @param icon The icon of the pawn.
     */

    public Player(int loan, int bills, String icon) {
        this.money = 3500;
        this.loan = loan;
        this.bills = bills;
        this.pawn = new Pawn(icon);
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the money of the player.
     * 
     * 
     * @return Money of the player.
     */

    public int getMoney() {
        return money;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the loan of the player.
     * 
     * 
     * @return Loan of the player.
     */
    

    public int getLoan() {
        return loan;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the bills of the player.
     * 
     * 
     * @return Bills of the player.
     */

    public int getbills() {
        return bills;
    }
    /**<b>Transformer</b><p>
     * <b>Postcondition:</b> Adds the deal card in the players list.
     * 
     * @param dc deal card
     * 
     */
    

    public void buyDealCard(DealCard dc) {
        dealCardsList.add(dc);
    }
    /**<b>Transformer</b><p>
     * <b>Postcondition:</b> Removes the deal card from list.
     * 
     * 
     * @param dc deal card
     */

    public void sellDealCard(DealCard dc) {
        dealCardsList.remove(dc);
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns deal card from the players list.
     * 
     * @param i Dates 
     * @return Deal card from the players list.
     */

    public DealCard getDealCard(int i) {
        return dealCardsList.get(i);
    }
    /**<b>Accessor</b><p>
     * 
     * <b>Postcondition:</b> Returns the position of the player's pawn.
     * 
     * 
     * @return The position of the player's pawn.
     */
    

    public int getPawnPosition() {
        return pawn.getPosition();
    }
    /**<b>Transformer</b><p>
     * <b>Postcondition:</b> Sets the position of the player's pawn.
     * 
     * 
     * @param position The position of the player's pawn.
     */

    public void setPawnPosition(int position) {
        pawn.setPosition(position);
    }
}
