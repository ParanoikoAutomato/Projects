package payday.Model.Position;

import payday.Model.Player.Player;

public class CardPosition extends Position {

    private CardPositionType cardType;
    private int numberOfCards;

    public CardPosition(String image, int numberOfCards, CardPositionType cardType) {
        super(image);
        this.numberOfCards = numberOfCards;
        this.cardType = cardType;
    }

    @Override
    public void action(Player player) {
        switch (cardType) {
            case DEAL:
                dealAction(player);
                break;
            case MAIL:
                mailAction(player);
                break;
        }
    }

    public void mailAction(Player player) {

    }

    public void dealAction(Player player) {

    }

}
