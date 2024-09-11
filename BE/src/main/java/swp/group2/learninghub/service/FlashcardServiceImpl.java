package swp.group2.learninghub.service;

import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpSession;
import swp.group2.learninghub.dao.FlashcardDAO;
import swp.group2.learninghub.dao.FlashcardSetDAO;
import swp.group2.learninghub.model.Flashcard;
import swp.group2.learninghub.model.FlashcardSet;
import swp.group2.learninghub.model.User;

import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FlashcardServiceImpl implements FlashcardService {
    @Autowired
    private FlashcardDAO flashcardDAO;
    @Autowired
    private FlashcardSetDAO setDAO;
    @Autowired
    HttpSession session;
    @Autowired
    private FeatureService featureService;

    @Autowired
    public FlashcardServiceImpl(FlashcardDAO flashcardDAO, FlashcardSetDAO setDAO, HttpSession session,
                                FeatureService featureService) {
        this.flashcardDAO = flashcardDAO;
        this.setDAO = setDAO;
        this.session = session;
        this.featureService = featureService;
    }

    @Override
    public List<FlashcardSet> showUserFlashcardSetByEmail(String email) {
        return setDAO.showUserFlashcardSetById(email);
    }

    @Override
    public void deleteByCardById(int id) {
        try {
            // find if this card is valid
            flashcardDAO.deleteById(id);
        } catch (Exception e) {
            throw new IllegalArgumentException("cannot delete card, reason: " + e.getMessage());
        }
    }

    @Override
    public void archiveSetById(int id) {
        // get user information
        User sessionUser = (User) session.getAttribute("user");
        // find if that set is valid
        FlashcardSet target = setDAO.findSetById(id, sessionUser.getEmail());
        if (target == null) {
            throw new IllegalArgumentException("Set can not be found");
        } else {
            target.setActive(false);
            try {
                setDAO.save(target);
            } catch (Exception e) {
                throw new IllegalArgumentException("Unable to update set information");
            }
        }
    }

    @Override
    public FlashcardSet createFlashCardSet(FlashcardSet flashCardSet) {
        // Set the created date to the current date
        flashCardSet.setCreatedDate(Date.valueOf(LocalDate.now()));
        flashCardSet.setActive(true);
        // Set other default values if needed
        // Save the flash card set to the database
        return setDAO.save(flashCardSet);
    }

    @Override
    public Flashcard createUpdate(Flashcard newfc) {
        Optional<Flashcard> flashcard = flashcardDAO.findById(newfc.getId());
        if (flashcard.isPresent() && newfc.getSetId() == 0) {
            throw new IllegalArgumentException("set_id not null");
        }
        return flashcardDAO.save(newfc);
    }

    @Override
    public FlashcardSet updateFlashCardSet(FlashcardSet flashCardSet) {
        if (flashCardSet.getId() != 0) {
            Optional<FlashcardSet> f = setDAO.findById(flashCardSet.getId());
            if (f.isEmpty()) {
                return null;
            }
            FlashcardSet newf = f.get();
            flashCardSet.setUserId(newf.getUserId());
            flashCardSet.setCreatedDate(newf.getCreatedDate());
            return setDAO.save(flashCardSet);
        }
        return null;
    }

    @Override
    public List<Flashcard> showFlashCard(int setId) {
        if (featureService.findFeatureById(1).isActive()) {
            // lây User từ session
            User user = (User) session.getAttribute("user");

            List<Flashcard> list = flashcardDAO.findFlashCardWithCardSetsAndUser(user.getEmail(), setId);
            if (list == null) {
                throw new IllegalArgumentException("List null");
            }
            return list;

        } else {
            throw new IllegalArgumentException("Feature Card not active");
        }
    }

    @Override
    public boolean setLearn(int id) {
        User user = (User) session.getAttribute("user");
        FlashcardSet set = setDAO.findSetById(id, user.getEmail());
        if (user.getEmail() == null) {
            throw new IllegalArgumentException("can not find users");
        }
        if (set == null) {
            throw new IllegalArgumentException("can not find set");
        }
        set.setLearned(!set.isLearned());
        setDAO.save(set);
        return (set.isLearned());
    }

    @Override
    public void updateFlashcard(Flashcard flashcard) throws Exception {
        try {
            Optional<Flashcard> f = flashcardDAO.findById(flashcard.getId());
            if (f.isEmpty()) {
                throw new Exception("Flashcard ID is not exist!");
            }
            flashcardDAO.save(flashcard);
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public FlashcardSet getSetById(int setId) {
        User sessionUser = (User) session.getAttribute("user");
        return setDAO.findSetById(setId, sessionUser.getEmail());
    }

    @Override
    public ArrayList<Flashcard> getFlashcardsBySetId(int setId) {
        return flashcardDAO.getFlashcardsBySetId(setId);
    }

    @Override
    public int getMaxFlashcardId() {
        return flashcardDAO.getMaxFlashcardId();
    }

    @Override
    public Optional<Flashcard> getFlashcardById(int flashcardId) {
        return flashcardDAO.findById(flashcardId);
    }

    @Override
    public Flashcard updateOrCreateFlashcard(Flashcard flashcard) {
        try {
            Optional<Flashcard> existingFlashcard = flashcardDAO.findById(flashcard.getId());
            if (existingFlashcard.isPresent()) {
                // Flashcard already exists, update its properties
                Flashcard updatedFlashcard = existingFlashcard.get();
                updatedFlashcard.setSetId(flashcard.getSetId());
                updatedFlashcard.setTerm(flashcard.getTerm());
                updatedFlashcard.setDefinition(flashcard.getDefinition());
                updatedFlashcard.setPosition(flashcard.getPosition());
                return flashcardDAO.save(updatedFlashcard);
            } else {
                // Flashcard does not exist, create a new one
                return flashcardDAO.save(flashcard);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to update or create flashcard: " + e.getMessage());
        }
    }

    public void learn() {
        throw new UnsupportedOperationException();
        // hold
    }
}
