package swp.group2.learninghub.service;

import swp.group2.learninghub.model.Board;

public interface BoardService {
    public Board createBoard(Board board);

    public Board updateBoard(Board board);

    public Board findBoardByNoteId(int noteId);
    public Board findBoard(String name);

}
