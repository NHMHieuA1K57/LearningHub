package swp.group2.learninghub.service;

import swp.group2.learninghub.model.Card;

import java.util.List;

public interface CardService {

    public List<Card> getByColId(int colId);

    public Card getById(int id);

    public void updateCard(Card newCard) throws Exception;
    public void deleteCardById(int cardId);

    public void addCard(Card newCard);
    public int getMaxCardId(int columnId);
}
