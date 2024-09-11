package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.BoardLabel;
@Repository
public interface LabelDAO extends JpaRepository<BoardLabel,Integer> {
}
