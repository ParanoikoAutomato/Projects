package payday.Model.Position;

import payday.Model.Player.Player;

public class PayDayPosition extends Position {

    private int amount;
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the image of the tile and initializes the amount of money the players get.
     * @param image The image of the tile.
     * 
     * 
     *
     */

    public PayDayPosition(String image) {
        super(image);
        this.amount = 3500;
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player.
     * <b>Postcondition:</b> Does the action described in the payday tile.
     * @param player The player.
     */

    @Override
    public void action(Player player) {
    }
}
