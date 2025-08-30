package payday.Model.Position;

import payday.Model.Player.Player;

public class OnePlayerDicePosition extends DicePosition {

    int dice1;
    OneDiceType type;
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the image of the tile ,the amount of money the players get,and the tiles that need one dice.
     * @param image The image of the tile.
     * @param amount The amount of money the players get.
     * @param type They type of the tile(LOTTERY or RADIO CONTEST).
     *
     */

    public OnePlayerDicePosition(String image, int amount, OneDiceType type) {
        super(image, amount);
        this.type = type;
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player.
     * <b>Postcondition:</b> Based on the type of tile performs the sweeptakes,casino,yardsale action methods.
     * 
     * @param player The player.
     */

    @Override
    public void action(Player player) {
        switch (type) {
            case SWEEPTAKES:
                sweeptakesAction(player);
                break;
            case CASINO:
                casinoAction(player);
                break;
            case YARDSALE:
                yardsaleAction(player);
                break;
        }
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player and the case of the actions method must be SWEEPTAKES.
     * <b>Postcondition:</b> Performs the actions described in the tile.
     * 
     * @param player The player.
     */

    public void sweeptakesAction(Player player) {
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player and the case of the action method must be CASINO
     * <b>Postcondition:</b> Does the actions described in the tile.
     * 
     * @param player The player.
     */

    public void casinoAction(Player player) {
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> player must be valid instance of class Player and the case of the action method must be YARDSALE.
     * <b>Postcondition:</b> Does the actions described in the tile.
     * 
     * @param player The player.
     */

    public void yardsaleAction(Player player) {
    }
}
