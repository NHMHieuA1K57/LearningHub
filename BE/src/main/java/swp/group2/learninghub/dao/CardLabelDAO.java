package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.CardLabel;


import java.util.List;

@Repository
public interface CardLabelDAO extends JpaRepository<CardLabel,Integer> {

    public List<CardLabel> findAllByCardId(int cardId);
    public List<CardLabel> findAllByLabelId(int labelId);

    public void deleteAllByCardId(int cardId);

    void deleteByCardIdAndLabelId(int cardId, int labelId);

}
