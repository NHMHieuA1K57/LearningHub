package swp.group2.learninghub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.ColumnDAO;
import swp.group2.learninghub.model.KanbanColumn;

import java.util.List;
import java.util.Optional;

@Service
public class ColumnServiceImpl implements ColumnService{
    @Autowired
    public ColumnDAO columnDAO;

    @Override
    public KanbanColumn getColumnById(int id) {
        Optional<KanbanColumn> kb = columnDAO.findById(id);
        return kb.orElse(null);
    }

    @Override
    public KanbanColumn updateColumn(KanbanColumn target) {
        return columnDAO.save(target);
    }

    @Override
    public void createNewColumn(KanbanColumn kanbanColumn){
        columnDAO.save(kanbanColumn);
    }

    @Override
    public List<KanbanColumn> getColumnsByBoardId(int boardId) {
        return columnDAO.getByBoardId(boardId);
    }
}
