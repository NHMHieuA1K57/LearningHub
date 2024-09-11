package swp.group2.learninghub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


import java.util.Date;


@Entity
public class FlashcardSet {
    @Id
    private int id;
    private String userId;
    private String title;
    private String description;
    private Date createdDate;
    private boolean isActive;
    private boolean isLearned;

    public FlashcardSet() {
    }

    public FlashcardSet(int id, String userId, String title, String description, Date createdDate, boolean isActive, boolean isLearned) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.isActive = isActive;
        this.isLearned = isLearned;
    }

    // Getters and setters

    public int getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isLearned() {
        return isLearned;
    }

    public void setLearned(boolean learned) {
        isLearned = learned;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {
        return isActive;
    }

    @Override
    public String toString() {
        return "FlashcardSet{" +
                "id=" + id +
                ", user_id='" + userId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", created_date=" + createdDate +
                ", isActive=" + isActive +
                ", isLearned=" + isLearned +
                '}';
    }
}
