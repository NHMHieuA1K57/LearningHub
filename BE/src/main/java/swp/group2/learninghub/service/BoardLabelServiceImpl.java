package swp.group2.learninghub.service;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.BoardLabelDAO;
import swp.group2.learninghub.dao.CoreLabelDAO;
import swp.group2.learninghub.dao.NoteDAO;
import swp.group2.learninghub.model.BoardLabel;
import swp.group2.learninghub.model.CoreLabel;

import java.util.List;
import java.util.Optional;

@Service
public class BoardLabelServiceImpl implements BoardLabelService {

    private final CoreLabelDAO coreLabelDAO;
    private final BoardLabelDAO boardLabelDAO;
    org.slf4j.Logger logger = LoggerFactory.getLogger(BoardLabelServiceImpl.class);

    private final NoteDAO noteDAO;
    @Autowired
    public BoardLabelServiceImpl(CoreLabelDAO coreLabelDAO, BoardLabelDAO boardLabelDAO, NoteDAO noteDAO) {
        this.coreLabelDAO = coreLabelDAO;
        this.boardLabelDAO = boardLabelDAO;
        this.noteDAO = noteDAO;
    }

    @Override
    public List<BoardLabel> getAllLabelsByBoardId(int boardId) {
        // Implement logic to get all labels by board ID
        return boardLabelDAO.findAllByBoardId(boardId);
    }

    @Override
    public BoardLabel getLabelById(int id) {
        Optional<BoardLabel> label = boardLabelDAO.findById(id);
        if (label.isPresent()) {
            return label.get();
        }
        return null;
    }
    @Override
    public BoardLabel createLabel(BoardLabel label) {
        return boardLabelDAO.save(label);
    }

    @Override
    public BoardLabel updateLabel(BoardLabel label) {
        return boardLabelDAO.save(label);
    }

    @Override
    public void deleteLabel(int id) {
        boardLabelDAO.deleteById(id);
    }

    @Override
    public void addCoreLabelsToBoardLabels(String userId) {
        List<CoreLabel> coreLabels = coreLabelDAO.findAll();
        int boardId = noteDAO.getMaxNoteIdByUsername(userId);
        try{
            for (CoreLabel coreLabel : coreLabels) {
                // Lấy giá trị định danh cho mỗi coreLabel
                BoardLabel boardLabel = new BoardLabel(boardId,coreLabel.getName(),coreLabel.getColor());
                createLabel(boardLabel);
            }
        }catch(Exception e){
            logger.error(e.getMessage());
        }

    }

}

