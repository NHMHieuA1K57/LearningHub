package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp.group2.learninghub.model.CoreLabel;

import java.util.Optional;

@Repository
public interface CoreLabelDAO extends JpaRepository<CoreLabel,Integer> {
    void deleteById(Long id);

    Optional<CoreLabel> findById(Long id);
}
