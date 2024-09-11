package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.CheckList;

import java.util.List;

@Repository
public interface CheckListDAO extends JpaRepository<CheckList, Integer> {
    List<CheckList> findByCardId(int id);

    void deleteByCardId(int cardid);
}
