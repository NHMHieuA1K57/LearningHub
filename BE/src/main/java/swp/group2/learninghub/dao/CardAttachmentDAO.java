package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.CardAttachment;

import java.util.List;
@Repository
public interface CardAttachmentDAO extends JpaRepository<CardAttachment, Integer> {
    List<CardAttachment> findByCardId(int cardId);
}
