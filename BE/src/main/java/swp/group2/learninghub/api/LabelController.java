package swp.group2.learninghub.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swp.group2.learninghub.model.BoardLabel;
import swp.group2.learninghub.model.Card;
import swp.group2.learninghub.model.CardLabel;
import swp.group2.learninghub.model.CoreLabel;
import swp.group2.learninghub.service.BoardLabelService;
import swp.group2.learninghub.service.CardLabelService;
import swp.group2.learninghub.service.CoreLabelsService;

import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/api/v1/labels")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LabelController {
    private final BoardLabelService boardLabelService;
    private final CoreLabelsService coreLabelService;
    private final CardLabelService cardLabelService;

    @Autowired
    public LabelController(BoardLabelService boardLabelService, CoreLabelsService coreLabelsService, CardLabelService cardLabelService) {
        this.boardLabelService = boardLabelService;
        this.coreLabelService = coreLabelsService;
        this.cardLabelService = cardLabelService;
    }

    @GetMapping
    public ResponseEntity<List<CoreLabel>> getAllLabels() {
        List<CoreLabel> labels = coreLabelService.getAllLabels();
        return new ResponseEntity<>(labels, HttpStatus.OK);
    }

    //err
    @GetMapping("/getLabelById")
    public ResponseEntity<CoreLabel> getLabelById(@RequestParam("id") int id) {
        try {
            CoreLabel label = coreLabelService.getLabelById(id);
            if (label != null) {
                return new ResponseEntity<>(label, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createL")
    public ResponseEntity<CoreLabel> createLabel(@RequestBody CoreLabel label) {
        try {
            CoreLabel createdLabel = coreLabelService.createLabel(label);
            return new ResponseEntity<>(createdLabel, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getLabelsByBoardId")
    public ResponseEntity<List<BoardLabel>> getAllLabelsByBoardId(@RequestParam("boardId") int boardId) {
        try {
            List<BoardLabel> labels = boardLabelService.getAllLabelsByBoardId(boardId);
            return new ResponseEntity<>(labels, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getLabelsById")
    public ResponseEntity<BoardLabel> getLabelById(
            @RequestParam("boardId") int boardId,
            @RequestParam("labelId") int labelId) {
        try {
            BoardLabel label = boardLabelService.getLabelById(labelId);
            if (label == null || label.getBoardId() != boardId) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(label, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createBL")
    public ResponseEntity<BoardLabel> createLabel(@RequestBody BoardLabel label) {
        try {
            BoardLabel createdLabel = boardLabelService.createLabel(label);
            return new ResponseEntity<>(createdLabel, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateBL")
    public ResponseEntity<BoardLabel> updateLabel(
            @RequestParam("boardId") int boardId,
            @RequestParam("labelId") int labelId,
            @RequestBody() BoardLabel label) {
        try {
            if (label.getBoardId() != boardId || boardLabelService.getLabelById(labelId) == null) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            label.setId(labelId);
            BoardLabel updatedLabel = boardLabelService.updateLabel(label);
            return new ResponseEntity<>(updatedLabel, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleBL")
    public ResponseEntity<Void> deleteLabel(@RequestParam("boardId") int boardId, @RequestParam("labelId") int labelId) {
        try {
            BoardLabel label = boardLabelService.getLabelById(labelId);
            if (label == null || label.getBoardId() != boardId) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            cardLabelService.removeAllLabelsFromAllCards(labelId);
            boardLabelService.deleteLabel(labelId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateL")
    public ResponseEntity<CoreLabel> updateLabel(
            @RequestBody CoreLabel label) {
        try {
            CoreLabel existingLabel = coreLabelService.getLabelById(label.getId());
            if (existingLabel != null) {
                label.setId(label.getId());
                CoreLabel updatedLabel = coreLabelService.updateLabel(label);
                return new ResponseEntity<>(updatedLabel, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteL")
    public ResponseEntity<Void> deleteLabel(@RequestParam("id") int id) {
        try {
            CoreLabel existingLabel = coreLabelService.getLabelById(id);
            if (existingLabel != null) {
                coreLabelService.deleteLabel(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addLabelToCard")
    public ResponseEntity<Void> addLabelToCard(
            @RequestParam("cardId") int cardId,
            @RequestParam("labelId") int labelId) {
        try {
            CardLabel cardLabel = new CardLabel(labelId, cardId);
            cardLabelService.addLabelToCard(cardLabel);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getLabelsByCardId")
    public ResponseEntity<List<CardLabel>> getLabelsByCardId(@RequestParam("cardId") int cardId) {
        try {
            List<BoardLabel> boardLabels = cardLabelService.findLabelsInCard(cardId);
            List<CardLabel> cardLabels = new ArrayList<>();

            for (BoardLabel boardLabel : boardLabels) {
                CardLabel cardLabel = new CardLabel(boardLabel.getId(), cardId);
                cardLabels.add(cardLabel);
            }

            return ResponseEntity.ok(cardLabels);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCardByLabelId")
    public ResponseEntity<List<CardLabel>> getCardsByLabelId(@RequestParam("labelId") int labelId) {
        try {
            ArrayList<Card> cards = cardLabelService.findCardsByLabel(labelId);
            List<CardLabel> cardLabels = new ArrayList<>();

            for (Card card : cards) {
                CardLabel cardLabel = new CardLabel(labelId, card.getId());
                cardLabels.add(cardLabel);
            }

            return ResponseEntity.ok(cardLabels);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/removeLabelCard")
    public ResponseEntity<Void> removeLabelFromCard(
            @RequestParam("cardId") int cardId,
            @RequestParam("labelId") int labelId) {
        try {
            cardLabelService.removeLabelFromCard(cardId, labelId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
