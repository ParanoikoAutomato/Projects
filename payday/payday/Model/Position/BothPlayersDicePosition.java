package payday.Model.Position;

import payday.Model.Player.Player;

public class BothPlayersDicePosition extends DicePosition {

    private int dice1;
    private int dice2;
    private TwoDiceType type;

    public BothPlayersDicePosition(String image, int amount, TwoDiceType type) {
        super(image, amount);
        this.type = type;
    }

    public void action(Player player) {
        switch (type) {
            case LOTTERY:
                lotteryAction(player);
                break;
            case RADIO:
                radioAction(player);
                break;
        }
    }

    public void lotteryAction(Player player) {
    }

    public void radioAction(Player player) {
    }

}
