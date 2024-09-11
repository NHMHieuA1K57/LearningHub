package swp.group2.learninghub.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import swp.group2.learninghub.model.Feature;
@Repository
public interface FeatureDAO extends JpaRepository<Feature,Integer> {
}
