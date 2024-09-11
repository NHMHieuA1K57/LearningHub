package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.Card;


import java.util.List;

@Repository
public interface CardDAO extends JpaRepository<Card,Integer> {



    @Query("select max(c.id) from Card c where c.columnId=:columnId")
    public int getMaxCardIdByColumn(int columnId);
    public List<Card> findCardsByColumnIdOrderByPosition(int columnId);

}

