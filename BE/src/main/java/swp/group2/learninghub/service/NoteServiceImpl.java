package swp.group2.learninghub.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp.group2.learninghub.dao.NoteDAO;
import swp.group2.learninghub.model.Note;
import swp.group2.learninghub.model.User;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class NoteServiceImpl implements NoteService {
    @Autowired
    public NoteDAO noteDAO;
    @Autowired
    HttpSession session;

    @Override
    public Note createNote(Note note) {
        note.setCreatedDate(Date.valueOf(LocalDate.now()));
        return noteDAO.save(note);
    }

    @Override
    public Note findNoteById(int id) {
        Optional<Note> n = noteDAO.findById(id);
        if (n.isEmpty()) {
            return null;
        }
        Note note = n.get();
        return note;
    }

    @Override
    public Note updateNote(Note note) {
        Optional<Note> n = noteDAO.findById(note.getId());
        if (n.isEmpty()) {
            throw new IllegalArgumentException("Not found note");
        }
        Note newNote = n.get();
        newNote.setTitle(note.getTitle());
        newNote.setDescription(note.getDescription());
        noteDAO.save(newNote);
        return newNote;
    }

    @Override
    public List<Note> showUserNotesByEmail(String email) {
        return noteDAO.showUserNotesByEmail(email);
    }

    @Override
    public Note archiveNoteById(int noteId) {
        User sessionUser = (User) session.getAttribute("user");
        Note target = noteDAO.getNoteById(noteId, sessionUser.getEmail());
        if (target == null) {
            throw new IllegalArgumentException("Note not found!");
        } else {
            target.setActive(false);
            try {
                noteDAO.save(target);
            } catch (Exception e) {
                throw new IllegalArgumentException("Unable to archive note!");
            }
        }
        return target;
    }

    @Override
    public int getMaxBoardIdByEmail(String email) {
        return noteDAO.getMaxNoteIdByUsername(email);
    }
}
