package swp.group2.learninghub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.CoreLabelDAO;
import swp.group2.learninghub.model.CoreLabel;

import java.util.List;
import java.util.Optional;

@Service
public class CoreLabelsServiceImpl implements CoreLabelsService {
    private final CoreLabelDAO coreLabelDAO;

    @Autowired
    public CoreLabelsServiceImpl(CoreLabelDAO coreLabelDAO) {
        this.coreLabelDAO = coreLabelDAO;
    }

    @Override
    public List<CoreLabel> getAllLabels() {
        return coreLabelDAO.findAll();
    }

    @Override
    public CoreLabel getLabelById(int id) {
        Optional<CoreLabel> label = coreLabelDAO.findById(id);
        return label.orElse(null);
    }

    @Override
    public CoreLabel createLabel(CoreLabel label) {
        return coreLabelDAO.save(label);
    }

    @Override
    public CoreLabel updateLabel(CoreLabel label) {
        return coreLabelDAO.save(label);
    }

    @Override
    public void deleteLabel(int id) {
        coreLabelDAO.deleteById(id);
    }
}
