package swp.group2.learninghub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class KanbanColumn {
    @Id
    private int id;
    private int boardId;
    private String name;
    private int position;
    private boolean isActive;
}
