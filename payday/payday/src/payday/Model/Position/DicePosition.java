package payday.Model.Position;

import payday.Model.Player.Player;

public class DicePosition extends Position {

    private int amount;
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the image of the tile and the amount of money the players get.
     * @param image The image of the tile.
     * 
     * @param amount The amount of money the players get.
     *
     */

    public DicePosition(String image, int amount) {
        super(image);
        this.amount = amount;
    }
public void action(Player player){
}
}
