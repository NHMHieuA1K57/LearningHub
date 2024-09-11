package swp.group2.learninghub.api;

import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import swp.group2.learninghub.model.*;
import swp.group2.learninghub.service.CardAttachmentService;
import swp.group2.learninghub.service.CheckListService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/checklists")
public class CheckListController {

    org.slf4j.Logger logger = LoggerFactory.getLogger(CheckListController.class);
    @Autowired
    HttpSession session;
    @Autowired
    public CheckListService checkListService;

    private static final String SUCCESSMSG = "Success";
    private static final String FAILMSG = "Fail";




    @PostMapping()
    public ResponseEntity<ResponseObject> createCheckList(@RequestBody CheckList checkList) {
        try {
            checkList.setChecked(true);
            CheckList newCheckList = checkListService.createCheckList(checkList);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(SUCCESSMSG, "Create checklist successfully!", newCheckList));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, "Create checklist failed, reason: " + e.getMessage(), null));
        }
    }

    @PutMapping("/archive")
    public ResponseEntity<ResponseObject> archiveCheckListById(@RequestParam("id") int id) {
        try {
            CheckList newCheckList = checkListService.archiveCheckListById(id);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(SUCCESSMSG, "Archive checklist successfully!", newCheckList));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, "Archive checklist failed, reason: " + e.getMessage(), null));
        }
    }

    @PutMapping("/archive/cardid")
    public ResponseEntity<ResponseObject> archiveCheckListByCardId(@RequestParam("cardid") int cardID) {
        try {
            List<CheckList> l=checkListService.archiveCheckListByCardId(cardID);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(SUCCESSMSG, "Archive checklist by cardID successfully!", l));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, "Archive checklist failed, reason: " + e.getMessage(), null));
        }
    }

    @GetMapping()
    public ResponseEntity<ResponseObject> showCheckListByCardId(@RequestParam("cardid") int cardID) {
        try {
            List<CheckList> list = checkListService.showCheckListByCardId(cardID);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(SUCCESSMSG, "Show checklist successfully!", list));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, "Show checklist failed, reason: " + e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> findCheckListById(@PathVariable int id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(
                    SUCCESSMSG, "Show checklist successfully!",
                    checkListService.findCheckListById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, e.getMessage(), null));
        }
    }

    @PutMapping()
    public ResponseEntity<ResponseObject> updateCheckList(@RequestBody CheckList checkList) {
        try {
            CheckList updateCheckList = checkListService.updateCheckList(checkList);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(
                    SUCCESSMSG, "Update checklist successfully!", updateCheckList));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, e.getMessage(), null));
        }
    }

    @Transactional
    @DeleteMapping()
    public ResponseEntity<ResponseObject> deleteCheckListById(@RequestParam("id") int id) {
        try {
             checkListService.deleteCheckListById(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(
                    SUCCESSMSG, "delete checklist successfully!",null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, e.getMessage(), null));
        }
    }
    @Transactional
    @DeleteMapping("/checklist")
    public ResponseEntity<ResponseObject> deleteCheckListByCardId(@RequestParam("cardid") int cardid) {
        try {
            checkListService.deleteCheckListByCardId(cardid);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(
                    SUCCESSMSG, "delete checklist successfully!",null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(
                    new ResponseObject(FAILMSG, e.getMessage(), null));
        }
    }


    private User checkAccount() {

        User userSession = (User) session.getAttribute("user");
        logger.info(userSession.toString());
        if (userSession == null) {
            throw new IllegalArgumentException("can not find user information for this feature");
        }
        return userSession;
    }

    @RestController
    @RequestMapping("/api/v1/card-attachments")
    public static class CardAttachmentController {
        private final CardAttachmentService cardAttachmentService;

        @Autowired
        public CardAttachmentController(CardAttachmentService cardAttachmentService) {
            this.cardAttachmentService = cardAttachmentService;
        }

        @PostMapping("/add")
        public ResponseEntity<CardAttachment> addAttachment(
                @RequestParam("cardId") int cardId,
                @RequestBody CardAttachment attachment) {
            try {
                attachment.setCardId(cardId);
                CardAttachment newAttachment = cardAttachmentService.addAttachment(attachment);
                return new ResponseEntity<>(newAttachment, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @PutMapping("/update")
        public ResponseEntity<CardAttachment> updateAttachment(
                @RequestParam("cardId") int cardId,
                @RequestBody CardAttachment attachment) {
            try {
                CardAttachment existingAttachment = (CardAttachment) cardAttachmentService.getAttachmentsByCardId(cardId);
                if (existingAttachment != null) {
                    attachment.setId(cardId);
                    CardAttachment updatedAttachment = cardAttachmentService.updateAttachment(attachment);
                    return new ResponseEntity<>(updatedAttachment, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @DeleteMapping("/delete")
        public ResponseEntity<Void> deleteAttachment(@RequestParam("cardId") int cardId) {
            try {
                CardAttachment existingAttachment = (CardAttachment) cardAttachmentService.getAttachmentsByCardId(cardId);
                if (existingAttachment != null) {
                    cardAttachmentService.deleteAttachment(cardId);
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
