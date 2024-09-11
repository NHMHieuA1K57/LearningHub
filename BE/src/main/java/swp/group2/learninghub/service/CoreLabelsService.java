package swp.group2.learninghub.service;
import swp.group2.learninghub.model.CoreLabel;

import java.util.List;
public interface CoreLabelsService {
    List<CoreLabel> getAllLabels();
    CoreLabel getLabelById(int id);
    CoreLabel createLabel(CoreLabel label);
    CoreLabel updateLabel(CoreLabel label);
    void deleteLabel(int id);
}
