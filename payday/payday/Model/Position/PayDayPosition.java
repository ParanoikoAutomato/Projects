package payday.Model.Position;

import payday.Model.Player.Player;

public class PayDayPosition extends Position {

    private int amount;

    public PayDayPosition(String image) {
        super(image);
        this.amount = 3500;
    }

    @Override
    public void action(Player player) {
    }
}
