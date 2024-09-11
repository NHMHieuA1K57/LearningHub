package swp.group2.learninghub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.BoardLabelDAO;
import swp.group2.learninghub.dao.CardDAO;
import swp.group2.learninghub.dao.CardLabelDAO;
import swp.group2.learninghub.model.BoardLabel;
import swp.group2.learninghub.model.Card;
import swp.group2.learninghub.model.CardLabel;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
public class CardLabelServiceImpl implements CardLabelService {
    private final CardLabelDAO cardLabelDAO;

    @Autowired
    public BoardLabelDAO boardLabelDAO;
    @Autowired
    public CardDAO cardDAO;

    @Override
    public void deleteAllLabelByCardId(int cardId) {
        cardLabelDAO.deleteAllByCardId(cardId);
    }

    @Override
    public void removeAllLabelsFromAllCards(int labelID) {
        List<CardLabel> cardLabels = cardLabelDAO.findAllByLabelId(labelID);

        for (CardLabel cardLabel : cardLabels) {
            cardLabelDAO.delete(cardLabel);
        }
    }

    public CardLabelServiceImpl(CardLabelDAO cardLabelDAO) {
        this.cardLabelDAO = cardLabelDAO;
    }


    @Override
    public void addLabelToCard(CardLabel cardLabel) {
        cardLabelDAO.save(cardLabel);
    }

    @Override
    public ArrayList<BoardLabel> findLabelsInCard(int cardId) throws Exception {
        List<CardLabel> clList = cardLabelDAO.findAllByCardId(cardId);
        ArrayList<BoardLabel> labelList = new ArrayList<>();
        for(CardLabel cl : clList){
            Optional<BoardLabel> boardLabel = boardLabelDAO.findById(cl.getLabelId());
            if(boardLabel.isPresent()){
                labelList.add( boardLabel.get());
            }else{
                throw new Exception("labelId Not Valid");
            }
        }
        return labelList;
    }

    @Override
    public List<CardLabel> getLabelsOfCard(int cardId) {
        return cardLabelDAO.findAllByCardId(cardId);
    }

    @Override
    public ArrayList<Card> findCardsByLabel(int labelId) throws Exception {
        List<CardLabel> cardLabels = cardLabelDAO.findAllByLabelId(labelId);
        ArrayList<Card> cardList = new ArrayList<>();
        for(CardLabel cl : cardLabels){
            Optional<Card> card = cardDAO.findById(cl.getCardId());
            if(card.isPresent()){
                cardList.add( card.get());
            }else{
                throw new Exception("labelId Not Valid");
            }
        }
        return cardList;
    }

    @Override
    public void updateCardLabelData(int cardId, List<CardLabel> updated) {
        //delete all card label record related to this cardId
        cardLabelDAO.deleteAllByCardId(cardId);
        //add new label information to this card
        cardLabelDAO.saveAll(updated);
    }
    public void removeLabelFromCard(int cardId, int labelId) {
        cardLabelDAO.deleteByCardIdAndLabelId(cardId, labelId);
    }

    }



