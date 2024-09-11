package swp.group2.learninghub.service;

import swp.group2.learninghub.model.KanbanColumn;

import java.util.List;

public interface ColumnService {
    public void createNewColumn(KanbanColumn newcolumn) throws ExceptionInInitializerError;
    public List<KanbanColumn> getColumnsByBoardId(int boardId);
    public KanbanColumn getColumnById(int id);
    public KanbanColumn updateColumn(KanbanColumn target);
}
