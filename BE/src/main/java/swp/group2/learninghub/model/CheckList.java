package swp.group2.learninghub.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "checklist_item")
@ToString
public class CheckList {
    @Id
    private int id;
    private int cardId;
    private String name;
    private int position;
    private boolean isChecked;
}
