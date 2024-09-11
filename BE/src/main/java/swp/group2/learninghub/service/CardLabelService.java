package swp.group2.learninghub.service;

import swp.group2.learninghub.model.BoardLabel;
import swp.group2.learninghub.model.Card;
import swp.group2.learninghub.model.CardLabel;


import java.util.ArrayList;
import java.util.List;

public interface CardLabelService {
    public void addLabelToCard(CardLabel cardLabel);
    public ArrayList<BoardLabel> findLabelsInCard(int cardId) throws Exception;
    public ArrayList<Card> findCardsByLabel(int labelId) throws Exception;
    public void updateCardLabelData(int cardId, List<CardLabel> updated);
    public void removeLabelFromCard(int cardId, int labelId);

    public void deleteAllLabelByCardId(int cardId);
    public void removeAllLabelsFromAllCards(int labelID);
    public List<CardLabel> getLabelsOfCard(int cardId);
}
