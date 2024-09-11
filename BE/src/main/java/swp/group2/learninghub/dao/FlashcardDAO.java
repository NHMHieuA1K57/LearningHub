package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.Flashcard;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface FlashcardDAO extends JpaRepository<Flashcard,Integer> {
    @Query(value = "SELECT * FROM flashcard fl WHERE fl.set_id = :setId AND " +
            "fl.set_id IN (SELECT id FROM flashcard_set f WHERE f.user_id = :userId)", nativeQuery = true)
    List<Flashcard> findFlashCardWithCardSetsAndUser(@Param("userId") String userId, @Param("setId") int setId);

    ArrayList<Flashcard> getFlashcardsBySetId(@Param("setId") int setId);

    @Query(value = "SELECT MAX(id) FROM Flashcard")
    int getMaxFlashcardId();
}
