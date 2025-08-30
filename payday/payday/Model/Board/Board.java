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
import static payday.Model.Position.TwoDiceType.LOTTERY;
import static payday.Model.Position.TwoDiceType.RADIO;

public class Board {

    private ArrayList<Position> positions;

    public Board() {
        for (int i = 0; i < 4; i++) {
            positions.add(new CardPosition("", 1, MAIL));
        }
        for (int i = 0; i < 4; i++) {
            positions.add(new CardPosition("", 2, MAIL));
        }
        for (int i = 0; i < 5; i++) {
            positions.add(new CardPosition("", 1, DEAL));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new OnePlayerDicePosition("", 1000, SWEEPTAKES));
        }
        for (int i = 0; i < 3; i++) {
            positions.add(new BothPlayersDicePosition("", 1000, LOTTERY));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new BothPlayersDicePosition("", 1000, RADIO));
        }
        for (int i = 0; i < 6; i++) {
            positions.add(new Position(""));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new OnePlayerDicePosition("", 500, CASINO));
        }
        for (int i = 0; i < 2; i++) {
            positions.add(new OnePlayerDicePosition("", 1000, YARDSALE));
        }
        Collections.shuffle(positions);
        positions.add(new PayDayPosition(""));
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

    public Position getPosition(int i) {
        return positions.get(i);
    }

    public Days getPositionDay(int i) {
        return positions.get(i).getDay();
    }

}
