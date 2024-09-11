package swp.group2.learninghub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.CheckListDAO;

import swp.group2.learninghub.model.CheckList;

import java.util.List;
import java.util.Optional;

@Service
public class CheckListServiceImpl implements  CheckListService{

    @Autowired
    public CheckListDAO checkListDAO;

    @Override
    public CheckList createCheckList(CheckList checkList) {
        return checkListDAO.save(checkList);
    }

    @Override
    public List<CheckList> showCheckListByCardId(int id) {
        return checkListDAO.findByCardId(id);
    }

    @Override
    public CheckList findCheckListById(int id) {
        Optional<CheckList> n = checkListDAO.findById(id);
        if (n.isEmpty()) {
            return null;
        }
        CheckList checkList = n.get();
        return checkList ;
    }

    @Override
    public CheckList updateCheckList(CheckList checkList) {
        Optional<CheckList> n = checkListDAO.findById(checkList.getId());
        if (n.isEmpty()) {
            throw new IllegalArgumentException("Not found checklist");
        }
        CheckList newCheckList = n.get();
        newCheckList.setName(checkList.getName());

        checkListDAO.save(newCheckList);
        return newCheckList;
    }

    @Override
    public CheckList archiveCheckListById(int id) {
        Optional<CheckList> n = checkListDAO.findById(id);
        if (n.isEmpty()) {
            throw new IllegalArgumentException("Not found checklist");
        }
        CheckList newCheckList = n.get();
        newCheckList.setChecked(!newCheckList.isChecked());

        checkListDAO.save(newCheckList);
        return newCheckList;
    }

    @Override
    public List<CheckList> archiveCheckListByCardId(int id) {
        List<CheckList> list=showCheckListByCardId(id);
        if (list.isEmpty()) {
            throw new IllegalArgumentException("Not found checklist by cardID");
        }
        for (CheckList c:list) {
            if(c.isChecked()) {
                archiveCheckListById(c.getId());
            }
        }
        List<CheckList> list1=showCheckListByCardId(id);
        return list1;
    }

    @Override
    public void deleteCheckListById(int id) {
        checkListDAO.deleteById(id);
    }

    @Override
    public void deleteCheckListByCardId(int cardId) {
        checkListDAO.deleteByCardId(cardId);
    }
}
