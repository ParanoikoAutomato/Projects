package payday.Model.Pawn;

public class Pawn {
    private int position;
    String icon;

    public Pawn(String icon) {
        this.icon = icon;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
