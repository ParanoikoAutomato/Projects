package payday.Model.Position;

import payday.Model.Player.Player;

public abstract class Position {

    private Days day;
    private int date;
    private String image;
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the image of the tile.
     * @param image The image of the tile.
     */

    public Position(String image) {
        this.image = image;
    }
    /**<b>Transformer</b><p>
     * <b>Postcondition:</b> Sets the date on the tile.
     * 
     * @param date The date of the tile.
     */

    public void setDate(int date) {
        this.date = date;
    }
    /**<b>Transformer</b><p>
     * <b>Postcondition:</b> Sets the day on the tile.
     * 
     * @param day The day of the tile.
     */

    public void setDay(Days day) {
        this.day = day;
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the day of the tile.
     * @return The day of the tile.
     * 
     */
    

    public Days getDay() {
        return day;
    }
     /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the date of the tile.
     * @return The date of the tile.
     * 
     */

    public int getDate() {
        return date;
    }
     /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the image of the tile.
     * @return The image of the tile.
     * 
     */

    public String getImage() {
        return image;
    }
     /**<b>Transformer</b><p>
      * <b>Precondition:</b> The player must be valid instance of the class Player.
     * <b>Postcondition:</b> Performs the action of the tile.
     * @param player The player.
     * 
     */

    public abstract void action(Player player);
}
