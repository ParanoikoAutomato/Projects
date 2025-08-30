package payday.Model.Pawn;

public class Pawn {
    private int position;
    String icon;
/**<b>Constructor</b><p>
 * <b>Postcondition:</b> Sets the image of the pawn.
 * @param icon The image of the pawn.
 */
    
    public Pawn(String icon) {
        this.icon = icon;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the position of the pawn.
     * @return The position of the pawn.
     */

    public int getPosition() {
        return position;
    }
    /**<b>Transformer</b><p>
     * <b>Precondition:</b> The pawn need to be valid instance of class Pawn.
     * <b>Postcondition:</b> Sets the position of the pawn.
     * @param position The position of the pawn.
     */

    public void setPosition(int position) {
        this.position = position;
    }
}
