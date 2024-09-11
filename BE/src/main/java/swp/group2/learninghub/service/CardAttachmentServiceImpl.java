package swp.group2.learninghub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.CardAttachmentDAO;
import swp.group2.learninghub.model.CardAttachment;

import java.util.Date;
import java.util.List;

@Service
public class CardAttachmentServiceImpl implements CardAttachmentService {
    private final CardAttachmentDAO cardAttachmentDAO;

    @Autowired

    public CardAttachmentServiceImpl(CardAttachmentDAO cardAttachmentDAO) {
        this.cardAttachmentDAO = cardAttachmentDAO;
    }

    @Override
    public CardAttachment addAttachment(CardAttachment attachment) {
        attachment.setUpdateDate(new Date());
        return cardAttachmentDAO.save(attachment);
    }

    @Override
    public CardAttachment updateAttachment(CardAttachment attachment) {
        attachment.setUpdateDate(new Date());
        return cardAttachmentDAO.save(attachment);
    }

    @Override
    public void deleteAttachment(int id) {
        cardAttachmentDAO.deleteById(id);
    }

    @Override
    public List<CardAttachment> getAttachmentsByCardId(int cardId) {
        return cardAttachmentDAO.findByCardId(cardId);
    }
}
