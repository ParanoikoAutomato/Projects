package payday.Model.Board;

import java.util.ArrayList;
import java.util.Collections;
import payday.Model.Position.BothPlayersDicePosition;
import payday.Model.Position.CardPosition;
import static payday.Model.Position.CardPositionType.DEAL;
import static payday.Model.Position.CardPositionType.MAIL;
import payday.Model.Position.Days;
import static payday.Model.Position.Days.FRIDAY;
import static payday.Model.Position.Days.MONDAY;
import static payday.Model.Position.Days.SATURDAY;
import static payday.Model.Position.Days.SUNDAY;
import static payday.Model.Position.Days.THURSDAY;
import static payday.Model.Position.Days.TUESDAY;
import static payday.Model.Position.Days.WEDNESDAY;
import static payday.Model.Position.OneDiceType.CASINO;
import static payday.Model.Position.OneDiceType.SWEEPTAKES;
import static payday.Model.Position.OneDiceType.YARDSALE;
import payday.Model.Position.OnePlayerDicePosition;
import payday.Model.Position.PayDayPosition;
import payday.Model.Position.Position;
import payday.Model.Position.SimplePosition;
import static payday.Model.Position.TwoDiceType.LOTTERY;
import static payday.Model.Position.TwoDiceType.RADIO;

public class Board {

    private ArrayList<Position> positions= new ArrayList<Position>();
    
    /**<b>Constructor</b><p>
     * <b>Postcondition:</b> Initializes the board.
     *
     */

    public Board() {
        for (int i = 0; i < 4; i++) {
            positions.add(new CardPosition("/imgs/ml1.png", 1, MAIL));
        }
        for (int i = 0; i < 4; i++) {
            positions.add(new CardPosition("/imgs/ml2.png", 2, MAIL));
        }
        for (int i = 0; i < 5; i++) {
            positions.add(new CardPosition("/imgs/dl.png", 1, DEAL));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new OnePlayerDicePosition("/imgs/sweepstks.png", 1000, SWEEPTAKES));
        }
        for (int i = 0; i < 3; i++) {
            positions.add(new BothPlayersDicePosition("/imgs/ltr.png", 1000, LOTTERY));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new BothPlayersDicePosition("/imgs/rdio.png", 1000, RADIO));
        }
        for (int i = 0; i < 6; i++) {
            positions.add(new SimplePosition("/imgs/baier.png"));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new OnePlayerDicePosition("/imgs/csn.png", 500, CASINO));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new OnePlayerDicePosition("/imgs/yrd.png", 1000, YARDSALE));
        }
        Collections.shuffle(positions);
        positions.add(new PayDayPosition("/imgs/pd.png"));
        Position tempPos;
        Days[] weekDays = {MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY};
        for (int i = 1; i <= 31; i++) {
            tempPos = positions.get(i - 1);
            tempPos.setDate(i);
            int y = i % 7 - 1;
            if (y < 1) {
                y = 6;
            }
            tempPos.setDay(weekDays[y]);
        }
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the positions.
     * @param i Depends with what you want to call the method.
     * @return The positions
     */

    public Position getPosition(int i) {
        return positions.get(i);
    }
    /**<b>Accessor</b><p>
     * <b>Postcondition:</b> Returns the positions of the days.
     * @param i Days
     * @return The positions of the days.
     */

    public Days getPositionDay(int i) {
        return positions.get(i).getDay();
    }

}
