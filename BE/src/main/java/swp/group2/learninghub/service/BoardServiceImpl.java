package swp.group2.learninghub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.BoardDAO;
import swp.group2.learninghub.dao.NoteDAO;
import swp.group2.learninghub.model.Board;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class BoardServiceImpl implements BoardService {
    @Autowired
    public BoardDAO boardDAO;
    @Autowired
    public NoteDAO noteDAO;

    @Override
    public Board createBoard(Board board) {
        board.setCreatedDate(Date.valueOf(LocalDate.now()));
        return boardDAO.save(board);
    }

    @Override
    public Board updateBoard(Board board) {
        Board b = boardDAO.findBoardByNoteId(board.getNoteId());
        if (b == null) {
            throw new IllegalArgumentException("Not found board of noteId = " + board.getNoteId());
        }
        Board newBoard = b;
        newBoard.setName(board.getName());
        boardDAO.save(newBoard);
        return newBoard;
    }

    @Override
    public Board findBoardByNoteId(int noteId) {
        return boardDAO.findBoardByNoteId(noteId);
    }
    @Override
    public Board findBoard(String name) {
        return boardDAO.findByName(name);
    }


}


