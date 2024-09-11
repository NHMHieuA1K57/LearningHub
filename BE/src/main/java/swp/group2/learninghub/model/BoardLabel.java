package swp.group2.learninghub.model;

import jakarta.persistence.*;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class BoardLabel {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private int id;
    private int boardId;
    private String name;
    private String color;

    public BoardLabel(int boardId, String name, String color) {
        this.boardId = boardId;
        this.name = name;
        this.color = color;
    }
}
