package swp.group2.learninghub.service;

import java.util.List;

import swp.group2.learninghub.model.Feature;

public interface FeatureService {
    public List<Feature> showAll();

    public void setActive(int id, String mess);

    public Feature findFeatureById(int id);
}
