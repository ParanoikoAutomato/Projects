package payday.Model.Position;

public class DicePosition extends Position {

    private int amount;

    public DicePosition(String image, int amount) {
        super(image);
        this.amount = amount;
    }
}
