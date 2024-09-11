package swp.group2.learninghub.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import swp.group2.learninghub.model.Flashcard;
import swp.group2.learninghub.model.FlashcardSet;

public interface FlashcardService {
    public List<FlashcardSet> showUserFlashcardSetByEmail(String email);

    public void deleteByCardById(int id);

    FlashcardSet createFlashCardSet(FlashcardSet flashCardSet);

    public List<Flashcard> showFlashCard(int setId);

    public Flashcard createUpdate(Flashcard newfc);

    FlashcardSet updateFlashCardSet(FlashcardSet flashCardSet);

    public void archiveSetById(int id);

    public boolean setLearn(int id);

    public void updateFlashcard(Flashcard flashcard) throws Exception;

    public FlashcardSet getSetById(int setId);

    public ArrayList<Flashcard> getFlashcardsBySetId(int setId);

    public int getMaxFlashcardId();

    public Optional<Flashcard> getFlashcardById(int flashcardId);

    public Flashcard updateOrCreateFlashcard(Flashcard flashcard);

}
