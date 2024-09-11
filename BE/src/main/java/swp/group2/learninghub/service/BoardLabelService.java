package swp.group2.learninghub.service;
import swp.group2.learninghub.model.BoardLabel;

import java.util.List;
public interface BoardLabelService {
    List<BoardLabel> getAllLabelsByBoardId(int boardId);
    BoardLabel getLabelById(int id);
    BoardLabel createLabel(BoardLabel label);
    BoardLabel updateLabel(BoardLabel label);
    void deleteLabel(int id);
    void addCoreLabelsToBoardLabels(String userId);

}
