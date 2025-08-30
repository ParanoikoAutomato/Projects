package payday.Model.Cards;

import static payday.Model.Cards.MailCardType.AD;
import static payday.Model.Cards.MailCardType.BILL;
import static payday.Model.Cards.MailCardType.CHARITY;
import static payday.Model.Cards.MailCardType.MAD;
import static payday.Model.Cards.MailCardType.MOVE;
import static payday.Model.Cards.MailCardType.PTN;
import payday.Model.Player.Player;

public class MailCard extends Card {

    private int amount;
    private String choice1;
    private MailCardType type;

    public MailCard(String title, String image, String text, int amount,
            String choice1, String type) {
        super(title, image, text);
        this.amount = amount;
        this.choice1 = choice1;
        switch (type) {
            case "Advertisement":
                this.type = AD;
                break;
            case "Bill":
                this.type = BILL;
                break;
            case "Charity":
                this.type = CHARITY;
                break;
            case "PayTheNeighbor":
                this.type = PTN;
                break;
            case "MadMoney":
                this.type = MAD;
                break;
            case "MoveToDealBuyer":
                this.type = MOVE;
                break;
        }
    }

    public int getAmount() {
        return amount;
    }

    public String getChoice1() {
        return choice1;
    }

    public MailCardType getType() {
        return type;
    }

    public void action(Player player) {
        switch (type) {
            case AD:
                adAction(player);
                break;
            case BILL:
                billAction(player);
                break;
            case CHARITY:
                charityAction(player);
                break;
            case PTN:
                ptnAction(player);
                break;
            case MAD:
                madAction(player);
                break;
            case MOVE:
                moveAction(player);
                break;
        }
    }

    public void adAction(Player player) {

    }

    public void billAction(Player player) {

    }

    public void charityAction(Player player) {

    }

    public void ptnAction(Player player) {

    }

    public void madAction(Player player) {

    }

    public void moveAction(Player player) {

    }

    public String toString() {
        return "Mail Card: amount= " + getAmount();
    }
}
