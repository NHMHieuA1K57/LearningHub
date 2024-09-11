package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import swp.group2.learninghub.model.FlashcardSet;

import java.util.List;
@Repository
public interface    FlashcardSetDAO extends JpaRepository<FlashcardSet,Integer> {
    @Query("select s from FlashcardSet s where s.userId= :email AND s.isActive= true")
    public List<FlashcardSet> showUserFlashcardSetById(@Param("email")String email);

    @Query("select s from FlashcardSet s where s.userId=:email AND s.isActive= true AND s.id = :setId")
    public FlashcardSet findSetById(@Param("setId")int id, @Param("email")String email);
}
