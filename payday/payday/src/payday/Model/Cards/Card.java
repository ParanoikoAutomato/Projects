package payday.Model.Cards;

import payday.Model.Player.Player;

public abstract class Card {

    private String image;
    private String text;
    private String title;
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Sets the title image and text of the card.
     * @param title Title of the card.
     * @param image Image of the card.
     * @param text  Text written on the card.
     */

    public Card(String title, String image, String text) {
        this.image = image;
        this.text = text;
        this.title = title;
    }
    /** <b>Accessor</b>
     * <p><b>Postcondition:</b> Returns the image of the card.
     * @return Image of the card.
     */

    public String getImage() {
        return image;
    }
    /**<b>Accessor</b>
     * <p><b>Postcondition:</b> Returns the text written in the card.
     * @return The text written on the card.
     */

    public String getText() {
        return text;
    }
    /** <b>Accessor</b>
     * <p><b>Postcondition:</b> Returns the title of the card.
     * @return The title of the card.
     */

    public String getTitle() {
        return title;
    }
    /**<b>Transformer</b>
     * <p><b>Precondition:</b> Player must be valid instance of class Player.
     * <p><b>Postcondition:</b> Performs the actions of the text written on the card.
     * @param player The player.
     */
    public abstract void action(Player player);
    /**
     * <b>Accessor</b>
     * <p><b>Postcondition:</b> Returns the info of the card in a string.
     * @return The info of the card in a string.
     */

    public abstract String toString();
}
