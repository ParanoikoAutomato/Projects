package payday.Model.Cards;

import payday.Model.Player.Player;

public abstract class Card {

    private String image;
    private String text;
    private String title;

    public Card(String title, String image, String text) {
        this.image = image;
        this.text = text;
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public String getText() {
        return text;
    }

    public String getTitle() {
        return title;
    }

    public abstract void action(Player player);

    public abstract String toString();
}
