package payday.Model.Player;

import java.util.ArrayList;
import payday.Model.Cards.DealCard;
import payday.Model.Pawn.Pawn;

public class Player {

    private int money;
    private int loan;
    private int bills;
    private ArrayList<DealCard> dealCardsList;
    private Pawn pawn;

    public Player(int loan, int bills, String icon) {
        this.money = 3500;
        this.loan = loan;
        this.bills = bills;
        this.pawn = new Pawn(icon);
    }

    public int getMoney() {
        return money;
    }

    public int getLoan() {
        return loan;
    }

    public int getbills() {
        return bills;
    }

    public void buyDealCard(DealCard dc) {
        dealCardsList.add(dc);
    }

    public void sellDealCard(DealCard dc) {
        dealCardsList.remove(dc);
    }

    public DealCard getDealCard(int i) {
        return dealCardsList.get(i);
    }

    public int getPawnPosition() {
        return pawn.getPosition();
    }

    public void setPawnPosition(int position) {
        pawn.setPosition(position);
    }
}
