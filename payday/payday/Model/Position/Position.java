package payday.Model.Position;

import payday.Model.Player.Player;

public class Position {

    private Days day;
    private int date;
    private String image;

    public Position(String image) {
        this.image = image;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public void setDay(Days day) {
        this.day = day;
    }

    public Days getDay() {
        return day;
    }

    public int getDate() {
        return date;
    }

    public String getImage() {
        return image;
    }

    public void action(Player player) {
    }
}
