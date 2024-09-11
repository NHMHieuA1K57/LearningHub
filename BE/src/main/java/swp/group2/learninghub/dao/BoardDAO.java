package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.Board;
@Repository
public interface BoardDAO extends JpaRepository<Board,Integer> {
    public Board findBoardByNoteId(int noteId);

    Board findByName(String name);

}
