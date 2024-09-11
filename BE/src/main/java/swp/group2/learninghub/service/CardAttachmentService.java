package swp.group2.learninghub.service;

import swp.group2.learninghub.model.CardAttachment;

import java.util.List;

public interface CardAttachmentService {
    CardAttachment addAttachment(CardAttachment attachment);

    CardAttachment updateAttachment(CardAttachment attachment);

    void deleteAttachment(int id);

    List<CardAttachment> getAttachmentsByCardId(int cardId);
}
