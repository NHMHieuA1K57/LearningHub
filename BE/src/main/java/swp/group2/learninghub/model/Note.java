package swp.group2.learninghub.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class Note {
    @Id
    private int id;
    private String title;
    private String description;
    private String userId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;
    private boolean isActive;

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}
