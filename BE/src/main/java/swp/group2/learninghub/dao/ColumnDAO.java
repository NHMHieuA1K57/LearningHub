package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.KanbanColumn;

import java.util.List;

@Repository
public interface ColumnDAO extends JpaRepository<KanbanColumn, Integer> {
    @Query("select k from KanbanColumn k where k.boardId= :boardId and k.isActive= true")
    public List<KanbanColumn> getByBoardId(int boardId);
}
