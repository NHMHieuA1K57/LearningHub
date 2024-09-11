package swp.group2.learninghub.service;

import swp.group2.learninghub.model.CheckList;

import java.util.List;

public interface CheckListService {
    public CheckList createCheckList(CheckList checkList);
    public List<CheckList> showCheckListByCardId(int id);
    public CheckList findCheckListById(int id);
    public CheckList updateCheckList(CheckList checkList);

    public CheckList archiveCheckListById(int id);

    public List<CheckList> archiveCheckListByCardId(int id);

    public void deleteCheckListById(int id);

    public void deleteCheckListByCardId(int cardId);




}
