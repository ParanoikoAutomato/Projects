package payday.Model.Position;

import payday.Model.Player.Player;

public class OnePlayerDicePosition extends DicePosition {

    int dice1;
    OneDiceType type;

    public OnePlayerDicePosition(String image, int amount, OneDiceType type) {
        super(image, amount);
        this.type = type;
    }

    public void action(Player player) {
        switch (type) {
            case SWEEPTAKES:
                sweeptakesAction(player);
                break;
            case CASINO:
                casinoAction(player);
                break;
            case YARDSALE:
                yardsaleAction(player);
                break;
        }
    }

    public void sweeptakesAction(Player player) {
    }

    public void casinoAction(Player player) {
    }

    public void yardsaleAction(Player player) {
    }
}
