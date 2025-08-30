package payday.Model.Position;

import payday.Model.Player.Player;

public class BothPlayersDicePosition extends DicePosition {

    private int dice1;
    private int dice2;
    private TwoDiceType type;
    
     /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the image of the tile ,the amount of money the players get,and the type of tile.
     * @param image The image of the tile.
     * @param amount The amount of money the players get.
     * @param type They type of the tile(LOTTERY or RADIO CONTEST).
     *
     */

    public BothPlayersDicePosition(String image, int amount, TwoDiceType type) {
        super(image, amount);
        this.type = type;
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player.
     * <b>Postcondition:</b> Based on the type of the tile performs the lottery or radio action methods.
     * @param player The player.
     */

    @Override
    public void action(Player player) {
        switch (type) {
            case LOTTERY:
                lotteryAction(player);
                break;
            case RADIO:
                radioAction(player);
                break;
        }
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player.The case of the action method must be LOTTERY.
     * <b>Postcondition:</b> Does the actions described in the tile.
     * @param player The player.
     */

    public void lotteryAction(Player player) {
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player.The case of the action method must be RADIO.
     * <b>Postcondition:</b> Does the actions described in the tile.
     * @param player The player.
     */


    public void radioAction(Player player) {
    }

}
